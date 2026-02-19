export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row, idx) => {
    row.classList.add('row', `row-${idx + 1}`);
    const cols = [...row.children];
    cols.forEach((col, colIdx) => {
      col.classList.add('col', `col-${colIdx + 1}`);

      // Check for video links and convert to embeds
      const links = col.querySelectorAll('a');
      links.forEach((link) => {
        const href = link.href;
        // YouTube URL patterns
        const youtubeMatch = href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
        if (youtubeMatch) {
          const videoId = youtubeMatch[1];
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${videoId}`;
          iframe.setAttribute('title', 'YouTube video');
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
          iframe.setAttribute('allowfullscreen', '');
          link.replaceWith(iframe);
        }
      });
    });
  });
}
