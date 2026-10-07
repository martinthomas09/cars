/**
 * REDLINE Particle Engine - Canvas Speed Sparks & Ambient Red Embers
 * High-performance canvas animation simulating racing light streaks,
 * glowing red embers, and subtle mouse velocity reactivity.
 */

class RedlineParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.sparks = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouse = { x: this.width / 2, y: this.height / 2, targetX: this.width / 2, targetY: this.height / 2 };
    this.isRunning = true;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.parentElement ? this.canvas.parentElement.offsetWidth : window.innerWidth;
    this.height = this.canvas.parentElement ? this.canvas.parentElement.offsetHeight : window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.targetX = e.clientX - rect.left;
      this.mouse.targetY = e.clientY - rect.top;
    });

    // Pause when tab is out of focus
    document.addEventListener("visibilitychange", () => {
      this.isRunning = !document.hidden;
      if (this.isRunning) this.animate();
    });
  }

  createParticles() {
    this.particles = [];
    // Number of ambient floating embers based on screen width
    const count = Math.floor((this.width * this.height) / 18000);
    const particleCount = Math.min(Math.max(count, 35), 75);

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.7 - 0.2, // Rising upwards
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.3 ? "235, 10, 30" : "255, 70, 70" // Crimson & Coral
      });
    }

    // High speed laser streaks
    this.sparks = [];
    for (let i = 0; i < 8; i++) {
      this.sparks.push(this.createSpark());
    }
  }

  createSpark() {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      length: Math.random() * 80 + 40,
      speed: Math.random() * 6 + 4,
      angle: -Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~ -45 degrees speed trajectory
      alpha: Math.random() * 0.4 + 0.1,
      width: Math.random() * 1.5 + 0.5
    };
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Smooth mouse follow
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Draw ambient embers
    for (let p of this.particles) {
      p.y += p.speedY;
      p.x += p.speedX;

      // Mouse gentle repulsion
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.x += (dx / dist) * force * 1.2;
        p.y += (dy / dist) * force * 1.2;
      }

      // Recycle to bottom
      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      // Pulse alpha
      p.alpha += Math.sin(Date.now() * p.pulseSpeed * 0.005) * 0.005;
      const currentAlpha = Math.max(0.1, Math.min(0.85, p.alpha));

      // Draw glowing ember
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = `rgba(${p.color}, 0.8)`;
      this.ctx.fill();
    }

    // Draw speed sparks
    for (let s of this.sparks) {
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;

      if (s.x < -100 || s.y > this.height + 100 || s.y < -100) {
        Object.assign(s, this.createSpark());
        s.x = this.width + Math.random() * 100;
        s.y = Math.random() * this.height * 0.6;
      }

      const endX = s.x - Math.cos(s.angle) * s.length;
      const endY = s.y - Math.sin(s.angle) * s.length;

      const grad = this.ctx.createLinearGradient(s.x, s.y, endX, endY);
      grad.addColorStop(0, `rgba(255, 30, 40, ${s.alpha})`);
      grad.addColorStop(0.7, `rgba(255, 80, 80, ${s.alpha * 0.4})`);
      grad.addColorStop(1, "rgba(255, 30, 40, 0)");

      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(endX, endY);
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = s.width;
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = "rgba(255, 20, 30, 0.6)";
      this.ctx.stroke();
    }

    requestAnimationFrame(() => this.animate());
  }
}
