// ============================================================
// TERMINAL PORTFOLIO — script.js
// ============================================================

// === MOBILE HAMBURGER ===
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });
}

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// === ACTIVE TAB HIGHLIGHTING ===
function updateActiveTab() {
    const sections = document.querySelectorAll('section[id]');
    const tabLinks = document.querySelectorAll('.tab-link');
    let current = 'home';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });

    tabLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Update chrome title
    const chromeTitle = document.querySelector('.chrome-title');
    if (chromeTitle) {
        chromeTitle.textContent = `ecd@portfolio: ~/${current} — bash`;
    }
}

window.addEventListener('scroll', updateActiveTab);

// === SCROLL FADE-IN ANIMATIONS ===
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// === CONTACT FORM ===
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = '$ sending...';
        submitBtn.disabled = true;
        if (formFeedback) {
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (response.ok) {
                if (formFeedback) {
                    formFeedback.textContent = '# Message sent successfully. Exit code: 0';
                    formFeedback.className = 'form-feedback success';
                }
                this.reset();
            } else {
                if (formFeedback) {
                    formFeedback.textContent = `# Error: ${data.message}`;
                    formFeedback.className = 'form-feedback error';
                }
            }
        } catch (err) {
            if (formFeedback) {
                formFeedback.textContent = '# Error: Connection failed. Please try again.';
                formFeedback.className = 'form-feedback error';
            }
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// === BACK TO TOP ===
const backToTop = document.createElement('button');
backToTop.textContent = '↑ top';
backToTop.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: transparent;
    border: 1px solid #1e3a1e;
    color: #555;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    padding: 5px 12px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 998;
`;
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

backToTop.addEventListener('mouseenter', () => {
    backToTop.style.borderColor = '#39d353';
    backToTop.style.color = '#39d353';
});
backToTop.addEventListener('mouseleave', () => {
    backToTop.style.borderColor = '#1e3a1e';
    backToTop.style.color = '#555';
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === PAGE LOADED ===
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
