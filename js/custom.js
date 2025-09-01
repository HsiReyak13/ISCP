
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
  
  results.sort((a, b) => a.relevance - b.relevance);
  
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
  console.log('showDepartmentModal called with:', title, content);
  
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
    console.log('Removing existing modal');
    existingModal.remove();
  }
  
  console.log('Inserting modal HTML');
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  const modalElement = document.getElementById('departmentModal');
  console.log('Modal element found:', modalElement);
  
  if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    console.log('Bootstrap Modal class found, creating modal instance');
    const modal = new bootstrap.Modal(modalElement);
    console.log('Modal instance created:', modal);
    modal.show();
  } else {
    console.error('Bootstrap Modal class not found. Bootstrap may not be loaded properly.');
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
    modalElement.setAttribute('aria-modal', 'true');
    modalElement.removeAttribute('aria-hidden');
    
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    document.body.appendChild(backdrop);
    
    const closeButtons = modalElement.querySelectorAll('[data-bs-dismiss="modal"], .btn-close');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        modalElement.classList.remove('show');
        modalElement.style.display = 'none';
        modalElement.setAttribute('aria-hidden', 'true');
        modalElement.removeAttribute('aria-modal');
        if (backdrop.parentNode) {
          backdrop.parentNode.removeChild(backdrop);
        }
      });
    });
  }
}

function viewDepartment(collegeType, selectElementId) {
  console.log('viewDepartment called with:', collegeType, selectElementId);
  
  const selectElement = document.getElementById(selectElementId);
  console.log('Select element found:', selectElement);
  
  if (!selectElement) {
    console.error('Select element not found:', selectElementId);
    alert('Select element not found. Please check the console for details.');
    return;
  }
  
  const selectedValue = selectElement.value;
  console.log('Selected value:', selectedValue);
  
  if (!selectedValue) {
    alert('Please select a department first.');
    return;
  }
  
  let title = '';
  let content = '';
  
  const departmentInfo = getDepartmentInfo(collegeType, selectedValue);
  console.log('Department info:', departmentInfo);
  
  if (departmentInfo) {
    title = departmentInfo.title;
    content = departmentInfo.content;
    console.log('Showing modal with title:', title);
    showDepartmentModal(title, content);
  } else {
    console.error('Department info not found for:', collegeType, selectedValue);
    alert('Department information not available.');
  }
}

