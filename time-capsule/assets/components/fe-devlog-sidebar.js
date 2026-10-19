class FEDevlogSidebar extends HTMLElement {
    connectedCallback() {
        // load inside a template to not render it
        const template = document.createElement('template');
        template.innerHTML = `
            <section class="sidebar">
                <button class="button-rss" onclick="getRssFeedLink('rss-link-text', 'https://andr3x40.neocities.org/feeds/fe-devlog.xml')"><img src="https://upload.wikimedia.org/wikipedia/en/4/43/Feed-icon.svg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original" height="12px"/> <span id="rss-link-text">Subscribe</span></button>
                <h4>Version 0.10</h4>
                <a href="/devlogs/flame-editor/2026-08/27">Recap</a>
            </section>
        `;
        // replace the component
        this.replaceWith(template.content.firstElementChild);
    }
}

customElements.define('tc-fe-devlog-sidebar', FEDevlogSidebar);