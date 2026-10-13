class Navbar extends HTMLElement {
    connectedCallback() {
        // load inside a template to not render it
        const template = document.createElement('template');
        template.innerHTML = `
            <nav class="navbar">
                <a class="home" href="/">Home</a>
                <div class="link-bar">
                    <div class="left-bar">
                        <a href="/blog">Blog</a>
                        <a href="/devlogs">Devlogs</a>
                        <a href="/projects">Projects</a>
                        <a href="/music">Music</a>
                        <a href="/whoami">About Me</a>
                    </div>
                    <div class="right-bar">
                        <select id="theme-select" class="select-box">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                        <span id="cet-time" class="cet-time with-tooltip" data-tooltip="My local time (Rome)">${getRomeTime()}</span>
                    </div>
                </div>
            </nav>
        `;
        // replace the component
        this.replaceWith(template.content.firstElementChild);
    }
}

function getRomeTime() {
    // calculate the time in Rome
    return new Date().toLocaleDateString(undefined, {
        timeZone: "Europe/Rome",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
    });
}

customElements.define('tc-navbar', Navbar);

// on content loaded, start updating the navbar
window.addEventListener("DOMContentLoaded", ev => {
    var time = document.getElementById('cet-time');
    setInterval(() => {
        time.innerHTML = getRomeTime(); // update
    }, 10000);
})