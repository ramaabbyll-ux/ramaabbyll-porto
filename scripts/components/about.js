// About Section Component
class AboutSection {
    constructor() {
        this.aboutSection = document.getElementById('about');
        this.init();
    }
    
    init() {
        this.renderAbout();
    }
    
    renderAbout() {
        this.aboutSection.innerHTML = `
            <h2 class="section-title">About Me</h2>
            <div class="about-content">
                <div class="about-image">
                    <div class="image-placeholder">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
                <div class="about-text">
                    <p>Detail-oriented Computer Science student from IPB University with a strong foundation in machine learning, data analysis, and end-to-end project development.</p>
                    <p>Experienced in building automated data processing pipelines, developing deep learning models, and utilizing tools like Google BigQuery and TensorFlow.</p>
                    <div class="personal-info">
                        <div class="info-item">
                            <span class="info-label">Name:</span>
                            <span class="info-value">Abdurrahim Ramadhan Idin</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Degree:</span>
                            <span class="info-value">Bachelor of Computer Science</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Email:</span>
                            <span class="info-value">ramaabbyll@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize About Section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AboutSection();
});