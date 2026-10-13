// get the selector for changing the theme
const themeSelector = document.getElementById('theme-select');
themeSelector.value = document.documentElement.getAttribute('data-theme');

// update the theme when the selected value changes
themeSelector.addEventListener('change', () => {
    const theme = themeSelector.value;
    document.documentElement.setAttribute('data-theme', theme);

    try {
        localStorage.setItem('theme', theme);
    } catch (e) { /* do nothing: there's no local storage to use */ }
});