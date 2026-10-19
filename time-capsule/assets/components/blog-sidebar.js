class BlogSidebar extends HTMLElement {
    connectedCallback() {
        // load inside a template to not render it
        const template = document.createElement('template');
        template.innerHTML = `
            <section class="sidebar">
                <button class="button-rss" onclick="getRssFeedLink('rss-link-text', 'https://andr3x40.neocities.org/feeds/blog.xml')"><img src="https://upload.wikimedia.org/wikipedia/en/4/43/Feed-icon.svg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original" height="12px"/> <span id="rss-link-text">Subscribe</span></button>
                <h4 class="sidebar-header">September 2026</h4>
                <a href="/blog/2026-09/20">Doing a Blog in 2026</a>
            </section>
        `;
        // replace the component
        this.replaceWith(template.content.firstElementChild);
    }
}

customElements.define('tc-blog-sidebar', BlogSidebar);