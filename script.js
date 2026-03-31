// =============================================
   MODERN GAMING PLATFORM - GAMEHUB 2.0
   =============================================

// Enhanced Games Database with More Details
const games = [
    {
        id: 1,
        name: "Cyber Strike 2077",
        category: "action",
        price: 59.99,
        rating: 4.8,
        developer: "Neon Studios",
        description: "Experience the ultimate cyberpunk action game with stunning visuals and intense gameplay.",
        image: "https://picsum.photos/seed/cyber1/400/250",
        screenshots: [
            "https://picsum.photos/seed/cyber1/800/450",
            "https://picsum.photos/seed/cyber2/800/450",
            "https://picsum.photos/seed/cyber3/800/450"
        ],
        requirements: {
            minimum: {
                os: "Windows 10 64-bit",
                processor: "Intel Core i5-8400",
                memory: "8 GB RAM",
                graphics: "NVIDIA GeForce GTX 1060",
                storage: "50 GB available space"
            },
            recommended: {
                os: "Windows 11 64-bit",
                processor: "Intel Core i7-9700K",
                memory: "16 GB RAM",
                graphics: "NVIDIA GeForce RTX 3070",
                storage: "100 GB available space"
            }
        },
        releaseDate: "2024-03-15"
    },
    {
        id: 2,
        name: "Dragon Quest XI",
        category: "rpg",
        price: 49.99,
        rating: 4.9,
        developer: "Square Enix",
        description: "Embark on an epic RPG adventure with turn-based combat and a rich storyline.",
        image: "https://picsum.photos/seed/dragon1/400/250",
        screenshots: [
            "https://picsum.photos/seed/dragon1/800/450",
            "https://picsum.photos/seed/dragon2/800/450",
            "https://picsum.photos/seed/dragon3/800/450"
        ],
        requirements: {
            minimum: {
                os: "Windows 10 64-bit",
                processor: "Intel Core i5-4460",
                memory: "8 GB RAM",
                graphics: "NVIDIA GeForce GTX 960",
                storage: "45 GB available space"
            },
            recommended: {
                os: "Windows 11 64-bit",
                processor: "Intel Core i7-6700K",
                memory: "16 GB RAM",
                graphics: "NVIDIA GeForce RTX 2060",
                storage: "80 GB available space"
            }
        },
        releaseDate: "2024-01-20"
    },
    {
        id: 3,
        name: "Speed Rush Legends",
        category: "racing",
        price: 39.99,
        rating: 4.5,
        developer: "Velocity Games",
        description: "Race against the best drivers in this high-octane racing game with realistic physics.",
        image: "https://picsum.photos/seed/racing1/400/250",
        screenshots: [
            "https://picsum.photos/seed/racing1/800/450",
            "https://picsum.photos/seed/racing2/800/450",
            "https://picsum.photos/seed/racing3/800/450"
        ],
        requirements: {
            minimum: {
                os: "Windows 10 64-bit",
                processor: "Intel Core i3-3250",
                memory: "6 GB RAM",
                graphics: "NVIDIA GeForce GTX 750 Ti",
                storage: "30 GB available space"
            },
            recommended: {
                os: "Windows 11 64-bit",
                processor: "Intel Core i5-8600K",
                memory: "12 GB RAM",
                graphics: "NVIDIA GeForce GTX 1660",
                storage: "50 GB available space"
            }
        },
        releaseDate: "2024-02-10"
    },
    {
        id: 4,
        name: "Puzzle Master Pro",
        category: "puzzle",
        price: 19.99,
        rating: 4.6,
        developer: "Mind Games Inc",
        description: "Challenge your mind with over 1000 unique puzzles in this brain-teasing adventure.",
        image: "https://picsum.photos/seed/puzzle1/400/250",
        screenshots: [
            "https://picsum.photos/seed/puzzle1/800/450",
            "https://picsum.photos/seed/puzzle2/800/450",
            "https://picsum.photos/seed/puzzle3/800/450"
        ],
        requirements: {
            minimum: {
                os: "Windows 10 64-bit",
                processor: "Intel Core i3-2100",
                memory: "4 GB RAM",
                graphics: "Intel HD Graphics 620",
                storage: "10 GB available space"
            },
            recommended: {
                os: "Windows 11 64-bit",
                processor: "Intel Core i5-8400",
                memory: "8 GB RAM",
                graphics: "NVIDIA GeForce GTX 1050",
                storage: "20 GB available space"
            }
        },
        releaseDate: "2024-01-05"
    },
    {
        id: 5,
        name: "Strategy Empire",
        category: "strategy",
        price: 44.99,
        rating: 4.7,
        developer: "Tactical Studios",
        description: "Build your empire and conquer the world in this deep strategy game.",
        image: "https://picsum.photos/seed/strategy1/400/250",
        screenshots: [
            "https://picsum.photos/seed/strategy1/800/450",
            "https://picsum.photos/seed/strategy2/800/450",
            "https://picsum.photos/seed/strategy3/800/450"
        ],
        requirements: {
            minimum: {
                os: "Windows 10 64-bit",
                processor: "Intel Core i5-6500",
                memory: "8 GB RAM",
                graphics: "NVIDIA GeForce GTX 960",
                storage: "40 GB available space"
            },
            recommended: {
                os: "Windows 11 64-bit",
                processor: "Intel Core i7-8700K",
                memory: "16 GB RAM",
                graphics: "NVIDIA GeForce RTX 3060",
                storage: "60 GB available space"
            }
        },
        releaseDate: "2024-02-20"
    },
    {
        id: 6,
        name: "Sports Champions 2024",
        category: "sports",
        price: 59.99,
        rating: 4.4,
        developer: "Athletic Games",
        description: "Compete in multiple sports including football, basketball, and racing.",
        image: "https://picsum.photos/seed/sports1/400/250",
        screenshots: [
            "https://picsum.photos/seed/sports1/800/450",
            "https://picsum.photos/seed/sports2/800/450",
            "https://picsum.photos/seed/sports3/800/450"
        ],
        requirements: {
            minimum: {
                os: "Windows 10 64-bit",
                processor: "Intel Core i5-4590",
                memory: "8 GB RAM",
                graphics: "NVIDIA GeForce GTX 1050",
                storage: "35 GB available space"
            },
            recommended: {
                os: "Windows 11 64-bit",
                processor: "Intel Core i7-9700K",
                memory: "12 GB RAM",
                graphics: "NVIDIA GeForce RTX 2070",
                storage: "50 GB available space"
            }
        },
        releaseDate: "2024-03-01"
    },
    {
        id: 7,
        name: "Adventure Quest",
        category: "adventure",
        price: 34.99,
        rating: 4.8,
        developer: "Quest Studios",
        description: "Explore vast open worlds and uncover ancient mysteries in this adventure game.",
        image: "https://picsum.photos/seed/adventure1/400/250",
        screenshots: [
            "https://picsum.photos/seed/adventure1/800/450",
            "https://picsum.photos/seed/adventure2/800/450",
            "https://picsum.photos/seed/adventure3/800/450"
        ],
        requirements: {
            minimum: {
                os: "Windows 10 64-bit",
                processor: "Intel Core i5-7600K",
                memory: "8 GB RAM",
                graphics: "NVIDIA GeForce GTX 960",
                storage: "25 GB available space"
            },
            recommended: {
                os: "Windows 11 64-bit",
                processor: "Intel Core i7-10700K",
                memory: "16 GB RAM",
                graphics: "NVIDIA GeForce RTX 3060",
                storage: "40 GB available space"
            }
        },
        releaseDate: "2024-01-15"
    },
    {
        id: 8,
        name: "Space Combat Elite",
        category: "action",
        price: 69.99,
        rating: 4.9,
        developer: "Cosmic Games",
        description: "Engage in epic space battles with stunning graphics and intense combat.",
        image: "https://picsum.photos/seed/space1/400/250",
        screenshots: [
            "https://picsum.photos/seed/space1/800/450",
            "https://picsum.photos/seed/space2/800/450",
            "https://picsum.photos/seed/space3/800/450"
        ],
        requirements: {
            minimum: {
                os: "Windows 10 64-bit",
                processor: "Intel Core i5-8400",
                memory: "12 GB RAM",
                graphics: "NVIDIA GeForce GTX 1660",
                storage: "60 GB available space"
            },
            recommended: {
                os: "Windows 11 64-bit",
                processor: "Intel Core i7-10700K",
                memory: "32 GB RAM",
                graphics: "NVIDIA GeForce RTX 3080",
                storage: "100 GB available space"
            }
        },
        releaseDate: "2024-04-01"
    }
];

