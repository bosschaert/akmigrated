/**
 * Club Location Block
 * Displays an interactive weather/wind map using Windy.com embed
 */
export default function decorate(block) {
  // Get the link from the block content
  const link = block.querySelector('a');

  if (link) {
    const embedUrl = link.href;
    block.innerHTML = '';

    // Create the iframe container
    const container = document.createElement('div');
    container.className = 'club-location-container';

    // Create iframe for the embed
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.width = '100%';
    iframe.height = '450';
    iframe.frameBorder = '0';
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('title', 'Club Location Weather Map');

    container.appendChild(iframe);
    block.appendChild(container);
  }
}
