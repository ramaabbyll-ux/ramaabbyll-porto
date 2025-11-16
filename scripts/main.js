// Main Application Controller
class PortfolioApp {
    constructor() {
        this.components = new Map();
        this.init();
    }

    init() {
        Utils.domReady(() => {
            this.initializeComponents();
            this.setupGlobalEventListeners();
            this.handlePageLoad();
            console.log('Portfolio App Initialized Successfully');
        });
    }

    initializeComponents() {
        // Initialize all component controllers
        this.components.set('cursor', new CustomCursor());
        this.components.set('smoothScroll', new SmoothScroll());
        this.components.set('scrollSpy', new ScrollSpy());
        this.components.set('typingAnimation', new TypingAnimation());
        this.components.set('projectInteractions', new ProjectInteractions());
        this.components.set('timelineInteractions', new TimelineInteractions());
        this.components.set('contactForm', new ContactForm());
        this.components.set('downloadCV', new DownloadCV());
        this.components.set('pageLoader', new PageLoader());

        // Initialize Three.js animation separately
        this.components.set('threeAnimation', new ThreeAnimation());
    }

    setupGlobalEventListeners() {
        // Global resize handler with debouncing
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));

        // Global scroll handler with throttling
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
        }, 100));

        // Global click handler for external links
        document.addEventListener('click', (e) => {
            this.handleExternalLinks(e);
        });

        // Global keydown handler
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    handleResize() {
        // Update any components that need resize handling
        const threeAnimation = this.components.get('threeAnimation');
        if (threeAnimation && threeAnimation.onWindowResize) {
            threeAnimation.onWindowResize();
        }
    }

    handleScroll() {
        // Additional scroll handling can be added here
        this.updateProgressIndicator();
    }

    handleExternalLinks(e) {
        const link = e.target.closest('a');
        if (link && link.href && link.target === '_blank') {
            e.preventDefault();
            this.trackOutboundLink(link.href);
            setTimeout(() => {
                window.open(link.href, '_blank');
            }, 100);
        }
    }

    handleKeyboardNavigation(e) {
        // ESC key closes modals or resets states
        if (e.key === 'Escape') {
            this.handleEscapeKey();
        }

        // Space bar for quick navigation
        if (e.key === ' ' && !e.target.closest('input, textarea')) {
            e.preventDefault();
            this.handleSpaceNavigation();
        }
    }

    handleEscapeKey() {
        // Reset any active states or close modals
        document.querySelectorAll('.modal, .dropdown').forEach(element => {
            element.classList.remove('active');
        });
    }

    handleSpaceNavigation() {
        // Scroll to next section on space bar
        const currentSection = this.getCurrentSection();
        const nextSection = this.getNextSection(currentSection);
        if (nextSection) {
            Utils.smoothScrollTo(nextSection, 100);
        }
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('.section');
        let currentSection = sections[0];

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section;
            }
        });

        return currentSection;
    }

    getNextSection(currentSection) {
        const sections = Array.from(document.querySelectorAll('.section'));
        const currentIndex = sections.indexOf(currentSection);
        return sections[currentIndex + 1];
    }

    updateProgressIndicator() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / docHeight) * 100;

        // Update CSS variable for progress
        Utils.setCSSVariable('--scroll-progress', `${scrollProgress}%`);
    }

    trackOutboundLink(url) {
        // Analytics tracking for outbound links
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'Outbound Link',
                'event_label': url,
                'transport_type': 'beacon'
            });
        }
    }

    handlePageLoad() {
        // Add loaded class to body for CSS transitions
        document.body.classList.add('loaded');

        // Initialize background grid
        this.initBackgroundGrid();

        // Initialize text reveal animations
        this.initTextReveal();

        // Preload critical images
        this.preloadCriticalAssets();

        // Initialize service worker if available
        this.initServiceWorker();
    }

    initBackgroundGrid() {
        const gridOverlay = document.createElement('div');
        gridOverlay.className = 'background-grid';
        document.body.appendChild(gridOverlay);

        setTimeout(() => {
            gridOverlay.style.opacity = '1';
        }, 1000);
    }

    initTextReveal() {
        const revealElements = document.querySelectorAll('.section-title, .hero-title');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.5 });

        revealElements.forEach(el => observer.observe(el));
    }

    preloadCriticalAssets() {
        const criticalImages = [
            // Add paths to critical images here
            // '/assets/images/profile.jpg',
            // '/assets/images/hero-bg.jpg'
        ];

        Utils.preloadImages(criticalImages);
    }

    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }
    }

    // Public method to get component instance
    getComponent(name) {
        return this.components.get(name);
    }

    // Public method to add new components
    registerComponent(name, component) {
        this.components.set(name, component);
    }

    // Cleanup method for page unload
    cleanup() {
        this.components.forEach(component => {
            if (component.cleanup) {
                component.cleanup();
            }
        });

        // Remove global event listeners
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('click', this.handleExternalLinks);
        document.removeEventListener('keydown', this.handleKeyboardNavigation);
    }
}

