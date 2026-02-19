/**
 * Video and Image Grid Block
 * Displays video and images in a responsive grid layout
 */

function processCell(cell) {
  const wrapper = document.createElement('div');
  wrapper.className = 'video-image-grid-cell';

  // Check for auto-processed video div (from youtube linkBlock)
  const videoDiv = cell.querySelector('.video[data-src]');
  if (videoDiv) {
    wrapper.classList.add('video-image-grid-video-cell');
    // Create iframe directly since observer may not trigger in our context
    const src = videoDiv.dataset.src;
    if (src) {
      videoDiv.innerHTML = `<iframe src="${src}" class="youtube"
        webkitallowfullscreen mozallowfullscreen allowfullscreen
        allow="encrypted-media; accelerometer; gyroscope; picture-in-picture"
        scrolling="no"
        title="YouTube Video"></iframe>`;
    }
    wrapper.appendChild(videoDiv);
    return wrapper;
  }

  // Check for YouTube link (fallback if not auto-processed)
  const link = cell.querySelector('a[href*="youtube.com"], a[href*="youtu.be"]');
  if (link) {
    wrapper.classList.add('video-image-grid-video-cell');
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'video';

    // Extract video ID
    let videoId = '';
    try {
      const urlObj = new URL(link.href);
      videoId = urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
    } catch (e) {
      const match = link.href.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/);
      if (match) videoId = match[1];
    }

    if (videoId) {
      videoWrapper.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0"
        class="youtube"
        webkitallowfullscreen mozallowfullscreen allowfullscreen
        allow="encrypted-media; accelerometer; gyroscope; picture-in-picture"
        scrolling="no"
        title="YouTube Video"></iframe>`;
    }
    wrapper.appendChild(videoWrapper);
    return wrapper;
  }

  // Check for picture/image
  const picture = cell.querySelector('picture');
  if (picture) {
    wrapper.classList.add('video-image-grid-image');
    wrapper.appendChild(picture.cloneNode(true));
    return wrapper;
  }

  // Check for img without picture wrapper
  const img = cell.querySelector('img');
  if (img) {
    wrapper.classList.add('video-image-grid-image');
    wrapper.appendChild(img.cloneNode(true));
    return wrapper;
  }

  // Default: keep original content
  wrapper.innerHTML = cell.innerHTML;
  return wrapper;
}

export default function init(block) {
  const rows = [...block.children];
  const gridContainer = document.createElement('div');
  gridContainer.className = 'video-image-grid-container';

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const processedCell = processCell(cell);
      gridContainer.appendChild(processedCell);
    });
  });

  block.textContent = '';
  block.appendChild(gridContainer);
}
