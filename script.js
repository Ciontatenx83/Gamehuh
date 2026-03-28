// ============ GAMES DATABASE WITH LOCALSTORAGE ============
function loadGamesFromStorage() {
    const savedGames = localStorage.getItem('gameHubGames');
    if (savedGames) {
        return JSON.parse(savedGames);
    }
    // Default games if no saved data
    return [
        {
            id: 1,
            name: 'Dragon Quest',
            category: 'rpg',
            price: 29.99,
            rating: 4.8,
            image: 'https://via.placeholder.com/300x200?text=Dragon+Quest',
            developer: 'Epic Studios',
            description: 'Embark on an epic adventure in a fantasy world filled with dragons, magic, and treasures.',
            hidden: false
        },
        {
            id: 2,
            name: 'Cyber Storm',
            category: 'action',
            price: 39.99,
            rating: 4.5,
            image: 'https://via.placeholder.com/300x200?text=Cyber+Storm',
            developer: 'Vertex Games',
            description: 'Experience intense action in a cyberpunk world with stunning visuals and fast-paced gameplay.',
            hidden: false
        },
        {
            id: 3,
            name: 'Lost Temple',
            category: 'adventure',
            price: 24.99,
            rating: 4.6,
            image: 'https://via.placeholder.com/300x200?text=Lost+Temple',
            developer: 'Adventure Inc',
            description: 'Explore ancient ruins and solve puzzles to find the legendary Lost Temple.',
            hidden: false
        },
        {
            id: 4,
            name: 'Brain Master',
            category: 'puzzle',
            price: 9.99,
            rating: 4.4,
            image: 'https://via.placeholder.com/300x200?text=Brain+Master',
            developer: 'Mind Games Co',
            description: 'Challenge your mind with hundreds of brain-teasing puzzles and logic challenges.',
            hidden: false
        },
        {
            id: 5,
            name: 'Championship Racing',
            category: 'sports',
            price: 34.99,
            rating: 4.7,
            image: 'https://via.placeholder.com/300x200?text=Championship+Racing',
            developer: 'Racing Masters',
            description: 'Race against the world in realistic car racing with multiple tracks and vehicles.',
            hidden: false
        },
        {
            id: 6,
            name: 'Night Hunter',
            category: 'action',
            price: 44.99,
            rating: 4.9,
            image: 'https://via.placeholder.com/300x200?text=Night+Hunter',
            developer: 'Dark Games LLC',
            description: 'Hunt supernatural creatures in a dark, atmospheric world filled with mystery.',
            hidden: false
        },
        {
            id: 7,
            name: 'Fantasy Quest',
            category: 'rpg',
            price: 49.99,
            rating: 4.8,
            image: 'https://via.placeholder.com/300x200?text=Fantasy+Quest',
            developer: 'Quest Studios',
            description: 'Create your character and explore a vast fantasy world with thousands of quests.',
            hidden: false
        },
        {
            id: 8,
            name: 'Puzzle Paradise',
            category: 'puzzle',
            price: 14.99,
            rating: 4.3,
            image: 'https://via.placeholder.com/300x200?text=Puzzle+Paradise',
            developer: 'Paradise Games',
            description: 'Colorful puzzle game with beautiful graphics and addictive gameplay.',
            hidden: false
        }
    ];
}

// Initialize games from localStorage
let games = loadGamesFromStorage();

// Save games to localStorage
function saveGamesToStorage() {
    localStorage.setItem('gameHubGames', JSON.stringify(games));
}


let cart = [];
let currentGameForModal = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    loadCartFromStorage(); // Load cart
    updateCartBadge(); // Update cart badge
    displayFeaturedGames();
    displayAllGames();
    setupEventListeners();
});

// Display featured games
function displayFeaturedGames() {
    const featured = games.filter(game => !game.hidden).slice(0, 3);
    const featuredContainer = document.getElementById('featuredGames');
    
    featuredContainer.innerHTML = featured.map(game => `
        <div class="col-md-4">
            <div class="game-card" onclick="openGameModal(${game.id})">
                <img src="${game.image}" alt="${game.name}" class="game-card-image">
                <div class="game-card-body">
                    <h5 class="game-card-title">${game.name}</h5>
                    <span class="game-card-category">${game.category.toUpperCase()}</span>
                    <p class="game-card-description">${game.description}</p>
                    <div class="game-card-footer">
                        <span class="game-price">$${game.price}</span>
                        <div class="game-rating">
                            <i class="fas fa-star"></i> ${game.rating}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Display all games with search and filter
function displayAllGames(filtered = games) {
    const gamesList = document.getElementById('gamesList');
    const visibleGames = filtered.filter(game => !game.hidden);

    if (visibleGames.length === 0) {
        gamesList.innerHTML = '<div class="col-12"><p class="text-center text-muted">No games found matching your criteria.</p></div>';
        return;
    }
    
    gamesList.innerHTML = visibleGames.map(game => `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="game-card" onclick="openGameModal(${game.id})">
                <img src="${game.image}" alt="${game.name}" class="game-card-image">
                <div class="game-card-body">
                    <h5 class="game-card-title">${game.name}</h5>
                    <span class="game-card-category">${game.category.toUpperCase()}</span>
                    <p class="game-card-description">${game.description}</p>
                    <div class="game-card-footer">
                        <span class="game-price">$${game.price}</span>
                        <div class="game-rating">
                            <i class="fas fa-star"></i> ${game.rating}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup event listeners for search and filter
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const cartLink = document.querySelector('.cart-link');
    const contactForm = document.getElementById('contactForm');
    const themeToggleBtn = document.getElementById('themeToggle');

    searchInput.addEventListener('input', filterGames);
    categoryFilter.addEventListener('change', filterGames);
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        showCart();
    });
    contactForm.addEventListener('submit', handleContactSubmit);
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
}

