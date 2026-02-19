export default function init(el) {
  const rows = [...el.children];
  rows.forEach((row, idx) => {
    row.classList.add('image-pair-row', `row-${idx + 1}`);
    const cols = [...row.children];
    cols.forEach((col, colIdx) => {
      col.classList.add('image-pair-item', `item-${colIdx + 1}`);
    });
  });
}
