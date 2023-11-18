const dayEl = document.querySelector(".day");
const timeEl = document.querySelector(".time");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let radius = canvas.height / 2;

ctx.translate(radius, radius);
radius *= 0.95;

function setTime(hours, minutes, day, month, year){
    timeEl.textContent = `${hours}:${minutes.toString().padStart(2,'0')}`;
    dayEl.textContent = `${day}, ${month} ${year}`;
}

function drawClock() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    drawFace();
    drawTime();
    
}

function drawFace() {
    setupShadow();
    drawCircle('#1e0039', radius * 0.9, 'white', radius * 0.01);
    drawCircle('white', radius * 0.011, 'white', 0);
    resetShadow();
}

function drawTime() {
    const { hours, minutes, seconds } = getCurrentTime();
    drawHand(hours, radius * 0.4, radius * 0.04, "white");
    drawHand(minutes, radius * 0.6, radius * 0.025, "purple");
    drawHand(seconds, radius * 0.8, radius * 0.01, "white");
}

function getCurrentTime() {
    const now = new Date();
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
    const month = now.toLocaleDateString('en-US', { month: 'short' });
    setTime(now.getHours(), now.getMinutes(), dayOfWeek, month, now.getDate());
    const hours = (now.getHours() % 12) * Math.PI / 6 + (now.getMinutes() * Math.PI / (6 * 60)) + (now.getSeconds() * Math.PI / (360 * 60));
    const minutes = now.getMinutes() * Math.PI / 30 + now.getSeconds() * Math.PI / (30 * 60);
    const seconds = now.getSeconds() * Math.PI / 30;
    return { hours, minutes, seconds };
}

function drawCircle(fillColor, radius, lineWidth) {
    const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, 'white');
    grad.addColorStop(0.06, 'white');
    grad.addColorStop(0.05, '#201127');
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = grad;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function drawHand(pos, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.rotate(-pos);
}

function setupShadow() {
    ctx.shadowColor = "white";
    ctx.shadowBlur = 25;
}

function resetShadow() {
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
}

setInterval(drawClock, 1000);
