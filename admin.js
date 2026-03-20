// ========================================
// ADMIN DASHBOARD FUNCTIONALITY
// ========================================

let editingGameId = null;
let adminEmail = '';

// Initialize admin panel
document.addEventListener('DOMContentLoaded', async function () {
    // Verify 2FA token before allowing access
    const adminToken = localStorage.getItem('adminToken');
    
    if (!adminToken) {
        window.location.href = '/admin-login.html';
        return;
    }

    try {
        const response = await fetch('/api/admin/verify-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: adminToken })
        });

        if (!response.ok) {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin-login.html';
            return;
        }

        const data = await response.json();
        adminEmail = data.email;

        // Update navbar email display
        const adminEmailDisplay = document.getElementById('adminEmailDisplay');
        if (adminEmailDisplay) {
            adminEmailDisplay.textContent = adminEmail;
        }

    } catch (error) {
        console.error('Token verification error:', error);
        localStorage.removeItem('adminToken');
        window.location.href = '/admin-login.html';
        return;
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
        addGameForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleAddGame();
        });
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

    // Remove active class from all nav links
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Highlight selected nav link
    document.querySelector(`[data-tab="${tabName}"]`).closest('.admin-nav-link')?.classList.add('active');
    const navLink = document.querySelector(`.admin-nav-link[data-tab="${tabName}"]`);
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
    const newGame = addGame(gameData);

    // Clear form
    document.getElementById('addGameForm').reset();
    setTodayDate();

    // Show success message
    showAdminNotification(`✓ "${newGame.name}" added successfully!`, 'success');
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

    tableBody.innerHTML = games.map(game => `
        <tr>
            <td>
                <div class="game-table-title">
                    <img src="${game.image}" alt="${game.name}" class="game-table-thumb">
                    <span>${game.name}</span>
                </div>
            </td>
            <td>
                <span class="badge" style="background-color: ${getGenreColor(game.genre)}">
                    ${GENRE_LABELS[game.genre] || game.genre}
                </span>
            </td>
            <td>$${game.price.toFixed(2)}</td>
            <td>
                <div class="rating-stars">
                    ${'★'.repeat(Math.floor(game.rating))}${'☆'.repeat(5 - Math.floor(game.rating))}
                    <span class="text-muted ms-1">${game.rating}</span>
                </div>
            </td>
            <td>
                <button class="btn btn-sm btn-info" onclick="editGame(${game.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteGameConfirm(${game.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
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
    const updated = updateGame(editingGameId, gameData);

    if (updated) {
        showAdminNotification(`✓ "${updated.name}" updated successfully!`, 'success');
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

    if (confirm(`Are you sure you want to delete "${game.name}"? This action cannot be undone.`)) {
        deleteGameFromAdmin(gameId, game.name);
    }
}

function deleteGameFromAdmin(gameId, gameName) {
    deleteGame(gameId);
    showAdminNotification(`✓ "${gameName}" deleted successfully!`, 'success');
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
    const genreCounts = {};

    games.forEach(game => {
        genreCounts[game.genre] = (genreCounts[game.genre] || 0) + 1;
    });

    // Stats cards
    statsContainer.innerHTML = `
        <div class="col-md-3 mb-4">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-gamepad"></i>
                </div>
                <div class="stat-content">
                    <h6 class="stat-label">Total Games</h6>
                    <h3 class="stat-value">${totalGames}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-3 mb-4">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="stat-content">
                    <h6 class="stat-label">Avg. Price</h6>
                    <h3 class="stat-value">$${avgPrice}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-3 mb-4">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-star"></i>
                </div>
                <div class="stat-content">
                    <h6 class="stat-label">Avg. Rating</h6>
                    <h3 class="stat-value">${avgRating}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-3 mb-4">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-tags"></i>
                </div>
                <div class="stat-content">
                    <h6 class="stat-label">Total Genres</h6>
                    <h3 class="stat-value">${Object.keys(genreCounts).length}</h3>
                </div>
            </div>
        </div>
    `;

    // Genre breakdown
    const genreBreakdown = document.createElement('div');
    genreBreakdown.className = 'mt-4';
    genreBreakdown.innerHTML = `
        <h5 class="mb-3">Games by Genre</h5>
        <div class="row">
            ${Object.entries(genreCounts).map(([genre, count]) => `
                <div class="col-md-6 mb-3">
                    <div class="genre-stat">
                        <div class="genre-stat-header">
                            <label>${GENRE_LABELS[genre] || genre}</label>
                            <span class="badge bg-primary">${count}</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar" style="width: ${(count / totalGames) * 100}%"></div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    statsContainer.appendChild(genreBreakdown);
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
    link.download = `games-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showAdminNotification('✓ Games exported successfully!', 'success');
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
                game.id && game.name && game.genre && game.price && game.description
            );

            if (!isValid) {
                throw new Error('Invalid game data structure');
            }

            // Confirm import
            if (confirm(`Import ${importedGames.length} games? This will replace your current catalog.`)) {
                games = importedGames;
                saveGamesToStorage();
                loadGamesIntoTable();
                displayGameStatistics();
                showAdminNotification(`✓ Successfully imported ${importedGames.length} games!`, 'success');
            }
        } catch (error) {
            showAdminNotification(`Error importing games: ${error.message}`, 'danger');
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
            showAdminNotification('✓ Games reset to defaults!', 'success');
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

function showAdminNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    const typeClass = {
        'success': 'alert-success',
        'danger': 'alert-danger',
        'warning': 'alert-warning',
        'info': 'alert-info'
    }[type] || 'alert-info';

    alertDiv.className = `alert ${typeClass} alert-dismissible fade show`;
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
    }, 4000);
}

// Make sure games are loaded on page load
initializeGames();
loadCartFromStorage();

// ========================================
// LOGOUT FUNCTIONALITY
// ========================================
async function handleAdminLogout() {
    if (!confirm('Are you sure you want to logout?')) {
        return;
    }

    const adminToken = localStorage.getItem('adminToken');

    try {
        // Notify server
        if (adminToken) {
            await fetch('/api/admin/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: adminToken })
            });
        }
    } catch (error) {
        console.error('Logout error:', error);
    }

    // Clear token and redirect
    localStorage.removeItem('adminToken');
    window.location.href = '/admin-login.html';
}
