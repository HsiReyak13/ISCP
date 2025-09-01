// Colleges and Departments JavaScript Functions

function viewDepartment(college, selectId) {
  const select = document.getElementById(selectId);
  const selectedValue = select.value;
  
  if (!selectedValue) {
    alert('Please select a department first.');
    return;
  }
  
  // Get the selected department name
  const selectedOption = select.options[select.selectedIndex];
  const departmentName = selectedOption.text;
  
  // Create modal content based on college and department
  let modalContent = '';
  let modalTitle = '';
  
  switch(college) {
    case 'engineering':
      modalTitle = 'Engineering Department Details';
      modalContent = getEngineeringDetails(selectedValue, departmentName);
      break;
    case 'it':
      modalTitle = 'IT Department Details';
      modalContent = getITDetails(selectedValue, departmentName);
      break;
    case 'business':
      modalTitle = 'Business Department Details';
      modalContent = getBusinessDetails(selectedValue, departmentName);
      break;
    case 'education':
      modalTitle = 'Education Department Details';
      modalContent = getEducationDetails(selectedValue, departmentName);
      break;
    case 'arts':
      modalTitle = 'Arts & Sciences Department Details';
      modalContent = getArtsDetails(selectedValue, departmentName);
      break;
    case 'health':
      modalTitle = 'Health Sciences Department Details';
      modalContent = getHealthDetails(selectedValue, departmentName);
      break;
  }
  
  // Show the modal
  showDepartmentModal(modalTitle, modalContent);
}

function getEngineeringDetails(dept, name) {
  const details = {
    'civil': {
      duration: '5 years',
      units: '180 units',
      description: 'Focuses on planning, designing, and constructing infrastructure projects.',
      careers: 'Civil Engineer, Structural Engineer, Transportation Engineer, Water Resources Engineer'
    },
    'mechanical': {
      duration: '5 years',
      units: '180 units',
      description: 'Deals with mechanical systems, energy conversion, and manufacturing processes.',
      careers: 'Mechanical Engineer, HVAC Engineer, Manufacturing Engineer, Energy Engineer'
    },
    'electrical': {
      duration: '5 years',
      units: '180 units',
      description: 'Focuses on electrical systems, power generation, and distribution.',
      careers: 'Electrical Engineer, Power Engineer, Control Systems Engineer, Electronics Engineer'
    },
    'electronics': {
      duration: '5 years',
      units: '180 units',
      description: 'Deals with electronic circuits, communications, and control systems.',
      careers: 'Electronics Engineer, Communications Engineer, Control Engineer, Embedded Systems Engineer'
    },
    'computer': {
      duration: '5 years',
      units: '180 units',
      description: 'Combines electrical engineering with computer science principles.',
      careers: 'Computer Engineer, Hardware Engineer, Systems Engineer, Network Engineer'
    },
    'chemical': {
      duration: '5 years',
      units: '180 units',
      description: 'Focuses on chemical processes, materials, and industrial applications.',
      careers: 'Chemical Engineer, Process Engineer, Materials Engineer, Environmental Engineer'
    },
    'industrial': {
      duration: '5 years',
      units: '180 units',
      description: 'Optimizes complex systems and processes for efficiency.',
      careers: 'Industrial Engineer, Operations Engineer, Quality Engineer, Supply Chain Engineer'
    }
  };
  
  const deptInfo = details[dept] || details['civil'];
  return `
    <h6>Program: ${name}</h6>
    <p><strong>Duration:</strong> ${deptInfo.duration}</p>
    <p><strong>Total Units:</strong> ${deptInfo.units}</p>
    <p><strong>Description:</strong> ${deptInfo.description}</p>
    <p><strong>Career Opportunities:</strong> ${deptInfo.careers}</p>
  `;
}

function getITDetails(dept, name) {
  const details = {
    'bsit': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on information technology systems, networks, and applications.',
      careers: 'IT Specialist, Network Administrator, Systems Analyst, Database Administrator'
    },
    'bscs': {
      duration: '4 years',
      units: '144 units',
      description: 'Emphasizes computer science theory, algorithms, and software development.',
      careers: 'Software Developer, Computer Scientist, Algorithm Engineer, Research Developer'
    },
    'bsis': {
      duration: '4 years',
      units: '144 units',
      description: 'Combines business and technology for information systems management.',
      careers: 'Business Analyst, IT Consultant, Systems Manager, Project Manager'
    },
    'bsemc': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on game development, multimedia, and digital entertainment.',
      careers: 'Game Developer, Multimedia Artist, 3D Animator, Digital Content Creator'
    },
    'bsai': {
      duration: '4 years',
      units: '144 units',
      description: 'Specializes in artificial intelligence, machine learning, and data science.',
      careers: 'AI Engineer, Machine Learning Engineer, Data Scientist, Research Scientist'
    },
    'bsds': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on data analysis, statistics, and business intelligence.',
      careers: 'Data Analyst, Business Intelligence Analyst, Data Engineer, Statistician'
    }
  };
  
  const deptInfo = details[dept] || details['bsit'];
  return `
    <h6>Program: ${name}</h6>
    <p><strong>Duration:</strong> ${deptInfo.duration}</p>
    <p><strong>Total Units:</strong> ${deptInfo.units}</p>
    <p><strong>Description:</strong> ${deptInfo.description}</p>
    <p><strong>Career Opportunities:</strong> ${deptInfo.careers}</p>
  `;
}

