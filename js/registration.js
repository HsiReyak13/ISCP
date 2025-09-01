document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const username = document.getElementById('username');
    const studentId = document.getElementById('studentId');

    // Password strength validation
    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        
        if (password.length < minLength) {
            return 'Password must be at least 8 characters long';
        }
        if (!hasUpperCase) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!hasLowerCase) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!hasNumbers) {
            return 'Password must contain at least one number';
        }
        return 'valid';
    }

    // Username validation
    function validateUsername(username) {
        if (username.length < 6) {
            return 'Username must be at least 6 characters long';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return 'Username can only contain letters, numbers, and underscores';
        }
        return 'valid';
    }

    // Student ID validation
    function validateStudentId(studentId) {
        const pattern = /^\d{4}-\d{5}$/;
        if (!pattern.test(studentId)) {
            return 'Student ID must be in format: YYYY-XXXXX (e.g., 2024-12345)';
        }
        return 'valid';
    }

    // Real-time password validation
    password.addEventListener('input', function() {
        const validation = validatePassword(this.value);
        const feedback = this.parentNode.querySelector('.form-text');
        
        if (validation === 'valid') {
            this.style.borderColor = '#10b981';
            feedback.style.color = '#10b981';
            feedback.textContent = '✓ Password meets requirements';
        } else {
            this.style.borderColor = '#ef4444';
            feedback.style.color = '#ef4444';
            feedback.textContent = validation;
        }
    });

    // Real-time username validation
    username.addEventListener('input', function() {
        const validation = validateUsername(this.value);
        const feedback = this.parentNode.querySelector('.form-text');
        
        if (validation === 'valid') {
            this.style.borderColor = '#10b981';
            feedback.style.color = '#10b981';
            feedback.textContent = '✓ Username is valid';
        } else {
            this.style.borderColor = '#ef4444';
            feedback.style.color = '#ef4444';
            feedback.textContent = validation;
        }
    });

    // Real-time student ID validation
    studentId.addEventListener('input', function() {
        const validation = validateStudentId(this.value);
        const feedback = this.parentNode.querySelector('.form-text');
        
        if (validation === 'valid') {
            this.style.borderColor = '#10b981';
            feedback.style.color = '#10b981';
            feedback.textContent = '✓ Student ID format is correct';
        } else {
            this.style.borderColor = '#ef4444';
            feedback.style.color = '#ef4444';
            feedback.textContent = validation;
        }
    });

    // Password confirmation validation
    confirmPassword.addEventListener('input', function() {
        if (this.value === password.value) {
            this.style.borderColor = '#10b981';
            this.setCustomValidity('');
        } else {
            this.style.borderColor = '#ef4444';
            this.setCustomValidity('Passwords do not match');
        }
    });

    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Final validation
        const passwordValidation = validatePassword(password.value);
        const usernameValidation = validateUsername(username.value);
        const studentIdValidation = validateStudentId(studentId.value);
        const phoneValidation = validatePhilippinePhone(phoneInput.value);
        const passwordsMatch = password.value === confirmPassword.value;
        
        if (passwordValidation !== 'valid' || 
            usernameValidation !== 'valid' || 
            studentIdValidation !== 'valid' || 
            phoneValidation !== 'valid' ||
            !passwordsMatch) {
            alert('Please fix all validation errors before submitting.');
            return;
        }

        // Collect form data
        const formData = new FormData(registrationForm);
        const data = Object.fromEntries(formData);
        
        // Clean phone number for submission (remove formatting)
        const cleanPhone = phoneInput.value.replace(/[^\d+]/g, '');
        data.phone = cleanPhone;
        
        // Simulate form submission (replace with actual API call)
        console.log('Registration data:', data);
        
        // Show success message
        alert('Registration submitted successfully! You will receive a confirmation email shortly.');
        
        // Reset form
        registrationForm.reset();
        
        // Reset validation styles
        const inputs = registrationForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
        
        const feedbacks = registrationForm.querySelectorAll('.form-text');
        feedbacks.forEach(feedback => {
            feedback.style.color = '';
            feedback.textContent = '';
        });
    });

    // Auto-format student ID input
    studentId.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 4) {
            value = value.slice(0, 4) + '-' + value.slice(4, 9);
        }
        this.value = value;
    });

    // Philippine phone number validation
    function validatePhilippinePhone(phone) {
        // Remove all non-digit characters except +
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        
        // Check if it starts with +639 (international format)
        if (cleanPhone.startsWith('+639')) {
            if (cleanPhone.length === 13) {
                // Additional validation: check if the number after +639 is valid
                const numberPart = cleanPhone.slice(4);
                if (numberPart.startsWith('9') && numberPart.length === 9) {
                    return 'valid';
                } else {
                    return 'International format should be +639XXXXXXXXX';
                }
            } else {
                return 'International format should be +639XXXXXXXXX';
            }
        }
        
        // Check if it starts with 09 (local format)
        if (cleanPhone.startsWith('09')) {
            if (cleanPhone.length === 11) {
                // Additional validation: check if the number after 09 is valid
                const numberPart = cleanPhone.slice(2);
                if (numberPart.startsWith('9') && numberPart.length === 9) {
                    return 'valid';
                } else {
                    return 'Local format should be 09XXXXXXXXX';
                }
            } else {
                return 'Local format should be 09XXXXXXXXX';
            }
        }
        
        // Check if it starts with 9 (without 0)
        if (cleanPhone.startsWith('9')) {
            if (cleanPhone.length === 10) {
                return 'valid';
            } else {
                return 'Format should be 9XXXXXXXXX';
            }
        }
        
        // Check if it's empty
        if (cleanPhone.length === 0) {
            return 'Please enter a Philippine mobile number';
        }
        
        // Check if it's too short
        if (cleanPhone.length < 10) {
            return 'Phone number is too short';
        }
        
        // Check if it's too long
        if (cleanPhone.length > 13) {
            return 'Phone number is too long';
        }
        
        return 'Please enter a valid Philippine mobile number starting with 09, 9, or +639';
    }

    // Phone number formatting and validation
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/[^\d+]/g, '');
        
        // Format the phone number for display
        let displayValue = value;
        if (value.startsWith('+639')) {
            // International format: +639-XX-XXX-XXXX
            if (value.length > 4) {
                displayValue = value.slice(0, 4) + '-' + value.slice(4, 6) + '-' + value.slice(6, 9) + '-' + value.slice(9, 13);
            }
        } else if (value.startsWith('09')) {
            // Local format: 09XX-XXX-XXXX
            if (value.length > 2) {
                displayValue = value.slice(0, 2) + value.slice(2, 6) + '-' + value.slice(6, 9) + '-' + value.slice(9, 13);
            }
        } else if (value.startsWith('9')) {
            // Format: 9XX-XXX-XXXX
            if (value.length > 1) {
                displayValue = value.slice(0, 1) + value.slice(1, 5) + '-' + value.slice(5, 8) + '-' + value.slice(8, 12);
            }
        }
        
        this.value = displayValue;
        
        // Validate and show feedback
        const validation = validatePhilippinePhone(value);
        const feedback = this.parentNode.querySelector('.form-text');
        
        if (validation === 'valid') {
            this.style.borderColor = '#10b981';
            this.classList.add('valid');
            this.classList.remove('invalid');
            feedback.style.color = '#10b981';
            feedback.textContent = '✓ Valid Philippine mobile number';
        } else {
            this.style.borderColor = '#ef4444';
            this.classList.add('invalid');
            this.classList.remove('valid');
            feedback.style.color = '#ef4444';
            feedback.textContent = validation;
        }
    });
}); 