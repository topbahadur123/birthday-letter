// 1. Setup Canvas for Smooth Floating Background Hearts
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const heartsArray = [];
class FloatingHeart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 16 + 12;
        this.speed = Math.random() * 1.2 + 0.6;
        this.opacity = Math.random() * 0.4 + 0.2;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 74, 117, ${this.opacity})`;
        ctx.font = `${this.size}px Arial`;
        ctx.fillText('❤️', this.x, this.y);
    }
    update() {
        this.y -= this.speed;
        if (this.y < -30) {
            this.y = canvas.height + 30;
            this.x = Math.random() * canvas.width;
        }
    }
}

function initBackground() {
    for (let i = 0; i < 25; i++) {
        heartsArray.push(new FloatingHeart());
    }
}

function animateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    heartsArray.forEach(heart => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animateBackground);
}

initBackground();
animateBackground();

// 2. Open Letter Box & Play Music Instantly
function openLetter(event) {
    const envelope = document.getElementById('envelopeView');
    const messageContent = document.getElementById('messageContent');
    
    // Open the envelope
    if (envelope.style.display !== 'none') {
        envelope.style.display = 'none';
        messageContent.style.display = 'block';
        
        // Triggers music and heart bursts when clicking the envelope too!
        playMusicAndEffects(event);
    }
}

// 3. Play Music & Spawn Exploding Hearts on Interaction
function playMusicAndEffects(event) {
    // Play Audio track smoothly
    const music = document.getElementById('bgMusic');
    music.play().catch(err => console.log("Audio allowed only after physical user interaction."));

    // Create 12 explosion hearts scattering dynamically around the screen
    for (let i = 0; i < 12; i++) {
        const heartParticle = document.createElement('div');
        heartParticle.classList.add('click-heart');
        
        // Alternate between different cute emojis
        const heartIcons = ['💖', '❤️', '💝', '🎂'];
        heartParticle.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        
        // Direct random outward scatter coordinates
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 120 + 60;
        const xDir = Math.cos(angle) * radius + 'px';
        const yDir = Math.sin(angle) * radius + 'px';
        
        heartParticle.style.setProperty('--x', xDir);
        heartParticle.style.setProperty('--y', yDir);
        
        // Exact location where user clicks/taps
        heartParticle.style.left = event.clientX + 'px';
        heartParticle.style.top = event.clientY + 'px';
        
        document.body.appendChild(heartParticle);
        
        // Self destruct particle to avoid browser lag
        setTimeout(() => {
            heartParticle.remove();
        }, 1200);
    }
}