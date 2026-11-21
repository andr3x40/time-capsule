const mix = document.getElementById('music-dex-module-info');
const collection = document.getElementById('music-dex-collection-info');

function reset() {
    mix.innerHTML = '<span class="dex-info-title">NO MODULE SELECTED</span><br>Hover on a module box to view its info.'
}

function change(element, text) {
    element.innerHTML = text
}

// modules
document.getElementById('m001')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 001 - ELECTRONIC LIGHT MIX</span><br>100% certified electronic bangers, light and groovy'));
document.getElementById('m002')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 002 - ELECTRONIC HEAVY MIX</span><br>100% certified electronic bangers that go damn hard on those amplifiers'));
document.getElementById('m006')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 006 - METAL MIX</span><br>100% certified metal bangers at temperatures between 166 and 666 °C'));
document.getElementById('m011')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 011 - CHILL MIX</span><br>chill beats to relax/study to'));
document.getElementById('m016')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 016 - CHIPTUNE MIX</span><br>why is that vintage device making music'));
document.getElementById('m039')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 039 - VOCALOID/VOICESYNTH MIX</span><br>the future we were promised'));
document.getElementById('m040')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 040 - GOLDEN PICKS</span><br>big favourites of mine, carefully picked'));
document.getElementById('m051')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 051 - ELECTRO SWING MIX</span><br>here we go with the groove'));
document.getElementById('m069')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 069 - SHITPOST MIX</span><br>stupid mixes made for sh-ts & giggles'));
document.getElementById('m070')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 070 - BROADCAST MIX</span><br>music I can put live on Twitch without consequences*'));
document.getElementById('m085')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 085 - SYNTHWAVE MIX</span><br>modern stuff made with retro electronic components'));
document.getElementById('m174')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 174 - DNB MIX</span><br>we go fast with these'));
document.getElementById('m727')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 727 - RHYTHM BLACKMIX</span><br>insane tunes from insane rhythm games'));

// collections
document.getElementById('m104')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 104 - FUCKYOURCLIQUE COLLECTION</span><br>sono pazzo nico'));
document.getElementById('m385')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 385 - NINAJIRACHI COLLECTION</span><br>peak girl edm/glitchcore from australia'));
document.getElementById('m418')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 418 - C418 COLLECTION</span><br>nostalgia-driven sounds'));
document.getElementById('m486')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 486 - MASTER BOOT RECORD COLLECTION</span><br>New Wave Of Synthesized Heavy Metal'));
document.getElementById('m709')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 709 - CAPAREZZA COLLECTION</span><br>freedom'));
document.getElementById('m909')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 909 - DAFT PUNK COLLECTION</span><br>human/robot'));

// recollections
document.getElementById('m1064')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 1064 - FH6 HORIZON XS RECOLLECTION</span><br>metal bangers from a virtual car festival'));
document.getElementById('m1066')?.addEventListener('mouseenter', (e) => change(mix, '<span class="dex-info-title">MODULE 1066 - FH6 GACHA CITY RADIO RECOLLECTION</span><br>japanese songs from a virtual car festival (I\'ve become everything I once hated)'));

// resets
let entries = document.getElementsByClassName('music-dex-entry')
for (let entry of entries) {
    entry.addEventListener('mouseleave', (e) => reset())
}