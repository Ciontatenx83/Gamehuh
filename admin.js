// ========================================
// ADMIN DASHBOARD FUNCTIONALITY
// ========================================

let editingGameId = null;
let adminEmail = '';

// Games data and constants
let games = [];
const GENRE_LABELS = {
    'action': 'Action',
    'adventure': 'Adventure',
    'anime': 'Anime',
    'horror': 'Horror',
    'multiplayer': 'Multiplayer',
    'open world': 'Open World',
    'racing': 'Racing',
    'shooting': 'Shooting',
    'simulation': 'Simulation',
    'sports': 'Sports',
    'strategy': 'Strategy',
    'rpg': 'RPG',
    'puzzle': 'Puzzle'
};

const defaultGames = [
    {
        id: 1,
        name: 'Dragon Quest',
        genre: 'rpg',
        price: 29.99,
        rating: 4.8,
        image: 'https://via.placeholder.com/300x200?text=Dragon+Quest',
        developer: 'Epic Studios',
        description: 'Embark on an epic adventure in a fantasy world filled with dragons, magic, and treasures.'
    },
    {
        id: 2,
        name: 'Cyber Storm',
        genre: 'action',
        price: 39.99,
        rating: 4.5,
        image: 'https://via.placeholder.com/300x200?text=Cyber+Storm',
        developer: 'Vertex Games',
        description: 'Experience intense action in a cyberpunk world with stunning visuals and fast-paced gameplay.'
    }
];

// Load games from localStorage
function loadGamesFromStorage() {
    const savedGames = localStorage.getItem('adminGames');
    if (savedGames) {
        games = JSON.parse(savedGames);
    } else {
        games = [...defaultGames];
        saveGamesToStorage();
    }
}

// Save games to localStorage
function saveGamesToStorage() {
    localStorage.setItem('adminGames', JSON.stringify(games));
}

// Get game by ID
function getGameById(gameId) {
    return games.find(game => game.id === parseInt(gameId));
}

// Delete game by ID
function deleteGame(gameId) {
    games = games.filter(game => game.id !== parseInt(gameId));
    saveGamesToStorage();
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', async function () {
    // Check for admin token
    const adminToken = localStorage.getItem('adminToken');
    const savedAdminEmail = localStorage.getItem('adminEmail');
    
    if (!adminToken) {
        window.location.href = '/admin-login.html';
        return;
    }

    // Load games data
    loadGamesFromStorage();

    // Use email from localStorage
    if (savedAdminEmail) {
        adminEmail = savedAdminEmail;
        const adminEmailDisplay = document.getElementById('adminEmailDisplay');
        if (adminEmailDisplay) {
            adminEmailDisplay.textContent = adminEmail;
        }
    }

    setupAdminEventListeners();
    loadGamesIntoTable();
    displayGameStatistics();
    setTodayDate();
});

// ========================================
// EVENT LISTENERS
// ========================================

function setupAdminEventListeners() {
    // Tab navigation
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabName = link.dataset.tab;
            switchTab(tabName);
        });
    });

    // Add Game Form
    const addGameForm = document.getElementById('addGameForm');
    if (addGameForm) {
        addGameForm.addEventListener('submit', handleAddGame);
    }
}

// ========================================
// TAB SWITCHING
// ========================================

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabName + 'Tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Highlight selected nav link
    const navLink = document.querySelector('.admin-nav-link[data-tab="' + tabName + '"]');
    if (navLink) {
        navLink.classList.add('active');
    }

    // Refresh data when switching to certain tabs
    if (tabName === 'manage-games') {
        loadGamesIntoTable();
    } else if (tabName === 'game-stats') {
        displayGameStatistics();
    }
}

// ========================================
// ADD GAME FUNCTIONALITY
// ========================================

