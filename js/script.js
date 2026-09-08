/* STRICT MODE */

"use strict";

/* DOM ELEMENTS */

// Header / Navigation

const header = document.querySelector(".header");

const navLinks = document.querySelectorAll(".nav-link");

// Sections

const sections = document.querySelectorAll("section");

// Back to top button

const backToTop = document.querySelector(".back-to-top");

// Footer year

const copyright = document.querySelector(".copyright");

// Statistics

const statNumbers = document.querySelectorAll(".stat-card h2");

// Skill progress bars

const progressBars = document.querySelectorAll(".progress");

/* UTILITY FUNCTIONS */

/*
    Function:
    Add class to element

    Usage:
    addClass(element,"active");
*/

function addClass(element, className) {
  if (element) {
    element.classList.add(className);
  }
}

/*
    Function:
    Remove class from element

*/

function removeClass(element, className) {
  if (element) {
    element.classList.remove(className);
  }
}

/*
    Function:
    Toggle class

*/

function toggleClass(element, className) {
  if (element) {
    element.classList.toggle(className);
  }
}

/*
    Function:
    Check if element exists

*/

function elementExists(element) {
  return element !== null;
}

/* CURRENT YEAR UPDATE */

/*
    Automatically updates footer year.
*/

function updateCopyrightYear() {
  if (copyright) {
    const currentYear = new Date().getFullYear();

    copyright.innerHTML = `
        © ${currentYear} Dennis Maina.
        All Rights Reserved.
        `;
  }
}

updateCopyrightYear();

/* PAGE LOAD EVENT */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  console.log("Portfolio website loaded successfully.");
});

/* INITIAL SETTINGS */

/*

    This prepares the set of elements that get scroll-reveal
    treatment further down in this file (see ".reveal" classes
    in styles.css).

*/

const animatedElements = document.querySelectorAll(
  `
    .skill-card,
    .service-card,
    .project-card,
    .timeline-content,
    .education-card,
    .certificate-card,
    .testimonial-card
    `,
);

/* CONSOLE MESSAGE */

console.log(
  `
====================================
 Portfolio Script Initialized 🚀

 Built with:
 - HTML5
 - CSS3
 - Vanilla JavaScript

====================================
`,
);

/* PART 2: MOBILE NAVIGATION */

/*
    Creates a mobile hamburger menu dynamically.

    Desktop:
    Logo | Navigation Links | CV Button

    Mobile:
    Logo | Hamburger Button

    Click:
    Opens navigation menu

*/

const navbar = document.querySelector(".navbar");

const navMenu = document.querySelector(".nav-menu");

const downloadButton = document.querySelector(".navbar .btn");

/* CREATE MENU BUTTON */

const menuToggle = document.createElement("button");

menuToggle.classList.add("menu-toggle");

menuToggle.innerHTML = `

    <span></span>
    <span></span>
    <span></span>

`;

/*
    Insert hamburger button into navbar

*/

if (navbar) {
  navbar.insertBefore(menuToggle, downloadButton);
}

/* MOBILE MENU OPEN / CLOSE */

function openMobileMenu() {
  navMenu.classList.add("active");

  menuToggle.classList.add("active");

  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  navMenu.classList.remove("active");

  menuToggle.classList.remove("active");

  document.body.classList.remove("menu-open");
}

/* HAMBURGER CLICK EVENT */