function getDepartmentInfo(collegeType, departmentValue) {
  const departmentData = {
    engineering: {
      civil: {
        title: 'Civil Engineering Department',
        content: `
          <h6><i class="bi bi-building me-2"></i>Civil Engineering</h6>
          <p><strong>Program Overview:</strong> Our Civil Engineering program prepares students to design, construct, and maintain infrastructure projects including buildings, bridges, roads, and water systems.</p>
          <p><strong>Career Opportunities:</strong> Structural Engineer, Transportation Engineer, Water Resources Engineer, Construction Manager</p>
          <p><strong>Duration:</strong> 5 years (10 semesters)</p>
          <p><strong>Units:</strong> 180 credit units</p>
        `
      },
      mechanical: {
        title: 'Mechanical Engineering Department',
        content: `
          <h6><i class="bi bi-gear me-2"></i>Mechanical Engineering</h6>
          <p><strong>Program Overview:</strong> Focuses on the design and manufacturing of mechanical systems, machines, and thermal devices.</p>
          <p><strong>Career Opportunities:</strong> Mechanical Engineer, HVAC Engineer, Automotive Engineer, Manufacturing Engineer</p>
          <p><strong>Duration:</strong> 5 years (10 semesters)</p>
          <p><strong>Units:</strong> 180 credit units</p>
        `
      },
      electrical: {
        title: 'Electrical Engineering Department',
        content: `
          <h6><i class="bi bi-lightning me-2"></i>Electrical Engineering</h6>
          <p><strong>Program Overview:</strong> Covers electrical systems, power generation, electronics, and telecommunications.</p>
          <p><strong>Career Opportunities:</strong> Electrical Engineer, Power Engineer, Telecommunications Engineer, Control Systems Engineer</p>
          <p><strong>Duration:</strong> 5 years (10 semesters)</p>
          <p><strong>Units:</strong> 180 credit units</p>
        `
      },
      electronics: {
        title: 'Electronics Engineering Department',
        content: `
          <h6><i class="bi bi-cpu me-2"></i>Electronics Engineering</h6>
          <p><strong>Program Overview:</strong> Specializes in electronic devices, circuits, and communication systems.</p>
          <p><strong>Career Opportunities:</strong> Electronics Engineer, Communications Engineer, Semiconductor Engineer, RF Engineer</p>
          <p><strong>Duration:</strong> 5 years (10 semesters)</p>
          <p><strong>Units:</strong> 180 credit units</p>
        `
      },
      computer: {
        title: 'Computer Engineering Department',
        content: `
          <h6><i class="bi bi-laptop me-2"></i>Computer Engineering</h6>
          <p><strong>Program Overview:</strong> Combines electrical engineering and computer science to design computer hardware and software systems.</p>
          <p><strong>Career Opportunities:</strong> Computer Engineer, Hardware Engineer, Embedded Systems Engineer, Network Engineer</p>
          <p><strong>Duration:</strong> 5 years (10 semesters)</p>
          <p><strong>Units:</strong> 180 credit units</p>
        `
      },
      chemical: {
        title: 'Chemical Engineering Department',
        content: `
          <h6><i class="bi bi-flask me-2"></i>Chemical Engineering</h6>
          <p><strong>Program Overview:</strong> Focuses on chemical processes, materials science, and industrial chemistry applications.</p>
          <p><strong>Career Opportunities:</strong> Chemical Engineer, Process Engineer, Materials Engineer, Environmental Engineer</p>
          <p><strong>Duration:</strong> 5 years (10 semesters)</p>
          <p><strong>Units:</strong> 180 credit units</p>
        `
      },
      industrial: {
        title: 'Industrial Engineering Department',
        content: `
          <h6><i class="bi bi-diagram-3 me-2"></i>Industrial Engineering</h6>
          <p><strong>Program Overview:</strong> Optimizes complex processes and systems to improve efficiency and productivity.</p>
          <p><strong>Career Opportunities:</strong> Industrial Engineer, Operations Manager, Quality Engineer, Supply Chain Engineer</p>
          <p><strong>Duration:</strong> 5 years (10 semesters)</p>
          <p><strong>Units:</strong> 180 credit units</p>
        `
      }
    },
    it: {
      bsit: {
        title: 'BS Information Technology Department',
        content: `
          <h6><i class="bi bi-laptop me-2"></i>BS Information Technology</h6>
          <p><strong>Program Overview:</strong> Prepares students for IT careers focusing on software development, database management, and network administration.</p>
          <p><strong>Career Opportunities:</strong> Software Developer, IT Consultant, Database Administrator, Network Administrator</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bscs: {
        title: 'BS Computer Science Department',
        content: `
          <h6><i class="bi bi-code-square me-2"></i>BS Computer Science</h6>
          <p><strong>Program Overview:</strong> Focuses on algorithms, programming, software engineering, and computer systems theory.</p>
          <p><strong>Career Opportunities:</strong> Software Engineer, Data Scientist, Systems Analyst, Research Scientist</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsis: {
        title: 'BS Information Systems Department',
        content: `
          <h6><i class="bi bi-diagram-2 me-2"></i>BS Information Systems</h6>
          <p><strong>Program Overview:</strong> Combines business and technology to design and manage information systems for organizations.</p>
          <p><strong>Career Opportunities:</strong> Business Analyst, IT Project Manager, Systems Analyst, IT Consultant</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsemc: {
        title: 'BS Entertainment and Multimedia Computing Department',
        content: `
          <h6><i class="bi bi-film me-2"></i>BS Entertainment and Multimedia Computing</h6>
          <p><strong>Program Overview:</strong> Specializes in game development, digital media, animation, and interactive entertainment.</p>
          <p><strong>Career Opportunities:</strong> Game Developer, Multimedia Artist, Animation Specialist, UX Designer</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsai: {
        title: 'BS Artificial Intelligence Department',
        content: `
          <h6><i class="bi bi-robot me-2"></i>BS Artificial Intelligence</h6>
          <p><strong>Program Overview:</strong> Focuses on machine learning, neural networks, and intelligent systems development.</p>
          <p><strong>Career Opportunities:</strong> AI Engineer, Machine Learning Engineer, Data Scientist, Research Scientist</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsds: {
        title: 'BS Data Science Department',
        content: `
          <h6><i class="bi bi-graph-up me-2"></i>BS Data Science</h6>
          <p><strong>Program Overview:</strong> Combines statistics, programming, and domain expertise to extract insights from data.</p>
          <p><strong>Career Opportunities:</strong> Data Scientist, Data Analyst, Business Intelligence Analyst, Statistician</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      }
    },
    business: {
      bsba: {
        title: 'BS Business Administration Department',
        content: `
          <h6><i class="bi bi-briefcase me-2"></i>BS Business Administration</h6>
          <p><strong>Program Overview:</strong> Provides comprehensive business education covering management, marketing, finance, and operations.</p>
          <p><strong>Career Opportunities:</strong> Business Manager, Entrepreneur, Marketing Manager, Operations Manager</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsa: {
        title: 'BS Accountancy Department',
        content: `
          <h6><i class="bi bi-calculator me-2"></i>BS Accountancy</h6>
          <p><strong>Program Overview:</strong> Prepares students for professional accounting careers with focus on financial reporting and auditing.</p>
          <p><strong>Career Opportunities:</strong> Certified Public Accountant, Auditor, Financial Analyst, Tax Consultant</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsfm: {
        title: 'BS Financial Management Department',
        content: `
          <h6><i class="bi bi-cash-stack me-2"></i>BS Financial Management</h6>
          <p><strong>Program Overview:</strong> Focuses on financial planning, investment analysis, and corporate finance management.</p>
          <p><strong>Career Opportunities:</strong> Financial Manager, Investment Analyst, Financial Planner, Risk Manager</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsmm: {
        title: 'BS Marketing Management Department',
        content: `
          <h6><i class="bi bi-megaphone me-2"></i>BS Marketing Management</h6>
          <p><strong>Program Overview:</strong> Covers marketing strategies, consumer behavior, digital marketing, and brand management.</p>
          <p><strong>Career Opportunities:</strong> Marketing Manager, Brand Manager, Digital Marketing Specialist, Market Researcher</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bshm: {
        title: 'BS Hospitality Management Department',
        content: `
          <h6><i class="bi bi-house-heart me-2"></i>BS Hospitality Management</h6>
          <p><strong>Program Overview:</strong> Prepares students for careers in hotels, restaurants, tourism, and event management.</p>
          <p><strong>Career Opportunities:</strong> Hotel Manager, Restaurant Manager, Event Planner, Tourism Officer</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bstm: {
        title: 'BS Tourism Management Department',
        content: `
          <h6><i class="bi bi-airplane me-2"></i>BS Tourism Management</h6>
          <p><strong>Program Overview:</strong> Focuses on tourism development, travel management, and sustainable tourism practices.</p>
          <p><strong>Career Opportunities:</strong> Tourism Manager, Travel Consultant, Tour Guide, Tourism Development Officer</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsrm: {
        title: 'BS Real Estate Management Department',
        content: `
          <h6><i class="bi bi-building me-2"></i>BS Real Estate Management</h6>
          <p><strong>Program Overview:</strong> Covers real estate development, property management, and real estate investment.</p>
          <p><strong>Career Opportunities:</strong> Real Estate Manager, Property Developer, Real Estate Broker, Investment Analyst</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      }
    },
    education: {
      bse: {
        title: 'BS Education Department',
        content: `
          <h6><i class="bi bi-mortarboard me-2"></i>BS Education</h6>
          <p><strong>Program Overview:</strong> General education program preparing students for teaching careers in various subjects.</p>
          <p><strong>Career Opportunities:</strong> Teacher, Educational Administrator, Curriculum Developer, Educational Consultant</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      'bse-english': {
        title: 'BS Education - English Department',
        content: `
          <h6><i class="bi bi-journal-text me-2"></i>BS Education - English</h6>
          <p><strong>Program Overview:</strong> Specializes in English language teaching, literature, and communication skills.</p>
          <p><strong>Career Opportunities:</strong> English Teacher, Language Instructor, Content Writer, Communication Specialist</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      'bse-math': {
        title: 'BS Education - Mathematics Department',
        content: `
          <h6><i class="bi bi-plus-slash-minus me-2"></i>BS Education - Mathematics</h6>
          <p><strong>Program Overview:</strong> Focuses on mathematics education, curriculum development, and mathematical concepts.</p>
          <p><strong>Career Opportunities:</strong> Math Teacher, Math Curriculum Developer, Educational Researcher, Math Tutor</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      'bse-science': {
        title: 'BS Education - Science Department',
        content: `
          <h6><i class="bi bi-flask me-2"></i>BS Education - Science</h6>
          <p><strong>Program Overview:</strong> Prepares students to teach various science subjects including biology, chemistry, and physics.</p>
          <p><strong>Career Opportunities:</strong> Science Teacher, Science Lab Coordinator, Science Curriculum Developer, Science Educator</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      'bse-social': {
        title: 'BS Education - Social Studies Department',
        content: `
          <h6><i class="bi bi-globe me-2"></i>BS Education - Social Studies</h6>
          <p><strong>Program Overview:</strong> Covers history, geography, civics, and social sciences for teaching purposes.</p>
          <p><strong>Career Opportunities:</strong> Social Studies Teacher, History Teacher, Geography Teacher, Social Science Educator</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      'bse-filipino': {
        title: 'BS Education - Filipino Department',
        content: `
          <h6><i class="bi bi-translate me-2"></i>BS Education - Filipino</h6>
          <p><strong>Program Overview:</strong> Specializes in Filipino language teaching, literature, and cultural studies.</p>
          <p><strong>Career Opportunities:</strong> Filipino Teacher, Language Instructor, Cultural Educator, Literature Teacher</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      'bse-pe': {
        title: 'BS Education - Physical Education Department',
        content: `
          <h6><i class="bi bi-trophy me-2"></i>BS Education - Physical Education</h6>
          <p><strong>Program Overview:</strong> Focuses on physical education, sports coaching, and health promotion.</p>
          <p><strong>Career Opportunities:</strong> PE Teacher, Sports Coach, Fitness Instructor, Health Educator</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      }
    },
    arts: {
      bspsych: {
        title: 'BS Psychology Department',
        content: `
          <h6><i class="bi bi-brain me-2"></i>BS Psychology</h6>
          <p><strong>Program Overview:</strong> Studies human behavior, mental processes, and psychological principles for understanding human nature.</p>
          <p><strong>Career Opportunities:</strong> Psychologist, Human Resources Specialist, Counselor, Research Assistant</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsbio: {
        title: 'BS Biology Department',
        content: `
          <h6><i class="bi bi-tree me-2"></i>BS Biology</h6>
          <p><strong>Program Overview:</strong> Explores living organisms, their structure, function, growth, and evolution.</p>
          <p><strong>Career Opportunities:</strong> Biologist, Research Scientist, Environmental Consultant, Science Teacher</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bschem: {
        title: 'BS Chemistry Department',
        content: `
          <h6><i class="bi bi-droplet me-2"></i>BS Chemistry</h6>
          <p><strong>Program Overview:</strong> Studies matter, its properties, composition, and the changes it undergoes.</p>
          <p><strong>Career Opportunities:</strong> Chemist, Laboratory Technician, Quality Control Analyst, Research Scientist</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsmath: {
        title: 'BS Mathematics Department',
        content: `
          <h6><i class="bi bi-infinity me-2"></i>BS Mathematics</h6>
          <p><strong>Program Overview:</strong> Focuses on mathematical theory, problem-solving, and analytical thinking.</p>
          <p><strong>Career Opportunities:</strong> Mathematician, Data Analyst, Actuary, Math Teacher</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsphysics: {
        title: 'BS Physics Department',
        content: `
          <h6><i class="bi bi-atom me-2"></i>BS Physics</h6>
          <p><strong>Program Overview:</strong> Studies matter, energy, and their interactions in the physical universe.</p>
          <p><strong>Career Opportunities:</strong> Physicist, Research Scientist, Engineering Consultant, Science Teacher</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bscomm: {
        title: 'BS Communication Department',
        content: `
          <h6><i class="bi bi-chat-dots me-2"></i>BS Communication</h6>
          <p><strong>Program Overview:</strong> Covers media studies, public relations, journalism, and communication theory.</p>
          <p><strong>Career Opportunities:</strong> Journalist, Public Relations Specialist, Media Producer, Communication Consultant</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsenglish: {
        title: 'BS English Department',
        content: `
          <h6><i class="bi bi-book me-2"></i>BS English</h6>
          <p><strong>Program Overview:</strong> Focuses on English literature, language, and communication skills.</p>
          <p><strong>Career Opportunities:</strong> English Teacher, Writer, Editor, Communication Specialist</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      }
    },
    health: {
      bsn: {
        title: 'BS Nursing Department',
        content: `
          <h6><i class="bi bi-heart-pulse me-2"></i>BS Nursing</h6>
          <p><strong>Program Overview:</strong> Prepares students for professional nursing practice with focus on patient care and health promotion.</p>
          <p><strong>Career Opportunities:</strong> Registered Nurse, Nurse Educator, Clinical Nurse Specialist, Nurse Administrator</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsmls: {
        title: 'BS Medical Laboratory Science Department',
        content: `
          <h6><i class="bi bi-microscope me-2"></i>BS Medical Laboratory Science</h6>
          <p><strong>Program Overview:</strong> Focuses on laboratory testing, diagnostic procedures, and medical research support.</p>
          <p><strong>Career Opportunities:</strong> Medical Technologist, Laboratory Manager, Research Assistant, Quality Control Specialist</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bspt: {
        title: 'BS Physical Therapy Department',
        content: `
          <h6><i class="bi bi-person-walking me-2"></i>BS Physical Therapy</h6>
          <p><strong>Program Overview:</strong> Prepares students to help patients recover movement and manage pain through therapeutic exercises.</p>
          <p><strong>Career Opportunities:</strong> Physical Therapist, Rehabilitation Specialist, Sports Therapist, Pediatric Therapist</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsot: {
        title: 'BS Occupational Therapy Department',
        content: `
          <h6><i class="bi bi-tools me-2"></i>BS Occupational Therapy</h6>
          <p><strong>Program Overview:</strong> Focuses on helping patients develop skills for daily living and work activities.</p>
          <p><strong>Career Opportunities:</strong> Occupational Therapist, Rehabilitation Specialist, Pediatric Therapist, Geriatric Therapist</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bspharm: {
        title: 'BS Pharmacy Department',
        content: `
          <h6><i class="bi bi-capsule me-2"></i>BS Pharmacy</h6>
          <p><strong>Program Overview:</strong> Prepares students for pharmaceutical practice, drug development, and medication management.</p>
          <p><strong>Career Opportunities:</strong> Pharmacist, Pharmaceutical Researcher, Drug Safety Specialist, Clinical Pharmacist</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsmt: {
        title: 'BS Medical Technology Department',
        content: `
          <h6><i class="bi bi-vial me-2"></i>BS Medical Technology</h6>
          <p><strong>Program Overview:</strong> Focuses on laboratory medicine, diagnostic testing, and medical research.</p>
          <p><strong>Career Opportunities:</strong> Medical Technologist, Laboratory Manager, Research Scientist, Quality Assurance Specialist</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      },
      bsrt: {
        title: 'BS Radiologic Technology Department',
        content: `
          <h6><i class="bi bi-camera me-2"></i>BS Radiologic Technology</h6>
          <p><strong>Program Overview:</strong> Prepares students to perform diagnostic imaging procedures using various radiological equipment.</p>
          <p><strong>Career Opportunities:</strong> Radiologic Technologist, MRI Technologist, CT Technologist, Radiation Safety Officer</p>
          <p><strong>Duration:</strong> 4 years (8 semesters)</p>
          <p><strong>Units:</strong> 144 credit units</p>
        `
      }
    }
  };
  
  return departmentData[collegeType]?.[departmentValue] || null;
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

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchForm = searchInput?.closest('form');
  
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      performSearch(searchInput.value);
    });
    
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
  
  showSearchResults(query, hasResults);
}

function showSearchResults(query, hasResults) {
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
  
  const existingMessage = document.querySelector('.search-results-message');
  if (existingMessage) {
    existingMessage.remove();
  }
}
