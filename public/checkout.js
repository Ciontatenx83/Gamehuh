// Checkout Form Validation and Processing
// Secure payment processing with comprehensive validation

class CheckoutValidator {
  constructor() {
    this.form = document.getElementById('checkoutForm');
    this.cardInput = document.getElementById('cardNumber');
    this.expiryInput = document.getElementById('expiryDate');
    this.cvvInput = document.getElementById('cvv');
    this.submitBtn = document.getElementById('submitBtn');
    
    this.initEventListeners();
    this.loadPlanDetails();
  }

  initEventListeners() {
    // Real-time card validation
    this.cardInput.addEventListener('input', (e) => this.formatCardNumber(e));
    this.cardInput.addEventListener('blur', () => this.validateCard());

    // Real-time expiry date formatting and validation
    this.expiryInput.addEventListener('input', (e) => this.formatExpiryDate(e));
    this.expiryInput.addEventListener('blur', () => this.validateExpiry());

    // Real-time CVV validation
    this.cvvInput.addEventListener('input', (e) => this.validateCVV(e));

    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time name validation
    document.getElementById('fullName').addEventListener('blur', () => this.validateName());

    // Real-time email validation
    document.getElementById('email').addEventListener('blur', () => this.validateEmail());
  }

  // Load plan details from URL parameters
  loadPlanDetails() {
    const params = new URLSearchParams(window.location.search);
    const planName = params.get('plan') || 'Premium Plan';
    const planPrice = params.get('price') || '9.99';

    document.getElementById('planName').textContent = planName;
    document.getElementById('planPrice').textContent = `$${planPrice}`;
    document.getElementById('subtotal').textContent = `$${planPrice}`;
    document.getElementById('total').textContent = `$${planPrice}`;
  }

  // Format card number with spaces (XXXX XXXX XXXX XXXX)
  formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;

