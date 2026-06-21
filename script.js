// ============================================
// Lenis Smooth Scroll
// ============================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  autoRaf: true,
  anchors: true,
});

// Listen for scroll events
lenis.on('scroll', (e) => {
  // Sync with any scroll-based animations
});

// ============================================
// Smooth Reveal on Scroll (IntersectionObserver)
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Optionally unobserve after reveal
      // revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all reveal elements
document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .stagger-children').forEach(el => {
  revealObserver.observe(el);
});

// ============================================
// FAQ Toggle
// ============================================
function toggleFaq(element) {
  const allItems = document.querySelectorAll('.faq-item');
  const isActive = element.classList.contains('active');

  allItems.forEach(item => {
    item.classList.remove('active');
  });

  if (!isActive) {
    element.classList.add('active');
  }
}

// ============================================
// Counter Animation on Scroll
// ============================================
const counters = document.querySelectorAll('.counter');
const speed = 200;

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'));
  const suffix = counter.getAttribute('data-suffix') || '';
  const count = parseInt(counter.innerText.replace(/\D/g, '')) || 0;
  const inc = target / speed;

  if (count < target) {
    counter.innerText = Math.ceil(count + inc) + suffix;
    setTimeout(() => animateCounter(counter), 20);
  } else {
    counter.innerText = target + suffix;
  }
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      if (!counter.classList.contains('counted')) {
        counter.classList.add('counted');
        animateCounter(counter);
      }
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// ============================================
// Smooth scroll for anchor links (handled by Lenis, but fallback)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      lenis.scrollTo(href);
    }
  });
});

// ============================================
// Mobile menu toggle
// ============================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    alert('Mobile menu would open here. Add a slide-out drawer for production.');
  });
}

// ============================================
// Navbar shadow on scroll
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 50) {
    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
  }
  lastScroll = currentScroll;
});

// ============================================
// Chat input interaction
// ============================================
const chatInput = document.querySelector('.chat-input');
if (chatInput) {
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const value = chatInput.value.trim();
      if (value) {
        chatInput.value = '';
        console.log('Message sent:', value);
      }
    }
  });
}

// ============================================
// Stats background - static, no parallax (prevents jank with Lenis)
// ============================================
// Parallax removed to prevent background bleed-through with Lenis smooth scroll

// ============================================
// Testimonial cards float animation enhancement
// ============================================
const testimonialCards = document.querySelectorAll('.testimonial-card:not(.blur-bg)');
testimonialCards.forEach((card, index) => {
  card.style.animation = `floatCard 4s ease-in-out ${index * 0.5}s infinite`;
});

// Add floatCard keyframe via JS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes floatCard {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  .testimonial-card.t1 { animation-delay: 0s !important; }
  .testimonial-card.t2 { animation-delay: 0.3s !important; }
  .testimonial-card.t3 { animation-delay: 0.6s !important; }
  .testimonial-card.t4 { animation-delay: 0.9s !important; }
  .testimonial-card.t5 { animation-delay: 1.2s !important; }
`;
document.head.appendChild(styleSheet);
