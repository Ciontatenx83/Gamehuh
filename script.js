// GameHub - Professional Gaming Platform with Data Persistence

// Enhanced Games Database with High-Quality Posters
const games = [
    {
        id: 1,
        name: "Cyber Strike 2077",
        category: "action",
        price: 59.99,
        rating: 4.8,
        developer: "Neon Studios",
        description: "Experience the ultimate cyberpunk action game with stunning visuals and intense gameplay in a dystopian future.",
        image: "https://picsum.photos/seed/cyber-strike-2077/400/500",
        poster: "https://picsum.photos/seed/cyber-strike-2077-poster/300/400",
        screenshots: [
            "https://picsum.photos/seed/cyber1/800/450",
            "https://picsum.photos/seed/cyber2/800/450",
            "https://picsum.photos/seed/cyber3/800/450"
        ],
        requirements: {
            os: "Windows 10 64-bit",
            cpu: "Intel Core i5-8400",
            ram: "8 GB",
            storage: "50 GB",
            gpu: "NVIDIA GeForce GTX 1060"
        },
        releaseDate: "2024-03-15",
        tags: ["cyberpunk", "action", "fps", "open-world"]
    },
    {
        id: 2,
        name: "Dragon Quest XI",
        category: "rpg",
        price: 49.99,
        rating: 4.9,
        developer: "Square Enix",
        description: "Embark on an epic RPG adventure with turn-based combat and a rich storyline that will captivate you for hours.",
        image: "https://picsum.photos/seed/dragon-quest-xi/400/500",
        poster: "https://picsum.photos/seed/dragon-quest-xi-poster/300/400",
        screenshots: [
            "https://picsum.photos/seed/dragon1/800/450",
            "https://picsum.photos/seed/dragon2/800/450",
            "https://picsum.photos/seed/dragon3/800/450"
        ],
        requirements: {
            os: "Windows 10 64-bit",
            cpu: "Intel Core i5-4460",
            ram: "8 GB",
            storage: "45 GB",
            gpu: "NVIDIA GeForce GTX 960"
        },
        releaseDate: "2024-01-20",
        tags: ["rpg", "fantasy", "turn-based", "story-rich"]
    },
    {
        id: 3,
        name: "Speed Rush Legends",
        category: "racing",
        price: 39.99,
        rating: 4.5,
        developer: "Velocity Games",
        description: "Race against the best drivers in this high-octane racing game with realistic physics and stunning graphics.",
        image: "https://picsum.photos/seed/speed-rush-legends/400/500",
        poster: "https://picsum.photos/seed/speed-rush-legends-poster/300/400",
        screenshots: [
            "https://picsum.photos/seed/racing1/800/450",
            "https://picsum.photos/seed/racing2/800/450",
            "https://picsum.photos/seed/racing3/800/450"
        ],
        requirements: {
            os: "Windows 10 64-bit",
            cpu: "Intel Core i3-3250",
            ram: "6 GB",
            storage: "30 GB",
            gpu: "NVIDIA GeForce GTX 750 Ti"
        },
        releaseDate: "2024-02-10",
        tags: ["racing", "simulation", "multiplayer", "sports"]
    },
    {
        id: 4,
        name: "Puzzle Master Pro",
        category: "puzzle",
        price: 19.99,
        rating: 4.6,
        developer: "Mind Games Inc",
        description: "Challenge your mind with over 1000 unique puzzles in this brain-teasing adventure that never gets old.",
        image: "https://picsum.photos/seed/puzzle-master-pro/400/500",
        poster: "https://picsum.photos/seed/puzzle-master-pro-poster/300/400",
        screenshots: [
            "https://picsum.photos/seed/puzzle1/800/450",
            "https://picsum.photos/seed/puzzle2/800/450",
            "https://picsum.photos/seed/puzzle3/800/450"
        ],
        requirements: {
            os: "Windows 10 64-bit",
            cpu: "Intel Core i3-2100",
            ram: "4 GB",
            storage: "10 GB",
            gpu: "Intel HD Graphics 620"
        },
        releaseDate: "2024-01-05",
        tags: ["puzzle", "casual", "brain-training", "family-friendly"]
    },
    {
        id: 5,
        name: "Strategy Empire",
        category: "strategy",
        price: 44.99,
        rating: 4.7,
        developer: "Tactical Studios",
        description: "Build your empire and conquer the world in this deep strategy game that tests your tactical skills.",
        image: "https://picsum.photos/seed/strategy-empire/400/500",
        poster: "https://picsum.photos/seed/strategy-empire-poster/300/400",
        screenshots: [
            "https://picsum.photos/seed/strategy1/800/450",
            "https://picsum.photos/seed/strategy2/800/450",
            "https://picsum.photos/seed/strategy3/800/450"
        ],
        requirements: {
            os: "Windows 10 64-bit",
            cpu: "Intel Core i5-6500",
            ram: "8 GB",
            storage: "40 GB",
            gpu: "NVIDIA GeForce GTX 960"
        },
        releaseDate: "2024-02-20",
        tags: ["strategy", "empire-building", "tactical", "warfare"]
    },
    {
        id: 6,
        name: "Sports Champions 2024",
        category: "sports",
        price: 59.99,
        rating: 4.4,
        developer: "Athletic Games",
        description: "Compete in multiple sports including football, basketball, and racing with realistic physics.",
        image: "https://picsum.photos/seed/sports-champions-2024/400/500",
        poster: "https://picsum.photos/seed/sports-champions-2024-poster/300/400",
        screenshots: [
            "https://picsum.photos/seed/sports1/800/450",
            "https://picsum.photos/seed/sports2/800/450",
            "https://picsum.photos/seed/sports3/800/450"
        ],
        requirements: {
            os: "Windows 10 64-bit",
            cpu: "Intel Core i5-4590",
            ram: "8 GB",
            storage: "35 GB",
            gpu: "NVIDIA GeForce GTX 1050"
        },
        releaseDate: "2024-03-01",
        tags: ["sports", "simulation", "multiplayer", "realistic"]
    }
];