// Custom Cursor Class
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.init();
    }
    
    init() {
        if (!this.cursor) return;
        
        document.addEventListener('mousemove', (e) => {
            this.moveCursor(e);
        });
        
        this.addHoverEffects();
    }
    
    moveCursor(e) {
        this.cursor.style.left = e.clientX + 'px';
        this.cursor.style.top = e.clientY + 'px';
    }
    
    addHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .nav-link, .project-card, .timeline-item');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });
    }
}

// Smooth Scroll Class
class SmoothScroll {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    this.scrollToSection(targetSection);
                    this.setActiveNavLink(link);
                }
            });
        });
    }
    
    scrollToSection(section) {
        const offsetTop = section.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    setActiveNavLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
}

// Scroll Spy Class
class ScrollSpy {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.setupObserver();
    }
    
    setupObserver() {
        const options = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.setActiveNavLink(id);
                    entry.target.classList.add('visible');
                }
            });
        }, options);
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    setActiveNavLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Typing Animation Class
class TypingAnimation {
    constructor() {
        this.heroTitle = document.querySelector('.hero-title');
        if (this.heroTitle) {
            this.originalText = this.heroTitle.innerHTML;
            this.initialize();
        }
    }
    
    initialize() {
        const lines = this.originalText.split('<br>');
        this.heroTitle.innerHTML = '';
        
        lines.forEach((line, lineIndex) => {
            const lineElement = document.createElement('div');
            lineElement.className = 'typing-line';
            lineElement.style.opacity = '0';
            lineElement.style.transform = 'translateY(20px)';
            
            const words = line.split(' ');
            words.forEach((word, wordIndex) => {
                const wordElement = document.createElement('span');
                wordElement.className = 'typing-word';
                wordElement.textContent = word + (wordIndex < words.length - 1 ? ' ' : '');
                wordElement.style.opacity = '0';
                wordElement.style.transform = 'translateY(10px)';
                wordElement.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                lineElement.appendChild(wordElement);
            });
            
            this.heroTitle.appendChild(lineElement);
            
            setTimeout(() => {
                lineElement.style.opacity = '1';
                lineElement.style.transform = 'translateY(0)';
                this.animateLine(lineElement);
            }, lineIndex * 600);
        });
    }
    