// Filter games
function filterGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    const filtered = games.filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(searchTerm) || 
                             game.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || game.category === category;
        return matchesSearch && matchesCategory && !game.hidden;
    });

    displayAllGames(filtered);
    
    // Show/hide active filter
    const activeFilter = document.getElementById('activeFilter');
    const activeFilterName = document.getElementById('activeFilterName');
    if (category) {
        activeFilter.style.display = 'block';
        activeFilterName.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    } else {
        activeFilter.style.display = 'none';
    }
}

// Clear filter
function clearFilter() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('activeFilter').style.display = 'none';
    displayAllGames();
}

// Open game modal with details
function openGameModal(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    currentGameForModal = game;

    document.getElementById('gameModalTitle').textContent = game.name;
    document.getElementById('gameModalImage').src = game.image;
    document.getElementById('gameModalDescription').textContent = game.description;
    document.getElementById('gameModalDeveloper').textContent = game.developer;
    document.getElementById('gameModalCategory').textContent = game.category.toUpperCase();
    document.getElementById('gameModalPrice').textContent = game.price.toFixed(2);

    const ratingHtml = `<div class="text-warning">
        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(game.rating))}
        <span class="text-muted ml-2">${game.rating}/5</span>
    </div>`;
    document.getElementById('gameModalRating').innerHTML = ratingHtml;

    const gameInCart = cart.find(item => item.id === gameId);
    const buyButton = document.getElementById('buyButton');
    if (gameInCart) {
        buyButton.textContent = 'Already in Cart';
        buyButton.disabled = true;
    } else {
        buyButton.textContent = 'Add to Cart';
        buyButton.disabled = false;
    }

    const modal = new bootstrap.Modal(document.getElementById('gameModal'));
    modal.show();
}

// Add game to cart
function addToCart() {
    if (!currentGameForModal) return;

    const existingItem = cart.find(item => item.id === currentGameForModal.id);
    
    if (!existingItem) {
        cart.push({
            ...currentGameForModal,
            quantity: 1
        });
        saveCartToStorage();
        updateCartBadge();
        
        const buyButton = document.getElementById('buyButton');
        buyButton.textContent = 'Already in Cart';
        buyButton.disabled = true;

        // Show notification
        showNotification(`${currentGameForModal.name} added to cart!`);
    }
}

// Show cart
function showCart() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    updateCartDisplay();
    cartModal.show();
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
        cartTotalElement.textContent = '0.00';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h6 class="cart-item-name">${item.name}</h6>
                    <p class="text-muted mb-0">Qty: ${item.quantity}</p>
                </div>
                <div>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    cartTotalElement.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartBadge();
    updateCartDisplay();
    showNotification('Item removed from cart');
}

// Update cart badge
function updateCartBadge() {
    const badge = document.querySelector('.badge-cart');
    if (badge) {
        badge.textContent = cart.length;
        // Show/hide badge based on cart content
        if (cart.length > 0) {
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('gameHubCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('gameHubCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartBadge();
    }
}

// Proceed to checkout with Stripe
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Initialize Stripe
    const stripe = Stripe('pk_test_YOUR_STRIPE_KEY_HERE'); // Replace with actual Stripe key

    // Create a payment intent on your backend
    // For demo, we'll use a simple alert
    showCheckoutForm(total);
}

// Show checkout form
function showCheckoutForm(total) {
    const checkoutForm = `
        <div class="modal fade" id="checkoutModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Checkout</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Order Total: $${total.toFixed(2)}</h6>
                        <form id="paymentForm">
                            <div class="mb-3">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Card Number</label>
                                <input type="text" class="form-control" placeholder="4242 4242 4242 4242" required>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Expiry Date</label>
                                    <input type="text" class="form-control" placeholder="MM/YY" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">CVC</label>
                                    <input type="text" class="form-control" placeholder="123" required>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="processPayment('${total}')">
                            Pay $${total.toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', checkoutForm);
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.show();
}

// Process payment
function processPayment(amount) {
    showNotification('Processing payment of $' + amount + '...');
    
    // Simulate payment processing
    setTimeout(() => {
        showNotification('Payment successful! Your games are ready to download.', 'success');
        cart = [];
        saveCartToStorage();
        updateCartBadge();
        
        // Close modals
        const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
        const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        if (checkoutModal) checkoutModal.hide();
        if (cartModal) cartModal.hide();
    }, 2000);
}

// Payment method options
function openPayment(plan) {
    const plans = {
        'premium': 9.99,
        'pro': 19.99
    };

    const amount = plans[plan];
    alert(`Proceeding to payment for ${plan.toUpperCase()} plan: $${amount}\n\nIn production, this would connect to Stripe payment processing.`);
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    e.target.reset();
}

// Show notification toast
function showNotification(message, type = 'info') {
    const toastHTML = `
        <div class="toast align-items-center text-white bg-${type === 'success' ? 'success' : 'info'} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;

    const toastContainer = document.createElement('div');
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '9999';
    toastContainer.innerHTML = toastHTML;
    document.body.appendChild(toastContainer);

    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toast.show();

    setTimeout(() => toastContainer.remove(), 3000);
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#cart') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ============ THEME SWITCHING ============
// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('gameHubTheme') || 'dark';
    setTheme(savedTheme);
}

// Set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gameHubTheme', theme);
    updateThemeIcon(theme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Update theme toggle icon
function updateThemeIcon(theme) {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleBtn.title = 'Switch to light mode';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleBtn.title = 'Switch to dark mode';
        }
    }
}

