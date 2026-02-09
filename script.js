const ui = document.getElementById('ui');
const text = "i love you merviş";

function createHeart() {
    // Heart formula:
    // x = 16 * sin(t)^3
    // y = 13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t)

    // Create a dense cloud of text
    const totalPoints = 30; // Points per layer
    const layers = 15; // Number of layers for depth
    const scale = 14; // Scale the heart up

    let index = 0;

    for (let layer = 0; layer < layers; layer++) {
        // Calculate z-depth for this layer
        // Spread layers from -140 to 140 on Z axis (20px separation)
        const z = (layer - layers / 2) * 20;

        for (let i = 0; i < totalPoints; i++) {
            const t = (i / totalPoints) * Math.PI * 2;

            // Parametric equations for heart
            let x = 16 * Math.pow(Math.sin(t), 3);
            let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

            // Apply scale
            x *= scale;
            y *= scale;

            // Create nested structure:
            // .heart-point (positions in 3D) -> .love_horizontal (animates wave) -> .love_word (styles & rotates)

            const point = document.createElement('div');
            point.classList.add('heart-point');
            point.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;

            const horizontal = document.createElement('div');
            horizontal.classList.add('love_horizontal');
            // Using random or sequential index for wave offset
            horizontal.style.setProperty('--i', Math.random() * 5);

            const word = document.createElement('div');
            word.classList.add('love_word');
            word.innerText = text;

            horizontal.appendChild(word);
            point.appendChild(horizontal);
            ui.appendChild(point);

            index++;
        }
    }
}

createHeart();
