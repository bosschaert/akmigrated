export default function init(el) {
  const rows = [...el.children];
  for (const [idx, row] of rows.entries()) {
    row.classList.add('row', `row-${idx + 1}`);
    const cols = [...row.children];
    for (const [colIdx, col] of cols.entries()) {
      col.classList.add('col', `col-${colIdx + 1}`);
    }
  }
}