menuToggle.addEventListener(
  "click",

  () => {
    if (navMenu.classList.contains("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  },
);

/* CLOSE MENU AFTER CLICK */

navLinks.forEach((link) => {
  link.addEventListener(
    "click",

    () => {
      closeMobileMenu();
    },
  );
});

/* CLOSE MENU OUTSIDE CLICK */

document.addEventListener(
  "click",

  (event) => {
    const clickedInsideNavbar = navbar.contains(event.target);

    if (!clickedInsideNavbar && navMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  },
);

/* CLOSE MENU WITH ESC KEY */

document.addEventListener(
  "keydown",

  (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  },
);

/* NAVBAR SCROLL EFFECT */

/*

    When the user scrolls:

    Before scrolling:
    Normal transparent navbar

    After scrolling:
    Adds background + shadow

    (Styles for ".header.scrolled" live in styles.css)

*/

function handleNavbarScroll() {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener(
  "scroll",

  handleNavbarScroll,
);

/* ACTIVE NAVIGATION LINK */

function updateActiveNavigation() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const linkTarget = link.getAttribute("href");

    if (linkTarget === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

window.addEventListener(
  "scroll",

  updateActiveNavigation,
);

/* SMOOTH SECTION SCROLLING */

navLinks.forEach((link) => {
  link.addEventListener(
    "click",

    function (event) {
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",

          block: "start",
        });
      }
    },
  );
});

/* BACK TO TOP BUTTON */

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener(
  "scroll",

  toggleBackToTop,
);

if (backToTop) {
  backToTop.addEventListener(
    "click",

    function (event) {
      event.preventDefault();

      window.scrollTo({
        top: 0,

        behavior: "smooth",
      });
    },
  );
}

/* HERO MOUSE PARALLAX EFFECT */

const heroImage = document.querySelector(".hero-image");

if (heroImage) {
  document.addEventListener(
    "mousemove",

    (event) => {
      const x = (window.innerWidth / 2 - event.clientX) / 40;

      const y = (window.innerHeight / 2 - event.clientY) / 40;

      heroImage.style.transform = `

                translate(
                    ${x}px,
                    ${y}px
                )

            `;
    },
  );
}

/* HERO BUTTON RIPPLE EFFECT */

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener(
    "click",

    function (event) {
      const ripple = document.createElement("span");

      const rect = this.getBoundingClientRect();

      const size = Math.max(rect.width, rect.height);

      const x = event.clientX - rect.left - size / 2;

      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = size + "px";

      ripple.style.height = size + "px";

      ripple.style.left = x + "px";

      ripple.style.top = y + "px";

      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(
        () => {
          ripple.remove();
        },

        600,
      );
    },
  );
});

/* SCROLL REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(
  `

    .skill-card,

    .service-card,

    .project-card,

    .timeline-content,

    .education-card,

    .certificate-card,

    .testimonial-card,

    .stat-card,

    .tech-grid span,

    .contact-item

    `,
);

/* ADD REVEAL CLASSES */

revealElements.forEach((element, index) => {
  element.classList.add("reveal");

  element.style.transitionDelay = `${(index % 5) * 100}ms`;
});

/* INTERSECTION OBSERVER */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        /*
                        Stop observing after animation

                    */

        revealObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.15,

    rootMargin: "0px 0px -80px 0px",
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* SECTION HEADER ANIMATION */

const sectionHeaders = document.querySelectorAll(".section-header");

sectionHeaders.forEach((header) => {
  header.classList.add("reveal");

  revealObserver.observe(header);
});

/* IMAGE REVEAL EFFECT */

const images = document.querySelectorAll(
  ".project-placeholder, .profile-placeholder",
);

images.forEach((image) => {
  image.classList.add("reveal-scale");

  revealObserver.observe(image);
});

/* SKILL PROGRESS BARS */

progressBars.forEach((bar) => {
  const finalWidth = bar.style.width;

  bar.style.width = "0";

  bar.dataset.width = finalWidth;
});

const skillSection = document.querySelector(".skills");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        progressBars.forEach((bar) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, 300);
        });

        skillObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.3,
  },
);

if (skillSection) {
  skillObserver.observe(skillSection);
}

/* STATISTICS COUNTER */

function animateCounter(element) {
  const target = parseInt(element.innerText);

  let current = 0;

  const increment = Math.ceil(target / 80);

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      current = target;

      clearInterval(timer);
    }

    element.innerText = current + "+";
  }, 30);
}

const statsSection = document.querySelector(".stats");

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statNumbers.forEach((number) => {
          animateCounter(number);
        });

        statsObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.5,
  },
);

if (statsSection) {
  statsObserver.observe(statsSection);
}

/* NUMBER FORMATTING */

function formatNumber(number) {
  return number.toLocaleString();
}

/* EXPERIENCE YEARS AUTO UPDATE */

const experienceElement = document.querySelector(".experience-years");

