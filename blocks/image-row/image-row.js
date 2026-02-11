/**
 * Image Row Block
 * Displays a horizontal row of clickable thumbnail images
 *
 * Content structure (before decoration):
 * <div class="image-row">
 *   <div>
 *     <div><p><a href="link"><picture>...</picture></a></p></div>
 *     <div><p><a href="link"><picture>...</picture></a></p></div>
 *     ...
 *   </div>
 * </div>
 */
export default function init(el) {
  const row = el.querySelector(':scope > div');
  if (!row) return;

  row.classList.add('image-row-container');

  // Get all image columns
  const cols = [...row.children];
  cols.forEach((col, idx) => {
    col.classList.add('image-row-item', `item-${idx + 1}`);

    // Find the picture element
    const picture = col.querySelector('picture');
    if (picture) {
      picture.classList.add('image-row-picture');

      // Find the image
      const img = picture.querySelector('img');
      if (img) {
        img.classList.add('image-row-img');
      }
    }

    // Find the link wrapper
    const link = col.querySelector('a');
    if (link) {
      link.classList.add('image-row-link');
    }
  });

  // Store item count for CSS
  el.style.setProperty('--image-row-count', cols.length);
}