    animateLine(lineElement) {
        const words = lineElement.querySelectorAll('.typing-word');
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
}

// Project Interactions Class
class ProjectInteractions {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.projectCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.handleCardHover(e, card, true);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.handleCardHover(e, card, false);
            });
            
            card.addEventListener('mousemove', (e) => {
                this.handleCardParallax(e, card);
            });
        });
    }
    
    handleCardHover(e, card, isHovering) {
        if (isHovering) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    }
    
    handleCardParallax(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;
        
        card.style.transform = `translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

// Timeline Interactions Class
class TimelineInteractions {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.timelineItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateTimelineItem(item, true);
            });
            
            item.addEventListener('mouseleave', () => {
                this.animateTimelineItem(item, false);
            });
        });
    }
    
    animateTimelineItem(item, isHovering) {
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');
        
        if (isHovering) {
            content.style.transform = 'scale(1.03) translateX(10px)';
            dot.style.borderColor = '#1A1A1A';
            dot.style.backgroundColor = '#1A1A1A';
            dot.style.transform = 'scale(1.3)';
        } else {
            content.style.transform = 'scale(1) translateX(0)';
            dot.style.borderColor = '#888888';
            dot.style.backgroundColor = 'transparent';
            dot.style.transform = 'scale(1)';
        }
    }
}

// Contact Form Class
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        if (this.form) {
            this.setupEventListeners();
            this.setupInputAnimations();
        }
    }
    
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    setupInputAnimations() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        this.showLoadingState();
        
        try {
            await this.simulateApiCall(data);
            this.showSuccessMessage();
            this.form.reset();
            this.form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('focused');
            });
        } catch (error) {
            this.showErrorMessage();
        }
    }
    
    simulateApiCall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve(data);
            }, 2000);
        });
    }
    
    showLoadingState() {
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.transform = 'scale(0.95)';
        
        submitBtn.dataset.originalText = originalText;
    }
    
    showSuccessMessage() {
        const submitBtn = this.form.querySelector('.submit-btn');
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.backgroundColor = '#4CAF50';
        submitBtn.style.transform = 'scale(1)';
        
        this.animateSuccess();
        
        setTimeout(() => {
            this.restoreSubmitButton();
        }, 3000);
    }
    
    animateSuccess() {
        const successParticles = document.createElement('div');
        successParticles.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10000;
        `;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: #4CAF50;
                border-radius: 50%;
                animation: particleFloat 1s ease-out forwards;
            `;
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50;
            particle.style.setProperty('--angle', angle);
            particle.style.setProperty('--distance', distance + 'px');
            
            successParticles.appendChild(particle);
        }
        
        document.body.appendChild(successParticles);
        
        setTimeout(() => {
            document.body.removeChild(successParticles);
        }, 1000);
    }
    
    showErrorMessage() {
        const submitBtn = this.form.querySelector('.submit-btn');
        submitBtn.textContent = '✗ Try Again';
        submitBtn.style.backgroundColor = '#f44336';
        submitBtn.style.transform = 'scale(1)';
        
        setTimeout(() => {
            this.restoreSubmitButton();
        }, 3000);
    }
    
    restoreSubmitButton() {
        const submitBtn = this.form.querySelector('.submit-btn');
        submitBtn.textContent = submitBtn.dataset.originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
    }
}

// Download CV Class
class DownloadCV {
    constructor() {
        this.downloadBtn = document.querySelector('.download-cv');
        if (this.downloadBtn) {
            this.setupEventListeners();
        }
    }
    
    setupEventListeners() {
        this.downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.simulateDownload();
        });
    }
    
    simulateDownload() {
        this.showDownloadToast();
        this.animateDownload();
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'Abdurrahim_Idin_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 1500);
    }
    
    showDownloadToast() {
        const toast = document.createElement('div');
        toast.textContent = '📄 Downloading CV...';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #1A1A1A;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 10000;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        }, 3000);
    }
    
    animateDownload() {
        this.downloadBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.downloadBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

// Page Loader Class
class PageLoader {
    constructor() {
        this.init();
    }
    
    init() {
        this.hideLoader();
        this.setupPageTransitions();
    }
    
    hideLoader() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
    
    setupPageTransitions() {
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            section.style.transitionDelay = `${index * 0.1}s`;
        });
    }
}

// Initialize the main application
const portfolioApp = new PortfolioApp();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PortfolioApp,
        CustomCursor,
        SmoothScroll,
        ScrollSpy,
        TypingAnimation,
        ProjectInteractions,
        TimelineInteractions,
        ContactForm,
        DownloadCV,
        PageLoader,
        Utils
    };
}

// Handle page unload
window.addEventListener('beforeunload', () => {
    portfolioApp.cleanup();
});