// Data Persistence Manager
class DataManager {
    constructor() {
        this.initializeStorage();
        this.loadPersistedData();
    }

    initializeStorage() {
        // Initialize localStorage with default values if needed
        if (!localStorage.getItem('gamehub_cart')) {
            localStorage.setItem('gamehub_cart', JSON.stringify([]));
        }
        if (!localStorage.getItem('gamehub_user')) {
            localStorage.setItem('gamehub_user', JSON.stringify(null));
        }
        if (!localStorage.getItem('gamehub_preferences')) {
            localStorage.setItem('gamehub_preferences', JSON.stringify({
                theme: 'dark',
                language: 'en',
                notifications: true,
                autoSave: true
            }));
        }
        if (!localStorage.getItem('gamehub_wishlist')) {
            localStorage.setItem('gamehub_wishlist', JSON.stringify([]));
        }
    }

    loadPersistedData() {
        this.cart = JSON.parse(localStorage.getItem('gamehub_cart') || '[]');
        this.user = JSON.parse(localStorage.getItem('gamehub_user') || 'null');
        this.preferences = JSON.parse(localStorage.getItem('gamehub_preferences') || '{}');
        this.wishlist = JSON.parse(localStorage.getItem('gamehub_wishlist') || '[]');
    }

    saveCart() {
        localStorage.setItem('gamehub_cart', JSON.stringify(this.cart));
        this.updateCartUI();
    }

    saveUser(user) {
        this.user = user;
        localStorage.setItem('gamehub_user', JSON.stringify(user));
        this.updateUserUI();
    }

    savePreferences(preferences) {
        this.preferences = { ...this.preferences, ...preferences };
        localStorage.setItem('gamehub_preferences', JSON.stringify(this.preferences));
    }

    saveWishlist() {
        localStorage.setItem('gamehub_wishlist', JSON.stringify(this.wishlist));
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    }

