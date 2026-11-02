const tag = new URLSearchParams(location.search).get("tag");

fetch("/feeds/blog.xml")
    .then(r => r.text())
    .then(text => {
      const xml = new DOMParser().parseFromString(text, "application/xml")

      const posts = [...xml.querySelectorAll("entry")].map(entry => ({
        title: entry.querySelector("title").textContent,
        url: entry.querySelector("link").getAttribute("href"),
        published: new Date(entry.querySelector("published").textContent),
        tags: [...entry.querySelectorAll("category")].map(c => c.getAttribute("term")),
        summary: entry.querySelector("summary").textContent
      }))

      const filtered = tag ? posts.filter(p => p.tags.includes(tag)) : posts

      document.getElementById("post-container").innerHTML = filtered
        .map(post => `<article class="post">
                        <div class="post-header">
                          <h2 class="title">${post.title}</h2>
                          <span class="date">${post.published.toLocaleDateString()}</span>
                        </div>
                        <div class="post-content">
                          <p>${post.summary}</p>
                          <p class="post-bottom">
                            <a href="${post.url}" class="button button-accent">Read more</a>${post.tags.map(tag => `<a href="/blog?tag=${encodeURIComponent(tag)}" class="chip">${tag}</a>`).join("")}
                          </p>
                        </div>
                      </article>`)
        .join("")
    });

