const surpriseBtn = document.getElementById("surprise-btn");
const animatedText = document.getElementById("animated-text");
const balloonsContainer = document.getElementById("balloons-container");
const gallery = document.getElementById("gallery");
const videoSection = document.getElementById("video-section");
const bgMusic = document.getElementById("bg-music");
const confettiCanvas = document.getElementById("confetti");

surpriseBtn.addEventListener("click", () => {
    animatedText.style.opacity = 1;
    animatedText.style.transform = "scale(1)";

    bgMusic.play();

    gallery.classList.remove("hidden");
    videoSection.classList.remove("hidden");

    createBalloons(5);
    surpriseBtn.style.display = "none";

    startConfetti();
});

function createBalloons(count) {
    const colors = ["#ffb6c1", "#ffd1dc", "#ff69b4", "#ff8da1", "#ffc0cb"];

    for (let i = 0; i < count; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.left = Math.random() * window.innerWidth + "px";
        balloon.style.bottom = "-100px";
        balloon.style.animation = `float ${20 + Math.random() * 10}s linear infinite`;

        balloon.onclick = () => balloon.remove();
        balloonsContainer.appendChild(balloon);
    }
}

function startConfetti() {
    const ctx = confettiCanvas.getContext("2d");
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const pieces = Array.from({ length: 100 }, () => ({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 100,
        color: ["#ff0a54", "#ff477e", "#ff85a1"][Math.floor(Math.random() * 3)]
    }));

    setInterval(() => {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        pieces.forEach(p => {
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.lineWidth = p.r;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.r, p.y + p.r);
            ctx.stroke();
            p.y += 2;
            if (p.y > confettiCanvas.height) p.y = -10;
        });
    }, 20);
}