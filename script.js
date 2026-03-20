// Tariq Smile Game Hub - Game Database
const games = [
    {
        id: 1,
        name: 'Dragon Quest',
        category: 'rpg',
        price: 29.99,
        rating: 4.8,
        image: 'https://via.placeholder.com/300x200?text=Dragon+Quest',
        developer: 'Epic Studios',
        description: 'Embark on an epic adventure in a fantasy world filled with dragons, magic, and treasures.'
    },
    {
        id: 2,
        name: 'Cyber Storm',
        category: 'action',
        price: 39.99,
        rating: 4.5,
        image: 'https://via.placeholder.com/300x200?text=Cyber+Storm',
        developer: 'Vertex Games',
        description: 'Experience intense action in a cyberpunk world with stunning visuals and fast-paced gameplay.'
    },
    {
        id: 3,
        name: 'Lost Temple',
        category: 'adventure',
        price: 24.99,
        rating: 4.6,
        image: 'https://via.placeholder.com/300x200?text=Lost+Temple',
        developer: 'Adventure Inc',
        description: 'Explore ancient ruins and solve puzzles to find the legendary Lost Temple.'
    },
    {
        id: 4,
        name: 'Brain Master',
        category: 'puzzle',
        price: 9.99,
        rating: 4.4,
        image: 'https://via.placeholder.com/300x200?text=Brain+Master',
        developer: 'Mind Games Co',
        description: 'Challenge your mind with hundreds of brain-teasing puzzles and logic challenges.'
    },
    {
        id: 5,
        name: 'Championship Racing',
        category: 'sports',
        price: 34.99,
        rating: 4.7,
        image: 'https://via.placeholder.com/300x200?text=Championship+Racing',
        developer: 'Racing Masters',
        description: 'Race against the world in realistic car racing with multiple tracks and vehicles.'
    },
    {
        id: 6,
        name: 'Night Hunter',
        category: 'action',
        price: 44.99,
        rating: 4.9,
        image: 'https://via.placeholder.com/300x200?text=Night+Hunter',
        developer: 'Dark Games LLC',
        description: 'Hunt supernatural creatures in a dark, atmospheric world filled with mystery.'
    },
    {
        id: 7,
        name: 'Fantasy Quest',
        category: 'rpg',
        price: 49.99,
        rating: 4.8,
        image: 'https://via.placeholder.com/300x200?text=Fantasy+Quest',
        developer: 'Quest Studios',
        description: 'Create your character and explore a vast fantasy world with thousands of quests.'
    },
    {
        id: 8,
        name: 'Puzzle Paradise',
        category: 'puzzle',
        price: 14.99,
        rating: 4.3,
        image: 'https://via.placeholder.com/300x200?text=Puzzle+Paradise',
        developer: 'Paradise Games',
        description: 'Colorful puzzle game with beautiful graphics and addictive gameplay.'
    }
];

let cart = [];
let currentGameForModal = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedGames();
    displayAllGames();
    setupEventListeners();
    loadCartFromStorage();
});

// Display featured games
function displayFeaturedGames() {
    const featured = games.slice(0, 3);
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
    
    if (filtered.length === 0) {
        gamesList.innerHTML = '<div class="col-12"><p class="text-center text-muted">No games found matching your criteria.</p></div>';
        return;
    }
    
    gamesList.innerHTML = filtered.map(game => `
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

    searchInput.addEventListener('input', filterGames);
    categoryFilter.addEventListener('change', filterGames);
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        showCart();
    });
    contactForm.addEventListener('submit', handleContactSubmit);
}

// Filter games
function filterGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    const filtered = games.filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(searchTerm) || 
                            game.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || game.category === category;
        return matchesSearch && matchesCategory;
    });

    displayAllGames(filtered);
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
    badge.textContent = cart.length;
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
