function decorateCell(cell, idx) {
  cell.classList.add('image-grid-cell', `cell-${idx + 1}`);

  // Check if cell contains a video (YouTube link or already-decorated video)
  const link = cell.querySelector('a[href*="youtube.com"], a[href*="youtu.be"]');
  const video = cell.querySelector('.video');
  if (link || video) {
    cell.classList.add('video-cell');
  }

  // Check if cell contains an image
  const picture = cell.querySelector('picture');
  if (picture) {
    cell.classList.add('image-cell');
  }
}

function decorateRow(row, idx) {
  row.classList.add('image-grid-row', `row-${idx + 1}`);
  const cells = [...row.children];
  row.style.setProperty('--cell-count', cells.length);
  cells.forEach((cell, cellIdx) => decorateCell(cell, cellIdx));
}

export default function init(el) {
  const rows = [...el.children];
  rows.forEach((row, idx) => decorateRow(row, idx));
}
