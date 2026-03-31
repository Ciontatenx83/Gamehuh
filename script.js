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
        description: "Experience the ultimate cyberpunk action game with stunning visuals and intense gameplay in a dystopian future.",
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
let filteredGames = [...games];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadGames();
    updateCartCount();
});

// Load Games
function loadGames() {
    displayGames(games);
}

// Display Games
function displayGames(gamesToShow) {
    const gamesGrid = document.getElementById('gamesGrid');
    
    if (gamesToShow.length === 0) {
        gamesGrid.innerHTML = '<div class="col-12 text-center"><p>No games found.</p></div>';
        return;
    }
    
    gamesGrid.innerHTML = gamesToShow.map(game => `
        <div class="col-md-4">
            <div class="game-card" onclick="showGameDetails(${game.id})">
                <img src="${game.image}" alt="${game.name}">
                <div class="game-card-body">
                    <h5>${game.name}</h5>
                    <p>${game.description}</p>
                    <div class="game-card-footer">
                        <span class="game-price">$${game.price}</span>
                        <span class="game-rating">
                            <i class="fas fa-star"></i> ${game.rating}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Search Games
function searchGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm === '') {
        filteredGames = currentFilter === 'all' ? [...games] : games.filter(game => game.category === currentFilter);
    } else {
        filteredGames = games.filter(game => 
            game.name.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm) ||
            game.developer.toLowerCase().includes(searchTerm)
        );
        
        if (currentFilter !== 'all') {
            filteredGames = filteredGames.filter(game => game.category === currentFilter);
        }
    }
    
    displayGames(filteredGames);
}

// Filter by Category
function filterCategory(category) {
    currentFilter = category;
    
    if (category === 'all') {
        filteredGames = [...games];
    } else {
        filteredGames = games.filter(game => game.category === category);
    }
    
    displayGames(filteredGames);
    
    // Scroll to games section
    document.getElementById('games').scrollIntoView({behavior: 'smooth'});
}

// Sort Games
function sortGames() {
    const sortBy = document.getElementById('sortSelect').value;
    
    switch(sortBy) {
        case 'name':
            filteredGames.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price':
            filteredGames.sort((a, b) => a.price - b.price);
            break;
        case 'rating':
            filteredGames.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    displayGames(filteredGames);
}

// Clear Filter
function clearFilter() {
    currentFilter = 'all';
    document.getElementById('searchInput').value = '';
    document.getElementById('sortSelect').value = 'name';
    filteredGames = [...games];
    displayGames(games);
}

// Show Game Details
function showGameDetails(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    currentGame = game;
    
    document.getElementById('modalTitle').textContent = game.name;
    document.getElementById('modalImage').src = game.image;
    document.getElementById('modalDescription').textContent = game.description;
    document.getElementById('modalDeveloper').textContent = game.developer;
    document.getElementById('modalCategory').textContent = game.category;
    document.getElementById('modalRating').innerHTML = `<i class="fas fa-star"></i> ${game.rating}`;
    document.getElementById('modalPrice').textContent = `$${game.price}`;
    
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
    
    updateCartCount();
    showNotification(`${currentGame.name} added to cart!`);
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('gameModal'));
    modal.hide();
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
}

// Open Cart
function openCart(event) {
    event.preventDefault();
    
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h6>${item.name}</h6>
                    <small class="text-muted">Qty: ${item.quantity}</small>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
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
    updateCartCount();
    openCart(event); // Refresh cart modal
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Order placed successfully! Total: $${total.toFixed(2)}`, 'success');
    
    cart = [];
    updateCartCount();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    modal.hide();
}

// Download Game
function downloadGame() {
    if (!currentGame) return;
    
    showNotification(`Downloading ${currentGame.name}...`, 'info');
    
    // Simulate download
    setTimeout(() => {
        const content = `Game: ${currentGame.name}\nDeveloper: ${currentGame.developer}\nCategory: ${currentGame.category}\nPrice: $${currentGame.price}\nRating: ${currentGame.rating}/5\n\nThank you for downloading from GameHub!\n\nGame Details:\n${currentGame.description}`;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentGame.name.replace(/\s+/g, '_')}_Info.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification(`${currentGame.name} downloaded successfully!`, 'success');
    }, 2000);
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('gameModal'));
    modal.hide();
}

// Show Login
function showLogin() {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (email && password) {
        showNotification('Login successful! Welcome back.', 'success');
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
        document.getElementById('loginForm').reset();
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

// Search on Enter key
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchGames();
    }
});