if (experienceElement) {
  const startingYear = 2022;

  const currentYear = new Date().getFullYear();

  const years = currentYear - startingYear;

  experienceElement.innerText = years + "+";
}

/* CREATE THEME BUTTON */

const themeButton = document.createElement("button");

themeButton.classList.add("theme-toggle");

themeButton.innerHTML = "☀️";

if (navbar) {
  navbar.appendChild(themeButton);
}

/* THEME STORAGE */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");

  themeButton.innerHTML = "🌙";
}

/* THEME SWITCH FUNCTION */

function toggleTheme() {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");

  if (isLight) {
    themeButton.innerHTML = "🌙";

    localStorage.setItem(
      "portfolio-theme",

      "light",
    );
  } else {
    themeButton.innerHTML = "☀️";

    localStorage.setItem(
      "portfolio-theme",

      "dark",
    );
  }
}

themeButton.addEventListener(
  "click",

  toggleTheme,
);

/* CONTACT FORM VALIDATION */

const contactForm = document.querySelector(".contact-form");

const formInputs = document.querySelectorAll(
  ".contact-form input, .contact-form textarea",
);

/* CREATE MESSAGE BOX */

const formMessage = document.createElement("div");

formMessage.classList.add("form-message");

if (contactForm) {
  contactForm.appendChild(formMessage);
}

/* EMAIL VALIDATION */

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

/* SHOW ERROR */

function showError(input, message) {
  const parent = input.parentElement;

  input.classList.add("error");

  const error = document.createElement("small");

  error.classList.add("error-message");

  error.innerText = message;

  parent.appendChild(error);
}

/* CLEAR ERRORS */

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((error) => {
    error.remove();
  });

  formInputs.forEach((input) => {
    input.classList.remove("error");
  });
}

/* SHOW FORM RESPONSE */

function showFormMessage(message, type) {
  formMessage.innerText = message;

  formMessage.className = "form-message " + type;
}

/* FORM SUBMIT EVENT */

if (contactForm) {
  contactForm.addEventListener(
    "submit",

    function (event) {
      event.preventDefault();

      clearErrors();

      let isValid = true;

      const name = contactForm.querySelector("input[type='text']");

      const email = contactForm.querySelector("input[type='email']");

      const message = contactForm.querySelector("textarea");

      /* Name validation */

      if (!name.value.trim()) {
        showError(name, "Please enter your name.");

        isValid = false;
      }

      /* Email validation */

      if (!email.value.trim()) {
        showError(email, "Please enter your email.");

        isValid = false;
      } else if (!validateEmail(email.value)) {
        showError(email, "Please enter a valid email address.");

        isValid = false;
      }

      /* Message validation */

      if (!message.value.trim()) {
        showError(message, "Please enter your message.");

        isValid = false;
      } else if (message.value.length < 20) {
        showError(
          message,

          "Message should be at least 20 characters.",
        );

        isValid = false;
      }

      /* Success */

      if (isValid) {
        showFormMessage(
          "✓ Message sent successfully! I will get back to you soon.",

          "success",
        );

        contactForm.reset();
      }
    },
  );
}

/* ADVANCED PREMIUM EFFECTS */

/* PAGE LOADING SCREEN */

/* Creates loader automatically. */

const loader = document.createElement("div");

loader.classList.add("page-loader");

loader.innerHTML = `

    <div class="loader-circle"></div>

    <p>
        Loading Portfolio...
    </p>

`;

document.body.appendChild(loader);

window.addEventListener(
  "load",

  () => {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 800);
  },
);

/* CARD 3D TILT EFFECT */

const tiltCards = document.querySelectorAll(
  `

    .project-card,

    .skill-card,

    .service-card,

    .certificate-card

    `,
);

tiltCards.forEach((card) => {
  card.addEventListener(
    "mousemove",

    (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;

      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;

      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `

                    perspective(800px)

                    rotateX(${rotateX}deg)

                    rotateY(${rotateY}deg)

                    translateY(-8px)

                `;
    },
  );

  card.addEventListener(
    "mouseleave",

    () => {
      card.style.transform = "";
    },
  );
});

