let jokeCount = 0;
let currentJoke = '';
let currentJokeType = '';

// API endpoints
const API_ENDPOINTS = {
    random: 'https://official-joke-api.appspot.com/random_joke',
    general: 'https://official-joke-api.appspot.com/jokes/general/random',
    programming: 'https://official-joke-api.appspot.com/jokes/programming/random',
    'knock-knock': 'https://official-joke-api.appspot.com/jokes/knock-knock/random'
};

// DOM Elements
const getJokeBtn = document.getElementById('getJokeBtn');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const jokeContainer = document.getElementById('jokeContainer');
const jokeTypeEl = document.getElementById('jokeType');
const jokeCategory = document.getElementById('jokeCategory');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const jokeCountEl = document.getElementById('jokeCount');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    getJokeBtn.addEventListener('click', fetchJoke);
    copyBtn.addEventListener('click', copyJoke);
    shareBtn.addEventListener('click', shareJoke);
    loadJokeCount();
});

// Fetch joke from API
async function fetchJoke() {
    const category = jokeCategory.value;
    const endpoint = API_ENDPOINTS[category];

    // Show loading state
    showLoading(true);
    hideMessages();
    getJokeBtn.disabled = true;

    try {
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Format joke based on type
        if (data.type === 'knock-knock') {
            currentJoke = `${data.setup}\n\n${data.delivery}`;
            currentJokeType = 'Knock Knock';
        } else {
            currentJoke = `${data.setup}\n\n${data.punchline}`;
            currentJokeType = data.type.charAt(0).toUpperCase() + data.type.slice(1);
        }

        // Display joke
        displayJoke();
        jokeCount++;
        saveJokeCount();
        updateJokeCounter();

        showSuccess('Joke loaded! 😄');
    } catch (error) {
        console.error('Error fetching joke:', error);
        showError('Failed to load joke. Please try again!');
    } finally {
        showLoading(false);
        getJokeBtn.disabled = false;
    }
}

// Display joke on screen
function displayJoke() {
    jokeContainer.innerHTML = `<p>${escapeHtml(currentJoke)}</p>`;
    jokeTypeEl.innerHTML = `<span>${escapeHtml(currentJokeType)}</span>`;
}

// Copy joke to clipboard
function copyJoke() {
    if (!currentJoke) {
        showError('No joke to copy! Get one first.');
        return;
    }

    navigator.clipboard.writeText(currentJoke).then(() => {
        showSuccess('Joke copied to clipboard! 📋');
    }).catch(() => {
        showError('Failed to copy. Try again!');
    });
}

// Share joke
function shareJoke() {
    if (!currentJoke) {
        showError('No joke to share! Get one first.');
        return;
    }

    const text = `Check out this joke: ${currentJoke}`;
    
    // Use Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: '😂 Funny Joke',
            text: text
        }).catch(err => console.log('Share failed:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            showSuccess('Joke copied! Share it yourself. 📤');
        }).catch(() => {
            showError('Share failed. Please try again!');
        });
    }
}

// Show/hide loading indicator
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 4000);
}

// Show success message
function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// Hide all messages
function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

// Save joke count to localStorage
function saveJokeCount() {
    localStorage.setItem('jokeCount', jokeCount);
}

// Load joke count from localStorage
function loadJokeCount() {
    const saved = localStorage.getItem('jokeCount');
    if (saved) {
        jokeCount = parseInt(saved);
        updateJokeCounter();
    }
}

// Update joke counter display
function updateJokeCounter() {
    jokeCountEl.textContent = jokeCount;
}

// Escape HTML to prevent XSS
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

// Optional: Auto-load a random joke on page load
// Uncomment the line below to enable this feature
// window.addEventListener('load', () => fetchJoke());