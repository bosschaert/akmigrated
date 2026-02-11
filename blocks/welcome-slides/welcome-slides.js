/**
 * Welcome Slides Block
 * A full-width image slideshow/carousel for hero images
 */

function updateActiveSlide(block, slideIndex) {
  const slides = block.querySelectorAll('.welcome-slides-slide');
  const indicators = block.querySelectorAll('.welcome-slides-indicator');

  slides.forEach((slide, idx) => {
    slide.setAttribute('aria-hidden', idx !== slideIndex);
    slide.classList.toggle('active', idx === slideIndex);
  });

  indicators.forEach((indicator, idx) => {
    indicator.classList.toggle('active', idx === slideIndex);
    indicator.setAttribute('aria-selected', idx === slideIndex);
  });
}

function showSlide(block, direction) {
  const slides = block.querySelectorAll('.welcome-slides-slide');
  const currentIndex = [...slides].findIndex((slide) => slide.classList.contains('active'));
  let newIndex = currentIndex + direction;

  if (newIndex < 0) newIndex = slides.length - 1;
  if (newIndex >= slides.length) newIndex = 0;

  updateActiveSlide(block, newIndex);
}

function startAutoPlay(block, interval = 5000) {
  return setInterval(() => showSlide(block, 1), interval);
}

function createSlide(row, idx, totalSlides) {
  const slide = document.createElement('div');
  slide.className = 'welcome-slides-slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  slide.setAttribute('aria-label', `Slide ${idx + 1} of ${totalSlides}`);
  slide.setAttribute('aria-hidden', idx !== 0);

  if (idx === 0) slide.classList.add('active');

  // Get the image from the row
  const picture = row.querySelector('picture');
  if (picture) {
    slide.appendChild(picture.cloneNode(true));
  } else {
    const img = row.querySelector('img');
    if (img) {
      const picture = document.createElement('picture');
      picture.appendChild(img.cloneNode(true));
      slide.appendChild(picture);
    }
  }

  return slide;
}

function createIndicators(block, totalSlides) {
  const indicators = document.createElement('div');
  indicators.className = 'welcome-slides-indicators';
  indicators.setAttribute('role', 'tablist');

  for (let i = 0; i < totalSlides; i += 1) {
    const indicator = document.createElement('button');
    indicator.className = 'welcome-slides-indicator';
    indicator.setAttribute('role', 'tab');
    indicator.setAttribute('aria-selected', i === 0);
    indicator.setAttribute('aria-label', `Show slide ${i + 1}`);
    indicator.setAttribute('tabindex', i === 0 ? '0' : '-1');

    if (i === 0) indicator.classList.add('active');

    indicator.addEventListener('click', () => {
      updateActiveSlide(block, i);
    });

    indicators.appendChild(indicator);
  }

  return indicators;
}

function createNavButton(direction, label) {
  const button = document.createElement('button');
  button.className = `welcome-slides-nav welcome-slides-nav-${direction}`;
  button.setAttribute('aria-label', label);
  button.innerHTML = direction === 'prev' ? '&#10094;' : '&#10095;';
  return button;
}

export default function decorate(block) {
  const rows = [...block.children];
  const totalSlides = rows.length;

  // Create slides container
  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'welcome-slides-container';
  slidesContainer.setAttribute('role', 'region');
  slidesContainer.setAttribute('aria-roledescription', 'carousel');
  slidesContainer.setAttribute('aria-label', 'Welcome slides');

  // Create slides from rows
  rows.forEach((row, idx) => {
    const slide = createSlide(row, idx, totalSlides);
    slidesContainer.appendChild(slide);
  });

  // Clear block and add slides container
  block.textContent = '';
  block.appendChild(slidesContainer);

  // Add navigation if multiple slides
  if (totalSlides > 1) {
    const prevButton = createNavButton('prev', 'Previous slide');
    const nextButton = createNavButton('next', 'Next slide');

    prevButton.addEventListener('click', () => showSlide(block, -1));
    nextButton.addEventListener('click', () => showSlide(block, 1));

    slidesContainer.appendChild(prevButton);
    slidesContainer.appendChild(nextButton);

    // Add indicators
    const indicators = createIndicators(block, totalSlides);
    block.appendChild(indicators);

    // Start auto-play
    let autoPlayInterval = startAutoPlay(block);

    // Pause on hover
    block.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    block.addEventListener('mouseleave', () => {
      autoPlayInterval = startAutoPlay(block);
    });
  }
}
