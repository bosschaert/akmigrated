export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  // Build tab data from rows: each row has [tab-label, tab-content]
  const tabs = rows.map((row, idx) => {
    const cols = [...row.children];
    const label = cols[0]?.textContent?.trim() || `Tab ${idx + 1}`;
    const content = cols[1] || document.createElement('div');
    return { label, content, row };
  });

  // Create tab list
  const tabList = document.createElement('div');
  tabList.className = 'tab-list';
  tabList.setAttribute('role', 'tablist');

  // Create tab panels container
  const panelsContainer = document.createElement('div');
  panelsContainer.className = 'tab-panels';

  tabs.forEach(({ label, content }, idx) => {
    // Create tab button
    const btn = document.createElement('button');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
    btn.id = `team-tab-${idx}`;
    btn.setAttribute('aria-controls', `team-panel-${idx}`);
    btn.textContent = label;
    if (idx === 0) btn.classList.add('active');
    tabList.append(btn);

    // Create tab panel
    const panel = document.createElement('div');
    panel.setAttribute('role', 'tabpanel');
    panel.id = `team-panel-${idx}`;
    panel.setAttribute('aria-labelledby', `team-tab-${idx}`);
    panel.className = 'tab-panel';
    if (idx === 0) panel.classList.add('active');

    // Move content into panel — wrap each pair of (picture/img + heading + paragraph) as a card
    const children = [...content.children];
    const cards = [];
    let currentCard = null;

    children.forEach((child) => {
      const tag = child.tagName?.toLowerCase();
      // Start a new card on each picture or img element
      if (tag === 'picture' || tag === 'img' || (tag === 'p' && child.querySelector('picture, img'))) {
        currentCard = document.createElement('div');
        currentCard.className = 'team-card';
        cards.push(currentCard);
        currentCard.append(child);
      } else if (currentCard) {
        currentCard.append(child);
      } else {
        // Content before any image — just append directly
        currentCard = document.createElement('div');
        currentCard.className = 'team-card';
        cards.push(currentCard);
        currentCard.append(child);
      }
    });

    cards.forEach((card) => panel.append(card));
    panelsContainer.append(panel);
  });

  // Click handler for tabs
  tabList.addEventListener('click', (e) => {
    const btn = e.target.closest('button[role="tab"]');
    if (!btn) return;

    tabList.querySelectorAll('button').forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    panelsContainer.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
    const panelId = btn.getAttribute('aria-controls');
    const targetPanel = panelsContainer.querySelector(`#${panelId}`);
    if (targetPanel) targetPanel.classList.add('active');
  });

  // Replace block contents
  block.textContent = '';
  block.append(tabList, panelsContainer);
}
