/**
 * News Cards Block
 * Displays a grid of news article cards with images, titles, descriptions, and dates
 * Migrated from skerriessailingclub.com
 */

export default function decorate(block) {
  // Get all rows from the block
  const rows = [...block.children];

  // Clear the block
  block.textContent = '';

  // Create header section (first row contains header info)
  const headerRow = rows.shift();
  if (headerRow) {
    const headerDiv = document.createElement('div');
    headerDiv.className = 'news-cards-header';

    // Extract header title
    const headerTitle = headerRow.querySelector('h2, h3, p');
    if (headerTitle) {
      const h2 = document.createElement('h2');
      h2.textContent = headerTitle.textContent;
      headerDiv.appendChild(h2);
    }

    // Add icon placeholder
    const iconSpan = document.createElement('span');
    iconSpan.className = 'header-icon';
    iconSpan.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>';
    headerDiv.appendChild(iconSpan);

    block.appendChild(headerDiv);
  }

  // Create cards grid
  const gridDiv = document.createElement('div');
  gridDiv.className = 'news-cards-grid';

  // Process remaining rows as cards
  let moreLink = null;

  rows.forEach((row) => {
    const cols = [...row.children];

    // Check if this is a "more" link row (single column with just a link)
    if (cols.length === 1) {
      const link = cols[0].querySelector('a');
      if (link && !cols[0].querySelector('picture, img')) {
        moreLink = link;
        return;
      }
    }

    // Create card element
    const card = document.createElement('div');
    card.className = 'news-card';

    // Find image column
    const imgCol = cols.find((col) => col.querySelector('picture, img'));
    if (imgCol) {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'news-card-image';

      const picture = imgCol.querySelector('picture');
      const img = imgCol.querySelector('img');
      const imgLink = imgCol.querySelector('a');

      if (imgLink) {
        const link = document.createElement('a');
        link.href = imgLink.href;
        if (picture) {
          link.appendChild(picture.cloneNode(true));
        } else if (img) {
          link.appendChild(img.cloneNode(true));
        }
        imageDiv.appendChild(link);
      } else if (picture) {
        imageDiv.appendChild(picture.cloneNode(true));
      } else if (img) {
        imageDiv.appendChild(img.cloneNode(true));
      }

      card.appendChild(imageDiv);
    }

    // Find content column
    const contentCol = cols.find((col) => col.querySelector('h2, h3, h4, p') && !col.querySelector('picture'));
    if (!contentCol && cols.length > 1) {
      // If no dedicated content column, use the second column
      const secondCol = cols[1];
      if (secondCol) {
        processContentColumn(secondCol, card);
      }
    } else if (contentCol) {
      processContentColumn(contentCol, card);
    }

    gridDiv.appendChild(card);
  });

  block.appendChild(gridDiv);

  // Add "More" button if found
  if (moreLink) {
    const moreDiv = document.createElement('div');
    moreDiv.className = 'news-cards-more';
    const link = document.createElement('a');
    link.href = moreLink.href;
    link.textContent = moreLink.textContent || 'More';
    moreDiv.appendChild(link);
    block.appendChild(moreDiv);
  }
}

/**
 * Process content column and extract title, description, and date
 */
function processContentColumn(col, card) {
  const contentDiv = document.createElement('div');
  contentDiv.className = 'news-card-content';

  // Extract title (h2, h3, or h4)
  const heading = col.querySelector('h2, h3, h4');
  if (heading) {
    const h3 = document.createElement('h3');
    const link = heading.querySelector('a');
    if (link) {
      const titleLink = document.createElement('a');
      titleLink.href = link.href;
      titleLink.textContent = link.textContent;
      h3.appendChild(titleLink);
    } else {
      h3.textContent = heading.textContent;
    }
    contentDiv.appendChild(h3);
  }

  // Extract paragraphs (description and date)
  const paragraphs = col.querySelectorAll('p');
  paragraphs.forEach((p) => {
    // Check if this is a date paragraph (has date class or small text)
    if (p.classList.contains('published_at') || p.classList.contains('date')) {
      const dateP = document.createElement('p');
      dateP.className = 'published-date';
      dateP.textContent = p.textContent;
      contentDiv.appendChild(dateP);
    } else {
      // Description paragraph
      const descP = document.createElement('p');

      // Process content - separate description from "More" link
      const clone = p.cloneNode(true);
      const moreLink = clone.querySelector('a');

      if (moreLink && moreLink.textContent.toLowerCase().includes('more')) {
        // Remove the more link from description
        moreLink.remove();
        descP.textContent = clone.textContent.trim();
        contentDiv.appendChild(descP);

        // Add more link separately
        const moreLinkEl = document.createElement('a');
        moreLinkEl.className = 'more-link';
        moreLinkEl.href = moreLink.href;
        moreLinkEl.textContent = 'More »';
        contentDiv.appendChild(moreLinkEl);
      } else {
        descP.innerHTML = p.innerHTML;
        contentDiv.appendChild(descP);
      }
    }
  });

  card.appendChild(contentDiv);
}
