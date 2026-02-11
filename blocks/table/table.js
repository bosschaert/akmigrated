function decorateYouTubeLink(a) {
  const div = document.createElement('div');
  div.className = 'video';
  const params = new URLSearchParams(a.search);
  const id = params.get('v') || a.pathname.split('/').pop();
  params.append('rel', '0');
  params.delete('v');
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${params.toString()}`;

  // Create iframe immediately (no lazy loading)
  div.innerHTML = `<iframe src="${src}" class="youtube"
    webkitallowfullscreen mozallowfullscreen allowfullscreen
    allow="encrypted-media; accelerometer; gyroscope; picture-in-picture"
    scrolling="no"
    title="Youtube Video"></iframe>`;

  a.parentElement.replaceChild(div, a);
}

function isYouTubeLink(a) {
  return a.href && (a.href.includes('youtube.com') || a.href.includes('youtu.be'));
}

export default function init(el) {
  const tables = el.querySelectorAll('table');
  for (const table of tables) {
    let thead = table.querySelector('table > thead');
    const rows = [...table.querySelectorAll('tr')];

    if (!thead) {
      thead = document.createElement('thead');
      table.prepend(thead);

      const headingRow = rows.shift();
      if (headingRow) {
        thead.append(headingRow);
        const tds = headingRow.querySelectorAll(':scope > td');
        for (const td of tds) {
          const th = document.createElement('th');
          th.className = td.className;
          th.innerHTML = td.innerHTML;
          td.parentElement.replaceChild(th, td);
        }
      }
    }

    for (const row of rows) {
      row.classList.add('table-content-row');
    }

    // Handle YouTube links in table cells
    const youtubeLinks = table.querySelectorAll('a');
    youtubeLinks.forEach((link) => {
      if (isYouTubeLink(link)) {
        decorateYouTubeLink(link);
      }
    });
  }
}
