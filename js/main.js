/**
 * AZ Water Check - Main JavaScript
 * Handles all site interactivity: carousels, accordion, mobile menu,
 * scroll animations, counters, navbar effects, smooth scroll,
 * language toggle, and form validation.
 *
 * Dependencies: Swiper.js (loaded via CDN before this script)
 */

document.addEventListener('DOMContentLoaded', function () {

  // ─────────────────────────────────────────────
  // 1. Swiper Carousel Init
  // ─────────────────────────────────────────────

  // Hero carousel - fade effect, auto-play 5s, loop
  if (document.querySelector('.hero-carousel')) {
    new Swiper('.hero-carousel', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      effect: 'fade',
      fadeEffect: { crossFade: true },
      pagination: {
        el: '.hero-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.hero-next',
        prevEl: '.hero-prev'
      }
    });
  }

  // Testimonial carousel - responsive slides, auto-play 6s, loop
  if (document.querySelector('.testimonial-carousel')) {
    new Swiper('.testimonial-carousel', {
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: {
        el: '.testimonial-pagination',
        clickable: true
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  // ─────────────────────────────────────────────
  // 2. FAQ Accordion
  // ─────────────────────────────────────────────

  var faqToggles = document.querySelectorAll('.faq-toggle');

  if (faqToggles.length) {
    faqToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var parentItem = this.closest('.faq-item');
        var answer = parentItem.querySelector('.faq-answer');
        var isOpen = parentItem.classList.contains('open');

        // Close all other items first (accordion behavior)
        document.querySelectorAll('.faq-item.open').forEach(function (item) {
          item.classList.remove('open');
          var itemAnswer = item.querySelector('.faq-answer');
          if (itemAnswer) {
            itemAnswer.style.maxHeight = null;
          }
        });

        // Toggle the clicked item
        if (!isOpen) {
          parentItem.classList.add('open');
          if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        }
      });
    });
  }

  // ─────────────────────────────────────────────
  // 3. Mobile Menu
  // ─────────────────────────────────────────────

  var menuToggle = document.querySelector('.menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    // Toggle menu open/close
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link inside is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu when overlay area is clicked
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ─────────────────────────────────────────────
  // 4. Scroll Animations (Intersection Observer)
  // ─────────────────────────────────────────────

  var animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length && 'IntersectionObserver' in window) {
    var scrollObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.getAttribute('data-delay');

          if (delay) {
            setTimeout(function () {
              el.classList.add('visible');
            }, parseInt(delay, 10));
          } else {
            el.classList.add('visible');
          }

          // Only animate in, not out
          scrollObserver.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    animatedElements.forEach(function (el) {
      scrollObserver.observe(el);
    });
  }

  // ─────────────────────────────────────────────
  // 5. Stat Counter Animation
  // ─────────────────────────────────────────────

  var counters = document.querySelectorAll('.count-up');

  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  /**
   * Animate a counter element from 0 to its data-target value over 2 seconds.
   * Supports a suffix via data-suffix (e.g., "+", "PPM").
   */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000; // 2 seconds
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out for a natural feel
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);

      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // ─────────────────────────────────────────────
  // 6. Navbar Scroll Effect
  // ─────────────────────────────────────────────

  var nav = document.querySelector('nav');

  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ─────────────────────────────────────────────
  // 7. Smooth Scroll
  // ─────────────────────────────────────────────

  var NAVBAR_OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      var targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - NAVBAR_OFFSET;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // ─────────────────────────────────────────────
  // 8. Language Toggle (Stub)
  // ─────────────────────────────────────────────

  var langToggles = document.querySelectorAll('.lang-toggle');

  if (langToggles.length) {
    // Set default state: EN visible, ES hidden
    document.querySelectorAll('.lang-en').forEach(function (el) {
      el.style.display = '';
    });
    document.querySelectorAll('.lang-es').forEach(function (el) {
      el.style.display = 'none';
    });

    langToggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = this.getAttribute('data-lang');

        // Update active state on toggle buttons
        langToggles.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        // Show/hide content blocks
        if (lang === 'es') {
          document.querySelectorAll('.lang-en').forEach(function (el) {
            el.style.display = 'none';
          });
          document.querySelectorAll('.lang-es').forEach(function (el) {
            el.style.display = '';
          });
        } else {
          document.querySelectorAll('.lang-en').forEach(function (el) {
            el.style.display = '';
          });
          document.querySelectorAll('.lang-es').forEach(function (el) {
            el.style.display = 'none';
          });
        }
      });
    });
  }

  // ─────────────────────────────────────────────
  // 9. Form Validation Styling
  // ─────────────────────────────────────────────

  var forms = document.querySelectorAll('form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var requiredFields = form.querySelectorAll('[required]');
      var hasErrors = false;

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('error');
          hasErrors = true;
        } else {
          field.classList.remove('error');
        }
      });

      if (!hasErrors) {
        // Hide the form and show success message
        form.style.display = 'none';

        var successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML =
          '<h3>Thank you!</h3>' +
          '<p>We received your information and will be in touch shortly.</p>';
        form.parentNode.insertBefore(successMsg, form.nextSibling);
      }
    });

    // Remove error class on focus
    form.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('focus', function () {
        this.classList.remove('error');
      });
    });
  });

});
