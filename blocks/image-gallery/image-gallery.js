export default function decorate(block) {
  // Get all rows in the block
  const rows = [...block.children];

  // Process each row as a gallery row
  rows.forEach((row) => {
    row.classList.add('image-gallery-row');

    // Process each cell as a gallery item
    const cells = [...row.children];
    cells.forEach((cell) => {
      cell.classList.add('image-gallery-item');

      // Find and process images
      const img = cell.querySelector('img');
      if (img) {
        img.classList.add('image-gallery-image');
      }
    });
  });
}
