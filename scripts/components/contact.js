// Contact Section Component
class ContactSection {
    constructor() {
        this.contactSection = document.getElementById('contact');
        this.init();
    }
    
    init() {
        this.renderContact();
        this.setupForm();
    }
    
    renderContact() {
        this.contactSection.innerHTML = `
            <h2 class="section-title">Contact</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>ramaabbyll@gmail.com</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>+62 821 4772 6866</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Bogor, Indonesia</span>
                    </div>
                </div>
                <form class="contact-form">
                    <div class="form-group">
                        <input type="text" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
            </div>
        `;
    }
    
    setupForm() {
        // Form functionality will be handled by main ContactForm class
    }
}

// Initialize Contact Section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactSection();
});