// =============================================
// TARIQ SMILE GAME HUB - COMPLETE SYSTEM
// =============================================

// ===========================================
// CONFIG - EMAILJS SETUP
// ===========================================
// Replace these with your EmailJS credentials
const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID_HERE';    // Get from EmailJS dashboard
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID_HERE';  // Get from EmailJS dashboard
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY_HERE';    // Get from EmailJS dashboard

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// ===========================================
// CATEGORY DEFINITIONS
// ===========================================
const categories = [
    { id: 'action', name: 'Action', icon: '⚡', description: 'Fast-paced and thrilling' },
    { id: 'open-world', name: 'Open World', icon: '🌍', description: 'Explore vast worlds' },
    { id: 'adventure', name: 'Adventure', icon: '🗺️', description: 'Epic exploration' },
    { id: 'rpg', name: 'RPG', icon: '🐉', description: 'Role-playing adventures' },
    { id: 'horror', name: 'Horror', icon: '👻', description: 'Spine-chilling' },
    { id: 'sports', name: 'Sports', icon: '⚽', description: 'Competitive gaming' },
    { id: 'racing', name: 'Racing', icon: '🏎️', description: 'High-speed thrills' },
    { id: 'strategy', name: 'Strategy', icon: '♟️', description: 'Tactical gameplay' },
    { id: 'simulation', name: 'Simulation', icon: '🎮', description: 'Realistic experiences' },
    { id: 'puzzle', name: 'Puzzle', icon: '🧩', description: 'Mind challenges' }
];

// ===========================================
// DEFAULT GAMES DATABASE
// ===========================================
const defaultGames = [
    {
        id: 1,
        title: 'Dragon Quest',
        category: 'rpg',
        price: 29.99,
        rating: 4.8,
        image: 'https://via.placeholder.com/300x200?text=Dragon+Quest',
        developer: 'Epic Studios',
        description: 'Embark on an epic adventure in a fantasy world filled with dragons, magic, and treasures.',
        link: 'https://example.com/download/dragon-quest'
    },
    {
        id: 2,
        title: 'Cyber Storm',
        category: 'action',
        price: 39.99,
        rating: 4.5,
        image: 'https://via.placeholder.com/300x200?text=Cyber+Storm',
        developer: 'Vertex Games',
        description: 'Experience intense action in a cyberpunk world with stunning visuals.',
        link: 'https://example.com/download/cyber-storm'
    },
    {
        id: 3,
        title: 'Lost Temple',
        category: 'adventure',
        price: 24.99,
        rating: 4.6,
        image: 'https://via.placeholder.com/300x200?text=Lost+Temple',
        developer: 'Adventure Inc',
        description: 'Explore ancient ruins and solve puzzles to find the legendary Lost Temple.',
        link: 'https://example.com/download/lost-temple'
    }
];

// ===========================================
// STATE MANAGEMENT
// ===========================================
let games = JSON.parse(localStorage.getItem('games')) || defaultGames;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = null;
let adminVerified = false;
let generatedOTP = null;

// ===========================================
// INITIALIZATION
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    initializeCategories();
    renderGames(games);
    updateCartBadge();
    setupEventListeners();
});

// ===========================================
// CATEGORIES INITIALIZATION
// ===========================================
function initializeCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = categories.map(cat => `
        <button class="category-btn" onclick="filterByCategory('${cat.id}', '${cat.name}')">
            <i>${cat.icon}</i>
            <h5>${cat.name}</h5>
            <p>${cat.description}</p>
        </button>
    `).join('');
}

