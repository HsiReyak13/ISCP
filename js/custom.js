
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

function triggerContentAnimations() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1200,
      easing: 'ease-out-cubic',
      once: true,
      delay: 300
    });
  }
  const animatedElements = document.querySelectorAll('[data-aos]');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 200);
  });
}

function initializeAdvancedPreloader() {
  const preloader = document.getElementById('preloader');
  
  if (!preloader) return;
  const resources = [
    '/css/bootstrap.css',
    '/css/custom.css',
    '/js/bootstrap.bundle.js',
    '/js/custom.js',
    '/images/background.jpg',
    '/images/Seal.png'
  ];
  
  let loadedResources = 0;
  const totalResources = resources.length;
  
  resources.forEach(resource => {
    if (isResourceLoaded(resource)) {
      loadedResources++;
      updateProgress(loadedResources, totalResources);
    }
  });
  
  if (loadedResources >= totalResources) {
    setTimeout(() => {
      hidePreloader();
    }, 2500);
  } else {
    simulateRemainingProgress(loadedResources, totalResources);
  }
}

function isResourceLoaded(resource) {
  if (resource.endsWith('.css')) {
    return document.querySelector(`link[href="${resource}"]`) !== null;
  } else if (resource.endsWith('.js')) {
    return document.querySelector(`script[src="${resource}"]`) !== null;
  } else if (resource.endsWith('.jpg') || resource.endsWith('.png')) {
    return true;
  }
  return false;
}

function updateProgress(loaded, total) {
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  
  if (progressFill && progressText) {
    const percentage = Math.round((loaded / total) * 100);
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}%`;
  }
}

function simulateRemainingProgress(loaded, total) {
  const remaining = total - loaded;
  let current = loaded;
  
  const interval = setInterval(() => {
    current++;
    updateProgress(current, total);
    
    if (current >= total) {
      clearInterval(interval);
      setTimeout(() => {
        hidePreloader();
      }, 1000);
    }
  }, 300);
}

function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    
    setTimeout(() => {
      preloader.remove();
      document.body.classList.remove('preloading');
      triggerContentAnimations();
    }, 800);
  }
}

function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      if (query.length > 2) {
        performSearch(query);
      }
    });
  }
}

function performSearch(query) {
  const searchableElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .college-title, .campus-name');
  let results = [];
  
  searchableElements.forEach(element => {
    const text = element.textContent.toLowerCase();
    if (text.includes(query)) {
      results.push({
        element: element,
        text: element.textContent,
        relevance: text.indexOf(query)
      });
    }
  });
  
  // Sort by relevance
  results.sort((a, b) => a.relevance - b.relevance);
  
  // Highlight results
  highlightSearchResults(results.slice(0, 5));
}

function highlightSearchResults(results) {
  document.querySelectorAll('.search-highlight').forEach(el => {
    el.classList.remove('search-highlight');
  });
  
  results.forEach(result => {
    result.element.classList.add('search-highlight');
    result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    
    updateCounter();
  });
}

function enhanceScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.opacity = '1';
      } else {
        scrollToTopBtn.style.opacity = '0';
        setTimeout(() => {
          if (scrollToTopBtn.style.opacity === '0') {
            scrollToTopBtn.style.display = 'none';
          }
        }, 300);
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
}

function showDepartmentModal(title, content) {
  const modalHTML = `
    <div class="modal fade" id="departmentModal" tabindex="-1" aria-labelledby="departmentModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="departmentModalLabel">
              <i class="bi bi-graduation-cap me-2"></i>${title}
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              <i class="bi bi-x-circle me-2"></i>Close
            </button>
            <a href="register.html" class="btn btn-primary">
              <i class="bi bi-arrow-right me-2"></i>Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const existingModal = document.getElementById('departmentModal');
  if (existingModal) {
    existingModal.remove();
  }
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  const modal = new bootstrap.Modal(document.getElementById('departmentModal'));
  modal.show();
}

document.addEventListener('DOMContentLoaded', function() {
  const secondaryNavLinks = document.querySelectorAll('.navbar-light.bg-light .navbar-nav .nav-link');
  
  secondaryNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      secondaryNavLinks.forEach(l => l.classList.remove('active'));
      
      this.classList.add('active');
    });
  });
  
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-light.bg-light .navbar-nav .nav-link[href^="#"]');
  
  function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  
  updateActiveNavLink();
});

document.addEventListener('DOMContentLoaded', function() {
  initializeAdvancedPreloader();
  
  initializeSearch();
  enhanceScrollToTop();
  initializeMusicPlayer();
  initializeCollapsibleMusicPlayer();
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    observer.observe(statsSection);
  }
  
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
});