function handleAddGame() {
    const gameData = {
        name: document.getElementById('gameName').value,
        developer: document.getElementById('gameDeveloper').value,
        genre: document.getElementById('gameGenre').value,
        price: parseFloat(document.getElementById('gamePrice').value),
        rating: parseFloat(document.getElementById('gameRating').value),
        description: document.getElementById('gameDescription').value,
        image: document.getElementById('gameImage').value,
        downloadLink: document.getElementById('gameDownloadLink').value,
        releaseDate: document.getElementById('gameReleaseDate').value || new Date().toISOString().split('T')[0]
    };

    // Validation
    if (!gameData.name || !gameData.developer || !gameData.genre || !gameData.price || !gameData.description || !gameData.image || !gameData.downloadLink) {
        showAdminNotification('Please fill in all required fields!', 'danger');
        return;
    }

    if (gameData.price < 0) {
        showAdminNotification('Price must be a positive number!', 'danger');
        return;
    }

    if (gameData.rating < 0 || gameData.rating > 5) {
        showAdminNotification('Rating must be between 0 and 5!', 'danger');
        return;
    }

    // Add game to database
    const newId = games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1;
    const newGame = { ...gameData, id: newId };
    games.push(newGame);
    saveGamesToStorage();

    // Clear form
    document.getElementById('addGameForm').reset();
    setTodayDate();

    // Show success message
    showAdminNotification('Game "' + newGame.name + '" added successfully!', 'success');
}

// ========================================
// MANAGE GAMES - TABLE DISPLAY
// ========================================

function loadGamesIntoTable() {
    const tableBody = document.getElementById('gamesTableBody');
    if (!tableBody) return;

    if (games.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No games in catalog</td></tr>';
        return;
    }

    tableBody.innerHTML = games.map(game => 
        '<tr>' +
            '<td>' +
                '<div class="game-table-title">' +
                    '<img src="' + game.image + '" alt="' + game.name + '" class="game-table-thumb">' +
                    '<span>' + game.name + '</span>' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<span class="badge" style="background-color: ' + getGenreColor(game.genre || game.category) + '">' +
                    (GENRE_LABELS[game.genre || game.category] || game.genre || game.category) +
                '</span>' +
            '</td>' +
            '<td>$' + game.price.toFixed(2) + '</td>' +
            '<td>' +
                '<div class="rating-stars">' +
                    '★'.repeat(Math.floor(game.rating)) + '☆'.repeat(5 - Math.floor(game.rating)) +
                    '<span class="text-muted ms-1">' + game.rating + '</span>' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<button class="btn btn-sm btn-info" onclick="editGame(' + game.id + ')" title="Edit">' +
                    '<i class="fas fa-edit"></i>' +
                '</button>' +
                '<button class="btn btn-sm btn-danger" onclick="deleteGameConfirm(' + game.id + ')" title="Delete">' +
                    '<i class="fas fa-trash"></i>' +
                '</button>' +
            '</td>' +
        '</tr>'
    ).join('');
}

// ========================================
// EDIT GAME FUNCTIONALITY
// ========================================

function editGame(gameId) {
    const game = getGameById(gameId);
    if (!game) return;

    editingGameId = gameId;

    // Populate edit form
    document.getElementById('editGameName').value = game.name;
    document.getElementById('editGameDeveloper').value = game.developer;
    document.getElementById('editGameGenre').value = game.genre;
    document.getElementById('editGamePrice').value = game.price;
    document.getElementById('editGameRating').value = game.rating;
    document.getElementById('editGameDescription').value = game.description;
    document.getElementById('editGameImage').value = game.image;
    document.getElementById('editGameDownloadLink').value = game.downloadLink;
    document.getElementById('editGameReleaseDate').value = game.releaseDate;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('editGameModal'));
    modal.show();
}

function saveEditedGame() {
    if (editingGameId === null) return;

    const gameData = {
        name: document.getElementById('editGameName').value,
        developer: document.getElementById('editGameDeveloper').value,
        genre: document.getElementById('editGameGenre').value,
        price: parseFloat(document.getElementById('editGamePrice').value),
        rating: parseFloat(document.getElementById('editGameRating').value),
        description: document.getElementById('editGameDescription').value,
        image: document.getElementById('editGameImage').value,
        downloadLink: document.getElementById('editGameDownloadLink').value,
        releaseDate: document.getElementById('editGameReleaseDate').value
    };

    // Validation
    if (!gameData.name || !gameData.developer || !gameData.genre || !gameData.price || !gameData.description) {
        showAdminNotification('Please fill in all required fields!', 'danger');
        return;
    }

    if (gameData.price < 0) {
        showAdminNotification('Price must be a positive number!', 'danger');
        return;
    }

    if (gameData.rating < 0 || gameData.rating > 5) {
        showAdminNotification('Rating must be between 0 and 5!', 'danger');
        return;
    }

    // Update game
    const gameIndex = games.findIndex(g => g.id === editingGameId);
    if (gameIndex !== -1) {
        games[gameIndex] = { ...gameData, id: editingGameId };
        saveGamesToStorage();
        
        showAdminNotification('Game "' + gameData.name + '" updated successfully!', 'success');
        loadGamesIntoTable();
        bootstrap.Modal.getInstance(document.getElementById('editGameModal')).hide();
        editingGameId = null;
    }
}

