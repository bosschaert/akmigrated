/**
 * Video and Image Grid Block
 * Displays a grid of videos (YouTube embeds) and images side by side
 */

export default function decorate(block) {
  // Get all rows in the block
  const rows = [...block.children];

  rows.forEach((row) => {
    row.classList.add('video-and-image-grid-row');

    // Process each cell in the row
    [...row.children].forEach((cell) => {
      cell.classList.add('video-and-image-grid-cell');

      // Check for video links (YouTube)
      const videoLink = cell.querySelector('a[href*="youtube.com"], a[href*="youtu.be"]');
      if (videoLink) {
        const videoUrl = videoLink.href;
        let videoId = '';

        // Extract video ID from various YouTube URL formats
        if (videoUrl.includes('youtube.com/watch')) {
          const urlParams = new URLSearchParams(new URL(videoUrl).search);
          videoId = urlParams.get('v');
        } else if (videoUrl.includes('youtu.be/')) {
          videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        } else if (videoUrl.includes('youtube.com/embed/')) {
          videoId = videoUrl.split('youtube.com/embed/')[1].split('?')[0];
        }

        if (videoId) {
          // Create responsive video wrapper
          const videoWrapper = document.createElement('div');
          videoWrapper.classList.add('video-wrapper');

          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${videoId}`;
          iframe.title = 'YouTube video';
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
          iframe.setAttribute('allowfullscreen', '');
          iframe.setAttribute('loading', 'lazy');

          videoWrapper.appendChild(iframe);
          cell.innerHTML = '';
          cell.appendChild(videoWrapper);
          cell.classList.add('video-cell');
        }
      }

      // Check for images
      const picture = cell.querySelector('picture');
      if (picture) {
        cell.classList.add('image-cell');
        const img = picture.querySelector('img');
        if (img) {
          img.setAttribute('loading', 'lazy');
        }
      }
    });
  });
}
