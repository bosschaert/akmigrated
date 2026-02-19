export default function decorate(block) {
  // Get all rows and convert to columns layout
  const rows = [...block.children];

  // For each row, set up the columns
  rows.forEach((row) => {
    row.classList.add('image-grid-row');
    const cols = [...row.children];
    cols.forEach((col) => {
      col.classList.add('image-grid-col');
      // Find images and add styling class
      const img = col.querySelector('img');
      if (img) {
        img.classList.add('image-grid-img');
      }
    });
  });
}
