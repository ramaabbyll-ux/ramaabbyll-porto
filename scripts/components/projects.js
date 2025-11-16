// Projects Section Component
class ProjectsSection {
    constructor() {
        this.projectsSection = document.getElementById('projects');
        this.init();
    }
    
    init() {
        this.renderProjects();
    }
    
    renderProjects() {
        this.projectsSection.innerHTML = `
            <h2 class="section-title">Projects</h2>
            <div class="projects-grid">
                <div class="project-card">
                    <h3 class="project-title">Ram-AI: LLM-Powered Website Generator</h3>
                    <p class="project-description">Developed a web application that converts text prompts into complete HTML, CSS, and JavaScript websites using the Gemini LLM API.</p>
                    <div class="project-tags">
                        <span class="tag">Python</span>
                        <span class="tag">Streamlit</span>
                        <span class="tag">Google Gemini API</span>
                    </div>
                </div>
                
                <div class="project-card">
                    <h3 class="project-title">Plant Detection CNN</h3>
                    <p class="project-description">Built and trained a CNN model in TensorFlow to identify four plant types (corn, cotton, rice, wheat) with 90% accuracy.</p>
                    <div class="project-tags">
                        <span class="tag">Python</span>
                        <span class="tag">TensorFlow</span>
                        <span class="tag">Keras</span>
                    </div>
                </div>
                
                <div class="project-card">
                    <h3 class="project-title">Bee Subspecies Detection CNN</h3>
                    <p class="project-description">Developed a CNN model to classify bee subspecies, achieving 81% accuracy to aid in ecological categorization.</p>
                    <div class="project-tags">
                        <span class="tag">Python</span>
                        <span class="tag">TensorFlow</span>
                        <span class="tag">Computer Vision</span>
                    </div>
                </div>
                
                <div class="project-card">
                    <h3 class="project-title">Tweet Sentiment Analysis</h3>
                    <p class="project-description">Performed sentiment analysis on Indonesian election debate tweets using a Naive Bayes algorithm, achieving 72% model accuracy.</p>
                    <div class="project-tags">
                        <span class="tag">Python</span>
                        <span class="tag">Scikit-learn</span>
                        <span class="tag">NLTK</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize Projects Section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsSection();
});