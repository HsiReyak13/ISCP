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
        const passwordsMatch = password.value === confirmPassword.value;
        
        if (passwordValidation !== 'valid' || 
            usernameValidation !== 'valid' || 
            studentIdValidation !== 'valid' || 
            !passwordsMatch) {
            alert('Please fix all validation errors before submitting.');
            return;
        }

        // Collect form data
        const formData = new FormData(registrationForm);
        const data = Object.fromEntries(formData);
        
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

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        this.value = value;
    });
}); 