// Global variables
let currentGameForModal = null;
let currentGameForDetail = null;
let currentCategory = 'all';
let currentSort = 'name';
let gamesPerPage = 12;
let currentPage = 1;

// Initialize the gaming platform
document.addEventListener('DOMContentLoaded', function() {
    initializeGamingPlatform();
});

// Initialize platform functionality
function initializeGamingPlatform() {
    displayAllGames();
    setupEventListeners();
    setupSmoothScrolling();
    setupAnimations();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const heroSearch = document.getElementById('heroSearch');
    const gameSearch = document.getElementById('gameSearch');
    
    if (heroSearch) {
        heroSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterAndDisplayGames(searchTerm);
        });
    }
    
    if (gameSearch) {
        gameSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterAndDisplayGames(searchTerm);
        });
    }
    
    // Category pills
    const categoryPills = document.querySelectorAll('.category-pill');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            setActiveCategory(category);
            filterAndDisplayGames('');
        });
    });
    
    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterAndDisplayGames('');
        });
    }
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreGames);
    }
}

// Set active category
function setActiveCategory(category) {
    currentCategory = category;
    
    // Update UI
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    
    const activePill = document.querySelector(`[data-category="${category}"]`);
    if (activePill) {
        activePill.classList.add('active');
    }
}

// Filter and display games
function filterAndDisplayGames(searchTerm = '') {
    let filteredGames = games;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filteredGames = filteredGames.filter(game => game.category === currentCategory);
    }
    
    // Filter by search
    if (searchTerm) {
        filteredGames = filteredGames.filter(game => 
            game.name.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm) ||
            game.developer.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort games
    filteredGames = sortGames(filteredGames, currentSort);
    
    // Display games
    displayGames(filteredGames);
}

