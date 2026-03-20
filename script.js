// ========================================
// TARIQ SMILE GAME HUB - ENHANCED GAME DATABASE & CMS
// ========================================

// Default games data with genre support
const defaultGames = [
    {
        id: 1,
        name: 'Dragon Quest',
        genre: 'rpg',
        price: 29.99,
        rating: 4.8,
        image: 'https://via.placeholder.com/300x200?text=Dragon+Quest',
        developer: 'Epic Studios',
        description: 'Embark on an epic adventure in a fantasy world filled with dragons, magic, and treasures.',
        downloadLink: 'https://example.com/download/dragon-quest',
        releaseDate: '2024-01-15'
    },
    {
        id: 2,
        name: 'Cyber Storm',
        genre: 'action',
        price: 39.99,
        rating: 4.5,
        image: 'https://via.placeholder.com/300x200?text=Cyber+Storm',
        developer: 'Vertex Games',
        description: 'Experience intense action in a cyberpunk world with stunning visuals and fast-paced gameplay.',
        downloadLink: 'https://example.com/download/cyber-storm',
        releaseDate: '2024-02-10'
    },
    {
        id: 3,
        name: 'Lost Temple',
        genre: 'adventure',
        price: 24.99,
        rating: 4.6,
        image: 'https://via.placeholder.com/300x200?text=Lost+Temple',
        developer: 'Adventure Inc',
        description: 'Explore ancient ruins and solve puzzles to find the legendary Lost Temple.',
        downloadLink: 'https://example.com/download/lost-temple',
        releaseDate: '2024-01-20'
    },
    {
        id: 4,
        name: 'Brain Master',
        genre: 'puzzle',
        price: 9.99,
        rating: 4.4,
        image: 'https://via.placeholder.com/300x200?text=Brain+Master',
        developer: 'Mind Games Co',
        description: 'Challenge your mind with hundreds of brain-teasing puzzles and logic challenges.',
        downloadLink: 'https://example.com/download/brain-master',
        releaseDate: '2023-12-05'
    },
    {
        id: 5,
        name: 'Nightmare Realm',
        genre: 'horror',
        price: 34.99,
        rating: 4.7,
        image: 'https://via.placeholder.com/300x200?text=Nightmare+Realm',
        developer: 'Fear Studios',
        description: 'Survive terrifying creatures and navigate through a haunting nightmare dimension.',
        downloadLink: 'https://example.com/download/nightmare-realm',
        releaseDate: '2024-03-01'
    },
    {
        id: 6,
        name: 'Night Hunter',
        genre: 'action',
        price: 44.99,
        rating: 4.9,
        image: 'https://via.placeholder.com/300x200?text=Night+Hunter',
        developer: 'Dark Games LLC',
        description: 'Hunt supernatural creatures in a dark, atmospheric world filled with mystery.',
        downloadLink: 'https://example.com/download/night-hunter',
        releaseDate: '2024-02-15'
    },
    {
        id: 7,
        name: 'Fantasy Quest',
        genre: 'rpg',
        price: 49.99,
        rating: 4.8,
        image: 'https://via.placeholder.com/300x200?text=Fantasy+Quest',
        developer: 'Quest Studios',
        description: 'Create your character and explore a vast fantasy world with thousands of quests.',
        downloadLink: 'https://example.com/download/fantasy-quest',
        releaseDate: '2024-01-30'
    },
    {
        id: 8,
        name: 'Open Worlds',
        genre: 'open-world',
        price: 59.99,
        rating: 4.9,
        image: 'https://via.placeholder.com/300x200?text=Open+Worlds',
        developer: 'World Games',
        description: 'Explore infinite open worlds with dynamic weather, wildlife, and complete freedom.',
        downloadLink: 'https://example.com/download/open-worlds',
        releaseDate: '2024-03-05'
    }
];

// ========================================
// STATE & CONFIGURATION
// ========================================

let games = [];
let cart = [];
let currentGameForModal = null;
let currentEditingGameId = null;

const GENRES = ['action', 'adventure', 'rpg', 'puzzle', 'horror', 'open-world', 'sports'];
const GENRE_LABELS = {
    'action': '⚡ Action',
    'adventure': '🗺️ Adventure',
    'rpg': '🐉 RPG',
    'puzzle': '🧩 Puzzle',
    'horror': '👻 Horror',
    'open-world': '🌍 Open World',
    'sports': '⚽ Sports'
};

const STORAGE_KEYS = {
    GAMES: 'gameHubGames',
    CART: 'gameHubCart'
};

// ========================================
// GAME DATABASE MANAGEMENT FUNCTIONS
// ========================================

function initializeGames() {
    const savedGames = localStorage.getItem(STORAGE_KEYS.GAMES);
    if (savedGames) {
        try {
            games = JSON.parse(savedGames);
        } catch (e) {
            console.error('Error loading saved games:', e);
            games = JSON.parse(JSON.stringify(defaultGames));
        }
    } else {
        games = JSON.parse(JSON.stringify(defaultGames));
        saveGamesToStorage();
    }
}

function saveGamesToStorage() {
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
}