// ========= PASSWORD FUNCTIONALITY =========

// Toggle Password Visibility
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        button.title = 'Hide password';
        button.style.background = 'rgba(255, 107, 53, 0.3) !important';
        button.style.borderColor = '#ff6b35 !important';
        button.style.color = '#ff6b35 !important';
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        button.title = 'Show password';
        button.style.background = 'rgba(255, 255, 255, 0.1) !important';
        button.style.borderColor = 'rgba(255, 255, 255, 0.2) !important';
        button.style.color = 'var(--text-primary) !important';
    }
    
    // Add visual feedback
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1.05)';
    }, 150);
}

// Check Password Strength
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = '';
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    // Determine strength level
    if (strength <= 2) {
        feedback = { level: 'weak', text: 'Weak password', color: '#dc3545', width: '25%' };
    } else if (strength <= 3) {
        feedback = { level: 'fair', text: 'Fair password', color: '#ffc107', width: '50%' };
    } else if (strength <= 4) {
        feedback = { level: 'good', text: 'Good password', color: '#28a745', width: '75%' };
    } else {
        feedback = { level: 'strong', text: 'Strong password', color: '#007bff', width: '100%' };
    }
    
    return feedback;
}

// Update Password Strength Display
function updatePasswordStrength(passwordInput, strengthContainer) {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    
    if (password.length === 0) {
        strengthContainer.innerHTML = '';
        return;
    }
    
    strengthContainer.innerHTML = `
        <div class="password-strength">
            <div class="password-strength-bar strength-${strength.level}" style="width: ${strength.width}; background: ${strength.color};"></div>
        </div>
        <div class="password-strength-text strength-${strength.level}">${strength.text}</div>
    `;
}

// ========= USER AUTHENTICATION =========

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Login Modal
function showLoginModal() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

// Show Signup Modal
function showSignupModal() {
    const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
    signupModal.show();
}

// Switch to Signup
function switchToSignup() {
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();
    showSignupModal();
}

// Switch to Login
function switchToLogin() {
    const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
    signupModal.hide();
    showLoginModal();
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Check if user is active
        if (user.status !== 'active') {
            showNotification('Account is not active. Please contact support.', 'error');
            return;
        }
        
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (rememberMe) {
            localStorage.setItem('rememberUser', 'true');
        } else {
            localStorage.removeItem('rememberUser');
        }
        
        // Update navbar
        updateUserNavbar();
        
        // Close modal
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        if (loginModal) {
            loginModal.hide();
        }
        
        // Reset form
        document.getElementById('loginForm').reset();
        
        showNotification(`Welcome back, ${user.name}!`, 'success');
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

// Handle Signup
function handleSignup(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Comprehensive validation
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (name.length < 2) {
        showNotification('Name must be at least 2 characters', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        showNotification('User with this email already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password, // In production, hash this
        role: 'user',
        status: 'active',
        joined: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString()
    };
    
    // Save user to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login after signup
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    updateUserNavbar();
    
    // Close modal
    const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
    if (signupModal) {
        signupModal.hide();
    }
    
    // Reset form
    document.getElementById('signupForm').reset();
    document.getElementById('signupPasswordStrength').innerHTML = '';
    
    showNotification(`Welcome to GameHub, ${name}! Your account has been created successfully.`, 'success');
}

// Update User Navbar
function updateUserNavbar() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const navbar = document.querySelector('.navbar-nav.ms-auto');
    
    if (!navbar) {
        console.warn('Navbar element not found');
        return;
    }
    
    if (currentUser) {
        // Show user menu
        navbar.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="#games">Games</a></li>
            <li class="nav-item"><a class="nav-link" href="#categories">Categories</a></li>
            <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
            <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
            <li class="nav-item">
                <a class="nav-link cart-link" href="#" onclick="openCartModal(event)">
                    <i class="fas fa-shopping-cart"></i> Cart <span class="badge badge-cart" style="display:none;">0</span>
                </a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i class="fas fa-user"></i> ${currentUser.name}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" onclick="showProfile()"><i class="fas fa-user"></i> Profile</a></li>
                    <li><a class="dropdown-item" href="#" onclick="showSettings()"><i class="fas fa-cog"></i> Settings</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                </ul>
            </li>
        `;
    } else {
        // Show login/signup buttons
        navbar.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="#games">Games</a></li>
            <li class="nav-item"><a class="nav-link" href="#categories">Categories</a></li>
            <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
            <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
            <li class="nav-item">
                <a class="nav-link cart-link" href="#" onclick="openCartModal(event)">
                    <i class="fas fa-shopping-cart"></i> Cart <span class="badge badge-cart" style="display:none;">0</span>
                </a>
            </li>
            <li class="nav-item">
                <button class="btn btn-sm btn-outline-light" onclick="showLoginModal()">
                    <i class="fas fa-sign-in-alt"></i> Log In
                </button>
            </li>
            <li class="nav-item ms-2">
                <button class="btn btn-sm btn-primary" onclick="showSignupModal()">
                    <i class="fas fa-user-plus"></i> Sign Up
                </button>
            </li>
        `;
    }
    
    // Update cart badge after navbar update
    updateCartBadge();
}

// Logout
function logout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Clear session data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberUser');
    
    // Update navbar
    updateUserNavbar();
    
    // Show notification
    if (currentUser) {
        showNotification(`Goodbye, ${currentUser.name}! You have been logged out.`, 'info');
    } else {
        showNotification('You have been logged out.', 'info');
    }
}

// Show Terms
function showTerms() {
    alert('Terms and Conditions:\n\n1. You must be 13+ years old to use this service.\n2. You are responsible for your account security.\n3. All purchases are final.\n4. We reserve the right to terminate accounts for violations.\n5. Privacy is important to us - see our Privacy Policy.');
}

// Show Profile
function showProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        alert(`Profile Information:\n\nName: ${currentUser.name}\nEmail: ${currentUser.email}\nMember Since: ${currentUser.joined}\nStatus: ${currentUser.status}`);
    }
}

