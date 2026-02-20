function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

export default async function decorate(block) {
  // Build tab navigation
  const tabList = document.createElement('div');
  tabList.className = 'tabs-list';
  tabList.setAttribute('role', 'tablist');

  // Build tab panels container
  const tabPanels = document.createElement('div');
  tabPanels.className = 'tabs-panels';

  const tabs = [...block.children].map((child, idx) => {
    const id = `tab-${idx}`;
    const cols = [...child.children];

    // First column is tab label
    const labelCol = cols[0];
    const label = labelCol.textContent.trim();

    // Second column is tab content
    const contentCol = cols[1];

    // Create tab button
    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.id = `${id}-tab`;
    button.innerHTML = label;
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `${id}-panel`);
    button.setAttribute('aria-selected', idx === 0);
    tabList.append(button);

    // Create tab panel
    const panel = document.createElement('div');
    panel.className = 'tabs-panel';
    panel.id = `${id}-panel`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `${id}-tab`);
    panel.hidden = idx !== 0;

    // Move content to panel
    if (contentCol) {
      if (!hasWrapper(contentCol)) {
        panel.innerHTML = contentCol.innerHTML;
      } else {
        while (contentCol.firstElementChild) {
          panel.append(contentCol.firstElementChild);
        }
      }
    }

    tabPanels.append(panel);

    return { button, panel };
  });

  // Add click handlers
  tabs.forEach(({ button, panel }) => {
    button.addEventListener('click', () => {
      tabs.forEach(({ button: btn, panel: pnl }) => {
        btn.setAttribute('aria-selected', false);
        pnl.hidden = true;
      });
      button.setAttribute('aria-selected', true);
      panel.hidden = false;
    });
  });

  // Clear block and add new structure
  block.innerHTML = '';
  block.append(tabList, tabPanels);
}
