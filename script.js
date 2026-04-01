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

// ==================== ADMIN PANEL FUNCTIONS ====================

// Admin Data Manager Extension
class AdminDataManager extends DataManager {
    constructor() {
        super();
        this.initializeAdminStorage();
        this.loadAdminData();
    }

    initializeAdminStorage() {
        // Admin settings storage
        if (!localStorage.getItem('gamehub_admin_settings')) {
            localStorage.setItem('gamehub_admin_settings', JSON.stringify({
                theme: {
                    current: 'dark',
                    primaryColor: '#6366f1',
                    secondaryColor: '#8b5cf6',
                    accentColor: '#ec4899',
                    backgroundColor: '#0f172a',
                    backgroundImage: null
                },
                platform: {
                    name: 'GameHub',
                    contactEmail: 'admin@gamehub.com',
                    maintenanceMode: false,
                    allowRegistration: true
                },
                roles: {
                    tester: { earlyAccess: true, moderation: false, analytics: false, userManagement: false },
                    moderator: { earlyAccess: true, moderation: true, analytics: true, userManagement: false },
                    vip: { earlyAccess: true, moderation: false, analytics: true, userManagement: false },
                    admin: { earlyAccess: true, moderation: true, analytics: true, userManagement: true }
                }
            }));
        }
        
        // User activity tracking
        if (!localStorage.getItem('gamehub_activity_logs')) {
            localStorage.setItem('gamehub_activity_logs', JSON.stringify([]));
        }
        
        // User roles storage
        if (!localStorage.getItem('gamehub_user_roles')) {
            localStorage.setItem('gamehub_user_roles', JSON.stringify({}));
        }
    }

    loadAdminData() {
        this.adminSettings = JSON.parse(localStorage.getItem('gamehub_admin_settings') || '{}');
        this.activityLogs = JSON.parse(localStorage.getItem('gamehub_activity_logs') || '[]');
        this.userRoles = JSON.parse(localStorage.getItem('gamehub_user_roles') || '{}');
        
        // Apply saved theme on load
        this.applySavedTheme();
    }

    applySavedTheme() {
        const theme = this.adminSettings.theme;
        if (theme) {
            // Apply theme to CSS variables
            document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
            document.documentElement.style.setProperty('--accent-color', theme.accentColor);
            
            if (theme.backgroundImage) {
                document.body.style.backgroundImage = `url(${theme.backgroundImage})`;
            } else if (theme.backgroundColor) {
                document.body.style.backgroundColor = theme.backgroundColor;
            }
        }
    }

    saveAdminSettings() {
        localStorage.setItem('gamehub_admin_settings', JSON.stringify(this.adminSettings));
    }

