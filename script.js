let allLinks = [];
let allCategories = [];
let currentFilter = 'all';
let currentSearch = '';

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        allLinks = data.links;
        allCategories = data.categories;
        initializeUI();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Initialize UI components
function initializeUI() {
    renderCategories();
    renderLinks(allLinks);
    setupEventListeners();
}

// Render category filter buttons
function renderCategories() {
    const categoryButtonsContainer = document.getElementById('categoryButtons');
    categoryButtonsContainer.innerHTML = '';

    allCategories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = category;
        button.dataset.filter = category;
        button.addEventListener('click', () => filterByCategory(category, button));
        categoryButtonsContainer.appendChild(button);
    });
}

// Render link cards
function renderLinks(links) {
    const container = document.getElementById('linksContainer');
    const noResults = document.getElementById('noResults');

    if (links.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    container.innerHTML = links.map(link => `
        <div class="link-card">
            <div class="link-card-header">
                <h3>${escapeHtml(link.title)}</h3>
                <span class="category-badge">${escapeHtml(link.category)}</span>
            </div>
            <p>${escapeHtml(link.description)}</p>
            <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(link.url)}">
                ${escapeHtml(link.url)}
            </a>
            <br>
            <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="card-link-btn">
                Visit →
            </a>
        </div>
    `).join('');
}

// Filter by category
function filterByCategory(category, buttonElement) {
    currentFilter = category;
    currentSearch = '';
    document.getElementById('searchInput').value = '';

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    buttonElement.classList.add('active');

    const filtered = allLinks.filter(link => link.category === category);
    renderLinks(filtered);
}

// Search functionality
function handleSearch(query) {
    currentSearch = query.toLowerCase();
    currentFilter = 'all';
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-filter="all"]').classList.add('active');

    const filtered = allLinks.filter(link => {
        const titleMatch = link.title.toLowerCase().includes(currentSearch);
        const descriptionMatch = link.description.toLowerCase().includes(currentSearch);
        const categoryMatch = link.category.toLowerCase().includes(currentSearch);
        return titleMatch || descriptionMatch || categoryMatch;
    });

    renderLinks(filtered);
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    // "All" button functionality
    document.querySelector('[data-filter="all"]').addEventListener('click', (e) => {
        currentFilter = 'all';
        currentSearch = '';
        document.getElementById('searchInput').value = '';
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        renderLinks(allLinks);
    });
}

// Utility function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Load data on page load
document.addEventListener('DOMContentLoaded', loadData);