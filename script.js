// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling
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

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(0, 0, 0, 0.9)";
      header.style.backdropFilter = "blur(15px)";
    } else {
      header.style.background = "rgba(0, 0, 0, 0.1)";
      header.style.backdropFilter = "blur(10px)";
    }
  });

  // Contact form functionality
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Validate form
      if (!name || !email || !subject || !message) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Veuillez entrer une adresse email valide.");
        return;
      }

      // Create mailto link
      const mailtoLink = `mailto:tojomananarandrianantenaina@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(
        `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      showNotification(
        "Email en cours d'ouverture dans votre client de messagerie!",
        "success"
      );

      // Reset form
      contactForm.reset();
    });
  }

  // Add initial visible class to elements already in viewport
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
      }
    });
  }, 100);

  // Add typing effect to hero subtitle
  addTypingEffect();

  // Add parallax effect to hero background
  addParallaxEffect();
});

// Typing effect for hero subtitle
function addTypingEffect() {
  const subtitle = document.querySelector(".hero .subtitle");
  if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = "";
    subtitle.style.opacity = "1";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1000);
  }
}

// Parallax effect for hero section
function addParallaxEffect() {
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#4169E1" : "#ff4757"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
    `;

  // Add animation styles
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 0.7;
        }
    `;
  document.head.appendChild(style);

  // Add to document
  document.body.appendChild(notification);

  // Add close functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.remove();
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Skills animation on scroll
function animateSkills() {
  const skillCategories = document.querySelectorAll(".skill-category");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = "slideInUp 0.6s ease forwards";
          }, index * 200);
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillCategories.forEach((category) => {
    skillObserver.observe(category);
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelector(".nav-links");

  // Create mobile menu button
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.className = "mobile-menu-btn";
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;

  nav.appendChild(mobileMenuBtn);

  // Toggle mobile menu
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("nav-links-mobile");
    const icon = mobileMenuBtn.querySelector("i");
    icon.className = navLinks.classList.contains("nav-links-mobile")
      ? "fas fa-times"
      : "fas fa-bars";
  });

  // Close mobile menu when clicking on a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("nav-links-mobile");
      const icon = mobileMenuBtn.querySelector("i");
      icon.className = "fas fa-bars";
    });
  });

  // Add mobile styles
  const mobileStyle = document.createElement("style");
  mobileStyle.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav-links {
                position: fixed;
                top: 70px;
                right: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: right 0.3s ease;
                z-index: 999;
            }
            
            .nav-links-mobile {
                right: 0 !important;
            }
            
            .nav-links li {
                margin: 1rem 0;
            }
            
            .nav-links a {
                font-size: 1.2rem;
                padding: 1rem;
                display: block;
                text-align: center;
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
  document.head.appendChild(mobileStyle);
}

// Scroll to top functionality
function addScrollToTop() {
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #4169E1, #1e3c72);
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(65, 105, 225, 0.3);
    `;

  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.transform = "translateY(0)";
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.transform = "translateY(100px)";
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize all features when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  animateSkills();
  initMobileMenu();
  addScrollToTop();
});

// Loading animation
function showLoadingAnimation() {
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Chargement du portfolio...</p>
        </div>
    `;

  loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        color: white;
        font-family: 'Poppins', sans-serif;
    `;

  const loaderStyle = document.createElement("style");
  loaderStyle.textContent = `
        .loader-content {
            text-align: center;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(65, 105, 225, 0.3);
            border-top: 3px solid #4169E1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loader-content p {
            font-size: 1.1rem;
            opacity: 0.8;
        }
    `;
  document.head.appendChild(loaderStyle);
  document.body.appendChild(loader);

  // Hide loader after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 1000);
  });
}

// Initialize loading animation
showLoadingAnimation();

// Error handling for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", function () {
      // Replace broken images with placeholder
      this.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='95' fill='%234169E1' opacity='0.1'/%3E%3Ccircle cx='100' cy='100' r='80' fill='%23ffffff' opacity='0.1'/%3E%3Ctext x='100' y='110' text-anchor='middle' font-size='60' fill='%234169E1' font-family='Arial'%3ET%3C/text%3E%3C/svg%3E";
    });
  });
});

// Performance optimization: Lazy load animations
function optimizeAnimations() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement("style");
    style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
    document.head.appendChild(style);
  }
}

// Initialize performance optimizations
optimizeAnimations();
