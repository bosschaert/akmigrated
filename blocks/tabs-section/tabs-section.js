/**
 * Tabs Section Block
 * A tabbed interface with team member cards
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // First row contains tab labels (comma-separated or in separate cells)
  const tabLabelsRow = rows[0];
  const tabLabels = [];

  // Get tab labels from the first row
  const labelCells = [...tabLabelsRow.children];
  labelCells.forEach((cell) => {
    const text = cell.textContent.trim();
    if (text) {
      tabLabels.push(text);
    }
  });

  // Create tab buttons container
  const tabButtons = document.createElement('div');
  tabButtons.className = 'tabs-section-buttons';

  tabLabels.forEach((label, idx) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = idx === 0 ? 'active' : '';
    btn.setAttribute('data-tab-index', idx);
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      tabButtons.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Hide all content panels, show the selected one
      block.querySelectorAll('.tabs-section-content').forEach((panel, panelIdx) => {
        panel.classList.toggle('active', panelIdx === idx);
      });
    });
    tabButtons.appendChild(btn);
  });

  // Remove the labels row
  tabLabelsRow.remove();

  // Process remaining rows as tab content
  const contentRows = [...block.children];
  contentRows.forEach((row, idx) => {
    row.className = `tabs-section-content${idx === 0 ? ' active' : ''}`;

    // Process each card within the row
    const cards = [...row.children];
    cards.forEach((card) => {
      card.className = 'team-card';

      // Find and process the image
      const img = card.querySelector('img');
      if (img) {
        img.className = 'team-card-image';
        // Wrap image in a container if not already
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'team-card-image-wrapper';
        img.parentNode.insertBefore(imgWrapper, img);
        imgWrapper.appendChild(img);
      }

      // Find and process heading (name)
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        heading.className = 'team-card-name';
      }

      // Find and process paragraph (description)
      const para = card.querySelector('p');
      if (para) {
        para.className = 'team-card-description';
      }
    });
  });

  // Insert tab buttons at the beginning
  block.insertBefore(tabButtons, block.firstChild);
}