// Show Settings
function showSettings() {
    alert('Settings panel coming soon! You will be able to:\n- Update your profile\n- Change password\n- Manage notifications\n- Privacy settings');
}

// Check for remembered user on page load
function checkRememberedUser() {
    const rememberUser = localStorage.getItem('rememberUser');
    const currentUser = localStorage.getItem('currentUser');
    
    if (rememberUser === 'true' && currentUser) {
        updateUserNavbar();
    }
}

// Initialize authentication
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for login/signup forms
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
        
        // Add password strength checker
        const signupPassword = document.getElementById('signupPassword');
        const signupPasswordStrength = document.getElementById('signupPasswordStrength');
        
        if (signupPassword && signupPasswordStrength) {
            signupPassword.addEventListener('input', function() {
                updatePasswordStrength(this, signupPasswordStrength);
            });
        }
    }
    
    // Check for remembered user
    checkRememberedUser();
});

// ========= BACKGROUND MANAGEMENT SYSTEM =========

let backgroundImages = [];
let currentBackgroundIndex = 0;
let rotationInterval = null;
let rotationEnabled = true;

// Load Background Gallery
function loadBackgroundGallery() {
    const saved = localStorage.getItem('backgroundImages');
    if (saved) {
        backgroundImages = JSON.parse(saved);
    } else {
        // Default backgrounds
        backgroundImages = [
            'https://images.unsplash.com/photo-1511512578047-d6360b9846c7?w=1920&h=1080&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop'
        ];
        saveBackgroundImages();
    }
    
    renderBackgroundGallery();
    startBackgroundRotation();
}

// Save Background Images
function saveBackgroundImages() {
    localStorage.setItem('backgroundImages', JSON.stringify(backgroundImages));
}

