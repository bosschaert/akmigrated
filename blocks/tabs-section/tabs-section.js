export default function decorate(block) {
  // Create tabs container
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'tabs-container';

  // Create tab buttons container
  const tabButtons = document.createElement('div');
  tabButtons.className = 'tab-buttons';

  // Create tab content container
  const tabContents = document.createElement('div');
  tabContents.className = 'tab-contents';

  // Get all rows (each row = one tab)
  const rows = [...block.children];

  rows.forEach((row, index) => {
    const cols = [...row.children];
    if (cols.length < 2) return;

    // First column is tab label
    const tabLabel = cols[0].textContent.trim();

    // Second column contains the team cards
    const tabContent = cols[1];

    // Create tab button
    const button = document.createElement('button');
    button.className = index === 0 ? 'tab-button active' : 'tab-button';
    button.textContent = tabLabel;
    button.setAttribute('data-tab', index);
    button.addEventListener('click', () => {
      // Remove active from all buttons and contents
      tabButtons.querySelectorAll('.tab-button').forEach((btn) => btn.classList.remove('active'));
      tabContents.querySelectorAll('.tab-content').forEach((content) => content.classList.remove('active'));

      // Add active to clicked button and corresponding content
      button.classList.add('active');
      tabContents.children[index].classList.add('active');
    });
    tabButtons.appendChild(button);

    // Create tab content panel
    const contentPanel = document.createElement('div');
    contentPanel.className = index === 0 ? 'tab-content active' : 'tab-content';

    // Create cards container for this tab
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'team-cards';

    // Parse team cards from the content
    const cardDivs = [...tabContent.querySelectorAll(':scope > div')];
    cardDivs.forEach((cardDiv) => {
      const card = document.createElement('div');
      card.className = 'team-card';

      const cardCols = [...cardDiv.children];
      if (cardCols.length >= 2) {
        // First column: image
        const imgCol = cardCols[0];
        const img = imgCol.querySelector('img');
        if (img) {
          const imgWrapper = document.createElement('div');
          imgWrapper.className = 'card-image';
          imgWrapper.appendChild(img.cloneNode(true));
          card.appendChild(imgWrapper);
        }

        // Second column: name and description
        const textCol = cardCols[1];
        const textWrapper = document.createElement('div');
        textWrapper.className = 'card-text';

        const heading = textCol.querySelector('h4, h3, h2, p strong');
        if (heading) {
          const name = document.createElement('h4');
          name.textContent = heading.textContent;
          textWrapper.appendChild(name);
        }

        const paragraphs = textCol.querySelectorAll('p');
        paragraphs.forEach((p) => {
          if (!p.querySelector('strong') || paragraphs.length > 1) {
            const desc = document.createElement('p');
            desc.textContent = p.textContent;
            textWrapper.appendChild(desc);
          }
        });

        card.appendChild(textWrapper);
      }

      cardsContainer.appendChild(card);
    });

    contentPanel.appendChild(cardsContainer);
    tabContents.appendChild(contentPanel);
  });

  tabsContainer.appendChild(tabButtons);
  tabsContainer.appendChild(tabContents);

  // Clear block and add new structure
  block.textContent = '';
  block.appendChild(tabsContainer);
}
