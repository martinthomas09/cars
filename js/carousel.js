/**
 * REDLINE Showcase Carousel - Cinematic Flagship Supercar Slider
 * Features smooth transitions, telemetry spec meters, touch swipe,
 * keyboard controls, pause-on-hover, and dynamic red progress indicators.
 */

class RedlineShowcaseCarousel {
  constructor(slidesData) {
    this.slides = slidesData;
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.duration = 6500; // 6.5s per slide
    this.isPaused = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.container = document.getElementById("showcase-slider");
    this.track = document.getElementById("showcase-track");
    this.prevBtn = document.getElementById("showcase-prev");
    this.nextBtn = document.getElementById("showcase-next");
    this.progressBar = document.getElementById("showcase-progress-bar");
    this.counterEl = document.getElementById("showcase-counter");
    this.dotsContainer = document.getElementById("showcase-dots");

    this.init();
  }

  init() {
    if (!this.container || !this.slides.length) return;
    this.renderSlides();
    this.renderDots();
    this.updateCounter();
    this.bindEvents();
    this.goToSlide(0, false);
    this.startAutoplay();
  }

  renderSlides() {
    this.track.innerHTML = this.slides
      .map((slide, index) => {
        return `
        <div class="showcase-slide ${index === 0 ? "active" : ""}" data-index="${index}">
          <div class="showcase-grid">
            <div class="showcase-info">
              <div class="showcase-badge-pill">
                <span class="pulse-dot"></span>
                <span>${slide.badge}</span>
              </div>
              <h2 class="showcase-title">${slide.title}</h2>
              <div class="showcase-headline">${slide.headline}</div>
              <p class="showcase-desc">${slide.description}</p>
              
              <div class="showcase-specs-list">
                ${slide.specs
                  .map(
                    (s) => `
                  <div class="spec-meter-row">
                    <div class="spec-meter-header">
                      <span class="spec-meter-label">${s.label}</span>
                      <span class="spec-meter-value">${s.value} <small>${s.unit}</small></span>
                    </div>
                    <div class="spec-meter-bar-bg">
                      <div class="spec-meter-bar-fill" style="width: ${s.percent}%;"></div>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>

              <div class="showcase-actions">
                <button class="btn btn-red btn-glow view-showcase-btn" data-car-id="${slide.carId}">
                  <span>EXPLORE TELEMETRY</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
                <button class="btn btn-glass quick-rev-btn" data-car-id="${slide.carId}">
                  <i class="fa-solid fa-volume-high"></i>
                  <span>REV ENGINE</span>
                </button>
              </div>
            </div>

            <div class="showcase-visual">
              <div class="showcase-image-backdrop">
                <div class="glow-ring"></div>
                <img src="${slide.image}" alt="${slide.title}" class="showcase-car-img" loading="eager" />
                <div class="speed-streak-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = this.slides
      .map(
        (_, i) => `
      <button class="showcase-dot ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Go to slide ${i + 1}">
        <span class="dot-inner"></span>
      </button>
    `
      )
      .join("");
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        if (window.redlineAudio) redlineAudio.playClickSound(800);
        this.prevSlide();
        this.resetAutoplay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        if (window.redlineAudio) redlineAudio.playClickSound(1100);
        this.nextSlide();
        this.resetAutoplay();
      });
    }

    if (this.dotsContainer) {
      this.dotsContainer.addEventListener("click", (e) => {
        const dot = e.target.closest(".showcase-dot");
        if (dot) {
          const index = parseInt(dot.dataset.index, 10);
          if (window.redlineAudio) redlineAudio.playClickSound(1000);
          this.goToSlide(index);
          this.resetAutoplay();
        }
      });
    }

    // Pause on hover
    this.container.addEventListener("mouseenter", () => {
      this.isPaused = true;
      if (this.progressBar) this.progressBar.style.animationPlayState = "paused";
    });

    this.container.addEventListener("mouseleave", () => {
      this.isPaused = false;
      if (this.progressBar) this.progressBar.style.animationPlayState = "running";
    });

    // Touch swipe support
    this.container.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    this.container.addEventListener(
      "touchend",
      (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      },
      { passive: true }
    );

    // Keyboard navigation when visible
    window.addEventListener("keydown", (e) => {
      if (document.activeElement.tagName === "INPUT") return;
      if (e.key === "ArrowLeft") {
        this.prevSlide();
        this.resetAutoplay();
      } else if (e.key === "ArrowRight") {
        this.nextSlide();
        this.resetAutoplay();
      }
    });

    // Delegated click for car details & rev buttons
    this.container.addEventListener("click", (e) => {
      const exploreBtn = e.target.closest(".view-showcase-btn");
      if (exploreBtn) {
        const carId = exploreBtn.dataset.carId;
        if (window.redlineModal) window.redlineModal.open(carId);
      }

      const revBtn = e.target.closest(".quick-rev-btn");
      if (revBtn) {
        if (window.redlineAudio) {
          revBtn.classList.add("revving");
          window.redlineAudio.triggerRevBurst(() => {
            revBtn.classList.remove("revving");
          });
        }
      }
    });
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.resetAutoplay();
    }
  }

  goToSlide(index, animate = true) {
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;

    this.currentIndex = index;

    // Update slide classes
    const slideEls = this.track.querySelectorAll(".showcase-slide");
    slideEls.forEach((el, i) => {
      el.classList.toggle("active", i === this.currentIndex);
    });

    // Update dots
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll(".showcase-dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === this.currentIndex);
      });
    }

    this.updateCounter();
    this.restartProgressBar();
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  updateCounter() {
    if (!this.counterEl) return;
    const current = String(this.currentIndex + 1).padStart(2, "0");
    const total = String(this.slides.length).padStart(2, "0");
    this.counterEl.innerHTML = `<span class="counter-cur">${current}</span> <span class="counter-sep">/</span> <span class="counter-tot">${total}</span>`;
  }

  restartProgressBar() {
    if (!this.progressBar) return;
    this.progressBar.style.animation = "none";
    // Trigger reflow
    void this.progressBar.offsetWidth;
    this.progressBar.style.animation = `progressBarFill ${this.duration}ms linear forwards`;
  }

  startAutoplay() {
    this.restartProgressBar();
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);

    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, this.duration);
  }

  resetAutoplay() {
    this.startAutoplay();
  }
}