// Render Background Gallery
function renderBackgroundGallery() {
    const gallery = document.getElementById('backgroundGallery');
    if (!gallery) return;
    
    if (backgroundImages.length === 0) {
        gallery.innerHTML = '<p class="text-muted">No background images added yet.</p>';
        return;
    }
    
    gallery.innerHTML = backgroundImages.map((url, index) => `
        <div class="background-item ${index === currentBackgroundIndex ? 'active' : ''}" data-index="${index}">
            <img src="${url}" alt="Background ${index + 1}" class="background-thumb">
            <div class="background-overlay">
                <button class="btn btn-sm btn-primary" onclick="setBackgroundImage(${index})">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="removeBackgroundImage(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Add Background Image
function addBackgroundImage() {
    const input = document.getElementById('bgImageUrl');
    const url = input.value.trim();
    
    if (!url) {
        showNotification('Please enter a valid image URL', 'error');
        return;
    }
    
    // Validate URL format
    try {
        new URL(url);
    } catch (e) {
        showNotification('Please enter a valid URL', 'error');
        return;
    }
    
    // Check if URL already exists
    if (backgroundImages.includes(url)) {
        showNotification('This background image already exists', 'warning');
        return;
    }
    
    // Add to collection
    backgroundImages.push(url);
    saveBackgroundImages();
    renderBackgroundGallery();
    
    // Clear input
    input.value = '';
    
    showNotification('Background image added successfully!', 'success');
    
    // Auto-switch to new background
    setBackgroundImage(backgroundImages.length - 1);
}

// Remove Background Image
function removeBackgroundImage(index) {
    if (confirm('Are you sure you want to remove this background image?')) {
        backgroundImages.splice(index, 1);
        saveBackgroundImages();
        renderBackgroundGallery();
        
        // Adjust current index if needed
        if (currentBackgroundIndex >= backgroundImages.length) {
            currentBackgroundIndex = 0;
        }
        
        // Apply background if images remain
        if (backgroundImages.length > 0) {
            setBackgroundImage(currentBackgroundIndex);
        } else {
            clearBackground();
        }
        
        showNotification('Background image removed', 'info');
    }
}

// Set Background Image
function setBackgroundImage(index) {
    if (index < 0 || index >= backgroundImages.length) return;
    
    currentBackgroundIndex = index;
    const url = backgroundImages[index];
    
    // Apply to body
    document.body.style.setProperty('--bg-image', `url('${url}')`);
    document.body.style.setProperty('--bg-opacity', document.getElementById('bgOpacity').value / 100);
    
    // Update active state in gallery
    renderBackgroundGallery();
    
    showNotification(`Background ${index + 1} applied`, 'success');
}

// Start Background Rotation
function startBackgroundRotation() {
    if (rotationInterval) {
        clearInterval(rotationInterval);
    }
    
    if (rotationEnabled && backgroundImages.length > 1) {
        rotationInterval = setInterval(() => {
            currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
            setBackgroundImage(currentBackgroundIndex);
        }, 5000); // 5 seconds
    }
}

// Stop Background Rotation
function stopBackgroundRotation() {
    if (rotationInterval) {
        clearInterval(rotationInterval);
        rotationInterval = null;
        console.log('Background rotation stopped');
    }
}

// Setup Background Controls
function setupBackgroundControls() {
    // Rotation toggle
    const rotationToggle = document.getElementById('enableRotation');
    if (rotationToggle) {
        rotationToggle.addEventListener('change', function() {
            rotationEnabled = this.checked;
            if (rotationEnabled) {
                startBackgroundRotation();
            } else {
                stopBackgroundRotation();
            }
        });
    }
    
    // Opacity slider
    const opacitySlider = document.getElementById('bgOpacity');
    const opacityValue = document.getElementById('opacityValue');
    if (opacitySlider && opacityValue) {
        opacitySlider.addEventListener('input', function() {
            const opacity = this.value;
            opacityValue.textContent = opacity + '%';
            document.body.style.setProperty('--bg-opacity', opacity / 100);
        });
    }
}

// Clear All Backgrounds
function clearAllBackgrounds() {
    if (confirm('Are you sure you want to clear all background images?')) {
        backgroundImages = [];
        saveBackgroundImages();
        renderBackgroundGallery();
        clearBackground();
        stopBackgroundRotation();
        showNotification('All backgrounds cleared', 'info');
    }
}

// Clear Background
function clearBackground() {
    document.body.style.removeProperty('--bg-image');
    document.body.style.setProperty('--bg-opacity', '0.3');
}

// Reset to Defaults
function resetToDefaults() {
    if (confirm('Reset to default background images?')) {
        backgroundImages = [
            'https://images.unsplash.com/photo-1511512578047-d6360b9846c7?w=1920&h=1080&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop'
        ];
        saveBackgroundImages();
        renderBackgroundGallery();
        currentBackgroundIndex = 0;
        setBackgroundImage(0);
        startBackgroundRotation();
        showNotification('Reset to default backgrounds', 'success');
    }
}

// Update Theme Background (legacy function)
function updateThemeBackground() {
    const imageUrl = document.getElementById('bgImageUrl')?.value;
    const opacity = document.getElementById('bgOpacity')?.value || 60;
    
    if (imageUrl) {
        addBackgroundImage();
        document.body.style.setProperty('--bg-opacity', opacity / 100);
        showNotification('Background updated successfully!', 'success');
    }
}

// ========= ADMIN DASHBOARD =========
const ADMIN_PASSWORD = 'Ciontaten83x';
let adminAuthenticated = false;

// Open Admin Panel in current site
function openAdminPanel() {
    // Check if already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
        // Open admin panel in modal within current site
        const adminModal = new bootstrap.Modal(document.getElementById('adminOfficeModal'));
        adminModal.show();
        loadAdminDashboard();
    } else {
        // Redirect to admin login in modal
        showAdminLoginModal();
    }
}

// Show Admin Login Modal
function showAdminLoginModal() {
    // Create admin login modal if it doesn't exist
    if (!document.getElementById('adminLoginModal')) {
        const modalHtml = `
            <div class="modal fade" id="adminLoginModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="glass-modal-content">
                        <div class="modal-header glass-header">
                            <h5 class="modal-title"><i class="fas fa-lock"></i> Admin Login</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="adminLoginForm">
                                <div class="mb-3">
                                    <label for="adminEmail" class="form-label">Admin Email</label>
                                    <input type="email" class="form-control" id="adminEmail" required>
                                </div>
                                <div class="mb-3">
                                    <label for="adminPassword" class="form-label">Admin Password</label>
                                    <div class="password-input-group">
                                        <input type="password" class="form-control" id="adminPassword" required>
                                        <button type="button" class="btn btn-outline-secondary password-toggle" onclick="togglePassword('adminPassword', this)">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Add event listener for admin login form
        document.getElementById('adminLoginForm').addEventListener('submit', handleAdminLogin);
    }
    
    const adminLoginModal = new bootstrap.Modal(document.getElementById('adminLoginModal'));
    adminLoginModal.show();
}

// Handle Admin Login
function handleAdminLogin(e) {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    
    // Simple authentication (in production, use proper authentication)
    if (password === 'Ciontaten83x') {
        // Set admin token
        localStorage.setItem('adminToken', 'admin_authenticated');
        localStorage.setItem('adminEmail', email);
        
        // Close login modal
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('adminLoginModal'));
        loginModal.hide();
        
        // Open admin panel
        openAdminPanel();
        showNotification('Admin login successful!', 'success');
    } else {
        showNotification('Invalid admin credentials', 'error');
    }
}

// Load Admin Dashboard
function loadAdminDashboard() {
    // Load admin data and initialize dashboard
    initializeAdminTabs();
    loadAdminData();
}

// Initialize Admin Tabs
function initializeAdminTabs() {
    // Add event listeners for admin tabs
    const adminTabs = document.querySelectorAll('[data-bs-toggle="tab"]');
    adminTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function (e) {
            const target = e.target.getAttribute('data-bs-target');
            loadAdminTabContent(target);
        });
    });
}

