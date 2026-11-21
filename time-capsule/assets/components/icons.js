class Disc3Icon extends HTMLElement {
    connectedCallback() {
        // load inside a template to not render it
        const template = document.createElement('template');
        template.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-disc-3 preview-icon"><circle cx="12" cy="12" r="10"/><path d="M6 12c0-1.7.7-3.2 1.8-4.2"/><circle cx="12" cy="12" r="2"/><path d="M18 12c0 1.7-.7 3.2-1.8 4.2"/></svg>`
    
        // replace the component
        this.replaceWith(template.content.firstElementChild);
    }
}

customElements.define('icon-disc3', Disc3Icon);