    logActivity(type, details, userId = null) {
        const logEntry = {
            id: Date.now(),
            type: type,
            details: details,
            userId: userId || this.user?.id || 'anonymous',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        this.activityLogs.unshift(logEntry);
        
        // Keep only last 1000 logs
        if (this.activityLogs.length > 1000) {
            this.activityLogs = this.activityLogs.slice(0, 1000);
        }
        
        localStorage.setItem('gamehub_activity_logs', JSON.stringify(this.activityLogs));
    }

    getUserRole(userId) {
        return this.userRoles[userId] || { role: 'user', permissions: {} };
    }

    setUserRole(userId, role) {
        this.userRoles[userId] = {
            role: role,
            assignedAt: new Date().toISOString(),
            assignedBy: this.user?.id || 'system'
        };
        
        localStorage.setItem('gamehub_user_roles', JSON.stringify(this.userRoles));
        
        this.logActivity('role_assignment', {
            userId: userId,
            newRole: role,
            assignedBy: this.user?.id || 'system'
        });
    }

    getUsers() {
        const users = JSON.parse(localStorage.getItem('gamehub_users') || '[]');
        return users.map(user => ({
            ...user,
            role: this.getUserRole(user.id),
            lastSeen: this.getUserLastSeen(user.id),
            totalPlayTime: this.getUserPlayTime(user.id)
        }));
    }

    getUserLastSeen(userId) {
        const logs = this.activityLogs.filter(log => 
            log.userId === userId && (log.type === 'login' || log.type === 'download')
        );
        
        if (logs.length === 0) return 'Never';
        
        const lastLog = logs[0];
        const date = new Date(lastLog.timestamp);
        return date.toLocaleString();
    }

    getUserPlayTime(userId) {
        const logs = this.activityLogs.filter(log => 
            log.userId === userId && log.type === 'download'
        );
        
        return logs.length * 2; // Estimate 2 hours per download
    }

    getAnalytics() {
        const downloads = this.activityLogs.filter(log => log.type === 'download').length;
        const purchases = this.activityLogs.filter(log => log.type === 'purchase').length;
        const registrations = this.activityLogs.filter(log => log.type === 'registration').length;
        const logins = this.activityLogs.filter(log => log.type === 'login').length;
        
        const totalRevenue = purchases * 45.99; // Average price
        
        return {
            totalDownloads: downloads,
            totalRevenue: totalRevenue,
            avgSessionTime: '12m', // Mock data
            conversionRate: registrations > 0 ? ((purchases / registrations) * 100).toFixed(1) + '%' : '0%',
            totalUsers: this.getUsers().length,
            activeUsers: logins,
            newUsers: registrations,
            vipUsers: Object.values(this.userRoles).filter(role => role.role === 'vip').length
        };
    }
}

// Initialize Admin Data Manager
const adminData = new AdminDataManager();

// Theme Engine Functions
function showAdminPanel() {
    if (!dataManager.user) {
        dataManager.showNotification('Please login to access admin panel', 'error');
        return;
    }
    
    // Check if user has admin privileges
    const userRole = adminData.getUserRole(dataManager.user.id);
    if (userRole.role !== 'admin') {
        dataManager.showNotification('You do not have admin privileges', 'error');
        return;
    }
    
    // Load admin data
    loadAdminPanelData();
    
    const modal = new bootstrap.Modal(document.getElementById('adminModal'));
    modal.show();
}

function loadAdminPanelData() {
    // Load theme settings
    const theme = adminData.adminSettings.theme;
    if (theme) {
        document.getElementById('themeSelector').value = theme.current || 'dark';
        document.getElementById('primaryColor').value = theme.primaryColor || '#6366f1';
        document.getElementById('secondaryColor').value = theme.secondaryColor || '#8b5cf6';
        document.getElementById('accentColor').value = theme.accentColor || '#ec4899';
        document.getElementById('bgColorPicker').value = theme.backgroundColor || '#0f172a';
        document.getElementById('bgColorHex').value = theme.backgroundColor || '#0f172a';
        document.getElementById('bgImageUrl').value = theme.backgroundImage || '';
    }
    
    // Load platform settings
    const platform = adminData.adminSettings.platform;
    if (platform) {
        document.getElementById('platformName').value = platform.name || 'GameHub';
        document.getElementById('contactEmail').value = platform.contactEmail || 'admin@gamehub.com';
        document.getElementById('maintenanceMode').checked = platform.maintenanceMode || false;
        document.getElementById('allowRegistration').checked = platform.allowRegistration !== false;
    }
    
    // Load user data
    loadUserDashboard();
    
    // Load analytics
    loadAnalytics();
    
    // Load activity logs
    loadActivityLogs();
}

function loadUserDashboard() {
    const users = adminData.getUsers();
    const analytics = adminData.getAnalytics();
    
    // Update statistics
    document.getElementById('totalUsers').textContent = analytics.totalUsers;
    document.getElementById('activeUsers').textContent = analytics.activeUsers;
    document.getElementById('newUsers').textContent = analytics.newUsers;
    document.getElementById('vipUsers').textContent = analytics.vipUsers;
    
    // Load users table
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="status-badge ${user.role.role}">${user.role.role}</span></td>
            <td>${new Date(user.joinedAt).toLocaleDateString()}</td>
            <td>${user.lastSeen}</td>
            <td><span class="status-badge active">Active</span></td>
            <td>
                <button class="btn btn-sm btn-primary btn-admin-action" onclick="viewUserDetails(${user.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning btn-admin-action" onclick="editUserRole(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-admin-action" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    // Load role selector
    const roleSelector = document.getElementById('roleSelector');
    roleSelector.innerHTML = '<option value="">Select User</option>' + 
        users.map(user => `<option value="${user.id}">${user.name}</option>`).join('');
}

function loadAnalytics() {
    const analytics = adminData.getAnalytics();
    
    document.getElementById('totalDownloads').textContent = analytics.totalDownloads;
    document.getElementById('totalRevenue').textContent = `$${analytics.totalRevenue.toFixed(2)}`;
    document.getElementById('avgSessionTime').textContent = analytics.avgSessionTime;
    document.getElementById('conversionRate').textContent = analytics.conversionRate;
}

function loadActivityLogs() {
    const logs = adminData.activityLogs.slice(0, 50); // Show last 50 logs
    const activityList = document.getElementById('activityList');
    
    activityList.innerHTML = logs.map(log => `
        <div class="log-entry">
            <div>
                <span class="log-entry-type ${log.type}">${log.type}</span>
                <strong>${log.details}</strong>
                <small class="text-muted d-block">User ID: ${log.userId}</small>
            </div>
            <small class="text-muted">${new Date(log.timestamp).toLocaleString()}</small>
        </div>
    `).join('');
}

// Theme Management Functions
function applyTheme() {
    const themeSelector = document.getElementById('themeSelector');
    const selectedTheme = themeSelector.value;
    
    const themes = {
        dark: {
            backgroundColor: '#0f172a',
            primaryColor: '#6366f1',
            secondaryColor: '#8b5cf6',
            accentColor: '#ec4899'
        },
        glassmorphism: {
            backgroundColor: '#1a1f3a',
            primaryColor: '#3b82f6',
            secondaryColor: '#8b5cf6',
            accentColor: '#ec4899'
        },
        cyberpunk: {
            backgroundColor: '#0a0a0a',
            primaryColor: '#ff006e',
            secondaryColor: '#fb5607',
            accentColor: '#ffbe0b'
        },
        neon: {
            backgroundColor: '#0a0a0a',
            primaryColor: '#00ff88',
            secondaryColor: '#ff00ff',
            accentColor: '#00ffff'
        },
        minimal: {
            backgroundColor: '#ffffff',
            primaryColor: '#000000',
            secondaryColor: '#666666',
            accentColor: '#333333'
        }
    };
    
    const theme = themes[selectedTheme];
    if (theme) {
        // Apply to CSS variables
        document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
        document.documentElement.style.setProperty('--accent-color', theme.accentColor);
        document.body.style.backgroundColor = theme.backgroundColor;
        
        // Update color pickers
        document.getElementById('primaryColor').value = theme.primaryColor;
        document.getElementById('secondaryColor').value = theme.secondaryColor;
        document.getElementById('accentColor').value = theme.accentColor;
        document.getElementById('bgColorPicker').value = theme.backgroundColor;
        document.getElementById('bgColorHex').value = theme.backgroundColor;
        
        // Save to admin settings
        adminData.adminSettings.theme.current = selectedTheme;
        adminData.adminSettings.theme.primaryColor = theme.primaryColor;
        adminData.adminSettings.theme.secondaryColor = theme.secondaryColor;
        adminData.adminSettings.theme.accentColor = theme.accentColor;
        adminData.adminSettings.theme.backgroundColor = theme.backgroundColor;
        adminData.saveAdminSettings();
        
        dataManager.showNotification(`Theme applied: ${selectedTheme}`, 'success');
    }
}

function applyBackgroundColor() {
    const color = document.getElementById('bgColorPicker').value;
    document.getElementById('bgColorHex').value = color;
    document.body.style.backgroundColor = color;
    
    adminData.adminSettings.theme.backgroundColor = color;
    adminData.saveAdminSettings();
    
    dataManager.showNotification('Background color applied', 'success');
}

function applyBackgroundImage() {
    const imageUrl = document.getElementById('bgImageUrl').value;
    
    if (imageUrl) {
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        
        adminData.adminSettings.theme.backgroundImage = imageUrl;
        adminData.saveAdminSettings();
        
        dataManager.showNotification('Background image applied', 'success');
    }
}

function applyPresetBackground(preset) {
    const presets = {
        gradient1: 'https://picsum.photos/seed/cyber-gradient/1920/1080',
        gradient2: 'https://picsum.photos/seed/neon-nights/1920/1080',
        gradient3: 'https://picsum.photos/seed/dark-matter/1920/1080',
        gradient4: 'https://picsum.photos/seed/aurora/1920/1080'
    };
    
    const imageUrl = presets[preset];
    if (imageUrl) {
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        
        adminData.adminSettings.theme.backgroundImage = imageUrl;
        adminData.saveAdminSettings();
        
        dataManager.showNotification('Preset background applied', 'success');
    }
}

function updateColorScheme() {
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    const accentColor = document.getElementById('accentColor').value;
    
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
    
    adminData.adminSettings.theme.primaryColor = primaryColor;
    adminData.adminSettings.theme.secondaryColor = secondaryColor;
    adminData.adminSettings.theme.accentColor = accentColor;
    adminData.saveAdminSettings();
    
    dataManager.showNotification('Color scheme updated', 'success');
}

function saveThemeSettings() {
    adminData.saveAdminSettings();
    dataManager.showNotification('Theme settings saved', 'success');
}

function resetTheme() {
    const defaultTheme = {
        current: 'dark',
        primaryColor: '#6366f1',
        secondaryColor: '#8b5cf6',
        accentColor: '#ec4899',
        backgroundColor: '#0f172a',
        backgroundImage: null
    };
    
    adminData.adminSettings.theme = defaultTheme;
    adminData.saveAdminSettings();
    adminData.applySavedTheme();
    
    dataManager.showNotification('Theme reset to default', 'info');
}

function exportTheme() {
    const themeData = JSON.stringify(adminData.adminSettings.theme, null, 2);
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gamehub-theme.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    dataManager.showNotification('Theme exported', 'success');
}

function importTheme() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    const themeData = JSON.parse(event.target.result);
                    adminData.adminSettings.theme = themeData;
                    adminData.saveAdminSettings();
                    adminData.applySavedTheme();
                    