function getBusinessDetails(dept, name) {
  const details = {
    'bsba': {
      duration: '4 years',
      units: '144 units',
      description: 'Comprehensive business education covering all major business functions.',
      careers: 'Business Manager, Entrepreneur, Business Analyst, Operations Manager'
    },
    'bsa': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on accounting principles, financial reporting, and auditing.',
      careers: 'Accountant, Auditor, Financial Analyst, Tax Consultant'
    },
    'bsfm': {
      duration: '4 years',
      units: '144 units',
      description: 'Specializes in financial management, investments, and risk assessment.',
      careers: 'Financial Manager, Investment Analyst, Risk Manager, Financial Advisor'
    },
    'bsmm': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on marketing strategies, consumer behavior, and brand management.',
      careers: 'Marketing Manager, Brand Manager, Market Researcher, Digital Marketer'
    },
    'bshm': {
      duration: '4 years',
      units: '144 units',
      description: 'Prepares students for hospitality and tourism industry management.',
      careers: 'Hotel Manager, Restaurant Manager, Event Planner, Tourism Officer'
    },
    'bstm': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on tourism development, travel management, and hospitality.',
      careers: 'Tourism Manager, Travel Consultant, Tour Guide, Destination Manager'
    },
    'bsrm': {
      duration: '4 years',
      units: '144 units',
      description: 'Specializes in real estate development, management, and investment.',
      careers: 'Real Estate Manager, Property Developer, Real Estate Agent, Appraiser'
    }
  };
  
  const deptInfo = details[dept] || details['bsba'];
  return `
    <h6>Program: ${name}</h6>
    <p><strong>Duration:</strong> ${deptInfo.duration}</p>
    <p><strong>Total Units:</strong> ${deptInfo.units}</p>
    <p><strong>Description:</strong> ${deptInfo.description}</p>
    <p><strong>Career Opportunities:</strong> ${deptInfo.careers}</p>
  `;
}

function getEducationDetails(dept, name) {
  const details = {
    'bse': {
      duration: '4 years',
      units: '144 units',
      description: 'General education program preparing future educators.',
      careers: 'Teacher, Educational Administrator, Curriculum Developer, Educational Consultant'
    },
    'bse-english': {
      duration: '4 years',
      units: '144 units',
      description: 'Specializes in English language teaching and literature.',
      careers: 'English Teacher, Literature Teacher, Language Arts Specialist, ESL Instructor'
    },
    'bse-math': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on mathematics education and mathematical concepts.',
      careers: 'Math Teacher, Mathematics Specialist, Curriculum Developer, Math Tutor'
    },
    'bse-science': {
      duration: '4 years',
      units: '144 units',
      description: 'Prepares educators to teach various science subjects.',
      careers: 'Science Teacher, Biology Teacher, Chemistry Teacher, Physics Teacher'
    },
    'bse-social': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on social studies, history, and geography education.',
      careers: 'Social Studies Teacher, History Teacher, Geography Teacher, Civics Teacher'
    },
    'bse-filipino': {
      duration: '4 years',
      units: '144 units',
      description: 'Specializes in Filipino language and literature education.',
      careers: 'Filipino Teacher, Literature Teacher, Language Specialist, Cultural Educator'
    },
    'bse-pe': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on physical education and sports coaching.',
      careers: 'PE Teacher, Sports Coach, Fitness Instructor, Athletic Director'
    }
  };
  
  const deptInfo = details[dept] || details['bse'];
  return `
    <h6>Program: ${name}</h6>
    <p><strong>Duration:</strong> ${deptInfo.duration}</p>
    <p><strong>Total Units:</strong> ${deptInfo.units}</p>
    <p><strong>Description:</strong> ${deptInfo.description}</p>
    <p><strong>Career Opportunities:</strong> ${deptInfo.careers}</p>
  `;
}