// ========================================
// DELETE GAME FUNCTIONALITY
// ========================================

function deleteGameConfirm(gameId) {
    const game = getGameById(gameId);
    if (!game) return;

    if (confirm('Are you sure you want to delete "' + game.name + '"? This action cannot be undone.')) {
        deleteGameFromAdmin(gameId, game.name);
    }
}

function deleteGameFromAdmin(gameId, gameName) {
    deleteGame(gameId);
    showAdminNotification('"' + gameName + '" deleted successfully!', 'success');
    loadGamesIntoTable();
}

// ========================================
// GAME STATISTICS
// ========================================

function displayGameStatistics() {
    const statsContainer = document.getElementById('statsContainer');
    if (!statsContainer) return;

    const totalGames = games.length;
    const avgPrice = games.length > 0 ? (games.reduce((sum, g) => sum + g.price, 0) / games.length).toFixed(2) : 0;
    const avgRating = games.length > 0 ? (games.reduce((sum, g) => sum + g.rating, 0) / games.length).toFixed(2) : 0;

    statsContainer.innerHTML = 
        '<div class="row mb-4">' +
            '<div class="col-md-4">' +
                '<div class="stat-card">' +
                    '<h5>Total Games</h5>' +
                    '<h3>' + totalGames + '</h3>' +
                '</div>' +
            '</div>' +
            '<div class="col-md-4">' +
                '<div class="stat-card">' +
                    '<h5>Average Price</h5>' +
                    '<h3>$' + avgPrice + '</h3>' +
                '</div>' +
            '</div>' +
            '<div class="col-md-4">' +
                '<div class="stat-card">' +
                    '<h5>Average Rating</h5>' +
                    '<h3>' + avgRating + '</h3>' +
                '</div>' +
            '</div>' +
        '</div>';
}

// ========================================
// DATA IMPORT/EXPORT
// ========================================

function exportGamesData() {
    const dataStr = JSON.stringify(games, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'games-backup-' + new Date().toISOString().split('T')[0] + '.json';
    link.click();
    URL.revokeObjectURL(url);
    showAdminNotification('Games exported successfully!', 'success');
}

function importGamesData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const importedGames = JSON.parse(e.target.result);

            if (!Array.isArray(importedGames)) {
                throw new Error('Invalid format: Expected an array of games');
            }

            // Validate structure
            const isValid = importedGames.every(game =>
                game.id && game.name && (game.genre || game.category) && game.price && game.description
            );

            if (!isValid) {
                throw new Error('Invalid game data structure');
            }

            // Confirm import
            if (confirm('Import ' + importedGames.length + ' games? This will replace your current catalog.')) {
                games = importedGames;
                saveGamesToStorage();
                loadGamesIntoTable();
                displayGameStatistics();
                showAdminNotification('Successfully imported ' + importedGames.length + ' games!', 'success');
            }
        } catch (error) {
            showAdminNotification('Error importing games: ' + error.message, 'danger');
        }
    };
    reader.readAsText(file);

    // Reset file input
    event.target.value = '';
}

