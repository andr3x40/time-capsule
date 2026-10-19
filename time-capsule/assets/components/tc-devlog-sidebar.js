class TCDevlogSidebar extends HTMLElement {
    connectedCallback() {
        // load inside a template to not render it
        const template = document.createElement('template');
        template.innerHTML = `
            <section class="sidebar">
                <button class="button-rss" onclick="getRssFeedLink('rss-link-text', 'https://andr3x40.neocities.org/feeds/tc-devlog.xml')"><img src="https://upload.wikimedia.org/wikipedia/en/4/43/Feed-icon.svg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original" height="12px"/> <span id="rss-link-text">Subscribe</span></button>
                <h4>Version 1</h4>
                <a href="/devlogs/time-capsule/2026-10/18">RSS is Really Simple</a>
                <a href="/devlogs/time-capsule/2026-10/13">GitHub Integration</a>
                <a href="/devlogs/time-capsule/2026-10/08">Implementing Aero</a>
                <a href="/devlogs/time-capsule/2026-09/18">Understanding Aero</a>
                <a href="/devlogs/time-capsule/2026-09/13">Static &amp; Dynamic</a>
                <a href="/devlogs/time-capsule/2026-08/26">Basics</a>
            </section>
        `;
        // replace the component
        this.replaceWith(template.content.firstElementChild);
    }
}

customElements.define('tc-tc-devlog-sidebar', TCDevlogSidebar);