    // Detect card type (Visa or MasterCard)
    this.detectCardType(value);
  }

  // Detect card type based on first digit
  detectCardType(cardNumber) {
    const wrapper = document.getElementById('cardWrapper');
    const successVisa = document.getElementById('cardSuccess');
    const successMC = document.getElementById('cardSuccessMC');

    wrapper.classList.remove('visa', 'mastercard');
    successVisa.classList.remove('show');
    successMC.classList.remove('show');

    if (cardNumber.length === 0) return;

    if (cardNumber.startsWith('4')) {
      wrapper.classList.add('visa');
      if (cardNumber.length === 16) {
        successVisa.classList.add('show');
      }
    } else if (cardNumber.startsWith('5')) {
      wrapper.classList.add('mastercard');
      if (cardNumber.length === 16) {
        successMC.classList.add('show');
      }
    }
  }

  // Validate card number using Luhn algorithm
  validateCard() {
    const cardNumber = this.cardInput.value.replace(/\s/g, '');
    const errorMsg = document.getElementById('cardError');
    const cardInput = this.cardInput;

    if (cardNumber.length === 0) {
      errorMsg.classList.remove('show');
      cardInput.classList.remove('is-valid', 'is-invalid');
      return true;
    }

    // Check if valid Visa (starts with 4) or MasterCard (starts with 5)
    const isValidCard = this.luhnCheck(cardNumber) && 
                       (cardNumber.startsWith('4') || cardNumber.startsWith('5')) &&
                       cardNumber.length === 16;

    if (isValidCard) {
      errorMsg.classList.remove('show');
      cardInput.classList.add('is-valid');
      cardInput.classList.remove('is-invalid');
      return true;
    } else {
      if (cardNumber.length > 0) {
        errorMsg.textContent = cardNumber.startsWith('4') ? 'Invalid Visa card number' :
                             cardNumber.startsWith('5') ? 'Invalid MasterCard number' :
                             'Card must start with 4 (Visa) or 5 (MasterCard)';
        errorMsg.classList.add('show');
      }
      cardInput.classList.add('is-invalid');
      cardInput.classList.remove('is-valid');
      return false;
    }
  }

  // Luhn Algorithm for card validation
  luhnCheck(cardNumber) {
    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  // Format expiry date as MM/YY
  formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      const month = value.substr(0, 2);
      const year = value.substr(2, 2);
      e.target.value = month + (year ? '/' + year : '');
    } else {
      e.target.value = value;
    }
  }

  // Validate expiry date
  validateExpiry() {
    const expiryValue = this.expiryInput.value;
    const errorMsg = document.getElementById('expiryError');
    const expiryInput = this.expiryInput;

    if (expiryValue.length === 0) {
      errorMsg.classList.remove('show');
      expiryInput.classList.remove('is-valid', 'is-invalid');
      return true;
    }

    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const isValid = regex.test(expiryValue);

    if (isValid) {
      // Check if date is not in the past
      const [month, year] = expiryValue.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      const yearNum = parseInt(year);
      const monthNum = parseInt(month);

      if (yearNum > currentYear || (yearNum === currentYear && monthNum >= currentMonth)) {
        errorMsg.classList.remove('show');
        expiryInput.classList.add('is-valid');
        expiryInput.classList.remove('is-invalid');
        return true;
      } else {
        errorMsg.textContent = 'Card has expired';
        errorMsg.classList.add('show');
        expiryInput.classList.add('is-invalid');
        return false;
      }
    } else {
      errorMsg.textContent = 'Use format MM/YY (e.g., 12/25)';
      errorMsg.classList.add('show');
      expiryInput.classList.add('is-invalid');
      expiryInput.classList.remove('is-valid');
      return false;
    }
  }

  // Validate CVV (must be exactly 3 digits)
  validateCVV(e) {
    const cvvValue = e.target.value;
    const errorMsg = document.getElementById('cvvError');

    // Only allow digits
    e.target.value = cvvValue.replace(/\D/g, '').slice(0, 3);

    // Show/hide error and styling
    if (e.target.value.length === 3) {
      errorMsg.classList.remove('show');
      this.cvvInput.classList.add('is-valid');
      this.cvvInput.classList.remove('is-invalid');
    } else if (e.target.value.length > 0) {
      errorMsg.textContent = `CVV must be exactly 3 digits (currently ${e.target.value.length})`;
      errorMsg.classList.add('show');
      this.cvvInput.classList.add('is-invalid');
    } else {
      errorMsg.classList.remove('show');
      this.cvvInput.classList.remove('is-valid', 'is-invalid');
    }
  }

  // Validate full name
  validateName() {
    const nameValue = document.getElementById('fullName').value.trim();
    const errorMsg = document.getElementById('nameError');
    const nameInput = document.getElementById('fullName');

    if (nameValue.length < 3) {
      errorMsg.textContent = 'Name must be at least 3 characters';
      errorMsg.classList.add('show');
      nameInput.classList.add('is-invalid');
      return false;
    } else {
      errorMsg.classList.remove('show');
      nameInput.classList.add('is-valid');
      nameInput.classList.remove('is-invalid');
      return true;
    }
  }

  // Validate email
  validateEmail() {
    const emailValue = document.getElementById('email').value.trim();
    const errorMsg = document.getElementById('emailError');
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      errorMsg.textContent = 'Please enter a valid email address';
      errorMsg.classList.add('show');
      emailInput.classList.add('is-invalid');
      return false;
    } else {
      errorMsg.classList.remove('show');
      emailInput.classList.add('is-valid');
      emailInput.classList.remove('is-invalid');
      return true;
    }
  }

  // Validate terms
  validateTerms() {
    const termsCheckbox = document.getElementById('agreeTerms');
    const errorMsg = document.getElementById('termsError');

    if (!termsCheckbox.checked) {
      errorMsg.classList.add('show');
      return false;
    } else {
      errorMsg.classList.remove('show');
      return true;
    }
  }

  // Handle form submission
  async handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    const isCardValid = this.validateCard();
    const isExpiryValid = this.validateExpiry();
    const isCVVValid = this.cvvInput.value.length === 3;
    const isTermsValid = this.validateTerms();

    if (!isCVVValid) {
      document.getElementById('cvvError').textContent = 'CVV must be exactly 3 digits';
      document.getElementById('cvvError').classList.add('show');
    }

    if (!isNameValid || !isEmailValid || !isCardValid || !isExpiryValid || !isCVVValid || !isTermsValid) {
      return;
    }

    // Process payment
    await this.processPayment();
  }

  // Process payment securely
  async processPayment() {
    try {
      this.submitBtn.disabled = true;
      this.submitBtn.textContent = 'Processing Payment...';

      // Prepare secure payment data
      const paymentData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        cardType: this.cardInput.value.startsWith('4') ? 'Visa' : 'MasterCard',
        // NEVER send full card number in production - use Stripe Token
        cardLast4: this.cardInput.value.replace(/\s/g, '').slice(-4),
        expiryDate: document.getElementById('expiryDate').value,
        // NEVER send CVV anywhere - it's processed on Stripe's secure servers
        amount: document.getElementById('total').textContent,
        timestamp: new Date().toISOString(),
      };

      // Send to secure backend endpoint
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      const result = await response.json();

      // Success - redirect to confirmation page
      window.location.href = `/success.html?transactionId=${result.transactionId}&email=${encodeURIComponent(paymentData.email)}`;

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed: ' + error.message);
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = 'Complete Purchase';
    }
  }
}

// Initialize checkout validator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CheckoutValidator();
});
