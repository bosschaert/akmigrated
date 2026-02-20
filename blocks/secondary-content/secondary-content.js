export default function decorate(block) {
  const cols = [...block.children];
  cols.forEach((col) => {
    col.classList.add('secondary-content-row');
    [...col.children].forEach((cell) => {
      cell.classList.add('secondary-content-col');
    });
  });
}
