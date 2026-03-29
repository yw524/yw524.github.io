// Yudun Wang
// ITMD 541 Graduate Student

(function () {
  'use strict';

  // --- 1. Hero Changes ---

  // 1a. Change the main headline text in the hero section.
  var hero = document.getElementById('hero');
  var heroH1 = hero && hero.querySelector('h1');
  if (heroH1) {
    heroH1.textContent = 'Uplift Your Brand with Stellar Marketing';
  }

  // 1b. Change the line of text below the hero headline (bold and italic on "thrive" and "excel" only).
  var heroP = hero && hero.querySelector('p');
  if (heroP) {
    heroP.innerHTML =
      'Utilize cutting-edge strategies from Stellar Marketing to help your business <strong><em>thrive</em></strong> and <strong><em>excel</em></strong>.';
  }

  // 1c. Change the image in the background of the hero.
  if (hero) {
    hero.style.backgroundImage =
      'url(https://picsum.photos/id/683/1280/720)';
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center';
  }

  // 1d. Remove the "Get Started" CTA from the hero.
  var heroCta = hero && hero.querySelector('a[href*="contact.html"]');
  if (heroCta) {
    heroCta.remove();
  }

  // 1e. Change the background color of the nav bar to the same color that is used in the footer.
  var header = document.querySelector('header');
  var footer = document.querySelector('footer');
  if (header && footer) {
    header.style.backgroundColor = window.getComputedStyle(footer).backgroundColor;
  }

  // --- 2. Our Services Section ---

  // 2a. In the services section change the icons color to (#47C714).
  var serviceIcons = document.querySelectorAll('#services .material-symbols-outlined');
  serviceIcons.forEach(function (el) {
    el.style.color = '#47C714';
  });

  // 2b. Change the digital marketing icon to use 'ads_click' (Material Symbols Outlined).
  var digitalIcon = document.querySelector('#services span[data-icon="digital"]');
  if (digitalIcon) {
    digitalIcon.textContent = 'ads_click';
  }

  // --- 3. Specialized Marketing Solutions section ---

  // 3a. At >= 1024px, layout tiles 4 across instead of 2 across.
  var styleId = 'ywang-lab4-solutions-grid';
  var existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }
  var styleEl = document.createElement('style');
  styleEl.id = styleId;
  styleEl.textContent =
    '@media (min-width: 1024px) { [data-section="product_cards"] { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; } }';
  document.head.appendChild(styleEl);

  // 3b. Change the Musicians image to the specified URL.
  var musiciansImg = document.querySelector('img[alt="Musicians"]');
  if (musiciansImg) {
    musiciansImg.src = 'https://picsum.photos/id/453/400/300';
  }

  // --- 4. Graduate (ITMD 541): Contact form ---

  // 4a. Prevent form submission to the broken contact.html URL; handle submit in JS only.
  var contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.removeAttribute('action');
    contactForm.setAttribute('novalidate', 'novalidate');

    if (!contactForm.dataset.lab4SubmitBound) {
      contactForm.dataset.lab4SubmitBound = '1';
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var nameInput = contactForm.querySelector('#name');
        var emailInput = contactForm.querySelector('#email');
        var nameVal = nameInput && nameInput.value.trim();
        var emailVal = emailInput && emailInput.value.trim();

        if (nameVal && emailVal) {
          alert(
            'Thank you, ' +
              nameVal +
              '! We will be in touch with you shortly at ' +
              emailVal +
              '.'
          );
        } else {
          alert('Please provide a name and email.');
        }
      });
    }
  }

  // Invocation / console output verifying the script ran
  console.log('[Lab 4] IIFE executed: hero, services, solutions grid, musicians image, and contact form updates applied.');
})();
