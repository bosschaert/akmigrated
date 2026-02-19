/**
 * Hero Media block - displays two media items side by side
 * Supports video (YouTube auto-embed via linkBlocks) and images in a two-column layout
 */
export default function init(el) {
  const rows = [...el.children];

  rows.forEach((row, rowIdx) => {
    row.classList.add('hero-media-row', `row-${rowIdx + 1}`);
    const cols = [...row.children];

    cols.forEach((col, colIdx) => {
      col.classList.add('hero-media-col', `col-${colIdx + 1}`);

      // Handle images
      const images = col.querySelectorAll('img');
      images.forEach((img) => {
        img.classList.add('hero-media-image');
      });

      // Handle video containers (created by youtube linkBlock)
      const videos = col.querySelectorAll('.video');
      videos.forEach((video) => {
        video.classList.add('hero-media-video');
      });
    });
  });
}
