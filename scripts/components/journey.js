// Journey Section Component
class JourneySection {
    constructor() {
        this.journeySection = document.getElementById('journey');
        this.init();
    }
    
    init() {
        this.renderJourney();
        this.setupTimelineInteractions();
    }
    
    renderJourney() {
        this.journeySection.innerHTML = `
            <h2 class="section-title">My Journey</h2>
            <div class="timeline">
                <div class="timeline-line"></div>
                
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3 class="company">Matchmade.io</h3>
                        <p class="role">Data Analyst (Data Modeller)</p>
                        <p class="duration">Apr 2025 – Present</p>
                        <ul class="description">
                            <li>Engineered an end-to-end automated reconciliation pipeline, significantly reducing manual processing time for B2B clients.</li>
                            <li>Analyzed complex transactional data from diverse sources including POS, payment switchers, and banking records.</li>
                            <li>Developed automated reconciliation pipelines for retail and fintech clients using advanced SQL in Google BigQuery.</li>
                        </ul>
                    </div>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3 class="company">Braincore.id</h3>
                        <p class="role">Machine Learning Engineer Intern</p>
                        <p class="duration">Sep 2024 – Nov 2024</p>
                        <ul class="description">
                            <li>Developed and optimized a computer vision model for a liveness detection project, deploying it in TensorFlow Lite.</li>
                            <li>Built a data preprocessing pipeline to collect and ensure the quality of a large-scale image dataset.</li>
                            <li>Collaborated with the engineering team to test, evaluate, and document model performance.</li>
                        </ul>
                    </div>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3 class="company">IPB University</h3>
                        <p class="role">Bachelor of Computer Science</p>
                        <p class="duration">Aug 2021 – Mei 2025</p>
                        <ul class="description">
                            <li>CGPA: 3.78 / 4.00</li>
                            <li>Final Project Research: Corn Varieties Identification using Convolutional Neural Network (CNN)</li>
                            <li>Relevant Coursework: Data Mining, Artificial Intelligence, Statistics and Data Analysis</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupTimelineInteractions() {
        // Timeline interactions will be handled by main TimelineInteractions class
    }
}

// Initialize Journey Section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JourneySection();
});