document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = "1";
        scrollToTopBtn.style.transform = "translateY(0)";
      } else {
        scrollToTopBtn.style.opacity = "0";
        scrollToTopBtn.style.transform = "translateY(20px)";
      }
    });

    scrollToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const cards = document.querySelectorAll(
    ".stat-card, .college-card, .testimonial-card, .news-card, .event-card"
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  const formControls = document.querySelectorAll(".form-control, .form-select");
  formControls.forEach((control) => {
    control.addEventListener("focus", function () {
      this.parentElement.style.transform = "translateY(-2px)";
    });

    control.addEventListener("blur", function () {
      this.parentElement.style.transform = "translateY(0)";
    });
  });

  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });

    button.addEventListener("mousedown", function () {
      this.style.transform = "translateY(-1px)";
    });

    button.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-3px)";
    });
  });

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.02)";
    });

    searchInput.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)";
    });
  }

  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("show.bs.modal", function () {
      this.querySelector(".modal-content").style.transform = "scale(0.8)";
      this.querySelector(".modal-content").style.opacity = "0";
    });

    modal.addEventListener("shown.bs.modal", function () {
      this.querySelector(".modal-content").style.transition = "all 0.3s ease";
      this.querySelector(".modal-content").style.transform = "scale(1)";
      this.querySelector(".modal-content").style.opacity = "1";
    });
  });

  const musicPlayer = document.getElementById("musicPlayer");
  if (musicPlayer) {
    musicPlayer.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-1px) scale(1.02)";
    });

    musicPlayer.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  }

  const statNumbers = document.querySelectorAll(".stat-number[data-count]");
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute("data-count"));
        animateCounter(target, count);
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  statNumbers.forEach((stat) => {
    observer.observe(stat);
  });

  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("fade-in");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });

  const heroSection = document.querySelector(".bg-main");
  if (heroSection) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }

  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll(".testimonial-card");

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.opacity = i === index ? "1" : "0.5";
      testimonial.style.transform = i === index ? "scale(1)" : "scale(0.95)";
    });
  }

  if (testimonials.length > 0) {
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      const successMessage = document.createElement("div");
      successMessage.className = "alert alert-success mt-3";
      successMessage.innerHTML = `
        <i class="bi bi-check-circle"></i>
        Thank you for subscribing! We'll keep you updated with the latest news.
      `;

      this.appendChild(successMessage);
      this.reset();

      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab" && e.target === document.body) {
      e.preventDefault();
      const mainContent = document.querySelector("main");
      if (mainContent) {
        mainContent.focus();
      }
    }
  });

  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", function () {
      navbarCollapse.classList.toggle("show");
    });

    document.addEventListener("click", function (e) {
      if (
        !navbarToggler.contains(e.target) &&
        !navbarCollapse.contains(e.target)
      ) {
        navbarCollapse.classList.remove("show");
      }
    });
  }
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

function initializePreloader() {
  const preloader = document.getElementById("preloader");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");

  if (!preloader) return;

  document.body.classList.add("preloading");

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
        preloader.classList.add("fade-out");

        setTimeout(() => {
          preloader.remove();
          document.body.classList.remove("preloading");
          triggerContentAnimations();
        }, 800);
      }, 600);
    }
  }, 60);
}

function triggerContentAnimations() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }
  const animatedElements = document.querySelectorAll("[data-aos]");
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";

    setTimeout(() => {
      element.style.transition = "all 0.8s ease-in-out";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, 200);
  });
}

function initializeEnhancedSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.createElement("div");
  searchResults.className = "search-results";
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
    searchInput.parentElement.style.position = "relative";
    searchInput.parentElement.appendChild(searchResults);

    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      if (query.length > 2) {
        const results = [
          "Computer Science Program",
          "Engineering Department",
          "Business Administration",
          "Student Portal",
          "Academic Calendar",
        ].filter((item) => item.toLowerCase().includes(query));

        displaySearchResults(results);
      } else {
        searchResults.style.display = "none";
      }
    });

    searchInput.addEventListener("blur", function () {
      setTimeout(() => {
        searchResults.style.display = "none";
      }, 200);
    });
  }
}

