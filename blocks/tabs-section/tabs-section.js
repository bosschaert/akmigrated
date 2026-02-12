/**
 * Tabs Section Block
 * Creates a tabbed interface with team member cards
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  // Create tab buttons container
  const tabButtons = document.createElement('div');
  tabButtons.className = 'tab-buttons';

  // Create tab panels container
  const tabPanels = document.createElement('div');
  tabPanels.className = 'tab-panels';

  rows.forEach((row, index) => {
    const cols = [...row.children];
    if (cols.length < 2) return;

    // First column is the tab label
    const tabLabel = cols[0].textContent.trim();

    // Create tab button
    const button = document.createElement('button');
    button.textContent = tabLabel;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    button.setAttribute('aria-controls', `tabpanel-${index}`);
    button.id = `tab-${index}`;
    if (index === 0) button.classList.add('active');

    button.addEventListener('click', () => {
      // Deactivate all tabs
      tabButtons.querySelectorAll('button').forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      tabPanels.querySelectorAll('.tab-content').forEach((panel) => {
        panel.classList.remove('active');
      });

      // Activate clicked tab
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      const panel = tabPanels.querySelector(`#tabpanel-${index}`);
      if (panel) panel.classList.add('active');
    });

    tabButtons.appendChild(button);

    // Second column contains the tab content (team cards)
    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';
    tabContent.id = `tabpanel-${index}`;
    tabContent.setAttribute('role', 'tabpanel');
    tabContent.setAttribute('aria-labelledby', `tab-${index}`);
    if (index === 0) tabContent.classList.add('active');

    // Process the content - look for nested divs (card items)
    const contentCol = cols[1];
    const cardItems = [...contentCol.children];

    cardItems.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'team-card';

      // Find image (may be inside a picture or p tag)
      const img = item.querySelector('img');
      const heading = item.querySelector('h1, h2, h3, h4, h5, h6');

      // Find description paragraph - the one that doesn't contain an image
      const paragraphs = [...item.querySelectorAll('p')];
      const descParagraph = paragraphs.find((p) => !p.querySelector('img') && p.textContent.trim());

      if (img) {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'card-image';
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt || '';
        imgWrapper.appendChild(newImg);
        card.appendChild(imgWrapper);
      }

      if (heading) {
        const h4 = document.createElement('h4');
        h4.textContent = heading.textContent;
        card.appendChild(h4);
      }

      if (descParagraph) {
        const p = document.createElement('p');
        p.textContent = descParagraph.textContent;
        card.appendChild(p);
      }

      tabContent.appendChild(card);
    });

    tabPanels.appendChild(tabContent);
  });

  // Clear block and add new structure
  block.textContent = '';
  block.appendChild(tabButtons);
  block.appendChild(tabPanels);
}
