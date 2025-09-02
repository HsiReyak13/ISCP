// Enhanced UI/UX JavaScript Functions

// Smooth scrolling for all internal links
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Enhanced scroll-to-top functionality
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
      } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(20px)';
      }
    });
    
    scrollToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Enhanced card hover effects
  const cards = document.querySelectorAll('.stat-card, .college-card, .testimonial-card, .news-card, .event-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      });
    });

  // Enhanced form interactions
  const formControls = document.querySelectorAll('.form-control, .form-select');
  formControls.forEach(control => {
    control.addEventListener('focus', function() {
      this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    control.addEventListener('blur', function() {
      this.parentElement.style.transform = 'translateY(0)';
    });
  });

  // Enhanced button interactions
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(-1px)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-3px)';
    });
  });

  // Enhanced navigation interactions
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Enhanced search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
    });
  }

  // Enhanced modal interactions
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('show.bs.modal', function() {
      this.querySelector('.modal-content').style.transform = 'scale(0.8)';
      this.querySelector('.modal-content').style.opacity = '0';
    });
    
    modal.addEventListener('shown.bs.modal', function() {
      this.querySelector('.modal-content').style.transition = 'all 0.3s ease';
      this.querySelector('.modal-content').style.transform = 'scale(1)';
      this.querySelector('.modal-content').style.opacity = '1';
    });
  });

  // Enhanced music player interactions
  const musicPlayer = document.getElementById('musicPlayer');
  if (musicPlayer) {
    musicPlayer.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-1px) scale(1.02)';
    });
    
    musicPlayer.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  }

  // Enhanced statistics counter animation
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute('data-count'));
        animateCounter(target, count);
        observer.unobserve(target);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });

  // Enhanced image lazy loading
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('fade-in');
        imageObserver.unobserve(img);
      }
  });
});

  images.forEach(img => {
    imageObserver.observe(img);
  });

  // Enhanced parallax effect for hero section
  const heroSection = document.querySelector('.bg-main');
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }

  // Enhanced testimonial carousel (if needed)
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll('.testimonial-card');
  
  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.opacity = i === index ? '1' : '0.5';
      testimonial.style.transform = i === index ? 'scale(1)' : 'scale(0.95)';
    });
  }

  // Auto-rotate testimonials
  if (testimonials.length > 0) {
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  // Enhanced newsletter subscription
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'alert alert-success mt-3';
      successMessage.innerHTML = `
        <i class="bi bi-check-circle"></i>
        Thank you for subscribing! We'll keep you updated with the latest news.
      `;
      
      this.appendChild(successMessage);
      this.reset();
      
      // Remove message after 5 seconds
  setTimeout(() => {
        successMessage.remove();
  }, 5000);
    });
  }

  // Enhanced accessibility features
  document.addEventListener('keydown', function(e) {
    // Skip to main content with Tab key
    if (e.key === 'Tab' && e.target === document.body) {
      e.preventDefault();
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.focus();
      }
    }
  });

  // Enhanced mobile menu interactions
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        navbarCollapse.classList.remove('show');
      }
    });
  }
});

// Enhanced counter animation function
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 20);
}

// Original preloader functionality
function initializePreloader() {
  const preloader = document.getElementById('preloader');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  
  if (!preloader) return;
  
  document.body.classList.add('preloading');
  
  let progress = 0;
  const targetProgress = 100;
  const increment = 0.8;
  const progressInterval = setInterval(() => {
    progress += increment;
    
    if (progressFill) {
      progressFill.style.width = `${Math.min(progress, 100)}%`;
    }
    
    if (progressText) {
      progressText.textContent = `${Math.min(Math.round(progress), 100)}%`;
    }
    
    if (progress >= targetProgress) {
      clearInterval(progressInterval);
      
      setTimeout(() => {
        preloader.classList.add('fade-out');
    
    setTimeout(() => {
          preloader.remove();
          document.body.classList.remove('preloading');
          triggerContentAnimations();
        }, 800);
      }, 600);
    }
  }, 60);
}

