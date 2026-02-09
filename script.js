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

            const span = document.createElement('div');
            span.classList.add('love_word');
            span.innerText = text;

            // Position in 3D space with rotation
            // We combine the calculated position with the -30deg rotation from the design
            span.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateZ(-30deg)`;

            // Optional: Add a slight animation delay based on position for a wave effect
            // span.style.animationDelay = `${(i * 0.05) + (layer * 0.1)}s`;

            ui.appendChild(span);
        }
    }
}

createHeart();