function getArtsDetails(dept, name) {
  const details = {
    'bspsych': {
      duration: '4 years',
      units: '144 units',
      description: 'Studies human behavior, mental processes, and psychological principles.',
      careers: 'Psychologist, Counselor, Human Resources Specialist, Research Assistant'
    },
    'bsbio': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on living organisms, biological systems, and life sciences.',
      careers: 'Biologist, Research Scientist, Laboratory Technician, Environmental Specialist'
    },
    'bschem': {
      duration: '4 years',
      units: '144 units',
      description: 'Studies chemical composition, reactions, and molecular structures.',
      careers: 'Chemist, Laboratory Analyst, Quality Control Specialist, Research Chemist'
    },
    'bsmath': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on mathematical theory, analysis, and problem-solving.',
      careers: 'Mathematician, Statistician, Actuary, Data Analyst'
    },
    'bsphysics': {
      duration: '4 years',
      units: '144 units',
      description: 'Studies matter, energy, and the fundamental laws of nature.',
      careers: 'Physicist, Research Scientist, Engineering Consultant, Teacher'
    },
    'bscomm': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on communication theory, media, and public relations.',
      careers: 'Communications Specialist, Public Relations Officer, Media Producer, Journalist'
    },
    'bsenglish': {
      duration: '4 years',
      units: '144 units',
      description: 'Studies English literature, language, and communication.',
      careers: 'Writer, Editor, Content Creator, Language Specialist'
    }
  };
  
  const deptInfo = details[dept] || details['bspsych'];
  return `
    <h6>Program: ${name}</h6>
    <p><strong>Duration:</strong> ${deptInfo.duration}</p>
    <p><strong>Total Units:</strong> ${deptInfo.units}</p>
    <p><strong>Description:</strong> ${deptInfo.description}</p>
    <p><strong>Career Opportunities:</strong> ${deptInfo.careers}</p>
  `;
}

function getHealthDetails(dept, name) {
  const details = {
    'bsn': {
      duration: '4 years',
      units: '144 units',
      description: 'Prepares students for professional nursing practice and patient care.',
      careers: 'Registered Nurse, Nurse Practitioner, Nurse Educator, Clinical Nurse'
    },
    'bsmls': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on laboratory testing, diagnostics, and medical technology.',
      careers: 'Medical Laboratory Scientist, Lab Technician, Research Assistant, Quality Control Specialist'
    },
    'bspt': {
      duration: '4 years',
      units: '144 units',
      description: 'Prepares students for physical therapy and rehabilitation services.',
      careers: 'Physical Therapist, Rehabilitation Specialist, Sports Therapist, Pediatric Therapist'
    },
    'bsot': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on occupational therapy and helping patients regain daily living skills.',
      careers: 'Occupational Therapist, Rehabilitation Specialist, Pediatric Therapist, Geriatric Therapist'
    },
    'bspharm': {
      duration: '4 years',
      units: '144 units',
      description: 'Prepares students for pharmaceutical practice and drug therapy management.',
      careers: 'Pharmacist, Clinical Pharmacist, Pharmaceutical Researcher, Drug Safety Specialist'
    },
    'bsmt': {
      duration: '4 years',
      units: '144 units',
      description: 'Focuses on medical technology and laboratory diagnostics.',
      careers: 'Medical Technologist, Laboratory Manager, Research Scientist, Quality Assurance Specialist'
    },
    'bsrt': {
      duration: '4 years',
      units: '144 units',
      description: 'Prepares students for radiologic technology and medical imaging.',
      careers: 'Radiologic Technologist, MRI Technician, CT Technician, Ultrasound Technician'
    }
  };
  
  const deptInfo = details[dept] || details['bsn'];
  return `
    <h6>Program: ${name}</h6>
    <p><strong>Duration:</strong> ${deptInfo.duration}</p>
    <p><strong>Total Units:</strong> ${deptInfo.units}</p>
    <p><strong>Description:</strong> ${deptInfo.description}</p>
    <p><strong>Career Opportunities:</strong> ${deptInfo.careers}</p>
  `;
}

function showDepartmentModal(title, content) {
  // Create modal HTML
  const modalHTML = `
    <div class="modal fade" id="departmentModal" tabindex="-1" aria-labelledby="departmentModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="departmentModalLabel">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <a href="register.html" class="btn btn-primary">Apply Now</a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Remove existing modal if any
  const existingModal = document.getElementById('departmentModal');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById('departmentModal'));
  modal.show();
}

// About Page Secondary Navigation Functions
document.addEventListener('DOMContentLoaded', function() {
  // Handle secondary navigation active states (only for the secondary nav with bg-light class)
  const secondaryNavLinks = document.querySelectorAll('.navbar-light.bg-light .navbar-nav .nav-link');
  
  secondaryNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all secondary nav links
      secondaryNavLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
    });
  });
  
  // Update active state based on scroll position
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
  
  // Add scroll event listener
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Initial call to set active state
  updateActiveNavLink();
});

// Scroll to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    });
    
    // Smooth scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
