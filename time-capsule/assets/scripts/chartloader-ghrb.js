let currentItems = [];
let filteredItems = [];
let filters = {
    search: "",
    source: "all",
    instrument: "leadGuitar5",
    difficulty: "expert"
}

/*
-------------------------
    UTILITY FUNCTIONS
-------------------------
*/

// rewrite a string in camelCase to Title Case (what kind of name is that, claude?)
function camelToTitleCase(str) {
    return str
            .replace(/([A-Z0-9])/g, ' $1') // add spaces
            .replace(/^./, (char) => char.toUpperCase()) // turn the first character in upper case
            .trim();
}

// gives the short intensity to display
function getShortIntensity(intensity) {
    if (intensity === undefined) return "-";
    const closerIntensity = Math.round(intensity)
    let displayIntensity = String(Math.trunc(intensity)).padStart(2, '0') // display the intensity with two numbers instead of one
    // if the rounded intensity is bigger, add a +
    if (intensity >= 1 && closerIntensity > intensity) {
        displayIntensity = displayIntensity + '&#8314'
    }
    return displayIntensity;
}

function getInstrumentName(instrument) {
    switch (instrument) {
        case "leadGuitar5": return "5 Fret Lead Guitar"
        case "rhythmGuitar5": return "5 Fret Rhythm Guitar"
        case "bassGuitar5": return "5 Fret Bass Guitar"
        case "leadGuitar6": return "6 Fret Lead Guitar"
        case "rhythmGuitar6": return "6 Fret Rhythm Guitar"
        case "bassGuitar6": return "6 Fret Bass Guitar"
        default: return `Unknown (${instrument})`
    }
}

