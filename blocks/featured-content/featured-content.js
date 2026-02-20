function decorateCols(cols) {
  for (const [idx, col] of cols.entries()) {
    col.classList.add('col', `col-${idx + 1}`);

    // Check if column contains only an iframe or a picture — mark as media
    const children = [...col.children];
    const hasIframe = col.querySelector('iframe');
    const hasPicture = children.length === 1 && children[0].nodeName === 'PICTURE';
    if (hasIframe) col.classList.add('media-video');
    if (hasPicture) col.classList.add('media-image');
  }
}

function decorateRows(rows) {
  for (const [idx, row] of rows.entries()) {
    row.classList.add('row', `row-${idx + 1}`);
    const cols = [...row.children];
    row.style = `--child-count: ${cols.length}`;
    decorateCols(cols);
  }
}

export default function init(el) {
  const rows = [...el.children];
  decorateRows(rows);

  // Make iframes responsive
  el.querySelectorAll('iframe').forEach((iframe) => {
    iframe.setAttribute('loading', 'lazy');
    const wrapper = document.createElement('div');
    wrapper.className = 'iframe-wrapper';
    iframe.parentElement.insertBefore(wrapper, iframe);
    wrapper.append(iframe);
  });
}
