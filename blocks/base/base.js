export default async function decorate(block) {
  // The block contains rows with columns
  // Expected structure: one row with two columns (copyright | powered-by)
  const rows = [...block.querySelectorAll(':scope > div')];

  if (rows.length > 0) {
    const row = rows[0];
    row.classList.add('base-inner');

    const columns = [...row.querySelectorAll(':scope > div')];
    if (columns.length >= 1) {
      columns[0].classList.add('base-credit');
    }
    if (columns.length >= 2) {
      columns[1].classList.add('base-powered');
    }
  }
}