// Original content animations
function triggerContentAnimations() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }
  const animatedElements = document.querySelectorAll('[data-aos]');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.8s ease-in-out';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 200);
  });
}

// Enhanced search functionality
function initializeEnhancedSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.createElement('div');
  searchResults.className = 'search-results';
  searchResults.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
    display: none;
  `;
  
  if (searchInput) {
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(searchResults);
    
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      if (query.length > 2) {
        // Simulate search results
        const results = [
          'Computer Science Program',
          'Engineering Department',
          'Business Administration',
          'Student Portal',
          'Academic Calendar'
        ].filter(item => item.toLowerCase().includes(query));
        
        displaySearchResults(results);
    } else {
        searchResults.style.display = 'none';
      }
    });
    
    searchInput.addEventListener('blur', function() {
      setTimeout(() => {
        searchResults.style.display = 'none';
      }, 200);
    });
  }
}

function displaySearchResults(results) {
  const searchResults = document.querySelector('.search-results');
  if (results.length > 0) {
    searchResults.innerHTML = results.map(result => `
      <div class="search-result-item" style="padding: 12px 16px; border-bottom: 1px solid #eee; cursor: pointer; transition: background 0.3s ease;">
        <i class="bi bi-search me-2"></i>${result}
      </div>
    `).join('');
    searchResults.style.display = 'block';
        } else {
    searchResults.innerHTML = '<div style="padding: 16px; text-align: center; color: #666;">No results found</div>';
    searchResults.style.display = 'block';
  }
}

// Initialize features
document.addEventListener('DOMContentLoaded', function() {
  initializePreloader();
  
  // Original Music Player Functionality
  const musicPlayer = document.getElementById('musicPlayer');
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');
  const backgroundMusic = document.getElementById('backgroundMusic');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeIcon = document.getElementById('volumeIcon');

  if (musicToggle && backgroundMusic) {
    musicToggle.addEventListener('click', function() {
      if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicIcon.className = 'bi bi-pause-fill';
        musicToggle.classList.add('playing');
        } else {
        backgroundMusic.pause();
        musicIcon.className = 'bi bi-play-fill';
        musicToggle.classList.remove('playing');
      }
    });
  }
  
  if (volumeSlider && backgroundMusic) {
    // Set default volume to 10%
    backgroundMusic.volume = 0.1;
    volumeSlider.value = 10;
    updateVolumeIcon(10);
    
    volumeSlider.addEventListener('input', function() {
      backgroundMusic.volume = this.value / 100;
      updateVolumeIcon(this.value);
    });
  }

  if (volumeIcon) {
    volumeIcon.addEventListener('click', function() {
      if (backgroundMusic.volume > 0) {
        backgroundMusic.volume = 0;
        volumeSlider.value = 0;
        updateVolumeIcon(0);
        } else {
        backgroundMusic.volume = 0.5;
        volumeSlider.value = 50;
        updateVolumeIcon(50);
      }
    });
  }
  
  function updateVolumeIcon(volume) {
    if (volumeIcon) {
      if (volume === 0) {
        volumeIcon.className = 'bi bi-volume-mute';
      } else if (volume < 50) {
        volumeIcon.className = 'bi bi-volume-down';
      } else {
        volumeIcon.className = 'bi bi-volume-up';
      }
    }
  }

  // Original Scroll to Top Functionality
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    });

    scrollToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }



  // Scroll-triggered Navigation Background (for pages with .bg-main hero section)
  const mainNavbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('.bg-main');
  
  // Apply scroll effect if we have a .bg-main hero section
  if (heroSection && mainNavbar) {
    function updateNavbarBackground() {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollPosition = window.pageYOffset + 100; // Add offset for smooth transition
      
      if (scrollPosition > heroBottom) {
        mainNavbar.classList.add('scrolled');
      } else {
        mainNavbar.classList.remove('scrolled');
      }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', updateNavbarBackground);
    
    // Initial check on page load
    updateNavbarBackground();
  }
  // Note: About page and other pages now have their own CSS styling

  // Original Statistics Counter
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute('data-count'));
        animateCounter(target, count);
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => {
    observer.observe(stat);
  });

  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 20);
  }
});
