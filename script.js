const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionContainer = document.getElementById('question-container');
const loveContainer = document.getElementById('love-container');
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');

let yesScale = 1;
let noClicks = 0;

// Powiększanie "Tak" przy klikaniu "Nie"
noBtn.addEventListener('click', () => {
    noClicks++;
    yesScale += 0.25; // możesz zwiększyć, jeśli chcesz szybszy efekt
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.fontSize = `${1.1 * yesScale}rem`;

    // "Nie" ucieka / znika po kilku kliknięciach
    if (noClicks >= 4) {
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
    } else {
        // lekki "uciekający" efekt
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 40;
        noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
});

// Po kliknięciu "Tak"
yesBtn.addEventListener('click', () => {
    questionContainer.classList.add('hidden');
    loveContainer.classList.remove('hidden');
    startConfetti();
    setTimeout(stopConfetti, 4000); // konfetti przez 4 sekundy
});

// --- Proste konfetti (canvas) ---

let confettiPieces = [];
let confettiAnimationId;

function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfetti() {
    const colors = ['#ff1744', '#f50057', '#ff4081', '#ff9100', '#ffd600', '#00e676'];
    for (let i = 0; i < 200; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: 5 + Math.random() * 7,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: 2 + Math.random() * 4,
            speedX: -2 + Math.random() * 4,
            rotation: Math.random() * 360,
            rotationSpeed: -5 + Math.random() * 10
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > confettiCanvas.height + 20) {
            p.y = -20;
            p.x = Math.random() * confettiCanvas.width;
        }
    });
    confettiAnimationId = requestAnimationFrame(drawConfetti);
}

function startConfetti() {
    confettiPieces = [];
    createConfetti();
    drawConfetti();
}

function stopConfetti() {
    cancelAnimationFrame(confettiAnimationId);
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}
