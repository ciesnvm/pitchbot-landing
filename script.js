// ============================================
// PitchBot Landing Page - Interactive Scripts
// ============================================

// FAQ Toggle
function toggleFaq(element) {
  const allItems = document.querySelectorAll('.faq-item');
  const isActive = element.classList.contains('active');

  // Close all items
  allItems.forEach(item => {
    item.classList.remove('active');
  });

  // Open clicked item if it wasn't active
  if (!isActive) {
    element.classList.add('active');
  }
}

// Counter Animation on Scroll
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

// Intersection Observer for counters
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    alert('Mobile menu would open here. Add a slide-out drawer for production.');
  });
}

// Add scroll-based navbar styling
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
  }

  lastScroll = currentScroll;
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.feature-pill, .stat-card, .omni-card, .ai-transform-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// Chat input interaction
const chatInput = document.querySelector('.chat-input');
if (chatInput) {
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const value = chatInput.value.trim();
      if (value) {
        chatInput.value = '';
        // In a real app, this would send the message
        console.log('Message sent:', value);
      }
    }
  });
}
