// Contact Form Handler
// Sends messages directly to owner's email

class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      this.setupValidation();
    }
  }

  setupValidation() {
    const inputs = ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'];
    
    inputs.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('blur', () => this.validateField(element));
      }
    });
  }

  validateField(field) {
    const errorId = field.id + 'Error';
    const errorElement = document.getElementById(errorId);
    let isValid = true;
    let errorMsg = '';

    if (field.id === 'contactName') {
      if (field.value.trim().length < 3) {
        isValid = false;
        errorMsg = 'Name must be at least 3 characters';
      }
    } else if (field.id === 'contactEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        isValid = false;
        errorMsg = 'Please enter a valid email address';
      }
    } else if (field.id === 'contactSubject') {
      if (field.value.trim().length < 5) {
        isValid = false;
        errorMsg = 'Subject must be at least 5 characters';
      }
    } else if (field.id === 'contactMessage') {
      if (field.value.trim().length < 10) {
        isValid = false;
        errorMsg = 'Message must be at least 10 characters';
      }
    }

    if (isValid) {
      field.classList.add('is-valid');
      field.classList.remove('is-invalid');
      if (errorElement) errorElement.classList.remove('show');
    } else {
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      if (errorElement) {
        errorElement.textContent = errorMsg;
        errorElement.classList.add('show');
      }
    }

    return isValid;
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const nameField = document.getElementById('contactName');
    const emailField = document.getElementById('contactEmail');
    const subjectField = document.getElementById('contactSubject');
    const messageField = document.getElementById('contactMessage');

    const isNameValid = this.validateField(nameField);
    const isEmailValid = this.validateField(emailField);
    const isSubjectValid = this.validateField(subjectField);
    const isMessageValid = this.validateField(messageField);

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      return;
    }

    try {
      const button = this.form.querySelector('.contact-button');
      button.disabled = true;
      button.textContent = 'Sending...';

      // Send email via backend
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameField.value.trim(),
          email: emailField.value.trim(),
          subject: subjectField.value.trim(),
          message: messageField.value.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Success
      this.form.style.display = 'none';
      const successMsg = document.getElementById('contactSuccess');
      if (successMsg) {
        successMsg.style.display = 'block';
      }

      // Reset form after 3 seconds
      setTimeout(() => {
        this.form.reset();
        this.form.style.display = 'block';
        if (successMsg) {
          successMsg.style.display = 'none';
        }
        button.disabled = false;
        button.textContent = 'Send Message';
      }, 3000);

    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again later or email us directly.');
      const button = this.form.querySelector('.contact-button');
      button.disabled = false;
      button.textContent = 'Send Message';
    }
  }
}

// Initialize contact form
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
});
