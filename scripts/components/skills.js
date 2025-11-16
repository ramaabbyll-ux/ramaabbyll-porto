// Skills Section Component
class SkillsSection {
    constructor() {
        this.skillsSection = document.getElementById('skills');
        this.init();
    }
    
    init() {
        this.renderSkills();
    }
    
    renderSkills() {
        this.skillsSection.innerHTML = `
            <h2 class="section-title">Skills</h2>
            <div class="skills-content">
                <div class="skills-category">
                    <h3 class="skills-category-title">Technical Skills</h3>
                    <div class="skills-list">
                        <div class="skill-item">
                            <span class="skill-name">Python, R, SQL</span>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">Tableau, Power BI</span>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">Excel, Jupyter</span>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">AWS, Azure</span>
                        </div>
                    </div>
                </div>
                
                <div class="skills-category">
                    <h3 class="skills-category-title">Data Science & ML</h3>
                    <div class="skills-list">
                        <div class="skill-item">
                            <span class="skill-name">Machine Learning</span>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">NLP & Computer Vision</span>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">Deep Learning (CNN)</span>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">Statistical Analysis</span>
                        </div>
                    </div>
                </div>
                
                <div class="skills-category">
                    <h3 class="skills-category-title">Soft Skills</h3>
                    <div class="skills-list">
                        <div class="skill-item">
                            <span class="skill-name">Communication</span>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">Critical Thinking</span>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">Problem Solving</span>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">Team Collaboration</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize Skills Section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SkillsSection();
});