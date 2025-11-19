// Form validation for Adnil Kota Hub

// Enquiry Form Validation
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateEnquiryForm()) {
            const formData = new FormData(enquiryForm);
            const enquiryType = formData.get('enquiryType');
            const quantity = formData.get('quantity');
            
            // Generate response based on enquiry type
            let response = generateEnquiryResponse(enquiryType, quantity);
            
            // Display response to user
            document.getElementById('responseMessage').innerHTML = `
                <div class="success-message">
                    <h3>Thank You for Your Enquiry!</h3>
                    <p>${response}</p>
                    <p><strong>We'll contact you within 24 hours to confirm details.</strong></p>
                </div>
            `;
            
            // Reset form
            enquiryForm.reset();
        }
    });
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            const formData = new FormData(contactForm);
            const name = formData.get('contactName');
            const email = formData.get('contactEmail');
            const message = formData.get('contactMessage');
            const messageType = formData.get('messageType');
            
            // Create email content
            const emailBody = `
                Name: ${name}
                Email: ${email}
                Message Type: ${messageType}
                Message: ${message}
            `;
            
            // Display success message
            document.getElementById('contactResponse').innerHTML = `
                <div class="success-message">
                    <h3>Message Ready to Send!</h3>
                    <p>Your message has been prepared. Click the link below to send it via your email client.</p>
                    <a href="mailto:info@adnilkotahub.co.za?subject=Contact from ${name}&body=${encodeURIComponent(emailBody)}" class="email-btn">
                        Send Email via Your Email Client
                    </a>
                    <p><em>Note: This will open your default email application.</em></p>
                </div>
            `;
            
            // Reset form
            contactForm.reset();
        }
    });
}

// Validation Functions
function validateEnquiryForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const enquiryType = document.getElementById('enquiryType').value;
    const message = document.getElementById('message').value.trim();
    
    // Clear previous errors
    clearErrors();
    
    let isValid = true;
    
    // Name validation
    if (name.length < 2) {
        showError('name', 'Please enter your full name');
        isValid = false;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    if (!isValidPhone(phone)) {
        showError('phone', 'Please enter a valid South African phone number');
        isValid = false;
    }
    
    // Enquiry type validation
    if (!enquiryType) {
        showError('enquiryType', 'Please select an enquiry type');
        isValid = false;
    }
    
    // Message validation
    if (message.length < 10) {
        showError('message', 'Please provide more details (minimum 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

function validateContactForm() {
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const messageType = document.getElementById('messageType').value;
    const message = document.getElementById('contactMessage').value.trim();
    
    // Clear previous errors
    clearErrors();
    
    let isValid = true;
    
    // Name validation
    if (name.length < 2) {
        showError('contactName', 'Please enter your full name');
        isValid = false;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showError('contactEmail', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Message type validation
    if (!messageType) {
        showError('messageType', 'Please select a message type');
        isValid = false;
    }
    
    // Message validation
    if (message.length < 10) {
        showError('contactMessage', 'Please write a message (minimum 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

// Helper Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // South African phone number validation (10-11 digits, may start with 0 or +27)
    const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = '#ff4444';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    // Remove existing error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    // Reset border colors
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function generateEnquiryResponse(enquiryType, quantity) {
    const quantityNum = parseInt(quantity) || 1;
    let basePrice, message;
    
    switch(enquiryType) {
        case 'catering':
            basePrice = 25; // R25 per kota for catering
            message = `For event catering of ${quantityNum} kotas, estimated cost: R${basePrice * quantityNum}. Our catering includes setup and serving.`;
            break;
        case 'bulk':
            basePrice = 18; // R18 per kota for bulk orders
            message = `For bulk order of ${quantityNum} kotas, estimated cost: R${basePrice * quantityNum}. Discount applied for orders of 10+.`;
            break;
        case 'partnership':
            message = 'Thank you for your interest in partnership! We\'ll contact you to discuss potential collaboration opportunities.';
            break;
        case 'franchise':
            message = 'Great! We\'re expanding and would love to discuss franchise opportunities. Our team will contact you with more information.';
            break;
        default:
            message = 'Thank you for your enquiry! Our team will review your request and get back to you with detailed information.';
    }
    
    return message;
}

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
    // Add input event listeners for real-time validation
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '';
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
});