function addGame(gameData) {
    const newId = Math.max(...games.map(g => g.id), 0) + 1;
    const newGame = {
        id: newId,
        name: gameData.name || 'New Game',
        genre: gameData.genre || 'action',
        price: parseFloat(gameData.price) || 0,
        rating: parseFloat(gameData.rating) || 4.5,
        image: gameData.image || 'https://via.placeholder.com/300x200?text=Game',
        developer: gameData.developer || 'Unknown Developer',
        description: gameData.description || 'No description available',
        downloadLink: gameData.downloadLink || '#',
        releaseDate: gameData.releaseDate || new Date().toISOString().split('T')[0]
    };
    games.push(newGame);
    saveGamesToStorage();
    return newGame;
}

function updateGame(gameId, gameData) {
    const gameIndex = games.findIndex(g => g.id === gameId);
    if (gameIndex !== -1) {
        games[gameIndex] = {
            ...games[gameIndex],
            name: gameData.name || games[gameIndex].name,
            genre: gameData.genre || games[gameIndex].genre,
            price: parseFloat(gameData.price) || games[gameIndex].price,
            rating: parseFloat(gameData.rating) || games[gameIndex].rating,
            image: gameData.image || games[gameIndex].image,
            developer: gameData.developer || games[gameIndex].developer,
            description: gameData.description || games[gameIndex].description,
            downloadLink: gameData.downloadLink || games[gameIndex].downloadLink,
            releaseDate: gameData.releaseDate || games[gameIndex].releaseDate
        };
        saveGamesToStorage();
        return games[gameIndex];
    }
    return null;
}

function deleteGame(gameId) {
    const gameName = games.find(g => g.id === gameId)?.name;
    games = games.filter(g => g.id !== gameId);
    cart = cart.filter(item => item.id !== gameId);
    saveGamesToStorage();
    saveCartToStorage();
    return gameName;
}

function getGameById(gameId) {
    return games.find(g => g.id === gameId);
}

function getGamesByGenre(genre) {
    return games.filter(g => g.genre === genre);
}

function getAllGenres() {
    const genresInUse = [...new Set(games.map(g => g.genre))];
    return genresInUse.sort();
}

// ========================================
// DISPLAY & RENDERING FUNCTIONS
// ========================================

