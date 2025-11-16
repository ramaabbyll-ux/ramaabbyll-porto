// Navigation Component
class Navigation {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.init();
    }
    
    init() {
        this.renderNavigation();
        this.setupEventListeners();
    }
    
    renderNavigation() {
        this.sidebar.innerHTML = `
            <div class="sidebar-content">
                <div class="profile-info">
                    <h1 class="name">Abdurrahim Idin</h1>
                    <p class="title">Data Analyst</p>
                </div>
                
                <nav class="navigation">
                    <ul>
                        <li><a href="#home" class="nav-link active">Home</a></li>
                        <li><a href="#about" class="nav-link">About Me</a></li>
                        <li><a href="#journey" class="nav-link">My Journey</a></li>
                        <li><a href="#projects" class="nav-link">Projects</a></li>
                        <li><a href="#skills" class="nav-link">Skills</a></li>
                        <li><a href="#contact" class="nav-link">Contact</a></li>
                    </ul>
                </nav>
                
                <div class="sidebar-footer">
                    <div class="social-icons">
                        <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-github"></i></a>
                    </div>
                    <a href="#" class="download-cv">Download CV</a>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        // Event listeners akan dihandle oleh main SmoothScroll class
    }
}

// Initialize Navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});