function getDifficultyClass(instrument, difficulty) {
    switch (instrument) {
        case "leadGuitar5":
        case "rhythmGuitar5":
        case "bassGuitar5":
        case "leadGuitar6":
        case "rhythmGuitar6":
        case "bassGuitar6":
            switch (difficulty) {
                case "easy": return 1;
                case "medium": return 2;
                case "hard": return 3;
                case "expert": return 4;
                case "expert+": return 5;
                default: return 0;
            }
        default: return 0;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getDifficultyTier(intensity) {
    if (intensity === undefined) return 0; // nothing to show
    if (intensity < 1.0)  return 0; // freebie tier
    if (intensity < 3.5)  return 1; // beginner tier
    if (intensity < 6.5)  return 2; // intermediate tier
    if (intensity < 9.5)  return 3; // advanced tier
    if (intensity < 12.5) return 4; // expert tier
    if (intensity < 15.5) return 5; // grandmaster tier
                          return 6; // super grandmaster tier
}

function getDifficultyTicks(intensity) {
    if (intensity === undefined) return [0, 0, 0, 0, 0, 0];
    const tick1 = Math.trunc(1/3 * (intensity + 2.5))
    const tick2 = Math.trunc(1/3 * (intensity + 2))
    const tick3 = Math.trunc(1/3 * (intensity + 1.5))
    const tick4 = Math.trunc(1/3 * (intensity + 1))
    const tick5 = Math.trunc(1/3 * (intensity + 0.5))
    const tick6 = Math.trunc(1/3 * intensity)
    return [tick1, tick2, tick3, tick4, tick5, tick6]
}

function formatTime(time) {
    const pad = (n, len = 2) => String(n).padStart(len, '0');
    const seconds = Math.trunc(time)
    
    const s = seconds % 60
    const m = (Math.trunc(seconds / 60)) % 60
    const h = Math.trunc(seconds / 3600)
    
    if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`
    else return `${pad(m)}:${pad(s)}`
}

function displayBpmRange(bpmRange) {
    const min = bpmRange[0]
    const max = bpmRange[1]
    if (min == max) return `${min}`
    else return `${min}-${max}`
}

/*
----------------------
    LIST FUNCTIONS
----------------------
*/

async function loadChartFile(file) {
    try {
        const response = await fetch(`/assets/ghrb-charts/${file}`);
        if (!response.ok) {
            console.error(`${response.status}`);
            throw new Error(`${response.status}`);
        }
        let items = await response.json();
        // for every item, rewrite the source to use a source code that checks both the source and the file source
        for (let item of items) {
            item.sourceCode = getSourceCode(item.source, file);
        }
        currentItems = currentItems.concat(items)
    } catch (err) {
        console.error(`Error while loading ${file}:`, err);
    }
}

async function loadCharts() {
    await loadChartFile('gen1a.json'); // load gen 1 quality charts
    await loadChartFile('gen1b.json'); // load gen 1 other charts
    await loadChartFile('gen1c.json'); // load gen 1 meme charts
    await loadChartFile('celestepack.json'); // load celeste ost pack
    await loadChartFile('ytis1.json'); // load youtube italia sings 1.1.1
    await loadChartFile('ytis2.json'); // load youtube italia sings 2
    await loadChartFile('m4p.json'); // load made4poldhub
    // sort them by title
    currentItems.sort((a, b) => a.title.localeCompare(b.title, { sensitivity: 'base' }))
}

function loadFilters() {
    filters.search = document.getElementById('filter-search').value.trim().toLowerCase();
    filters.source = document.getElementById('filter-source').value;
    filters.instrument = document.getElementById('filter-instrument').value;
    filters.difficulty = document.getElementById('filter-difficulty').value;
}

function applySearchFilter() {
    filters.search = document.getElementById('filter-search').value.trim().toLowerCase();
    renderFilteredList(currentItems)
}
function applySourceFilter() {
    filters.source = document.getElementById('filter-source').value;
    renderFilteredList(currentItems)
}
function applyInstrumentFilter() {
    filters.instrument = document.getElementById('filter-instrument').value;
    renderFilteredList(currentItems)
}
function applyDifficultyFilter() {
    filters.difficulty = document.getElementById('filter-difficulty').value;
    renderFilteredList(currentItems)
}

function renderFilteredList(items) {
    // filter by search
    if (filters.search.length == 0) {
        filteredItems = currentItems
    }
    else {
        filteredItems = items.filter(item => {
            const matchesTitle = item.title.toLowerCase().includes(filters.search);
            const matchesArtist = item.artist.toLowerCase().includes(filters.search);

            return matchesTitle || matchesArtist;
        });
    }
    // filter by other stuff
    filteredItems = filteredItems.filter(item => {
        const matchesSource = filters.source == "all" || item.sourceCode.toLowerCase() == filters.source;

        return matchesSource;
    });
    renderList(filteredItems)
}

// render the whole chart list according to the filters set
function renderList(items) {
    const container = document.getElementById('map-list-container');
    container.innerHTML = ''; // clear

    // render the chart count
    document.getElementById("chart-count").textContent = items.length;
    
    // render each chart left after filtering
    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'map-card';
        card.dataset.index = index
        
        let variantDisplay;
        let aggregate = false;
        // if set to check all instruments, count all the variants
        if (filters.instrument == "all") {
            aggregate = true;
            let k = 0
            for (let i in item.variants) {
                for (let j in item.variants[i]) {
                    k = k + 1
                }
            }
            variantDisplay = {
                intensity: k,
                difficulty: "Variants"
            }
        }
        // if set to a specific instrument but all difficulties, count the difficulties
        else if (filters.instrument != "all" && filters.difficulty == "all") {
            aggregate = true;
            let k = 0
            for (let j in item.variants[filters.instrument]) {
                k = k + 1
            }
            variantDisplay = {
                intensity: k,
                difficulty: "Variants"
            }
        }
        // otherwise, show the specific variant
        else {
            let instrumentDisplay = item.variants[filters.instrument]
            if (instrumentDisplay !== undefined) {
                variantDisplay = instrumentDisplay[filters.difficulty]
            }
            // if there's nothing to find with the given filters, set a fallback variant display to show nothing is there
            if (instrumentDisplay === undefined || variantDisplay === undefined) {
                variantDisplay = {
                    intensity: undefined,
                    difficulty: ""
                }
            }
        }
        const difficultyTier = aggregate ? 0 : getDifficultyTier(variantDisplay.intensity)
        const difficultyTicks = aggregate ? [0, 0, 0, 0, 0, 0] : getDifficultyTicks(variantDisplay.intensity)
        
        const intensityDisplay = aggregate ? variantDisplay.intensity : getShortIntensity(variantDisplay.intensity);
        
        const artist = item.featurings ? `${item.artist} ft. ${item.featurings.join(', ')}` : item.artist;

        const source = getSourceName(item.sourceCode);

        card.innerHTML = `
            <div class="chart-marker marker-${item.sourceCode.toLowerCase()} with-tooltip" data-tooltip="${source}">${item.sourceCode}</div>
            <div class="chart-info">
                <span class="artist">${artist ?? "Unknown Artist"}</span>
                <h2 class="title">${item.title ?? "Untitled"}</h2>
                <span class="subtitle">${item.subtitle ?? ""}</span>
            </div>
            <div class="chart-difficulty">
                <div class="difficulty difficulty-${difficultyTier}">
                    <span class="difficulty-name" data-difficulty="${camelToTitleCase(filters.difficulty)}">${variantDisplay.difficulty ?? camelToTitleCase(filters.difficulty)}</span>
                    <span class="intensity">${intensityDisplay}</span>
                </div>
                <div class="difficulty-ticks">
                    <div class="tick-${difficultyTicks[0]}"></div>
                    <div class="tick-${difficultyTicks[1]}"></div>
                    <div class="tick-${difficultyTicks[2]}"></div>
                    <div class="tick-${difficultyTicks[3]}"></div>
                    <div class="tick-${difficultyTicks[4]}"></div>
                    <div class="tick-${difficultyTicks[5]}"></div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

/*
------------------------
    DIALOG FUNCTIONS
------------------------
*/

function getLoadPhrase(phrases) {
    output = "";
    if (phrases == undefined) return null;
    localisedPhrases = phrases[navigator.language]
    if (localisedPhrases == undefined) localisedPhrases = phrases["en-GB"]
    output = localisedPhrases ? localisedPhrases[getRandomInt(localisedPhrases.length)] : phrases[getRandomInt(phrases.length)]
    return output != "" ? output : null; // return null if there's nothing to display
}

function getSourceCode(source, file) {
    if (source != null && source != undefined && source != "" && source != "0") {
        switch (source) {
            case "yis1": return "YT1";
            case "yis2": return "YT2";
            case "celestepack": return "CLST";
            case "m4p": return "M4P";
            default: break;
        }
    }
    // if no source is defined, check the file
    switch (file) {
        case "gen1a.json": return "1A";
        case "gen1b.json": return "1B";
        case "gen1c.json": return "1C";
        case "celestepack.json": return "CLST";
        case "ytis1.json": return "YT1";
        case "ytis2.json": return "YT2";
        case "m4p.json": return "M4P";
        default: return null; // failsafe in case another file is loaded
    }
}

function getSourceName(sourceCode) {
    if (sourceCode == null) return null;
    switch (sourceCode) {
        case "1A": return "Gen 1 Quality Charts";
        case "1B": return "Gen 1 DLC";
        case "1C": return "Gen 1 Quality Shitpost";
        case "CLST": return "Celeste OST Pack";
        case "YT1": return "YouTube Italia Sings 1.1.1";
        case "YT2": return "YouTube Italia Sings 2";
        case "M4P": return "Made4PoldHub Charts";
        default: return null; // failsafe, in case
    }
}

function getLatestUpdate(updates) {
    if (updates === null || updates === undefined) return null;
    const revision = updates.length - 1;
    const isodate = updates[revision]; // get the date of the revision, saved in YYYYMMDD format (conforms to ISO 8601)
    let y = isodate.slice(0, 4);
    let m = isodate.slice(4, 6);
    let d = isodate.slice(6, 8);
    const date = new Date(y, m, d).toLocaleDateString();
    return revision > 0 ? `Released ${date} (Revision ${revision})` : `Released ${date}`;
}

// open the dialog for a certain item
function openDialog(item) {
    let length = item.length ?? 0
    // first, inside the item, get each variant divided by instrument
    const instruments = []
    // get all the names of the variants
    for (let instrument in item.variants) {
        let instrumentJson = item.variants[instrument]
        let name = getInstrumentName(instrument);
        let variants = []
        for (let variantName in instrumentJson) {
            let variantJson = instrumentJson[variantName]
            let variant = {}
            variant.difficultyName = camelToTitleCase(variantName)
            variant.difficultyClass = getDifficultyClass(instrument, variantName)
            variant.difficulty = variantJson.difficulty ?? variant.difficultyName
            variant.intensity = variantJson.intensity ?? 0.0
            variant.nps = length != 0 ? Math.round((variantJson.notes / length) * 100) / 100 : "N/D"
            variants.push(variant)
        }
        // sort the variant list by intensity and difficulty class
        variants.sort((a, b) => {
            let difficultyClassCompare = a.difficultyClass - b.difficultyClass
            if (difficultyClassCompare != 0) return difficultyClassCompare // first, sort by difficulty class
            else return Number(a.intensity) - Number(b.intensity) // then, sort by intensity
        })
        instruments.push({name: name, variants: variants})
    }
    // now build the dialog
    // first, write the info of the chart
    const artist = item.featurings ? `${item.artist} ft. ${item.featurings.join(', ')}` : item.artist;
    const source = getSourceName(item.sourceCode);
    document.getElementById('chart-jacket').src = item.links?.jacket ?? "/assets/images/placeholder.jpg";
    document.getElementById('chart-jacket').alt = item.album ?? "Single";
    document.getElementById('chart-artist').textContent = artist ?? "Unknown artist";
    document.getElementById('chart-title').textContent = item.title ?? "Untitled";
    document.getElementById('chart-subtitle').textContent = item.subtitle ?? "";
    document.getElementById('chart-source').textContent = source ?? "";
    document.getElementById('chart-latest-update').textContent = getLatestUpdate(item.updates) ?? "";
    document.getElementById('chart-album-year-genre').textContent = `${item.album ?? "Single"}, ${item.year ?? "Unknown year"} - ${item.subgenre ?? "Unknown genre"}`;
    document.getElementById('chart-length-bpm').textContent = `${formatTime(item.length)} - ${displayBpmRange(item.bpmRange)} BPM`;
    document.getElementById('chart-description').textContent = getLoadPhrase(item.loadPhrases) ?? "No description. This is embarassing.";
    // then, write all the variants
    const chartVariants = document.getElementById('chart-variants')
    for (let i in instruments) {
        const instrument = instruments[i]
        const instrumentDiv = document.createElement('div')
        instrumentDiv.className = 'instrument'
        // create both the instrument name div and the variants div
        const instrumentNameDiv = document.createElement('div')
        const variantsDiv = document.createElement('div')
        instrumentNameDiv.className = 'instrument-name'
        variantsDiv.className = 'variants'
        instrumentNameDiv.textContent = instrument.name
        instrumentDiv.appendChild(instrumentNameDiv)
        instrumentDiv.appendChild(variantsDiv)
        
        for (let i in instrument.variants) {
            const variant = instrument.variants[i]
            const variantContainerDiv = document.createElement('div')
            variantContainerDiv.className = 'variant'
            // write the element for the NPS tooltip
            const variantSpan = document.createElement('span')
            variantSpan.className = `variant-difficulty difficulty-${variant.difficultyClass}`
            variantSpan.dataset.tooltip = `${variant.nps} NPS`
            // write the difficulty and intensity of the variant
            const difficultyNameSpan = document.createElement('span')
            difficultyNameSpan.className = 'variant-difficulty-name'
            difficultyNameSpan.dataset.difficulty = variant.difficultyName
            difficultyNameSpan.textContent = variant.difficulty
            const intensitySpan = document.createElement('span')
            intensitySpan.className = 'variant-intensity'
            intensitySpan.dataset.intensity = variant.intensity.toFixed(1)
            intensitySpan.innerHTML = getShortIntensity(variant.intensity)
            // add to the variant container
            variantSpan.appendChild(difficultyNameSpan)
            variantSpan.appendChild(intensitySpan)
            variantContainerDiv.appendChild(variantSpan)
            // add to the variants div
            variantsDiv.appendChild(variantContainerDiv)
        }
        
        chartVariants.appendChild(instrumentDiv)
    }
    // now load the buttons
    document.getElementById('chart-download').href = item.links?.download ?? ""
    const allLinks = [
        {id: "chart-listen-youtube", href: item.links?.youtube ?? null},
        {id: "chart-listen-soundcloud", href: item.links?.soundcloud ?? null},
        {id: "chart-listen-bandcamp", href: item.links?.bandcamp ?? null}
    ]
    const links = allLinks.filter(a => a.href !== null)
    // load all possible links
    let onlyOneLink = links.length == 1
    if (onlyOneLink) {
        let element = document.getElementById(links[0].id)
        element.classList.remove('button-hidden') // unhide the button
        element.href = links[0].href
    } else {
        for (let i in links) {
            let link = links[i]
            let element = document.getElementById(link.id)
            element.classList.remove('button-hidden') // unhide the button
            element.href = link.href
            // set the class for the button group to display
            if (i == 0) {
                element.classList.add('button-group-left')
            } else if (i == links.length - 1) {
                element.classList.add('button-group-right')
            } else {
                element.classList.add('button-group-middle')
            }
        }
    }
    // done, show the dialog as modal
    document.getElementById('map-detail-dialog').showModal();
}

function clearDialog(dialog) {
    // clear the chart variants part of the dialog
    document.getElementById('chart-variants').innerHTML = '';
    // reset the chart-listen button group
    for (let id of ['chart-listen-youtube', 'chart-listen-soundcloud', 'chart-listen-bandcamp']) {
        let element = document.getElementById(id)
        element.classList.add('button-hidden')
        element.classList.remove('button-group-left')
        element.classList.remove('button-group-middle')
        element.classList.remove('button-group-right')
    }
}

// when clicking on a map card, open thee dialog for that specific card
document.getElementById('map-list-container').addEventListener('click', (e) => {
    const card = e.target.closest('.map-card');
    if (!card) return;
    const item = filteredItems[card.dataset.index];
    openDialog(item);
});

// close the dialog by clicking on the X button or clicking outside the dialog
document.getElementById('close-dialog').addEventListener('click', () => {
    const dialog = document.getElementById('map-detail-dialog');
    dialog.close();
    clearDialog(dialog);
});

document.getElementById('map-detail-dialog').addEventListener('click', (e) => {
    const dialog = e.currentTarget;
    const rect = dialog.getBoundingClientRect();
    const clickedOutside = 
        e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;

    if (clickedOutside) {
        dialog.close();
        clearDialog(dialog);
    }
});

async function load() {
    // load charts
    await loadCharts();
    // load filters
    loadFilters();
    // filter charts and render them
    renderFilteredList(currentItems);
}

// when the content is ready, load all the charts
document.addEventListener('DOMContentLoaded', load);

// render the list again when the search filter changes
document.getElementById('filter-search').addEventListener('input', applySearchFilter);
document.getElementById('filter-source').addEventListener('change', applySourceFilter);
document.getElementById('filter-instrument').addEventListener('change', applyInstrumentFilter);
document.getElementById('filter-difficulty').addEventListener('change', applyDifficultyFilter);
