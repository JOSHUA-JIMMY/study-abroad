document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const applicationForm = document.getElementById('applicationForm');
    const successMessage = document.getElementById('successMessage');
    const submitButton = document.getElementById('submitButton');
    const btnLoader = document.querySelector('.btn-loader');
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = applicationForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const errorElement = field.nextElementSibling;
            
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                if (errorElement && errorElement.classList.contains('error-message')) {
                    errorElement.textContent = 'This field is required';
                }
            } else {
                field.classList.remove('error');
                if (errorElement && errorElement.classList.contains('error-message')) {
                    errorElement.textContent = '';
                }
                
                // Email validation
                if (field.type === 'email' && !isValidEmail(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    if (errorElement && errorElement.classList.contains('error-message')) {
                        errorElement.textContent = 'Please enter a valid email address';
                    }
                }
                
                // Phone validation
                if (field.id === 'phone' && !isValidPhone(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    if (errorElement && errorElement.classList.contains('error-message')) {
                        errorElement.textContent = 'Please enter a valid phone number';
                    }
                }
            }
        });
        
        return isValid;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation helper
    function isValidPhone(phone) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    // File upload handling
    const fileInput = document.getElementById('documents');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileInfo = document.querySelector('.file-info');
            if (fileInfo) {
                if (this.files.length > 0) {
                    fileInfo.textContent = `Selected ${this.files.length} file(s)`;
                } else {
                    fileInfo.textContent = 'No file selected';
                }
            }
        });
    }
    
    // Form submission
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            submitButton.disabled = true;
            btnLoader.style.display = 'block';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Hide form and show success message
                applicationForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Reset form
                applicationForm.reset();
                
                // Reset button state
                submitButton.disabled = false;
                btnLoader.style.display = 'none';
            }, 2000);
        }
    });
    
    // Reset form button
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            applicationForm.reset();
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.textContent = '');
            const errorFields = document.querySelectorAll('.error');
            errorFields.forEach(field => field.classList.remove('error'));
        });
    }
    
    // Apply Now buttons
    const applyButtons = document.querySelectorAll('.btn-apply');
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const program = this.getAttribute('data-program');
            const programSelect = document.getElementById('program');
            if (programSelect) {
                programSelect.value = program;
                programSelect.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}); 