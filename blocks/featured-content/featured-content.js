export default function decorate(block) {
  // YouTube links are already handled by the youtube auto-block
  // which replaces <a> with <div class="video"> containing a lazy iframe.
  // We just need to decorate the row/column structure for styling.

  const rows = block.querySelectorAll(':scope > div');
  rows.forEach((row) => {
    row.classList.add('featured-content-row');
    const cols = row.querySelectorAll(':scope > div');
    cols.forEach((col) => {
      col.classList.add('featured-content-col');
      // Video column: youtube auto-block creates .video div
      if (col.querySelector('.video') || col.querySelector('iframe')) {
        col.classList.add('featured-content-video-col');
      }
      // Image column
      if (col.querySelector('img, picture')) {
        col.classList.add('featured-content-image-col');
      }
    });
  });
}