// ===========================================
// GAMES RENDERING
// ===========================================
function renderGames(gamesToRender = games) {
    const container = document.getElementById('gamesList');
    
    if (gamesToRender.length === 0) {
        container.innerHTML = '';
        document.getElementById('noResultsMessage').style.display = 'block';
        return;
    }
    
    document.getElementById('noResultsMessage').style.display = 'none';
    container.innerHTML = gamesToRender.map(game => `
        <div class="game-card" onclick="showGameDetails(${game.id})">
            <img src="${game.image}" alt="${game.title}" class="game-card-image">
            <span class="game-category-badge">${game.category.toUpperCase()}</span>
            <div class="game-card-body">
                <h6 class="game-card-title">${game.title}</h6>
                <p class="game-card-developer">${game.developer || 'Unknown'}</p>
                <p class="game-card-description">${game.description || 'Premium game'}</p>
                <div class="game-card-footer">
                    <span class="game-price">$${game.price.toFixed(2)}</span>
                    <span class="game-rating">⭐ ${game.rating || 4.5}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ===========================================
// CATEGORY FILTERING
// ===========================================
function filterByCategory(categoryId, categoryName) {
    currentFilter = categoryId;
    const filtered = games.filter(game => game.category === categoryId);
    
    document.getElementById('activeFilter').style.display = 'inline-flex';
    document.getElementById('activeFilterName').textContent = categoryName;
    
    renderGames(filtered);
}

function clearFilter() {
    currentFilter = null;
    document.getElementById('activeFilter').style.display = 'none';
    renderGames(games);
}

// ===========================================
// GAME SEARCH
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('searchInput');
    if (search) {
        search.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            const filtered = games.filter(game =>
                game.title.toLowerCase().includes(query) ||
                game.description.toLowerCase().includes(query)
            );
            renderGames(filtered);
        });
    }
});

// ===========================================
// GAME DETAILS MODAL
// ===========================================
function showGameDetails(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    document.getElementById('gameModalTitle').textContent = game.title;
    document.getElementById('gameModalImage').src = game.image;
    document.getElementById('gameModalDescription').textContent = game.description;
    document.getElementById('gameModalDeveloper').textContent = game.developer;
    document.getElementById('gameModalGenre').textContent = game.category.toUpperCase();
    document.getElementById('gameModalPrice').textContent = game.price.toFixed(2);
    document.getElementById('gameModalRating').innerHTML = `${'⭐'.repeat(Math.round(game.rating))} (${game.rating})`;
    
    document.getElementById('buyButton').dataset.gameId = gameId;
    
    new bootstrap.Modal(document.getElementById('gameModal')).show();
}

function addToCartFromModal() {
    const gameId = parseInt(document.getElementById('buyButton').dataset.gameId);
    addToCart(gameId);
    bootstrap.Modal.getInstance(document.getElementById('gameModal')).hide();
}

// ===========================================
// SHOPPING CART
// ===========================================
function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    const existingItem = cart.find(item => item.id === gameId);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({
            ...game,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartBadge();
    showNotification('Added to cart!');
}

function removeFromCart(gameId) {
    cart = cart.filter(item => item.id !== gameId);
    saveCart();
    updateCartDisplay();
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.querySelector('.badge-cart');
    if (cart.length > 0) {
        badge.textContent = cart.length;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

function updateCartDisplay() {
    const container = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        checkoutBtn.style.display = 'none';
        document.getElementById('cartTotal').textContent = '0.00';
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.title}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('cartTotal').textContent = total.toFixed(2);
        checkoutBtn.style.display = 'block';
    }
}

function openCartModal(event) {
    event.preventDefault();
    updateCartDisplay();
    new bootstrap.Modal(document.getElementById('cartModal')).show();
}

function proceedToCheckout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Proceeding to checkout. Total: $${total.toFixed(2)}\n\n🔒 Secure payment gateway would be integrated here.\n\nFor now, this is a demonstration. In a real system, Stripe or another payment provider would handle the transaction.`);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ===========================================
// ADMIN SYSTEM WITH 2FA
// ===========================================

function triggerAdminEntry() {
    new bootstrap.Modal(document.getElementById('adminEntryModal')).show();
}

async function sendAdminCode() {
    const btn = document.getElementById('sendCodeBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        // Generate 6-digit code
        generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Validate EmailJS configuration
        if (EMAILJS_SERVICE_ID === 'YOUR_EMAILJS_SERVICE_ID_HERE') {
            showCodeStatus('error', '❌ EmailJS not configured! Please add your credentials to script.js');
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-envelope"></i> Request 2FA Code';
            return;
        }
        
        // Send email via EmailJS
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: 'ericmosha676@gmail.com',
            admin_code: generatedOTP,
            subject: 'Tariq Smile Game Hub - Admin Access Code'
        });
        
        showCodeStatus('success', '✓ Code sent to ericmosha676@gmail.com! Check your email.');
        
        // Show OTP input
        setTimeout(() => {
            document.getElementById('adminLoginStep1').style.display = 'none';
            document.getElementById('adminLoginStep2').style.display = 'block';
        }, 1500);
        
    } catch (error) {
        console.error('EmailJS Error:', error);
        showCodeStatus('error', '❌ Failed to send code. Please configure EmailJS first.');
    }
    
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-envelope"></i> Request 2FA Code';
}

function verifyAdminCode() {
    const otp = document.getElementById('otpInput').value;
    
    if (otp === generatedOTP) {
        adminVerified = true;
        bootstrap.Modal.getInstance(document.getElementById('adminEntryModal')).hide();
        openAdminPanel();
    } else {
        alert('❌ Incorrect code. Please try again.');
        document.getElementById('otpInput').value = '';
    }
}

function resetAdminForm() {
    document.getElementById('adminLoginStep1').style.display = 'block';
    document.getElementById('adminLoginStep2').style.display = 'none';
    document.getElementById('otpInput').value = '';
    document.getElementById('codeStatus').style.display = 'none';
}

function showCodeStatus(type, message) {
    const status = document.getElementById('codeStatus');
    status.className = `alert alert-${type === 'success' ? 'success' : 'danger'}`;
    status.textContent = message;
    status.style.display = 'block';
}

// ===========================================
// ADMIN PANEL
// ===========================================

