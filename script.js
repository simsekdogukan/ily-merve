// Create N floating “I love you” items
const N = 100;
const ui = document.getElementById('ui');
const text = "I Love You Merviş";

// --- Generate Elements ---
for (let i = 1; i <= N; i++) {
    const love = document.createElement('div');
    love.className = 'love';
    love.style.setProperty('--i', i);

    const h = document.createElement('div');
    h.className = 'love_horizontal';

    const v = document.createElement('div');
    v.className = 'love_vertical';

    const word = document.createElement('div');
    word.className = 'love_word';
    word.textContent = text;

    v.appendChild(word);
    h.appendChild(v);
    love.appendChild(h);
    ui.appendChild(love);
}

// --- Responsive Scaling Logic ---
function resize() {
    // The animation is designed around a ~600x600px area (visually)
    // We want to fit this area into the current window
    const baseSize = 600;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Determine scale factor - fit within the smallest dimension w/ some padding
    const scale = Math.min(windowWidth / baseSize, windowHeight / baseSize) * 0.9;

    // Apply scale to the container
    ui.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', resize);
resize(); // Initial call
