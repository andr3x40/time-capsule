let theme = null;

// get the theme
try {
    theme = localStorage.getItem('theme');
} catch (e) { /* do nothing if there's no theme saved in the local storage or there's no local storage to use */ }

if (!theme) {
    // check if the user prefers dark mode
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
// set the theme of the website
document.documentElement.setAttribute('data-theme', theme);