    updateUserUI() {
        const loginBtn = document.getElementById('loginBtn');
        const userMenu = document.getElementById('userMenu');
        
        if (this.user) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (userMenu) userMenu.style.display = 'block';
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (userMenu) userMenu.style.display = 'none';
        }
    }

    addToCart(game) {
        const existingItem = this.cart.find(item => item.id === game.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...game,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }
        
        this.saveCart();
        this.showNotification(`${game.name} added to cart!`, 'success');
    }

    removeFromCart(gameId) {
        this.cart = this.cart.filter(item => item.id !== gameId);
        this.saveCart();
        this.showNotification('Item removed from cart', 'info');
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.showNotification('Cart cleared', 'info');
    }

    getCartTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getCartSubtotal() {
        return this.getCartTotal();
    }

    getCartTax() {
        return this.getCartSubtotal() * 0.08; // 8% tax
    }

    getCartTotalWithTax() {
        return this.getCartSubtotal() + this.getCartTax();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    login(userData) {
        // Simulate authentication
        const user = {
            id: Date.now(),
            email: userData.email,
            name: userData.email.split('@')[0],
            avatar: `https://picsum.photos/seed/user-${userData.email}/100/100`,
            joinedAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            preferences: this.preferences
        };
        
        this.saveUser(user);
        this.showNotification(`Welcome back, ${user.name}!`, 'success');
        return user;
    }

    logout() {
        this.user = null;
        localStorage.setItem('gamehub_user', JSON.stringify(null));
        this.updateUserUI();
        this.showNotification('Logged out successfully', 'info');
    }

    searchGames(query) {
        if (!query) return games;
        
        const searchTerm = query.toLowerCase();
        return games.filter(game => 
            game.name.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm) ||
            game.developer.toLowerCase().includes(searchTerm) ||
            game.category.toLowerCase().includes(searchTerm) ||
            game.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    filterByCategory(category) {
        if (category === 'all') return games;
        return games.filter(game => game.category === category);
    }

    sortGames(gamesList, sortBy) {
        const sorted = [...gamesList];
        
        switch(sortBy) {
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'price':
                return sorted.sort((a, b) => a.price - b.price);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'newest':
                return sorted.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
            default:
                return sorted;
        }
    }
}

// Initialize Data Manager
const dataManager = new DataManager();

// Global Variables
let currentGame = null;
let currentFilter = 'all';
let currentSort = 'name';
let filteredGames = [...games];
let currentPage = 1;
let gamesPerPage = 6;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Load initial data
    loadGames();
    setupEventListeners();
    updateStats();
    checkUserSession();
}

function setupEventListeners() {
    // Search functionality
    const searchInputs = ['searchInput', 'gamesSearch'];
    searchInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', debounce(handleSearch, 300));
            element.addEventListener('focus', () => showSearchSuggestions(id));
            element.addEventListener('blur', () => hideSearchSuggestions(id));
        }
    });

    // Category filtering
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterByCategory(category);
        });
    });

    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            applyFiltersAndSort();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Performance monitoring
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            console.log('Service Worker registration failed');
        });
    }
}

function handleSearch(event) {
    const query = event.target.value;
    const suggestions = dataManager.searchGames(query).slice(0, 5);
    
    // Update search suggestions
    const suggestionsContainer = event.target.nextElementSibling;
    if (suggestions.length > 0 && query.length > 0) {
        suggestionsContainer.innerHTML = suggestions.map(game => `
            <div class="suggestion-item" onclick="selectGame(${game.id})">
                <img src="${game.poster}" alt="${game.name}" class="suggestion-image">
                <div class="suggestion-info">
                    <div class="suggestion-name">${game.name}</div>
                    <div class="suggestion-meta">
                        <span class="suggestion-category">${game.category}</span>
                        <span class="suggestion-price">$${game.price}</span>
                    </div>
                </div>
            </div>
        `).join('');
        suggestionsContainer.style.display = 'block';
    } else {
        suggestionsContainer.style.display = 'none';
    }
    
    // Apply search
    applyFiltersAndSort();
}

function showSearchSuggestions(inputId) {
    const input = document.getElementById(inputId);
    const suggestions = input.nextElementSibling;
    
    if (input.value.length > 0 && suggestions.children.length > 0) {
        suggestions.style.display = 'block';
    }
}

function hideSearchSuggestions(inputId) {
    const input = document.getElementById(inputId);
    const suggestions = input.nextElementSibling;
    
    setTimeout(() => {
        suggestions.style.display = 'none';
    }, 200);
}

function selectGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game) {
        showGameDetails(gameId);
        // Clear search inputs
        document.getElementById('searchInput').value = '';
        document.getElementById('gamesSearch').value = '';
        hideSearchSuggestions('searchInput');
        hideSearchSuggestions('gamesSearch');
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function filterByCategory(category) {
    currentFilter = category;
    applyFiltersAndSort();
    
    // Update active category visual
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    
    const activeCard = document.querySelector(`[data-category="${category}"]`);
    if (activeCard) {
        activeCard.classList.add('active');
    }
    
    // Scroll to games section
    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
}

function applyFiltersAndSort() {
    const searchQuery = document.getElementById('searchInput')?.value || '';
    const gamesQuery = document.getElementById('gamesSearch')?.value || '';
    const query = searchQuery || gamesQuery;
    
    // Apply filters
    if (query) {
        filteredGames = dataManager.searchGames(query);
    } else if (currentFilter !== 'all') {
        filteredGames = dataManager.filterByCategory(currentFilter);
    } else {
        filteredGames = [...games];
    }
    
    // Apply sorting
    filteredGames = dataManager.sortGames(filteredGames, currentSort);
    
    // Display results
    displayGames(filteredGames);
    updateGamesCount();
}

function loadGames() {
    displayGames(filteredGames);
}

function displayGames(gamesToShow) {
    const gamesGrid = document.getElementById('gamesGrid');
    
    if (gamesToShow.length === 0) {
        gamesGrid.innerHTML = `
            <div class="col-12 text-center">
                <div class="no-results">
                    <i class="fas fa-search fa-3x"></i>
                    <h3>No games found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            </div>
        `;
        return;
    }
    
    const gamesHTML = gamesToShow.map(game => `
        <div class="game-card" data-aos="fade-up" onclick="showGameDetails(${game.id})">
            <img src="${game.poster}" alt="${game.name}" class="game-poster-large" loading="lazy">
            <div class="game-card-body">
                <h5>${game.name}</h5>
                <p>${game.description}</p>
                <div class="game-meta">
                    <span class="game-category">${game.category}</span>
                    <span class="game-rating">
                        <i class="fas fa-star"></i> ${game.rating}
                    </span>
                </div>
                <div class="game-price">$${game.price}</div>
                <button class="btn btn-download btn-sm" onclick="event.stopPropagation(); quickDownload(${game.id})">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    gamesGrid.innerHTML = gamesHTML;
}

function showGameDetails(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    currentGame = game;
    
    // Populate modal
    document.getElementById('modalTitle').textContent = game.name;
    document.getElementById('modalGameTitle').textContent = game.name;
    document.getElementById('modalImage').src = game.image;
    document.getElementById('modalDescription').textContent = game.description;
    document.getElementById('modalDeveloper').textContent = game.developer;
    document.getElementById('modalCategory').textContent = game.category;
    document.getElementById('modalRating').innerHTML = `<i class="fas fa-star"></i> ${game.rating}`;
    document.getElementById('modalPrice').textContent = `$${game.price}`;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('gameModal'));
    modal.show();
}

function quickDownload(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game) {
        downloadGame(game);
    }
}

function downloadGame(game = currentGame) {
    if (!game) return;
    
    dataManager.showNotification(`Downloading ${game.name}...`, 'info');
    
    // Simulate download progress
    setTimeout(() => {
        const content = `Game Download Information\n\n========================\n\nGame: ${game.name}\nDeveloper: ${game.developer}\nCategory: ${game.category}\nPrice: $${game.price}\nRating: ${game.rating}/5\nRelease Date: ${game.releaseDate}\n\nSystem Requirements:\n- OS: ${game.requirements.os}\n- CPU: ${game.requirements.cpu}\n- RAM: ${game.requirements.ram}\n- Storage: ${game.requirements.storage}\n- GPU: ${game.requirements.gpu}\n\nTags: ${game.tags.join(', ')}\n\n========================\nThank you for downloading from GameHub!\nPremium Gaming Platform`;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${game.name.replace(/\s+/g, '_')}_GameHub_Download.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        dataManager.showNotification(`${game.name} downloaded successfully!`, 'success');
        
        // Track download activity
        trackDownloadActivity(game);
    }, 2000);
    
    // Close modal if open
    const modal = bootstrap.Modal.getInstance(document.getElementById('gameModal'));
    if (modal) modal.hide();
}

function trackDownloadActivity(game) {
    // Track download for analytics and user history
    const downloadActivity = {
        gameId: game.id,
        gameName: game.name,
        downloadDate: new Date().toISOString(),
        userId: dataManager.user?.id || 'anonymous',
        userAgent: navigator.userAgent,
        platform: navigator.platform
    };
    
    // Store in localStorage for demo (in production, this would go to analytics)
    const downloads = JSON.parse(localStorage.getItem('gamehub_downloads') || '[]');
    downloads.push(downloadActivity);
    localStorage.setItem('gamehub_downloads', JSON.stringify(downloads.slice(-50))); // Keep last 50 downloads
}

function addToCart() {
    if (!currentGame) return;
    dataManager.addToCart(currentGame);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('gameModal'));
    if (modal) modal.hide();
}

function openCart(event) {
    if (event) event.preventDefault();
    
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (dataManager.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart fa-3x"></i>
                <h4>Your cart is empty</h4>
                <p>Browse our amazing games and add them to your cart!</p>
                <button class="btn btn-primary" onclick="document.getElementById('games').scrollIntoView({behavior: 'smooth'})">
                    <i class="fas fa-gamepad"></i> Browse Games
                </button>
            </div>
        `;
        cartSummary.style.display = 'none';
    } else {
        cartItems.innerHTML = dataManager.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${item.poster}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h6>${item.name}</h6>
                        <small class="text-muted">Quantity: ${item.quantity}</small>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Update summary
        document.getElementById('cartSubtotal').textContent = `$${dataManager.getCartSubtotal().toFixed(2)}`;
        document.getElementById('cartTax').textContent = `$${dataManager.getCartTax().toFixed(2)}`;
        document.getElementById('cartTotal').textContent = `$${dataManager.getCartTotalWithTax().toFixed(2)}`;
        cartSummary.style.display = 'block';
    }
    
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
}

function removeFromCart(gameId) {
    dataManager.removeFromCart(gameId);
    openCart(); // Refresh cart modal
}

function checkout() {
    if (dataManager.cart.length === 0) {
        dataManager.showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = dataManager.getCartTotalWithTax();
    
    // Simulate checkout process
    dataManager.showNotification('Processing payment...', 'info');
    
    setTimeout(() => {
        // Create order
        const order = {
            id: Date.now(),
            items: dataManager.cart,
            subtotal: dataManager.getCartSubtotal(),
            tax: dataManager.getCartTax(),
            total: total,
            orderDate: new Date().toISOString(),
            userId: dataManager.user?.id || 'anonymous',
            status: 'completed'
        };
        
        // Store order
        const orders = JSON.parse(localStorage.getItem('gamehub_orders') || '[]');
        orders.push(order);
        localStorage.setItem('gamehub_orders', JSON.stringify(orders));
        
        // Clear cart
        dataManager.clearCart();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        if (modal) modal.hide();
        
        dataManager.showNotification(`Order placed successfully! Total: $${total.toFixed(2)}`, 'success');
    }, 2000);
}

function showLogin() {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Simple validation
    if (!email || !password) {
        dataManager.showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        dataManager.showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (password.length < 6) {
        dataManager.showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Simulate login
    const userData = { email, password, rememberMe };
    const user = dataManager.login(userData);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (modal) modal.hide();
    
    // Reset form
    document.getElementById('loginForm').reset();
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('passwordToggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

function checkUserSession() {
    // Check if user session is still valid
    if (dataManager.user) {
        const lastLogin = new Date(dataManager.user.lastLogin);
        const now = new Date();
        const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
        
        if (now - lastLogin > sessionTimeout) {
            dataManager.logout();
        }
    }
}

function clearFilter() {
    currentFilter = 'all';
    currentSort = 'name';
    document.getElementById('searchInput').value = '';
    document.getElementById('gamesSearch').value = '';
    document.getElementById('sortSelect').value = 'name';
    
    // Clear active category
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    
    filteredGames = [...games];
    displayGames(filteredGames);
    updateGamesCount();
}

function updateGamesCount() {
    const countElement = document.getElementById('gamesCount');
    if (countElement) {
        countElement.textContent = `Showing ${filteredGames.length} games`;
    }
}

function updateStats() {
    // Animate statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}

function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + K for search
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Ctrl/Cmd + / for search in games
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        document.getElementById('gamesSearch').focus();
    }
    
    // Escape to close modals
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const instance = bootstrap.Modal.getInstance(modal);
            if (instance) instance.hide();
        });
    }
}

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.user-menu')) {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.style.display = 'none';
    }
});

// Performance monitoring
if ('performance' in window) {
    // Monitor page load performance
    window.addEventListener('load', function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    });
}

// Service Worker for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }).catch(function(error) {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

// Additional placeholder functions for completeness
function showSignup() {
    dataManager.showNotification('Signup feature coming soon!', 'info');
}

function showProfile() {
    dataManager.showNotification('Profile feature coming soon!', 'info');
}

function showOrders() {
    dataManager.showNotification('Orders feature coming soon!', 'info');
}

function showSupport() {
    dataManager.showNotification('Support feature coming soon!', 'info');
}

function showTerms() {
    dataManager.showNotification('Terms of Service coming soon!', 'info');
}

function showPrivacy() {
    dataManager.showNotification('Privacy Policy coming soon!', 'info');
}

function showRefund() {
    dataManager.showNotification('Refund Policy coming soon!', 'info');
}

function showForgotPassword() {
    dataManager.showNotification('Password reset feature coming soon!', 'info');
}

function loadMoreGames() {
    dataManager.showNotification('Load more games feature coming soon!', 'info');
}