/* FLOATING BACKGROUND ELEMENTS */

/*

    Creates animated floating shapes.
    (Styles for ".floating-background" live in styles.css)

*/

const floatingContainer = document.createElement("div");

floatingContainer.classList.add("floating-background");

for (let i = 0; i < 5; i++) {
  const shape = document.createElement("span");

  floatingContainer.appendChild(shape);
}

document.body.prepend(floatingContainer);

/* IMAGE HOVER EFFECT */

const imagesHover = document.querySelectorAll(
  ".project-placeholder, .profile-placeholder",
);

imagesHover.forEach((image) => {
  image.addEventListener(
    "mouseenter",

    () => {
      image.style.transform = "scale(1.05)";
    },
  );

  image.addEventListener(
    "mouseleave",

    () => {
      image.style.transform = "scale(1)";
    },
  );
});

/* KEYBOARD EASTER EGG */

/*

    Type:

    developer

    on keyboard

*/

let secretCode = "";

document.addEventListener(
  "keydown",

  (event) => {
    secretCode += event.key.toLowerCase();

    if (secretCode.includes("developer")) {
      alert("🚀 Keep coding! Your portfolio journey has started.");

      secretCode = "";
    }

    if (secretCode.length > 20) {
      secretCode = "";
    }
  },
);

/* FINAL OPTIMIZATION
            & PROFESSIONAL TOUCHES */

/*

    Final production improvements:

    ✔ Performance optimization
    ✔ Accessibility improvements
    ✔ Lazy loading
    ✔ CV handling
    ✔ External link security
    ✔ Device optimization

*/

/*

    Images load only when needed.

    Improves page speed.

*/

const lazyImages = document.querySelectorAll("img");

lazyImages.forEach((image) => {
  image.setAttribute(
    "loading",

    "lazy",
  );
});

/* REDUCE ANIMATIONS
            FOR LOW POWER DEVICES */

/*

    Detects users who prefer reduced motion.

    Better accessibility.

*/

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (reduceMotion.matches) {
  document.documentElement.style.setProperty(
    "--transition",

    "0s",
  );
}

/* EXTERNAL LINK SECURITY */

/*

    Adds security attributes
    to external links.

*/

const externalLinks = document.querySelectorAll("a[href^='http']");

externalLinks.forEach((link) => {
  link.setAttribute(
    "target",

    "_blank",
  );

  link.setAttribute(
    "rel",

    "noopener noreferrer",
  );
});

/* DOWNLOAD CV BUTTON */

/*

    Searches for CV buttons.

    Add your actual CV file later:

    assets/resume.pdf


*/

const cvButtons = document.querySelectorAll(".download-cv");

cvButtons.forEach((button) => {
  button.addEventListener(
    "click",

    () => {
      const cvFile = "assets/resume.pdf";

      const link = document.createElement("a");

      link.href = cvFile;

      link.download = "Dennis-Maina-CV.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();
    },
  );
});

/* ACTIVE BUTTON FEEDBACK */

const allButtons = document.querySelectorAll("button,.btn");

allButtons.forEach((button) => {
  button.addEventListener(
    "mousedown",

    () => {
      button.style.transform = "scale(.96)";
    },
  );

  button.addEventListener(
    "mouseup",

    () => {
      button.style.transform = "";
    },
  );
});

/* PREVENT EMPTY HASH JUMP */

/*

    Prevents links like #

    jumping to top unexpectedly.

*/

const hashLinks = document.querySelectorAll("a[href='#']");

hashLinks.forEach((link) => {
  link.addEventListener(
    "click",

    (event) => {
      event.preventDefault();
    },
  );
});

/* PAGE READY MESSAGE */

document.addEventListener(
  "DOMContentLoaded",

  () => {
    console.log(
      `

========================================

 Portfolio Ready ✅

 Features Enabled:

 ✓ Responsive Navigation
 ✓ Theme Switching
 ✓ Scroll Animations
 ✓ Skill Animations
 ✓ Statistics Counter
 ✓ Contact Validation
 ✓ Premium Effects
 ✓ Performance Optimizations

========================================

`,
    );
  },
);
