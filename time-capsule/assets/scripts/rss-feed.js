async function getRssFeedLink(id, link) {
    const text = document.getElementById(id);
    try {
      await navigator.clipboard.writeText(link);
      text.textContent = "Link copied!";
    } catch (err) {
      text.textContent = "Couldn't copy link";
    }
    setTimeout(() => (text.textContent = "Subscribe"), 2000);
}