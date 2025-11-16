// Hero Section Component
class HeroSection {
    constructor() {
        this.heroSection = document.getElementById('home');
        this.init();
    }
    
    init() {
        this.renderHero();
        this.setupScrollIndicator();
    }
    
    renderHero() {
        this.heroSection.innerHTML = `
            <div class="hero-content">
                <div class="hero-text">
                    <h1 class="hero-title">Hi, I'm Rama.<br>A Data Analyst</h1>
                    <p class="hero-description">I transform complex data into reduced insights, driving informed decisions and growth.</p>
                </div>
                <div class="hero-animation">
                    <div id="animation-canvas-container"></div>
                </div>
            </div>
            
            <div class="scroll-indicator">
                <div class="scroll-line"></div>
                <span>Scroll to explore</span>
            </div>
        `;
    }
    
    setupScrollIndicator() {
        // Scroll indicator functionality
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
}

// Initialize Hero Section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroSection();
});