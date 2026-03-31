// GameHub - Premium Gaming Platform JavaScript

// Games Database
const games = [
    {
        id: 1,
        name: "Cyber Strike 2077",
        category: "action",
        price: 59.99,
        rating: 4.8,
        developer: "Neon Studios",
        description: "Experience the ultimate cyberpunk action game with stunning visuals and intense gameplay.",
        image: "https://picsum.photos/seed/cyber1/400/250"
    },
    {
        id: 2,
        name: "Dragon Quest XI",
        category: "rpg",
        price: 49.99,
        rating: 4.9,
        developer: "Square Enix",
        description: "Embark on an epic RPG adventure with turn-based combat and a rich storyline.",
        image: "https://picsum.photos/seed/dragon1/400/250"
    },
    {
        id: 3,
        name: "Speed Rush Legends",
        category: "racing",
        price: 39.99,
        rating: 4.5,
        developer: "Velocity Games",
        description: "Race against the best drivers in this high-octane racing game with realistic physics.",
        image: "https://picsum.photos/seed/racing1/400/250"
    },
    {
        id: 4,
        name: "Puzzle Master Pro",
        category: "puzzle",
        price: 19.99,
        rating: 4.6,
        developer: "Mind Games Inc",
        description: "Challenge your mind with over 1000 unique puzzles in this brain-teasing adventure.",
        image: "https://picsum.photos/seed/puzzle1/400/250"
    },
    {
        id: 5,
        name: "Strategy Empire",
        category: "strategy",
        price: 44.99,
        rating: 4.7,
        developer: "Tactical Studios",
        description: "Build your empire and conquer the world in this deep strategy game.",
        image: "https://picsum.photos/seed/strategy1/400/250"
    },
    {
        id: 6,
        name: "Sports Champions 2024",
        category: "sports",
        price: 59.99,
        rating: 4.4,
        developer: "Athletic Games",
        description: "Compete in multiple sports including football, basketball, and racing.",
        image: "https://picsum.photos/seed/sports1/400/250"
    }
];

// Global Variables
let cart = [];
let currentGame = null;
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayGames();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('heroSearch').addEventListener('input', (e) => {
        searchGames(e.target.value);
    });
    
    document.getElementById('gameSearch').addEventListener('input', (e) => {
        searchGames(e.target.value);
    });
    
    // Sort functionality
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        sortGames(e.target.value);
    });
    
    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
}

// Display Games
function displayGames(gamesToShow = games) {
    const gamesList = document.getElementById('gamesList');
    
    if (gamesToShow.length === 0) {
        gamesList.innerHTML = '<div class="col-12 text-center"><p>No games found.</p></div>';
        return;
    }
    
    gamesList.innerHTML = gamesToShow.map(game => `
        <div class="game-card" onclick="openGameModal(${game.id})">
            <img src="${game.image}" alt="${game.name}">
            <div class="game-card-body">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <div class="game-card-footer">
                    <span class="game-price">$${game.price}</span>
                    <span class="game-rating">
                        <i class="fas fa-star"></i> ${game.rating}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// Search Games
function searchGames(searchTerm) {
    const filtered = games.filter(game => 
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.developer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (currentFilter !== 'all') {
        const categoryFiltered = filtered.filter(game => game.category === currentFilter);
        displayGames(categoryFiltered);
    } else {
        displayGames(filtered);
    }
}

// Filter by Category
function filterByCategory(category) {
    currentFilter = category;
    
    if (category === 'all') {
        displayGames();
    } else {
        const filtered = games.filter(game => game.category === category);
        displayGames(filtered);
    }
    
    // Update active state
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
}

// Sort Games
function sortGames(sortBy) {
    let sorted = [...games];
    
    switch(sortBy) {
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    displayGames(sorted);
}

// Open Game Modal
function openGameModal(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    currentGame = game;
    
    document.getElementById('gameModalTitle').textContent = game.name;
    document.getElementById('gameModalImage').src = game.image;
    document.getElementById('gameModalDescription').textContent = game.description;
    document.getElementById('gameModalDeveloper').textContent = game.developer;
    document.getElementById('gameModalCategory').textContent = game.category;
    document.getElementById('gameModalRating').innerHTML = `<i class="fas fa-star"></i> ${game.rating}`;
    document.getElementById('gameModalPrice').textContent = `$${game.price}`;
    
    const modal = new bootstrap.Modal(document.getElementById('gameModal'));
    modal.show();
}

// Add to Cart
function addToCart() {
    if (!currentGame) return;
    
    const existingItem = cart.find(item => item.id === currentGame.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...currentGame,
            quantity: 1
        });
    }
    
    updateCartBadge();
    showNotification(`${currentGame.name} added to cart!`);
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('gameModal'));
    modal.hide();
}

// Update Cart Badge
function updateCartBadge() {
    const badge = document.querySelector('.badge-cart');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

// Open Cart Modal
function openCartModal(event) {
    event.preventDefault();
    
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h6>${item.name}</h6>
                    <small class="text-muted">Qty: ${item.quantity}</small>
                </div>
                <div>
                    <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    updateCartTotal();
    
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
}

// Update Cart Total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Remove from Cart
function removeFromCart(gameId) {
    cart = cart.filter(item => item.id !== gameId);
    updateCartBadge();
    openCartModal(event); // Refresh cart modal
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Order placed! Total: $${total.toFixed(2)}`, 'success');
    
    cart = [];
    updateCartBadge();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    modal.hide();
}

// Download Game
function downloadGame() {
    if (!currentGame) return;
    
    showNotification(`Downloading ${currentGame.name}...`, 'info');
    
    // Simulate download
    setTimeout(() => {
        const content = `Game: ${currentGame.name}\nDeveloper: ${currentGame.developer}\nCategory: ${currentGame.category}\nPrice: $${currentGame.price}\n\nThank you for downloading from GameHub!`;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentGame.name}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification(`${currentGame.name} downloaded successfully!`, 'success');
    }, 2000);
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('gameModal'));
    modal.hide();
}

// Show Login Modal
function showLoginModal() {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

// Show Signup Modal
function showSignupModal() {
    const modal = new bootstrap.Modal(document.getElementById('signupModal'));
    modal.show();
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (email && password) {
        showNotification('Login successful!', 'success');
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
        document.getElementById('loginForm').reset();
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Simple validation
    if (name && email && password) {
        showNotification('Account created successfully!', 'success');
        const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
        modal.hide();
        document.getElementById('signupForm').reset();
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