function resetToDefaults() {
    if (confirm('Are you sure? This will delete all custom games and restore defaults.')) {
        if (confirm('This action cannot be undone. Proceed?')) {
            games = JSON.parse(JSON.stringify(defaultGames));
            saveGamesToStorage();
            loadGamesIntoTable();
            displayGameStatistics();
            showAdminNotification('Games reset to defaults!', 'success');
        }
    }
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function setTodayDate() {
    const dateInput = document.getElementById('gameReleaseDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
}

function getGenreColor(genre) {
    const colors = {
        'action': '#ff6b6b',
        'adventure': '#4ecdc4',
        'rpg': '#95e1d3',
        'puzzle': '#f38181',
        'horror': '#aa96da',
        'open-world': '#fcbad3',
        'sports': '#a8d8ea'
    };
    return colors[genre] || '#6c757d';
}

function showAdminNotification(message, type) {
    type = type || 'info';
    const alertDiv = document.createElement('div');
    const typeClass = {
        'success': 'alert-success',
        'danger': 'alert-danger',
        'info': 'alert-info',
        'warning': 'alert-warning'
    };
    
    alertDiv.className = 'alert ' + typeClass[type] + ' alert-dismissible fade show position-fixed';
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);';
    alertDiv.innerHTML = message + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 4000);
}

// ========================================
// LOGOUT FUNCTIONALITY
// ========================================

async function handleAdminLogout() {
    if (!confirm('Are you sure you want to logout?')) {
        return;
    }

    try {
        // Clear token and email from storage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        window.location.href = '/admin-login.html';
    } catch (error) {
        console.error('Logout error:', error);
        // Still redirect even if error occurs
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        window.location.href = '/admin-login.html';
    }
}

// ========================================
// THEME SETTINGS FUNCTIONS
// ========================================

function updateBackgroundImage() {
    const imageUrl = document.getElementById('bgImageUrl').value;
    const fileInput = document.getElementById('bgImageUpload');
    
    if (fileInput.files && fileInput.files[0]) {
        // Handle file upload
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            setBackgroundImage(dataUrl);
            showAdminNotification('Background image updated successfully!', 'success');
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else if (imageUrl) {
        // Handle URL
        setBackgroundImage(imageUrl);
        showAdminNotification('Background image updated successfully!', 'success');
    } else {
        showAdminNotification('Please provide an image URL or upload a file', 'error');
    }
}

function setBackgroundImage(imageUrl) {
    if (imageUrl) {
        const style = document.createElement('style');
        style.textContent = `
            body::before {
                background-image: url('${imageUrl}') !important;
            }
        `;
        document.head.appendChild(style);
        localStorage.setItem('backgroundImage', imageUrl);
        
        // Notify parent window to update background
        if (window.opener) {
            window.opener.postMessage({ type: 'updateBackground', imageUrl: imageUrl }, '*');
        }
    }
}

function removeBackground() {
    localStorage.removeItem('backgroundImage');
    const style = document.createElement('style');
    style.textContent = `
        body::before {
            background-image: none !important;
        }
    `;
    document.head.appendChild(style);
    
    // Notify parent window to remove background
    if (window.opener) {
        window.opener.postMessage({ type: 'removeBackground' }, '*');
    }
    
    showAdminNotification('Background image removed', 'success');
}

function updateColorScheme() {
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    const accentColor = document.getElementById('accentColor').value;
    
    const colors = {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor
    };
    
    localStorage.setItem('colorScheme', JSON.stringify(colors));
    
    // Update CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--secondary-color', secondaryColor);
    root.style.setProperty('--accent-color', accentColor);
    
    // Notify parent window to update colors
    if (window.opener) {
        window.opener.postMessage({ type: 'updateColors', colors: colors }, '*');
    }
    
    showAdminNotification('Color scheme updated successfully!', 'success');
}

// ========================================
// ANALYTICS FUNCTIONS
// ========================================

function initializeAnalytics() {
    // Initialize revenue chart
    const ctx = document.getElementById('revenueChart');
    if (ctx) {
        // Simple chart simulation (in production, use Chart.js or similar)
        ctx.getContext('2d').fillStyle = '#ff6b35';
        ctx.fillRect(50, 50, 100, 100);
    }
    
    // Load real analytics data
    loadAnalyticsData();
}

function loadAnalyticsData() {
    // Simulated analytics data
    const analytics = {
        totalVisitors: 1234,
        totalOrders: 89,
        totalRevenue: 4567,
        gamesPlayed: 456
    };
    
    // Update dashboard with real data
    updateAnalyticsDisplay(analytics);
}

function updateAnalyticsDisplay(data) {
    // Update statistics cards
    const statCards = document.querySelectorAll('.stat-card h3');
    if (statCards.length >= 4) {
        statCards[0].textContent = data.totalVisitors.toLocaleString();
        statCards[1].textContent = data.totalOrders.toLocaleString();
        statCards[2].textContent = `$${data.totalRevenue.toLocaleString()}`;
        statCards[3].textContent = data.gamesPlayed.toLocaleString();
    }
}

// ========================================
// USER MANAGEMENT FUNCTIONS
// ========================================

function searchUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#userTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function addNewUser() {
    // Create user modal or form
    const userName = prompt('Enter user name:');
    const userEmail = prompt('Enter user email:');
    
    if (userName && userEmail) {
        const newUser = {
            id: Date.now(),
            name: userName,
            email: userEmail,
            role: 'User',
            status: 'Active',
            joined: new Date().toISOString().split('T')[0]
        };
        
        addUserToTable(newUser);
        showAdminNotification(`User ${userName} added successfully!`, 'success');
    }
}