                    dataManager.showNotification('Theme imported successfully', 'success');
                } catch (error) {
                    dataManager.showNotification('Invalid theme file', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// User Management Functions
function searchUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const users = adminData.getUsers();
    
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    
    // Update users table with filtered results
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = filteredUsers.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="status-badge ${user.role.role}">${user.role.role}</span></td>
            <td>${new Date(user.joinedAt).toLocaleDateString()}</td>
            <td>${user.lastSeen}</td>
            <td><span class="status-badge active">Active</span></td>
            <td>
                <button class="btn btn-sm btn-primary btn-admin-action" onclick="viewUserDetails(${user.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning btn-admin-action" onclick="editUserRole(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-admin-action" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function addNewUser() {
    dataManager.showNotification('Add user feature coming soon!', 'info');
}

function viewUserDetails(userId) {
    const users = adminData.getUsers();
    const user = users.find(u => u.id === userId);
    
    if (user) {
        const userDetails = `
            User Details:
            Name: ${user.name}
            Email: ${user.email}
            Role: ${user.role.role}
            Join Date: ${new Date(user.joinedAt).toLocaleDateString()}
            Last Seen: ${user.lastSeen}
            Total Play Time: ${user.totalPlayTime} hours
        `;
        
        dataManager.showNotification(userDetails, 'info');
    }
}

function editUserRole(userId) {
    const users = adminData.getUsers();
    const user = users.find(u => u.id === userId);
    
    if (user) {
        const roleSelector = document.getElementById('roleSelector');
        const newRole = document.getElementById('newRole').value;
        
        if (roleSelector.value && newRole) {
            adminData.setUserRole(userId, newRole);
            loadUserDashboard(); // Refresh dashboard
            dataManager.showNotification(`Role updated for ${user.name}`, 'success');
        } else {
            dataManager.showNotification('Please select user and new role', 'error');
        }
    }
}

function assignRole() {
    const userId = document.getElementById('roleSelector').value;
    const newRole = document.getElementById('newRole').value;
    
    if (userId && newRole) {
        adminData.setUserRole(parseInt(userId), newRole);
        loadUserDashboard(); // Refresh dashboard
        dataManager.showNotification('Role assigned successfully', 'success');
    } else {
        dataManager.showNotification('Please select user and new role', 'error');
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        const users = JSON.parse(localStorage.getItem('gamehub_users') || '[]');
        const updatedUsers = users.filter(user => user.id !== userId);
        localStorage.setItem('gamehub_users', JSON.stringify(updatedUsers));
        
        loadUserDashboard(); // Refresh dashboard
        dataManager.showNotification('User deleted successfully', 'success');
    }
}

// Analytics Functions
function refreshActivityLogs() {
    loadActivityLogs();
    dataManager.showNotification('Activity logs refreshed', 'info');
}

// Settings Functions
function savePlatformSettings() {
    const platformName = document.getElementById('platformName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const maintenanceMode = document.getElementById('maintenanceMode').checked;
    const allowRegistration = document.getElementById('allowRegistration').checked;
    
    adminData.adminSettings.platform = {
        name: platformName,
        contactEmail: contactEmail,
        maintenanceMode: maintenanceMode,
        allowRegistration: allowRegistration
    };
    
    adminData.saveAdminSettings();
    dataManager.showNotification('Platform settings saved', 'success');
}

function logoutAdmin() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('adminModal'));
    if (modal) modal.hide();
    
    dataManager.showNotification('Logged out of admin panel', 'info');
}

// Update existing functions to log activity
const originalLogin = dataManager.login;
dataManager.login = function(userData) {
    const result = originalLogin.call(this, userData);
    if (result) {
        adminData.logActivity('login', `User logged in: ${result.email}`, result.id);
        
        // Show admin link if user has admin role
        const userRole = adminData.getUserRole(result.id);
        if (userRole.role === 'admin') {
            document.getElementById('adminLink').style.display = 'block';
        }
    }
    return result;
};

const originalDownloadGame = window.downloadGame;
window.downloadGame = function(game) {
    const result = originalDownloadGame.call(this, game);
    adminData.logActivity('download', `Game downloaded: ${game.name}`, dataManager.user?.id);
    return result;
};

const originalCheckout = window.checkout;
window.checkout = function() {
    const result = originalCheckout.call(this);
    if (dataManager.cart.length > 0) {
        adminData.logActivity('purchase', `Purchase completed: ${dataManager.cart.length} items`, dataManager.user?.id);
    }
    return result;
};
