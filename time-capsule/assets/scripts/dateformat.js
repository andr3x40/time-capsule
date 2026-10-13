document.querySelectorAll('.date').forEach(el => {
    // parse the element
    const day = parseInt(el.dataset.d, 10);
    const month = parseInt(el.dataset.m, 10) - 1;
    const year = parseInt(el.dataset.y, 10);
    
    const date = new Date(year, month, day);
    
    el.textContent = date.toLocaleDateString();
    
    el.removeAttribute('data-d');
    el.removeAttribute('data-m');
    el.removeAttribute('data-y');
});