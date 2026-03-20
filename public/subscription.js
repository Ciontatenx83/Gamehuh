// public/subscription.js
// Subscription Plans Management & Stripe Integration

const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY'; // Replace with your key
const plansContainer = document.getElementById('plansContainer');

// Fetch and render subscription plans
async function loadPlans() {
  try {
    const response = await fetch('/api/plans');
    const plans = await response.json();
    renderPlans(plans);
  } catch (error) {
    console.error('Error loading plans:', error);
    plansContainer.innerHTML = '<p style="color: red;">Failed to load plans. Try again later.</p>';
  }
}

// Render plan cards
function renderPlans(plans) {
  plansContainer.innerHTML = plans.map((plan, index) => `
    <div class="plan-card ${plan.id === 'pro' ? 'featured' : ''}">
      <h3 class="plan-name">${plan.name}</h3>
      <div class="plan-price">
        $${plan.price}
        <span>/mo</span>
      </div>
      <ul class="plan-features">
        ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      <button 
        class="plan-button ${plan.id === 'free' ? 'get-started' : 'subscribe'}"
        onclick="handlePlanSelection('${plan.id}', '${plan.priceId || ''}', '${plan.name}', ${plan.price})"
        ${plan.id === 'free' ? 'disabled' : ''}>
        ${plan.id === 'free' ? 'Get Started' : 'Subscribe Now'}
      </button>
    </div>
  `).join('');
}

// Handle plan selection and redirect to Stripe Checkout
async function handlePlanSelection(planId, priceId, planName, planPrice) {
  if (planId === 'free') {
    alert('Free plan coming soon!');
    return;
  }

  if (!priceId || priceId === '') {
    alert('This plan is not yet configured. Please contact support.');
    return;
  }

  try {
    // Show loading state
    const button = event.target;
    button.disabled = true;
    button.textContent = 'Processing...';

    // Get user email (you can collect this in a modal or form)
    const userEmail = prompt('Enter your email address:');
    if (!userEmail) {
      button.disabled = false;
      button.textContent = 'Subscribe Now';
      return;
    }

    // Create checkout session
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId, email: userEmail }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { url } = await response.json();

    // Send confirmation email
    await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: userEmail, 
        planName, 
        planPrice 
      }),
    }).catch(err => console.warn('Email notification failed:', err));

    // Redirect to Stripe Checkout
    window.location.href = url;
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Error: ' + error.message);
    
    // Restore button state
    const button = event.target;
    button.disabled = false;
    button.textContent = 'Subscribe Now';
  }
}

// Load plans when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadPlans();
});

// Success event handler
window.addEventListener('message', (event) => {
  if (event.data.type === 'subscription-success') {
    alert('Welcome to your new subscription! Check your email for confirmation.');
    loadPlans(); // Refresh the plans
  }
});