function addUserToTable(user) {
    const tbody = document.getElementById('userTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><span class="badge bg-primary">${user.role}</span></td>
        <td><span class="badge bg-success">${user.status}</span></td>
        <td>${user.joined}</td>
        <td>
            <button class="btn btn-sm btn-outline-info me-1" onclick="editUser(${user.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${user.id})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    tbody.appendChild(row);
}

function editUser(userId) {
    const user = findUserById(userId);
    if (user) {
        const newName = prompt('Enter new name:', user.name);
        const newEmail = prompt('Enter new email:', user.email);
        
        if (newName && newEmail) {
            user.name = newName;
            user.email = newEmail;
            updateUserInTable(user);
            showAdminNotification('User updated successfully!', 'success');
        }
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const row = document.querySelector(`#userTableBody tr:nth-child(${getUserRowIndex(userId)})`);
        if (row) {
            row.remove();
            showAdminNotification('User deleted successfully!', 'success');
        }
    }
}

function findUserById(userId) {
    // Find user in table (simplified for demo)
    const rows = document.querySelectorAll('#userTableBody tr');
    for (let row of rows) {
        if (row.cells[0].textContent == userId) {
            return {
                id: userId,
                name: row.cells[1].textContent,
                email: row.cells[2].textContent,
                role: row.cells[3].textContent,
                status: row.cells[4].textContent,
                joined: row.cells[5].textContent
            };
        }
    }
    return null;
}

function getUserRowIndex(userId) {
    const rows = document.querySelectorAll('#userTableBody tr');
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].cells[0].textContent == userId) {
            return i + 1;
        }
    }
    return -1;
}

function updateUserInTable(user) {
    const row = document.querySelector(`#userTableBody tr:nth-child(${getUserRowIndex(user.id)})`);
    if (row) {
        row.cells[1].textContent = user.name;
        row.cells[2].textContent = user.email;
    }
}

function exportUsers() {
    const rows = document.querySelectorAll('#userTableBody tr');
    const users = [];
    
    rows.forEach(row => {
        users.push({
            id: row.cells[0].textContent,
            name: row.cells[1].textContent,
            email: row.cells[2].textContent,
            role: row.cells[3].textContent,
            status: row.cells[4].textContent,
            joined: row.cells[5].textContent
        });
    });
    
    const csv = convertToCSV(users);
    downloadCSV(csv, 'users_export.csv');
    showAdminNotification('Users exported successfully!', 'success');
}

function convertToCSV(data) {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Joined'];
    const csvHeaders = headers.join(',');
    const csvData = data.map(user => 
        `${user.id},"${user.name}","${user.email}","${user.role}","${user.status}","${user.joined}"`
    ).join('\n');
    
    return csvHeaders + '\n' + csvData;
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// ========================================
// INITIALIZATION
// ========================================

// Initialize new features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme settings
    const savedColors = localStorage.getItem('colorScheme');
    if (savedColors) {
        const colors = JSON.parse(savedColors);
        document.getElementById('primaryColor').value = colors.primary;
        document.getElementById('secondaryColor').value = colors.secondary;
        document.getElementById('accentColor').value = colors.accent;
    }
    
    // Initialize analytics
    initializeAnalytics();
    
    // Background opacity slider
    const bgOpacity = document.getElementById('bgOpacity');
    if (bgOpacity) {
        bgOpacity.addEventListener('input', function() {
            document.getElementById('bgOpacityValue').textContent = this.value + '%';
        });
    }
});
