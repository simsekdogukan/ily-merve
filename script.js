const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const heartColors = ['#ff4d6d', '#ff758f', '#c9184a', '#ff8fa3', '#fff0f3'];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

// Heart formula: (16sin^3t, 13cos t - 5cos 2t - 2cos 3t - cos 4t)
function getHeartPosition(t) {
    return {
        x: 16 * Math.pow(Math.sin(t), 3),
        y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    };
}

class Particle {
    constructor() {
        this.reset();
        // Start with random position for initial explosion effect or center
        this.x = width / 2;
        this.y = height / 2;
    }

    reset() {
        this.t = Math.random() * Math.PI * 2;
        const pos = getHeartPosition(this.t);
        // Scale the heart up
        const scale = Math.min(width, height) / 35; // Responsive scale
        this.targetX = width / 2 + pos.x * scale;
        this.targetY = height / 2 + pos.y * scale;

        // Randomize target slightly to give volume to the heart outline
        this.targetX += (Math.random() - 0.5) * 20;
        this.targetY += (Math.random() - 0.5) * 20;

        this.speed = Math.random() * 0.05 + 0.02;
        this.size = Math.random() * 3 + 1;
        this.color = heartColors[Math.floor(Math.random() * heartColors.length)];

        // Current position (starts at center or random)
        this.x = width / 2;
        this.y = height / 2;

        // Velocity
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;

        this.friction = 0.95;
    }

    update() {
        // Move towards target
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;

        this.x += dx * this.speed;
        this.y += dy * this.speed;

        // Add some jitter/noise
        this.x += (Math.random() - 0.5) * 2;
        this.y += (Math.random() - 0.5) * 2;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
function initParticles() {
    particles = [];
    const particleCount = Math.min(width, 1000); // Responsive count
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

initParticles();

// Floating particles background
const floatingParticles = [];
class FloatingParticle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = 'rgba(255, 77, 109, 0.3)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 100; i++) {
    floatingParticles.push(new FloatingParticle());
}


function animate() {
    // Fade out trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Update and draw heart particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Update and draw floating background particles
    floatingParticles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();

// Handle click/touch to re-explode/reset
window.addEventListener('click', () => {
    particles.forEach(p => {
        p.reset();
        p.x = width / 2;
        p.y = height / 2;
        p.vx = (Math.random() - 0.5) * 20;
        p.vy = (Math.random() - 0.5) * 20;
    });
});