// Load Admin Tab Content
function loadAdminTabContent(tabId) {
    switch(tabId) {
        case '#dashboardTab':
            loadDashboardContent();
            break;
        case '#addGameTab':
            loadAddGameContent();
            break;
        case '#manageGamesTab':
            loadManageGamesContent();
            break;
        case '#analyticsTab':
            loadAnalyticsContent();
            break;
        case '#themeSettingsTab':
            loadThemeSettingsContent();
            break;
    }
}

// Load Dashboard Content
function loadDashboardContent() {
    const dashboardTab = document.querySelector('#dashboardTab');
    if (dashboardTab) {
        // Update total games count
        const totalGamesElement = document.getElementById('totalGamesCount');
        if (totalGamesElement) {
            totalGamesElement.textContent = games.filter(g => !g.hidden).length;
        }
    }
}

// Load Add Game Content
function loadAddGameContent() {
    // The form already exists in HTML, just add event listener if needed
    const addGameForm = document.getElementById('addGameForm');
    if (addGameForm && !addGameForm.hasAttribute('data-listener')) {
        addGameForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddGameFromForm();
        });
        addGameForm.setAttribute('data-listener', 'true');
    }
}

// Handle Add Game from Form
function handleAddGameFromForm() {
    const gameData = {
        name: document.getElementById('gameTitle').value,
        category: document.getElementById('gameCategory').value,
        price: parseFloat(document.getElementById('gamePrice').value),
        image: document.getElementById('gameImage')?.value || 'https://via.placeholder.com/300x200?text=New+Game',
        description: document.getElementById('gameDescription')?.value || 'New game description',
        developer: document.getElementById('gameDeveloper')?.value || 'Unknown Developer',
        hidden: false
    };
    
    gameData.id = Date.now();
    games.push(gameData);
    saveGamesToStorage();
    
    // Reset form
    document.getElementById('addGameForm').reset();
    
    // Refresh displays
    displayFeaturedGames();
    displayAllGames();
    loadDashboardContent();
    
    showNotification('Game added successfully!', 'success');
}

