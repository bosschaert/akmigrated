export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    row.classList.add('hero-media-row');
    const cols = [...row.children];

    cols.forEach((col, index) => {
      col.classList.add('hero-media-col');
      col.classList.add(`hero-media-col-${index + 1}`);

      // Handle YouTube links - convert to embedded iframe
      const youtubeLink = col.querySelector('a[href*="youtube.com"], a[href*="youtu.be"]');
      if (youtubeLink) {
        const href = youtubeLink.href;
        let videoId = '';

        // Extract video ID from various YouTube URL formats
        if (href.includes('youtube.com/watch')) {
          const url = new URL(href);
          videoId = url.searchParams.get('v');
        } else if (href.includes('youtu.be/')) {
          videoId = href.split('youtu.be/')[1]?.split('?')[0];
        } else if (href.includes('youtube.com/embed/')) {
          videoId = href.split('youtube.com/embed/')[1]?.split('?')[0];
        }

        if (videoId) {
          const videoWrapper = document.createElement('div');
          videoWrapper.className = 'hero-media-video';

          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0`;
          iframe.setAttribute('title', 'YouTube video');
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
          iframe.setAttribute('allowfullscreen', '');

          videoWrapper.appendChild(iframe);
          col.innerHTML = '';
          col.appendChild(videoWrapper);
        }
      }

      // Handle images
      const img = col.querySelector('img');
      if (img && !col.querySelector('.hero-media-video')) {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'hero-media-image';
        const picture = col.querySelector('picture') || img.parentElement;
        if (picture.tagName === 'PICTURE') {
          imgWrapper.appendChild(picture);
        } else {
          imgWrapper.appendChild(img);
        }
        col.innerHTML = '';
        col.appendChild(imgWrapper);
      }
    });
  });
}
