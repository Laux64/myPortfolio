// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Mobile menu toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Animated counter for hero stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }

  updateCounter()
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Animate counters when hero section is visible
      if (entry.target.classList.contains("hero")) {
        const counters = document.querySelectorAll(".stat-number")
        counters.forEach((counter) => {
          const target = Number.parseInt(counter.getAttribute("data-target"))
          animateCounter(counter, target)
        })
      }
    }
  })
}, observerOptions)

// Observe sections for animation
document.querySelectorAll("section, .project-card, .archive-project").forEach((el) => {
  observer.observe(el)
})

// Experience tabs functionality
const tabButtons = document.querySelectorAll(".tab-button")
const tabPanels = document.querySelectorAll(".tab-panel")

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab")

    // Remove active class from all buttons and panels
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    tabPanels.forEach((panel) => panel.classList.remove("active"))

    // Add active class to clicked button and corresponding panel
    button.classList.add("active")
    document.getElementById(targetTab).classList.add("active")
  })
})

// Typing effect for code window
function typeCode() {
  const codeLines = document.querySelectorAll(".code-line")
  let delay = 0

  codeLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = "0"
      line.style.transform = "translateX(-20px)"
      line.style.transition = "all 0.3s ease"

      setTimeout(() => {
        line.style.opacity = "1"
        line.style.transform = "translateX(0)"
      }, 100)
    }, delay)
    delay += 200
  })
}

// Start typing effect when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(typeCode, 1000)
      heroObserver.unobserve(entry.target)
    }
  })
})

heroObserver.observe(document.querySelector(".hero"))

// FIXED: Video loading function
function loadVideo(element, videoId) {
    const videoContainer = element.parentElement;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    
    // FIXED: Ensure iframe takes full container size
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.borderRadius = '8px';
    iframe.title = 'YouTube video player';
    
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);
}

// Parallax effect for floating elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const floatingElements = document.querySelectorAll(".floating-element")

  floatingElements.forEach((element) => {
    const speed = element.getAttribute("data-speed") || 1
    const yPos = -(scrolled * speed * 0.1)
    element.style.transform = `translateY(${yPos}px)`
  })
})

// Add hover effects for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })
})

// Add click ripple effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(100, 255, 218, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Cursor trail effect
let mouseX = 0
let mouseY = 0
const trail = []

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

function createTrail() {
  trail.push({ x: mouseX, y: mouseY })

  if (trail.length > 20) {
    trail.shift()
  }

  const trailElement = document.querySelector(".cursor-trail")
  if (trailElement) {
    trailElement.remove()
  }

  const newTrail = document.createElement("div")
  newTrail.className = "cursor-trail"
  newTrail.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `

  trail.forEach((point, index) => {
    const dot = document.createElement("div")
    dot.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--green);
            border-radius: 50%;
            left: ${point.x}px;
            top: ${point.y}px;
            opacity: ${((index + 1) / trail.length) * 0.5};
            transform: translate(-50%, -50%);
        `
    newTrail.appendChild(dot)
  })

  document.body.appendChild(newTrail)

  requestAnimationFrame(createTrail)
}

// Start cursor trail on desktop only
if (window.innerWidth > 768) {
  createTrail()
}

// Email obfuscation
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const email = "john" + "@" + "example.com"
    window.location.href = "mailto:" + email
  })
})

// Add loading states to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    if (this.href && this.href.includes("mailto:")) {
      const originalText = this.innerHTML
      this.innerHTML = "<span>Opening...</span>"

      setTimeout(() => {
        this.innerHTML = originalText
      }, 1000)
    }
  })
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// Add focus styles for keyboard navigation
const keyboardStyle = document.createElement("style")
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--green) !important;
        outline-offset: 2px !important;
    }
`
document.head.appendChild(keyboardStyle)