// Load Manage Games Content
function loadManageGamesContent() {
    const manageGamesTab = document.querySelector('#manageGamesTab');
    if (manageGamesTab) {
        const tableBody = manageGamesTab.querySelector('#adminGamesTableBody');
        if (tableBody) {
            tableBody.innerHTML = games.map(game => `
                <tr>
                    <td>${game.id}</td>
                    <td>${game.name}</td>
                    <td>${game.category}</td>
                    <td>$${game.price}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editAdminGame(${game.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="toggleGameVisibility(${game.id})">
                            <i class="fas fa-eye${game.hidden ? '-slash' : ''}"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteAdminGame(${game.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

// Edit Admin Game
function editAdminGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game) {
        // Populate the add game form
        document.getElementById('gameTitle').value = game.name;
        document.getElementById('gameCategory').value = game.category;
        document.getElementById('gamePrice').value = game.price;
        document.getElementById('gameImage').value = game.image;
        document.getElementById('gameDescription').value = game.description;
        document.getElementById('gameDeveloper').value = game.developer;
        
        // Switch to add game tab
        const addGameTabBtn = document.querySelector('[data-bs-target="#addGameTab"]');
        if (addGameTabBtn) {
            addGameTabBtn.click();
        }
    }
}

// Toggle Game Visibility
function toggleGameVisibility(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game) {
        game.hidden = !game.hidden;
        saveGamesToStorage();
        displayFeaturedGames();
        displayAllGames();
        loadManageGamesContent();
        showNotification(`Game ${game.hidden ? 'hidden' : 'shown'} successfully!`, 'success');
    }
}

// Delete Admin Game
function deleteAdminGame(gameId) {
    if (confirm('Are you sure you want to delete this game?')) {
        games = games.filter(g => g.id !== gameId);
        saveGamesToStorage();
        displayFeaturedGames();
        displayAllGames();
        loadManageGamesContent();
        loadDashboardContent();
        showNotification('Game deleted successfully!', 'success');
    }
}

// Load Analytics Content
function loadAnalyticsContent() {
    const analyticsTab = document.querySelector('#analyticsTab .tab-content');
    if (analyticsTab && !analyticsTab.innerHTML.includes('analyticsChart')) {
        analyticsTab.innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <h5>Revenue Chart</h5>
                    <canvas id="analyticsChart" style="height: 300px;"></canvas>
                </div>
                <div class="col-md-4">
                    <h5>Recent Activity</h5>
                    <div class="activity-log">
                        <div class="activity-item">
                            <i class="fas fa-shopping-cart"></i> New order received
                        </div>
                        <div class="activity-item">
                            <i class="fas fa-user"></i> New user registered
                        </div>
                        <div class="activity-item">
                            <i class="fas fa-gamepad"></i> Game downloaded
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Load Theme Settings Content
function loadThemeSettingsContent() {
    const themeSettingsTab = document.querySelector('#themeSettingsTab');
    if (themeSettingsTab && !themeSettingsTab.innerHTML.includes('backgroundGallery')) {
        themeSettingsTab.innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <h5><i class="fas fa-images"></i> Background Gallery</h5>
                    <div class="mb-3">
                        <label for="bgImageUrl" class="form-label">Add Background Image URL</label>
                        <div class="input-group">
                            <input type="url" class="form-control" id="bgImageUrl" placeholder="Enter image URL">
                            <button class="btn btn-primary" onclick="addBackgroundImage()">
                                <i class="fas fa-plus"></i> Add
                            </button>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Current Background Images</label>
                        <div id="backgroundGallery" class="background-gallery">
                            <!-- Background images will be loaded here -->
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="enableRotation" checked>
                            <label class="form-check-label" for="enableRotation">
                                Enable Auto-Rotation (5 seconds)
                            </label>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="bgOpacity" class="form-label">Background Opacity</label>
                        <input type="range" class="form-range" id="bgOpacity" min="0" max="100" value="60">
                        <small class="text-muted">Current: <span id="opacityValue">60%</span></small>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <h5><i class="fas fa-palette"></i> Color Settings</h5>
                    <div class="mb-3">
                        <label for="primaryColor" class="form-label">Primary Color</label>
                        <input type="color" class="form-control form-control-color" id="primaryColor" value="#ff6b35">
                    </div>
                    <div class="mb-3">
                        <label for="secondaryColor" class="form-label">Secondary Color</label>
                        <input type="color" class="form-control form-control-color" id="secondaryColor" value="#1e3a8a">
                    </div>
                    <button class="btn btn-primary w-100" onclick="updateThemeColors()">
                        <i class="fas fa-paint-brush"></i> Update Colors
                    </button>
                    
                    <hr class="my-4">
                    
                    <h6><i class="fas fa-cog"></i> Quick Actions</h6>
                    <button class="btn btn-outline-danger w-100 mb-2" onclick="clearAllBackgrounds()">
                        <i class="fas fa-trash"></i> Clear All Backgrounds
                    </button>
                    <button class="btn btn-outline-secondary w-100" onclick="resetToDefaults()">
                        <i class="fas fa-undo"></i> Reset to Defaults
                    </button>
                </div>
            </div>
        `;
        
        // Load existing backgrounds and setup event listeners
        loadBackgroundGallery();
        setupBackgroundControls();
    }
}

// Handle Add Game
function handleAddGame(e) {
    e.preventDefault();
    const gameData = {
        name: document.getElementById('gameName').value,
        genre: document.getElementById('gameGenre').value,
        price: parseFloat(document.getElementById('gamePrice').value),
        image: document.getElementById('gameImage').value,
        description: document.getElementById('gameDescription').value
    };
    
    // Add game to existing games array
    gameData.id = Date.now();
    games.push(gameData);
    saveGamesToStorage(); // Use the main games storage
    
    // Reset form
    document.getElementById('addGameForm').reset();
    
    // Show success message
    showNotification('Game added successfully!', 'success');
    
    // Refresh games table if visible
    loadGamesTable();
}

// Load Games Table
function loadGamesTable() {
    const tbody = document.getElementById('gamesTableBody');
    if (tbody) {
        tbody.innerHTML = games.map(game => `
            <tr>
                <td>${game.id}</td>
                <td>${game.name}</td>
                <td>${game.genre || game.category}</td>
                <td>$${game.price}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editGame(${game.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteGame(${game.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// Edit Game
function editGame(gameId) {
    const games = JSON.parse(localStorage.getItem('games') || '[]');
    const game = games.find(g => g.id === gameId);
    if (game) {
        // Populate form with game data
        document.getElementById('gameName').value = game.name;
        document.getElementById('gameGenre').value = game.genre;
        document.getElementById('gamePrice').value = game.price;
        document.getElementById('gameImage').value = game.image || '';
        document.getElementById('gameDescription').value = game.description;
        
        // Switch to add game tab
        const addGameTab = document.querySelector('[data-bs-target="#addGameTab"]');
        if (addGameTab) {
            addGameTab.click();
        }
    }
}

// Delete Game
function deleteGame(gameId) {
    if (confirm('Are you sure you want to delete this game?')) {
        games = games.filter(g => g.id !== gameId);
        saveGamesToStorage(); // Use the main games storage
        loadGamesTable();
        showNotification('Game deleted successfully!', 'success');
    }
}

// Update Theme Background
function updateThemeBackground() {
    const imageUrl = document.getElementById('bgImageUrl').value;
    const opacity = document.getElementById('bgOpacity').value;
    
    if (imageUrl) {
        setBackgroundImage(imageUrl);
        document.body.style.setProperty('--bg-opacity', opacity / 100);
        showNotification('Background updated successfully!', 'success');
    }
}

// Update Theme Colors
function updateThemeColors() {
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    showNotification('Colors updated successfully!', 'success');
}

// Exit Admin Panel
function exitAdminPanel() {
    const adminModal = bootstrap.Modal.getInstance(document.getElementById('adminOfficeModal'));
    if (adminModal) {
        adminModal.hide();
    }
}

// Load Admin Data
function loadAdminData() {
    // Load all admin data
    loadDashboardContent();
    loadGamesTable();
}

// Background Image Management
function setBackgroundImage(imageUrl) {
    if (imageUrl) {
        document.body.style.setProperty('--bg-image', `url('${imageUrl}')`);
        const style = document.createElement('style');
        style.textContent = `
            body::before {
                background-image: url('${imageUrl}') !important;
            }
        `;
        document.head.appendChild(style);
        document.body.classList.add('has-background');
        localStorage.setItem('backgroundImage', imageUrl);
    }
}

function loadBackgroundImage() {
    const savedImage = localStorage.getItem('backgroundImage');
    if (savedImage) {
        setBackgroundImage(savedImage);
    }
}

// Initialize background on page load
document.addEventListener('DOMContentLoaded', function() {
    loadBackgroundImage();
});

function authenticateAdmin() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        adminAuthenticated = true;
        document.getElementById('adminLoginError').style.display = 'none';
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('adminLoginModal'));
        if (loginModal) {
            loginModal.hide();
        }
        document.getElementById('adminDashboard').style.display = 'block';
        renderAdminGameList();
        showNotification('Admin login successful', 'success');
    } else {
        document.getElementById('adminLoginError').style.display = 'block';
    }
}

function adminLogout() {
    adminAuthenticated = false;
    document.getElementById('adminDashboard').style.display = 'none';
    showNotification('Admin logged out', 'info');
}

function renderAdminGameList() {
    const adminGameList = document.getElementById('adminGameList');
    adminGameList.innerHTML = '';

    const tableRows = games.map(game => `
        <tr>
            <td>${game.id}</td>
            <td><input type="text" id="name-${game.id}" value="${escapeHtml(game.name)}" class="form-control"></td>
            <td><input type="text" id="category-${game.id}" value="${escapeHtml(game.category)}" class="form-control"></td>
            <td><input type="number" step="0.01" id="price-${game.id}" value="${game.price}" class="form-control"></td>
            <td><textarea id="description-${game.id}" class="form-control" rows="2">${escapeHtml(game.description)}</textarea></td>
            <td><div class="d-flex align-items-center gap-2">
                    <img src="${escapeHtml(game.image)}" alt="${escapeHtml(game.name)}" style="width: 70px; height: 40px; object-fit: cover; border-radius: 4px;">
                    <input type="file" id="imageFile-${game.id}" class="form-control form-control-sm" accept="image/*" onchange="handleAdminImageUpload(${game.id})">
                </div></td>
            <td><input type="checkbox" id="hidden-${game.id}" ${game.hidden ? 'checked' : ''} onchange="toggleAdminHide(${game.id})"></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="updateAdminGame(${game.id})">Save</button>
            </td>
        </tr>
    `).join('');

    adminGameList.innerHTML = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Hidden</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
    `;
}

async function updateAdminGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    const newName = document.getElementById(`name-${gameId}`).value.trim();
    const newCategory = document.getElementById(`category-${gameId}`).value.trim();
    const newPrice = parseFloat(document.getElementById(`price-${gameId}`).value);
    const newDescription = document.getElementById(`description-${gameId}`).value.trim();
    const hidden = document.getElementById(`hidden-${gameId}`).checked;
    const imageFileInput = document.getElementById(`imageFile-${gameId}`);

    if (newName === '' || newCategory === '' || isNaN(newPrice) || newDescription === '') {
        showNotification('Please fill all game fields correctly.', 'danger');
        return;
    }

    game.name = newName;
    game.category = newCategory;
    game.price = newPrice;
    game.description = newDescription;
    game.hidden = hidden;

    if (imageFileInput && imageFileInput.files && imageFileInput.files[0]) {
        try {
            const imageData = await readFileAsDataURL(imageFileInput.files[0]);
            game.image = imageData;
        } catch (error) {
            showNotification('Failed to upload image.', 'danger');
            return;
        }
    }

    renderAdminGameList();
    displayFeaturedGames();
    displayAllGames();
    showNotification(`Game ${game.name} updated`, 'success');
}

function toggleAdminHide(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    game.hidden = !game.hidden;
    saveGamesToStorage();
    displayFeaturedGames();
    displayAllGames();
}

async function addGameAsAdmin() {
    const name = document.getElementById('newGameName').value.trim();
    const category = document.getElementById('newGameCategory').value.trim();
    const price = parseFloat(document.getElementById('newGamePrice').value);
    const rating = parseFloat(document.getElementById('newGameRating').value);
    const developer = document.getElementById('newGameDeveloper').value.trim();
    const imageUrl = document.getElementById('newGameImage').value.trim();
    const imageFileInput = document.getElementById('newGameImageFile');
    const description = document.getElementById('newGameDescription').value.trim();

    if (!name || !category || isNaN(price) || isNaN(rating) || !developer || !description) {
        showNotification('Please fill in all required fields to add a new game.', 'danger');
        return;
    }

    let image = imageUrl;
    if (imageFileInput && imageFileInput.files && imageFileInput.files[0]) {
        try {
            image = await readFileAsDataURL(imageFileInput.files[0]);
        } catch (error) {
            showNotification('Failed to load image file.', 'danger');
            return;
        }
    }

    if (!image) {
        showNotification('Please provide an image URL or upload a file.', 'danger');
        return;
    }

    const nextId = games.reduce((max, g) => Math.max(max, g.id), 0) + 1;
    const newGame = { id: nextId, name, category, price, rating, developer, image, description, hidden: false };
    games.push(newGame);

    saveGamesToStorage();
    document.getElementById('adminAddGameForm').reset();
    renderAdminGameList();
    displayFeaturedGames();
    displayAllGames();
    showNotification(`Game ${name} added`, 'success');
}

function handleAdminImageUpload(gameId) {
    const fileInput = document.getElementById(`imageFile-${gameId}`);
    if (!fileInput || !fileInput.files || !fileInput.files[0]) return;
    const file = fileInput.files[0];

    readFileAsDataURL(file)
        .then(dataUrl => {
            const game = games.find(g => g.id === gameId);
            if (!game) return;
            game.image = dataUrl;
            saveGamesToStorage();
            renderAdminGameList();
            displayFeaturedGames();
            displayAllGames();
            showNotification(`Image for ${game.name} updated`, 'success');
        })
        .catch(() => showNotification('Failed to upload image. Please try another file.', 'danger'));
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
}