function openAdminPanel() {
    updateDashboard();
    new bootstrap.Modal(document.getElementById('adminOfficeModal')).show();
}

function exitAdminPanel() {
    adminVerified = false;
    resetAdminForm();
}

function updateDashboard() {
    document.getElementById('totalGamesCount').textContent = games.length;
}

// Add Game Form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addGameForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            addNewGame();
        });
    }
});

function addNewGame() {
    const newGame = {
        id: Math.max(...games.map(g => g.id), 0) + 1,
        title: document.getElementById('gameTitle').value,
        category: document.getElementById('gameCategory').value,
        price: parseFloat(document.getElementById('gamePrice').value),
        link: document.getElementById('gameLink').value,
        description: document.getElementById('gameDescription').value,
        developer: document.getElementById('gameDeveloper').value,
        image: document.getElementById('gameImage').value || 'https://via.placeholder.com/300x200?text=Game',
        rating: parseFloat(document.getElementById('gameRating').value) || 4.5
    };
    
    games.push(newGame);
    saveGames();
    
    // Clear form
    document.getElementById('addGameForm').reset();
    
    // Update dashboard
    updateDashboard();
    renderAdminGamesList();
    
    alert('✅ Game added successfully!');
}

function renderAdminGamesList() {
    const container = document.querySelector('.games-management-list');
    
    if (games.length === 0) {
        container.innerHTML = '<p class="text-muted">No games added yet.</p>';
        return;
    }
    
    container.innerHTML = games.map(game => `
        <div class="game-management-item">
            <div>
                <h6 style="color: #e5e7eb;">${game.title}</h6>
                <small style="color: #94a3b8;">$${game.price.toFixed(2)} | ${game.category}</small>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-sm btn-outline-light" onclick="editGame(${game.id})">Edit</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteGame(${game.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteGame(gameId) {
    if (confirm('Are you sure you want to delete this game?')) {
        games = games.filter(g => g.id !== gameId);
        saveGames();
        updateDashboard();
        renderAdminGamesList();
        renderGames(games);
        alert('✅ Game deleted successfully!');
    }
}

function editGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    document.getElementById('gameTitle').value = game.title;
    document.getElementById('gameCategory').value = game.category;
    document.getElementById('gamePrice').value = game.price;
    document.getElementById('gameLink').value = game.link;
    document.getElementById('gameDescription').value = game.description;
    document.getElementById('gameDeveloper').value = game.developer;
    document.getElementById('gameImage').value = game.image;
    document.getElementById('gameRating').value = game.rating;
    
    // Change button text
    const btn = document.querySelector('#addGameForm button');
    btn.innerHTML = '<i class="fas fa-save"></i> Update Game';
    
    // Update form handler
    document.getElementById('addGameForm').onsubmit = function (e) {
        e.preventDefault();
        
        game.title = document.getElementById('gameTitle').value;
        game.category = document.getElementById('gameCategory').value;
        game.price = parseFloat(document.getElementById('gamePrice').value);
        game.link = document.getElementById('gameLink').value;
        game.description = document.getElementById('gameDescription').value;
        game.developer = document.getElementById('gameDeveloper').value;
        game.image = document.getElementById('gameImage').value;
        game.rating = parseFloat(document.getElementById('gameRating').value);
        
        saveGames();
        document.getElementById('addGameForm').reset();
        btn.innerHTML = '<i class="fas fa-plus"></i> Add Game';
        document.getElementById('addGameForm').onsubmit = null;
        updateDashboard();
        renderAdminGamesList();
        renderGames(games);
        alert('✅ Game updated successfully!');
    };
    
    // Scroll to form
    document.querySelector('[data-bs-target="#addGameTab"]').click();
}

function exportGamesData() {
    const dataStr = JSON.stringify(games, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'games-backup.json';
    link.click();
    alert('✅ Games data exported!');
}

function resetAllData() {
    if (confirm('⚠️ This will reset ALL games to default. Are you sure?')) {
        games = JSON.parse(JSON.stringify(defaultGames));
        saveGames();
        updateDashboard();
        renderAdminGamesList();
        renderGames(games);
        alert('✅ Data reset to defaults!');
    }
}

// ===========================================
// CONTACT FORM
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            console.log('Contact Message:', { name, email, message });
            alert('✅ Thank you for your message! We\'ll get back to you soon.');
            
            form.reset();
        });
    }
});

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

function saveGames() {
    localStorage.setItem('games', JSON.stringify(games));
}

function showNotification(message) {
    // Simple notification (in real app, would be a toast)
    console.log('Notification:', message);
}

function setupEventListeners() {
    // Event listeners setup can go here if needed
}

// Handle manage games tab properly
document.addEventListener('DOMContentLoaded', () => {
    const manageTab = document.querySelector('[data-bs-target="#manageGamesTab"]');
    if (manageTab) {
        manageTab.addEventListener('click', renderAdminGamesList);
    }
});

// Store current game being edited
let currentEditingGameId = null;