// Sort games
function sortGames(gamesArray, sortBy) {
    const sorted = [...gamesArray];
    
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

// Display games in grid
function displayGames(gamesArray) {
    const gamesList = document.getElementById('gamesList');
    if (!gamesList) return;
    
    if (gamesArray.length === 0) {
        gamesList.innerHTML = `
            <div class="no-games-found">
                <i class="fas fa-search fa-3x"></i>
                <h3>No Games Found</h3>
                <p>Try adjusting your search or category filters.</p>
            </div>
        `;
        return;
    }
    
    const gamesHTML = gamesArray.map(game => `
        <div class="game-card" onclick="showGameDetail(${game.id})">
            <div class="game-card-image-container">
                <img src="${game.image}" alt="${game.name}" class="game-card-image">
                <div class="game-card-overlay">
                    <div class="game-card-category">${game.category.toUpperCase()}</div>
                    <div class="game-card-rating">
                        ${generateStars(game.rating)}
                        <span>${game.rating}</span>
                    </div>
                    <div class="game-card-price">$${game.price}</div>
                </div>
            </div>
            <div class="game-card-body">
                <h3 class="game-card-title">${game.name}</h3>
                <p class="game-card-description">${game.description}</p>
                <div class="game-card-meta">
                    <span class="game-developer">${game.developer}</span>
                    <span class="game-release-date">${game.releaseDate}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    gamesList.innerHTML = gamesHTML;
    
    // Add animations
    setTimeout(() => {
        document.querySelectorAll('.game-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate__animated', 'animate__fadeInUp');
            }, index * 100);
        });
    }, 100);
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar && fullStars < 5) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Show game detail page
function showGameDetail(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    currentGameForDetail = game;
    
    // Hide games section, show detail section
    document.getElementById('games').style.display = 'none';
    document.getElementById('gameDetail').style.display = 'block';
    
    // Populate game details
    document.getElementById('detailTitle').textContent = game.name;
    document.getElementById('detailImage').src = game.image;
    document.getElementById('detailDescription').textContent = game.description;
    document.getElementById('detailCategory').textContent = game.category.toUpperCase();
    document.getElementById('detailRating').innerHTML = generateStars(game.rating) + `<span>${game.rating}</span>`;
    document.getElementById('detailPrice').textContent = `$${game.price}`;
    document.getElementById('detailDeveloper').textContent = game.developer;
    document.getElementById('detailReleaseDate').textContent = game.releaseDate;
    
    // Populate screenshots
    const screenshotsGrid = document.getElementById('screenshotsGrid');
    if (screenshotsGrid && game.screenshots) {
        screenshotsGrid.innerHTML = game.screenshots.map(screenshot => `
            <img src="${screenshot}" alt="Screenshot" class="screenshot-image">
        `).join('');
    }
    
    // Populate system requirements
    const minRequirements = document.getElementById('minRequirements');
    const recRequirements = document.getElementById('recRequirements');
    
    if (minRequirements && game.requirements.minimum) {
        const min = game.requirements.minimum;
        minRequirements.innerHTML = `
            <div><strong>OS:</strong> ${min.os}</div>
            <div><strong>Processor:</strong> ${min.processor}</div>
            <div><strong>Memory:</strong> ${min.memory}</div>
            <div><strong>Graphics:</strong> ${min.graphics}</div>
            <div><strong>Storage:</strong> ${min.storage}</div>
        `;
    }
    
    if (recRequirements && game.requirements.recommended) {
        const rec = game.requirements.recommended;
        recRequirements.innerHTML = `
            <div><strong>OS:</strong> ${rec.os}</div>
            <div><strong>Processor:</strong> ${rec.processor}</div>
            <div><strong>Memory:</strong> ${rec.memory}</div>
            <div><strong>Graphics:</strong> ${rec.graphics}</div>
            <div><strong>Storage:</strong> ${rec.storage}</div>
        `;
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back to games list
function backToGames() {
    document.getElementById('gameDetail').style.display = 'none';
    document.getElementById('games').style.display = 'block';
    currentGameForDetail = null;
}

// Download current game
function downloadCurrentGame() {
    if (!currentGameForDetail) return;
    
    showNotification(`Starting download for ${currentGameForDetail.name}...`, 'info');
    
    // Simulate download
    setTimeout(() => {
        const downloadContent = `Game Download: ${currentGameForDetail.name}\n\nDeveloper: ${currentGameForDetail.developer}\nCategory: ${currentGameForDetail.category}\nPrice: $${currentGameForDetail.price}\nRating: ${currentGameForDetail.rating}/5\n\nThank you for downloading from GameHub!`;
        
        const blob = new Blob([downloadContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentGameForDetail.name}_Download.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification(`Download started for ${currentGameForDetail.name}!`, 'success');
    }, 2000);
}

// Add to cart from detail page
function addToCartFromDetail() {
    if (!currentGameForDetail) return;
    
    // This would integrate with the existing cart system
    showNotification(`${currentGameForDetail.name} added to cart!`, 'success');
}

// Load more games
function loadMoreGames() {
    currentPage++;
    // In a real implementation, this would load more games from an API
    showNotification('Loading more games...', 'info');
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Setup animations
function setupAnimations() {
    // Add hover effects to game cards
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.game-card')) {
            e.target.closest('.game-card').classList.add('hover');
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.game-card')) {
            e.target.closest('.game-card').classList.remove('hover');
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Display all games (initial load)
function displayAllGames() {
    displayGames(games);
}

// Cart functionality (basic implementation)
function openCartModal(event) {
    if (event) event.preventDefault();
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Login/Signup functionality (basic implementation)
function showLoginModal() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

function showSignupModal() {
    const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
    signupModal.show();
}

// Checkout functionality
function checkout() {
    showNotification('Checkout functionality coming soon!', 'info');
}