function displayFeaturedGames() {
    const featured = games.slice(0, 3);
    const featuredContainer = document.getElementById('featuredGames');
    if (!featuredContainer) return;

    featuredContainer.innerHTML = featured.map(game => `
        <div class="col-md-4 mb-4">
            <div class="game-card featured-game" onclick="openGameModal(${game.id})">
                <div class="game-card-image-wrapper">
                    <img src="${game.image}" alt="${game.name}" class="game-card-image">
                    <div class="game-genre-badge">${GENRE_LABELS[game.genre] || game.genre}</div>
                </div>
                <div class="game-card-body">
                    <h5 class="game-card-title">${game.name}</h5>
                    <p class="game-card-description">${game.description}</p>
                    <div class="game-card-footer">
                        <span class="game-price">$${game.price.toFixed(2)}</span>
                        <div class="game-rating">
                            ${'★'.repeat(Math.floor(game.rating))}${'☆'.repeat(5-Math.floor(game.rating))}
                            <span class="rating-value">${game.rating}/5</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function displayAllGames(gamesArray = null) {
    const gamesList = document.getElementById('gamesList');
    if (!gamesList) return;

    const displayGames = gamesArray || games;

    if (displayGames.length === 0) {
        gamesList.innerHTML = '<div class="col-12"><p class="text-center text-muted">No games found matching your criteria.</p></div>';
        return;
    }

    gamesList.innerHTML = displayGames.map(game => `
        <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div class="game-card" data-game-id="${game.id}" onclick="openGameModal(${game.id})">
                <div class="game-card-image-wrapper">
                    <img src="${game.image}" alt="${game.name}" class="game-card-image">
                    <div class="game-genre-badge">${GENRE_LABELS[game.genre] || game.genre}</div>
                    <div class="game-card-overlay">
                        <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); addToCart(${game.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
                <div class="game-card-body">
                    <h5 class="game-card-title">${game.name}</h5>
                    <p class="game-card-developer">${game.developer}</p>
                    <p class="game-card-description">${game.description}</p>
                    <div class="game-card-footer">
                        <span class="game-price">$${game.price.toFixed(2)}</span>
                        <div class="game-rating">
                            ${'★'.repeat(Math.floor(game.rating))}${'☆'.repeat(5-Math.floor(game.rating))}
                            <span class="rating-value">${game.rating}/5</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function displayGenreFilter() {
    const filterContainer = document.getElementById('genreFilterContainer');
    if (!filterContainer) return;

    const allGenres = getAllGenres();
    
    filterContainer.innerHTML = `
        <div class="genre-filter-pills">
            <button class="genre-pill active" data-genre="" onclick="filterByGenre('')">
                All Games
            </button>
            ${allGenres.map(genre => `
                <button class="genre-pill" data-genre="${genre}" onclick="filterByGenre('${genre}')">
                    ${GENRE_LABELS[genre] || genre}
                </button>
            `).join('')}
        </div>
    `;
}

function filterByGenre(genre) {
    const filtered = genre ? games.filter(g => g.genre === genre) : games;
    displayAllGames(filtered);
    
    // Update active pill
    document.querySelectorAll('.genre-pill').forEach(pill => {
        pill.classList.remove('active');
        if (pill.dataset.genre === genre) {
            pill.classList.add('active');
        }
    });
}

// ========================================
// MODAL & INTERACTION FUNCTIONS
// ========================================

function openGameModal(gameId) {
    const game = getGameById(gameId);
    if (!game) return;

    currentGameForModal = game;

    document.getElementById('gameModalTitle').textContent = game.name;
    document.getElementById('gameModalImage').src = game.image;
    document.getElementById('gameModalDescription').textContent = game.description;
    document.getElementById('gameModalDeveloper').textContent = game.developer;
    document.getElementById('gameModalGenre').textContent = GENRE_LABELS[game.genre] || game.genre;
    document.getElementById('gameModalPrice').textContent = game.price.toFixed(2);
    document.getElementById('gameModalReleaseDate').textContent = game.releaseDate;

    const ratingHtml = `
        <div class="rating-display">
            ${'★'.repeat(Math.floor(game.rating))}${'☆'.repeat(5-Math.floor(game.rating))}
            <span class="rating-value ms-2">${game.rating}/5</span>
        </div>
    `;
    document.getElementById('gameModalRating').innerHTML = ratingHtml;

    const gameInCart = cart.find(item => item.id === gameId);
    const buyButton = document.getElementById('buyButton');
    if (gameInCart) {
        buyButton.textContent = '✓ Already in Cart';
        buyButton.disabled = true;
        buyButton.classList.add('btn-success');
        buyButton.classList.remove('btn-primary');
    } else {
        buyButton.textContent = 'Add to Cart';
        buyButton.disabled = false;
        buyButton.classList.remove('btn-success');
        buyButton.classList.add('btn-primary');
    }

    const modal = new bootstrap.Modal(document.getElementById('gameModal'));
    modal.show();
}

function addToCartFromButton() {
    if (currentGameForModal) {
        addToCart(currentGameForModal.id);
    }
}

function addToCart(gameId) {
    const game = getGameById(gameId);
    if (!game) return;

    const existingItem = cart.find(item => item.id === gameId);

    if (!existingItem) {
        cart.push({
            ...game,
            quantity: 1
        });
        saveCartToStorage();
        updateCartBadge();
        showNotification(`${game.name} added to cart!`, 'success');
        
        // Update button if modal is open
        if (currentGameForModal && currentGameForModal.id === gameId) {
            const buyButton = document.getElementById('buyButton');
            buyButton.textContent = '✓ Already in Cart';
            buyButton.disabled = true;
        }
    } else {
        showNotification(`${game.name} is already in your cart!`, 'info');
    }
}

function showCart() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    updateCartDisplay();
    cartModal.show();
}

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
                    <p class="text-muted mb-0">Qty: <input type="number" min="1" value="${item.quantity}" 
                        onchange="updateCartQuantity(${index}, this.value)" class="cart-qty-input"></p>
                </div>
                <div class="cart-item-price-section">
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

function updateCartQuantity(index, quantity) {
    const qty = parseInt(quantity);
    if (qty > 0) {
        cart[index].quantity = qty;
        saveCartToStorage();
        updateCartDisplay();
    }
}

function removeFromCart(index) {
    const gameName = cart[index].name;
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartBadge();
    updateCartDisplay();
    showNotification(`${gameName} removed from cart`, 'info');
}

function updateCartBadge() {
    const badge = document.querySelector('.badge-cart');
    if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'inline-block' : 'none';
    }
}

function saveCartToStorage() {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartBadge();
        } catch (e) {
            console.error('Error loading cart:', e);
            cart = [];
        }
    }
}

// ========================================
// SEARCH & FILTER FUNCTIONS
// ========================================

function filterGames() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const genre = document.getElementById('genreFilter')?.value || '';

    const filtered = games.filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm) ||
            game.developer.toLowerCase().includes(searchTerm);
        const matchesGenre = !genre || game.genre === genre;
        return matchesSearch && matchesGenre;
    });

    displayAllGames(filtered);
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notificationContainer') ||
        document.body;

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : type === 'danger' ? 'danger' : 'info'} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    initializeGames();
    loadCartFromStorage();
    
    displayFeaturedGames();
    displayAllGames();
    displayGenreFilter();
    setupEventListeners();
});

// ========================================
// EVENT LISTENERS SETUP
// ========================================

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    const cartLink = document.querySelector('.cart-link');

    if (searchInput) searchInput.addEventListener('input', filterGames);
    if (genreFilter) genreFilter.addEventListener('change', filterGames);
    if (cartLink) cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        showCart();
    });
}

// ========================================
// CHECKOUT PLACEHOLDER
// ========================================

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    window.location.href = '/public/checkout.html';
}