function displaySearchResults(results) {
  const searchResults = document.querySelector(".search-results");
  if (results.length > 0) {
    searchResults.innerHTML = results
      .map(
        (result) => `
      <div class="search-result-item" style="padding: 12px 16px; border-bottom: 1px solid #eee; cursor: pointer; transition: background 0.3s ease;">
        <i class="bi bi-search me-2"></i>${result}
      </div>
    `
      )
      .join("");
    searchResults.style.display = "block";
  } else {
    searchResults.innerHTML =
      '<div style="padding: 16px; text-align: center; color: #666;">No results found</div>';
    searchResults.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const musicPlayer = document.getElementById("musicPlayer");
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");
  const backgroundMusic = document.getElementById("backgroundMusic");
  const volumeSlider = document.getElementById("volumeSlider");
  const volumeIcon = document.getElementById("volumeIcon");

  if (musicToggle && backgroundMusic) {
    musicToggle.addEventListener("click", function () {
      if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicIcon.className = "bi bi-pause-fill";
        musicToggle.classList.add("playing");
      } else {
        backgroundMusic.pause();
        musicIcon.className = "bi bi-play-fill";
        musicToggle.classList.remove("playing");
      }
    });
  }

  if (volumeSlider && backgroundMusic) {
    backgroundMusic.volume = 0.1;
    volumeSlider.value = 10;
    updateVolumeIcon(10);

    volumeSlider.addEventListener("input", function () {
      backgroundMusic.volume = this.value / 100;
      updateVolumeIcon(this.value);
    });
  }

  if (volumeIcon) {
    volumeIcon.addEventListener("click", function () {
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
        volumeIcon.className = "bi bi-volume-mute";
      } else if (volume < 50) {
        volumeIcon.className = "bi bi-volume-down";
      } else {
        volumeIcon.className = "bi bi-volume-up";
      }
    }
  }

  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = "flex";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    });

    scrollToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const mainNavbar = document.querySelector(".navbar");
  const heroSection = document.querySelector(".bg-main");

  if (heroSection && mainNavbar) {
    function updateNavbarBackground() {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollPosition = window.pageYOffset + 100;

      if (scrollPosition > heroBottom) {
        mainNavbar.classList.add("scrolled");
      } else {
        mainNavbar.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", updateNavbarBackground);

    updateNavbarBackground();
  }

  const statNumbers = document.querySelectorAll(".stat-number[data-count]");
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute("data-count"));
        animateCounter(target, count);
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  statNumbers.forEach((stat) => {
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

  initializeAuthentication();
});

let users = JSON.parse(localStorage.getItem("iscp_users")) || [];
let currentUser = JSON.parse(localStorage.getItem("iscp_current_user")) || null;

function initializeAuthentication() {
  initializeLoginForm();

  initializeRegistrationForm();

  initializeCollegeProgramDependency();

  if (currentUser) {
    updateUIForLoggedInUser();
  }
}

function initializeLoginForm() {
  const loginForm = document.querySelector(".login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
}

function handleLogin(e) {
  e.preventDefault();

  const studentId = document.getElementById("studentId").value.trim();
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  clearFormErrors("login");

  if (!studentId || !password) {
    showFormError("login", "Please fill in all fields.");
    return;
  }

  const user = users.find((u) => u.studentId === studentId);

  if (!user) {
    showFormError(
      "login",
      "Student ID not found. Please check your credentials or register for a new account."
    );
    return;
  }

  if (user.password !== password) {
    showFormError("login", "Invalid password. Please try again.");
    return;
  }

  currentUser = user;
  localStorage.setItem("iscp_current_user", JSON.stringify(currentUser));

  if (rememberMe) {
    localStorage.setItem("iscp_remember_me", "true");
  }

  updateUIForLoggedInUser();

  const loginModal = bootstrap.Modal.getInstance(
    document.getElementById("loginModal")
  );
  if (loginModal) {
    loginModal.hide();
  }

  showSuccessMessage("Login successful! Welcome back, " + user.firstName + "!");
}

function initializeRegistrationForm() {
  const registrationForm = document.querySelector(".registration-form");
  if (registrationForm) {
    registrationForm.addEventListener("submit", handleRegistration);
  }
}

function handleRegistration(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const userData = {
    firstName: formData.get("firstName").trim(),
    lastName: formData.get("lastName").trim(),
    studentId: formData.get("studentId").trim(),
    email: formData.get("email").trim(),
    phone: formData.get("phone").trim(),
    birthDate: formData.get("birthDate"),
    college: formData.get("college"),
    program: formData.get("program"),
    username: formData.get("username").trim(),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    terms: formData.get("terms"),
  };

  clearFormErrors("register");

  const validation = validateRegistrationForm(userData);
  if (!validation.isValid) {
    showFormError("register", validation.message);
    return;
  }

  if (users.find((u) => u.studentId === userData.studentId)) {
    showFormError(
      "register",
      "Student ID already exists. Please use a different ID or try logging in."
    );
    return;
  }

  if (users.find((u) => u.email === userData.email)) {
    showFormError(
      "register",
      "Email already exists. Please use a different email or try logging in."
    );
    return;
  }

  if (users.find((u) => u.username === userData.username)) {
    showFormError(
      "register",
      "Username already exists. Please choose a different username."
    );
    return;
  }

  const newUser = {
    id: Date.now().toString(),
    firstName: userData.firstName,
    lastName: userData.lastName,
    studentId: userData.studentId,
    email: userData.email,
    phone: userData.phone,
    birthDate: userData.birthDate,
    college: userData.college,
    program: userData.program,
    username: userData.username,
    password: userData.password,
    dateCreated: new Date().toISOString(),
    isActive: true,
  };

  users.push(newUser);
  localStorage.setItem("iscp_users", JSON.stringify(users));

  currentUser = newUser;
  localStorage.setItem("iscp_current_user", JSON.stringify(currentUser));

  updateUIForLoggedInUser();

  const loginModal = bootstrap.Modal.getInstance(
    document.getElementById("loginModal")
  );
  if (loginModal) {
    loginModal.hide();
  }

  showSuccessMessage(
    "Registration successful! Welcome to ISCP, " + newUser.firstName + "!"
  );

  e.target.reset();
}

function validateRegistrationForm(userData) {
  const requiredFields = [
    "firstName",
    "lastName",
    "studentId",
    "email",
    "phone",
    "birthDate",
    "college",
    "program",
    "username",
    "password",
    "confirmPassword",
  ];

  for (let field of requiredFields) {
    if (!userData[field]) {
      return { isValid: false, message: "Please fill in all required fields." };
    }
  }

  if (!userData.terms) {
    return {
      isValid: false,
      message: "Please agree to the Terms and Conditions.",
    };
  }

  if (userData.firstName.length < 2) {
    return {
      isValid: false,
      message: "First name must be at least 2 characters long.",
    };
  }

  if (userData.lastName.length < 2) {
    return {
      isValid: false,
      message: "Last name must be at least 2 characters long.",
    };
  }

  const studentIdRegex = /^\d{4}-\d{5}$/;
  if (!studentIdRegex.test(userData.studentId)) {
    return {
      isValid: false,
      message: "Student ID must be in format YYYY-XXXXX (e.g., 2024-12345).",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    return { isValid: false, message: "Please enter a valid email address." };
  }

  const phoneRegex = /^(\+63|0)?9\d{9}$/;
  if (!phoneRegex.test(userData.phone.replace(/\s/g, ""))) {
    return {
      isValid: false,
      message: "Please enter a valid Philippine mobile number.",
    };
  }

  if (userData.username.length < 6) {
    return {
      isValid: false,
      message: "Username must be at least 6 characters long.",
    };
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(userData.username)) {
    return {
      isValid: false,
      message: "Username can only contain letters, numbers, and underscores.",
    };
  }

  if (userData.password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long.",
    };
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(userData.password)) {
    return {
      isValid: false,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    };
  }

  if (userData.password !== userData.confirmPassword) {
    return { isValid: false, message: "Passwords do not match." };
  }

  const birthDate = new Date(userData.birthDate);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 16) {
    return {
      isValid: false,
      message: "You must be at least 16 years old to register.",
    };
  }

  return { isValid: true };
}

function initializeCollegeProgramDependency() {
  const collegeSelect = document.getElementById("modalCollege");
  const programSelect = document.getElementById("modalProgram");

  if (collegeSelect && programSelect) {
    collegeSelect.addEventListener("change", updateProgramOptions);
  }
}

function updateProgramOptions() {
  const collegeSelect = document.getElementById("modalCollege");
  const programSelect = document.getElementById("modalProgram");

  if (!collegeSelect || !programSelect) return;

  const selectedCollege = collegeSelect.value;

  programSelect.innerHTML = '<option value="">Select Program</option>';

  if (!selectedCollege) {
    programSelect.innerHTML +=
      '<option value="" disabled>Please select a college first</option>';
    return;
  }

  const programs = {
    engineering: [
      { value: "civil", text: "Civil Engineering" },
      { value: "mechanical", text: "Mechanical Engineering" },
      { value: "electrical", text: "Electrical Engineering" },
      { value: "electronics", text: "Electronics Engineering" },
      { value: "computer", text: "Computer Engineering" },
      { value: "chemical", text: "Chemical Engineering" },
      { value: "industrial", text: "Industrial Engineering" },
    ],
    it: [
      { value: "bsit", text: "BS Information Technology" },
      { value: "bscs", text: "BS Computer Science" },
      { value: "bsis", text: "BS Information Systems" },
      { value: "bsemc", text: "BS Entertainment and Multimedia Computing" },
      { value: "bsai", text: "BS Artificial Intelligence" },
      { value: "bsds", text: "BS Data Science" },
    ],
    business: [
      { value: "bsba", text: "BS Business Administration" },
      { value: "bsa", text: "BS Accountancy" },
      { value: "bsfm", text: "BS Financial Management" },
      { value: "bsmm", text: "BS Marketing Management" },
      { value: "bshm", text: "BS Hospitality Management" },
      { value: "bstm", text: "BS Tourism Management" },
      { value: "bsrm", text: "BS Real Estate Management" },
    ],
    education: [
      { value: "bse", text: "BS Education" },
      { value: "bse-english", text: "BS Education - English" },
      { value: "bse-math", text: "BS Education - Mathematics" },
      { value: "bse-science", text: "BS Education - Science" },
      { value: "bse-social", text: "BS Education - Social Studies" },
      { value: "bse-filipino", text: "BS Education - Filipino" },
      { value: "bse-pe", text: "BS Education - Physical Education" },
    ],
    arts: [
      { value: "bspsych", text: "BS Psychology" },
      { value: "bsbio", text: "BS Biology" },
      { value: "bschem", text: "BS Chemistry" },
      { value: "bsmath", text: "BS Mathematics" },
      { value: "bsphysics", text: "BS Physics" },
      { value: "bscomm", text: "BS Communication" },
      { value: "bsenglish", text: "BS English" },
    ],
    health: [
      { value: "bsn", text: "BS Nursing" },
      { value: "bsmls", text: "BS Medical Laboratory Science" },
      { value: "bspt", text: "BS Physical Therapy" },
      { value: "bsot", text: "BS Occupational Therapy" },
      { value: "bspharm", text: "BS Pharmacy" },
      { value: "bsmt", text: "BS Medical Technology" },
      { value: "bsrt", text: "BS Radiologic Technology" },
    ],
  };

  if (programs[selectedCollege]) {
    programs[selectedCollege].forEach((program) => {
      const option = document.createElement("option");
      option.value = program.value;
      option.textContent = program.text;
      programSelect.appendChild(option);
    });
  }
}

function updateUIForLoggedInUser() {
  if (!currentUser) return;

  const loginButton = document.querySelector('a[data-bs-target="#loginModal"]');
  if (loginButton) {
    const dropdownContainer = document.createElement("div");
    dropdownContainer.className = "dropdown";
    dropdownContainer.innerHTML = `
      <a class="nav-link dropdown-toggle" href="#" role="button" onclick="toggleDropdown(event)" aria-expanded="false">
        <i class="bi bi-person-circle"></i> ${currentUser.firstName}
      </a>
      <ul class="dropdown-menu" id="userDropdownMenu">
        <li><a class="dropdown-item" href="#" onclick="showUserProfile()">
          <i class="bi bi-person"></i> Profile
        </a></li>
        <li><a class="dropdown-item" href="#" onclick="logout()">
          <i class="bi bi-box-arrow-right"></i> Logout
        </a></li>
      </ul>
    `;

    loginButton.parentNode.replaceChild(dropdownContainer, loginButton);

    setTimeout(() => {
      const dropdownMenu = document.getElementById("userDropdownMenu");
      if (dropdownMenu) {
        console.log("Making dropdown visible for testing");
        dropdownMenu.style.display = "block";
        dropdownMenu.style.opacity = "1";
        dropdownMenu.style.visibility = "visible";
        dropdownMenu.style.transform = "translateY(0)";
      }
    }, 1000);
  }
}

function toggleDropdown(event) {
  event.preventDefault();
  event.stopPropagation();

  console.log("Dropdown toggle clicked");

  const dropdownMenu = document.getElementById("userDropdownMenu");
  console.log("Dropdown menu found:", dropdownMenu);

  if (dropdownMenu) {
    const isVisible = dropdownMenu.classList.contains("show");
    console.log("Is visible:", isVisible);

    document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
      if (menu !== dropdownMenu) {
        menu.classList.remove("show");
      }
    });

    if (isVisible) {
      dropdownMenu.classList.remove("show");
      console.log("Hiding dropdown");
    } else {
      dropdownMenu.classList.add("show");
      console.log("Showing dropdown");
    }
  } else {
    console.log("Dropdown menu not found!");
  }
}