function initializeMusicPlayer() {
  const musicPlayer = document.getElementById('musicPlayer');
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeIcon = document.getElementById('volumeIcon');
  const backgroundMusic = document.getElementById('backgroundMusic');
  
  if (!musicPlayer || !backgroundMusic) return;
  
  const savedVolume = localStorage.getItem('iscpMusicVolume') || 25;
  const savedMuted = localStorage.getItem('iscpMusicMuted') === 'true';
  
  backgroundMusic.volume = savedVolume / 100;
  volumeSlider.value = savedVolume;
  
  updateVolumeIcon(savedVolume, savedMuted);
  
  musicToggle.addEventListener('click', function() {
    if (backgroundMusic.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });
  
  volumeSlider.addEventListener('input', function() {
    const volume = this.value / 100;
    backgroundMusic.volume = volume;
    localStorage.setItem('iscpMusicVolume', this.value);
    updateVolumeIcon(this.value, false);
  });
  
  volumeIcon.addEventListener('click', function() {
    if (backgroundMusic.muted) {
      unmuteMusic();
    } else {
      muteMusic();
    }
  });
  
  document.addEventListener('click', function() {
    if (backgroundMusic.paused && !backgroundMusic.played.length) {
      backgroundMusic.play().catch(e => {});
    }
  }, { once: true });
  
  backgroundMusic.addEventListener('loadeddata', function() {
    musicToggle.classList.remove('loading');
    musicToggle.disabled = false;
  });
  
  backgroundMusic.addEventListener('ended', function() {
    if (backgroundMusic.loop) {
      backgroundMusic.currentTime = 0;
      backgroundMusic.play().catch(e => {});
    } else {
      updateMusicButton(false);
    }
  });
  
  backgroundMusic.addEventListener('play', function() {
    updateMusicButton(true);
  });
  
  backgroundMusic.addEventListener('pause', function() {
    updateMusicButton(false);
  });
  
  backgroundMusic.addEventListener('error', function() {
    musicToggle.classList.add('loading');
    musicToggle.disabled = true;
  });
  
  if (!savedMuted && savedVolume > 0) {
    if (backgroundMusic.readyState >= 2) {
      backgroundMusic.play().catch(e => {});
    } else {
      backgroundMusic.addEventListener('loadeddata', function() {
        if (!savedMuted && savedVolume > 0) {
          backgroundMusic.play().catch(e => {});
        }
      }, { once: true });
    }
  }
}

function playMusic() {
  const backgroundMusic = document.getElementById('backgroundMusic');
  const musicToggle = document.getElementById('musicToggle');
  
  if (backgroundMusic) {
    musicToggle.classList.add('loading');
    
    if (backgroundMusic.readyState < 2) {
      backgroundMusic.addEventListener('loadeddata', function() {
        playMusic();
      }, { once: true });
      return;
    }
    
    if (backgroundMusic.currentTime >= backgroundMusic.duration - 0.1) {
      backgroundMusic.currentTime = 0;
    }
    
    backgroundMusic.play().then(() => {
      musicToggle.classList.remove('loading');
      updateMusicButton(true);
    }).catch(error => {
      musicToggle.classList.remove('loading');
      showMusicError('Please interact with the page to enable music playback');
    });
  }
}

function pauseMusic() {
  const backgroundMusic = document.getElementById('backgroundMusic');
  
  if (backgroundMusic) {
    backgroundMusic.pause();
    updateMusicButton(false);
  }
}

function updateMusicButton(isPlaying) {
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');
  
  if (isPlaying) {
    musicToggle.classList.add('playing');
    musicIcon.className = 'bi bi-pause-fill';
    musicToggle.title = 'Pause Music';
  } else {
    musicToggle.classList.remove('playing');
    musicIcon.className = 'bi bi-play-fill';
    musicToggle.title = 'Play Music';
  }
}

function updateVolumeIcon(volume, isMuted) {
  const volumeIcon = document.getElementById('volumeIcon');
  
  if (isMuted || volume == 0) {
    volumeIcon.className = 'bi bi-volume-mute';
    volumeIcon.title = 'Unmute';
  } else if (volume < 30) {
    volumeIcon.className = 'bi bi-volume-down';
    volumeIcon.title = 'Volume: Low';
  } else if (volume < 70) {
    volumeIcon.className = 'bi bi-volume-up';
    volumeIcon.title = 'Volume: Medium';
  } else {
    volumeIcon.className = 'bi bi-volume-up';
    volumeIcon.title = 'Volume: High';
  }
}

function muteMusic() {
  const backgroundMusic = document.getElementById('backgroundMusic');
  const volumeIcon = document.getElementById('volumeIcon');
  
  if (backgroundMusic) {
    backgroundMusic.muted = true;
    localStorage.setItem('iscpMusicMuted', 'true');
    updateVolumeIcon(volumeSlider.value, true);
  }
}

function unmuteMusic() {
  const backgroundMusic = document.getElementById('backgroundMusic');
  
  if (backgroundMusic) {
    backgroundMusic.muted = false;
    localStorage.setItem('iscpMusicMuted', 'false');
    updateVolumeIcon(volumeSlider.value, false);
  }
}

function showMusicError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'music-error';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ef4444;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1001;
    font-size: 14px;
    max-width: 300px;
  `;
  
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
  }, 5000);
}



function initializeCollapsibleMusicPlayer() {
  const musicPlayer = document.getElementById('musicPlayer');
  
  if (!musicPlayer) return;
  
  let isCollapsed = false;
  let collapseTimeout;
  
  const resetCollapseTimer = () => {
    clearTimeout(collapseTimeout);
    if (window.innerWidth <= 768) {
      collapseTimeout = setTimeout(() => {
        if (!isCollapsed) {
          musicPlayer.classList.add('collapsed');
          isCollapsed = true;
        }
      }, 5000);
    }
  };
  
  musicPlayer.addEventListener('mouseenter', () => {
    if (isCollapsed) {
      musicPlayer.classList.remove('collapsed');
      isCollapsed = false;
    }
    resetCollapseTimer();
  });
  
  musicPlayer.addEventListener('touchstart', () => {
    if (isCollapsed) {
      musicPlayer.classList.remove('collapsed');
      isCollapsed = false;
    }
    resetCollapseTimer();
  });
  
  resetCollapseTimer();
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchForm = searchInput?.closest('form');
  
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      performSearch(searchInput.value);
    });
    
    // Real-time search as user types
    searchInput.addEventListener('input', function() {
      if (this.value.length > 2) {
        performSearch(this.value);
      } else {
        showAllContent();
      }
    });
  }
});

function performSearch(query) {
  if (!query.trim()) {
    showAllContent();
    return;
  }
  
  const searchTerm = query.toLowerCase();
  const collegeCards = document.querySelectorAll('.college-card');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const aboutSection = document.querySelector('.about-section');
  const statsGrid = document.querySelector('.stats-grid');
  
  let hasResults = false;
  
  // Search through college cards
  collegeCards.forEach(card => {
    const title = card.querySelector('.college-title')?.textContent.toLowerCase() || '';
    const description = card.querySelector('.college-description')?.textContent.toLowerCase() || '';
    const options = Array.from(card.querySelectorAll('option')).map(opt => opt.textContent.toLowerCase());
    
    if (title.includes(searchTerm) || description.includes(searchTerm) || 
        options.some(opt => opt.includes(searchTerm))) {
      card.style.display = 'block';
      card.style.opacity = '1';
      hasResults = true;
    } else {
      card.style.opacity = '0.3';
    }
  });
  
  // Search through testimonials
  testimonialCards.forEach(card => {
    const text = card.querySelector('.testimonial-text')?.textContent.toLowerCase() || '';
    const author = card.querySelector('.author-name')?.textContent.toLowerCase() || '';
    const program = card.querySelector('.author-program')?.textContent.toLowerCase() || '';
    
    if (text.includes(searchTerm) || author.includes(searchTerm) || program.includes(searchTerm)) {
      card.style.display = 'block';
      card.style.opacity = '1';
      hasResults = true;
    } else {
      card.style.opacity = '0.3';
    }
  });
  
  // Search through about section
  if (aboutSection) {
    const aboutTitle = aboutSection.querySelector('.about-title')?.textContent.toLowerCase() || '';
    const aboutDescription = aboutSection.querySelector('.about-description')?.textContent.toLowerCase() || '';
    
    if (aboutTitle.includes(searchTerm) || aboutDescription.includes(searchTerm)) {
      aboutSection.style.opacity = '1';
      hasResults = true;
    } else {
      aboutSection.style.opacity = '0.3';
    }
  }
  
  // Search through stats
  if (statsGrid) {
    const statCards = statsGrid.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      const number = card.querySelector('.stat-number')?.textContent.toLowerCase() || '';
      const description = card.querySelector('.stat-description')?.textContent.toLowerCase() || '';
      
      if (number.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.opacity = '1';
        hasResults = true;
      } else {
        card.style.opacity = '0.3';
      }
    });
  }
  
  // Show search results message
  showSearchResults(query, hasResults);
}

function showSearchResults(query, hasResults) {
  // Remove existing search results message
  const existingMessage = document.querySelector('.search-results-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  const searchForm = document.querySelector('.d-flex.ms-3');
  if (searchForm) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'search-results-message mt-2';
    messageDiv.innerHTML = `
      <small class="text-white">
        ${hasResults ? `Found results for "${query}"` : `No results found for "${query}"`}
        ${hasResults ? '' : ' - Showing all content'}
      </small>
    `;
    searchForm.appendChild(messageDiv);
    
    // Auto-remove message after 3 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 3000);
  }
}

function showAllContent() {
  const allCards = document.querySelectorAll('.college-card, .testimonial-card');
  const aboutSection = document.querySelector('.about-section');
  const statCards = document.querySelectorAll('.stat-card');
  
  allCards.forEach(card => {
    card.style.display = 'block';
    card.style.opacity = '1';
  });
  
  if (aboutSection) {
    aboutSection.style.opacity = '1';
  }
  
  statCards.forEach(card => {
    card.style.opacity = '1';
  });
  
  // Remove search results message
  const existingMessage = document.querySelector('.search-results-message');
  if (existingMessage) {
    existingMessage.remove();
  }
}