document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".dropdown");
  const dropdownMenu = document.getElementById("userDropdownMenu");

  if (dropdown && dropdownMenu && !dropdown.contains(event.target)) {
    dropdownMenu.classList.remove("show");
  }
});

function showUserProfile() {
  if (!currentUser) return;

  const dropdownMenu = document.getElementById("userDropdownMenu");
  if (dropdownMenu) {
    dropdownMenu.classList.remove("show");
  }

  const profileModal = createProfileModal();
  document.body.appendChild(profileModal);

  const modal = new bootstrap.Modal(profileModal);
  modal.show();

  profileModal.addEventListener("hidden.bs.modal", () => {
    document.body.removeChild(profileModal);
  });
}

function createProfileModal() {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "profileModal";
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">User Profile</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4 text-center">
              <div class="profile-avatar mb-3">
                <i class="bi bi-person-circle display-1 text-primary"></i>
              </div>
              <h4>${currentUser.firstName} ${currentUser.lastName}</h4>
              <p class="text-muted">${currentUser.studentId}</p>
            </div>
            <div class="col-md-8">
              <h5>Personal Information</h5>
              <table class="table table-borderless">
                <tr>
                  <td><strong>Full Name:</strong></td>
                  <td>${currentUser.firstName} ${currentUser.lastName}</td>
                </tr>
                <tr>
                  <td><strong>Student ID:</strong></td>
                  <td>${currentUser.studentId}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>${currentUser.email}</td>
                </tr>
                <tr>
                  <td><strong>Phone:</strong></td>
                  <td>${currentUser.phone}</td>
                </tr>
                <tr>
                  <td><strong>Birth Date:</strong></td>
                  <td>${new Date(
                    currentUser.birthDate
                  ).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td><strong>College:</strong></td>
                  <td>${getCollegeName(currentUser.college)}</td>
                </tr>
                <tr>
                  <td><strong>Program:</strong></td>
                  <td>${getProgramName(
                    currentUser.college,
                    currentUser.program
                  )}</td>
                </tr>
                <tr>
                  <td><strong>Username:</strong></td>
                  <td>${currentUser.username}</td>
                </tr>
                <tr>
                  <td><strong>Member Since:</strong></td>
                  <td>${new Date(
                    currentUser.dateCreated
                  ).toLocaleDateString()}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="editProfile()">Edit Profile</button>
        </div>
      </div>
    </div>
  `;
  return modal;
}

function getCollegeName(collegeKey) {
  const colleges = {
    engineering: "College of Engineering",
    it: "College of Information Technology",
    business: "College of Business Administration",
    education: "College of Education",
    arts: "College of Arts and Sciences",
    health: "College of Health Sciences",
  };
  return colleges[collegeKey] || collegeKey;
}

function getProgramName(collegeKey, programKey) {
  const programs = {
    engineering: {
      civil: "Civil Engineering",
      mechanical: "Mechanical Engineering",
      electrical: "Electrical Engineering",
      electronics: "Electronics Engineering",
      computer: "Computer Engineering",
      chemical: "Chemical Engineering",
      industrial: "Industrial Engineering",
    },
    it: {
      bsit: "BS Information Technology",
      bscs: "BS Computer Science",
      bsis: "BS Information Systems",
      bsemc: "BS Entertainment and Multimedia Computing",
      bsai: "BS Artificial Intelligence",
      bsds: "BS Data Science",
    },
    business: {
      bsba: "BS Business Administration",
      bsa: "BS Accountancy",
      bsfm: "BS Financial Management",
      bsmm: "BS Marketing Management",
      bshm: "BS Hospitality Management",
      bstm: "BS Tourism Management",
      bsrm: "BS Real Estate Management",
    },
    education: {
      bse: "BS Education",
      "bse-english": "BS Education - English",
      "bse-math": "BS Education - Mathematics",
      "bse-science": "BS Education - Science",
      "bse-social": "BS Education - Social Studies",
      "bse-filipino": "BS Education - Filipino",
      "bse-pe": "BS Education - Physical Education",
    },
    arts: {
      bspsych: "BS Psychology",
      bsbio: "BS Biology",
      bschem: "BS Chemistry",
      bsmath: "BS Mathematics",
      bsphysics: "BS Physics",
      bscomm: "BS Communication",
      bsenglish: "BS English",
    },
    health: {
      bsn: "BS Nursing",
      bsmls: "BS Medical Laboratory Science",
      bspt: "BS Physical Therapy",
      bsot: "BS Occupational Therapy",
      bspharm: "BS Pharmacy",
      bsmt: "BS Medical Technology",
      bsrt: "BS Radiologic Technology",
    },
  };

  return programs[collegeKey]?.[programKey] || programKey;
}

function editProfile() {
  const profileModal = bootstrap.Modal.getInstance(
    document.getElementById("profileModal")
  );
  if (profileModal) {
    profileModal.hide();
  }

  alert(
    "Profile editing functionality would be implemented here. For now, you can re-register with updated information."
  );
}

function logout() {
  currentUser = null;
  localStorage.removeItem("iscp_current_user");
  localStorage.removeItem("iscp_remember_me");

  const dropdownContainer = document.querySelector(".dropdown");
  if (dropdownContainer) {
    const loginButton = document.createElement("a");
    loginButton.className = "nav-link";
    loginButton.href = "#";
    loginButton.setAttribute("data-bs-toggle", "modal");
    loginButton.setAttribute("data-bs-target", "#loginModal");
    loginButton.innerHTML = '<i class="bi bi-person-circle"></i> Login';

    dropdownContainer.parentNode.replaceChild(loginButton, dropdownContainer);
  }

  showSuccessMessage("You have been logged out successfully.");
}

function showFormError(formType, message) {
  const form =
    formType === "login"
      ? document.querySelector(".login-form")
      : document.querySelector(".registration-form");

  if (!form) return;

  const existingError = form.querySelector(".form-error");
  if (existingError) {
    existingError.remove();
  }

  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger form-error mt-3";
  errorDiv.innerHTML = `<i class="bi bi-exclamation-triangle"></i> ${message}`;

  form.appendChild(errorDiv);

  errorDiv.scrollIntoView({ behavior: "smooth", block: "center" });
}

function clearFormErrors(formType) {
  const form =
    formType === "login"
      ? document.querySelector(".login-form")
      : document.querySelector(".registration-form");

  if (!form) return;

  const existingError = form.querySelector(".form-error");
  if (existingError) {
    existingError.remove();
  }
}

function showSuccessMessage(message) {
  const successDiv = document.createElement("div");
  successDiv.className = "alert alert-success position-fixed";
  successDiv.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
  successDiv.innerHTML = `<i class="bi bi-check-circle"></i> ${message}`;

  document.body.appendChild(successDiv);

  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.parentNode.removeChild(successDiv);
    }
  }, 5000);
}
