/**
 * REDLINE Fullscreen Lightbox - Cinematic Supercar Gallery Viewer
 * Features smooth scale animations, high-res preloading, EXIF camera badges,
 * swipe gestures, keyboard arrows, and counter telemetry.
 */

class RedlineLightbox {
  constructor(galleryData) {
    this.gallery = galleryData;
    this.currentIndex = 0;
    this.isOpen = false;

    this.overlay = document.getElementById("lightbox-overlay");
    this.imgEl = document.getElementById("lightbox-img");
    this.titleEl = document.getElementById("lightbox-title");
    this.carEl = document.getElementById("lightbox-car");
    this.metaEl = document.getElementById("lightbox-meta");
    this.counterEl = document.getElementById("lightbox-counter");
    this.prevBtn = document.getElementById("lightbox-prev");
    this.nextBtn = document.getElementById("lightbox-next");
    this.closeBtn = document.getElementById("lightbox-close");

    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    if (!this.overlay) return;
    this.bindEvents();
  }

  bindEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prev());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.next());
    }

    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });

    window.addEventListener("keydown", (e) => {
      if (!this.isOpen) return;
      if (e.key === "Escape") this.close();
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });

    // Touch swipe
    this.overlay.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    this.overlay.addEventListener(
      "touchend",
      (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        const diff = this.touchStartX - this.touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) this.next();
          else this.prev();
        }
      },
      { passive: true }
    );
  }

  open(index = 0) {
    if (index < 0 || index >= this.gallery.length) index = 0;
    this.currentIndex = index;
    this.isOpen = true;

    this.overlay.classList.add("active");
    document.body.classList.add("modal-open");
    this.updateImage();

    if (window.redlineAudio) redlineAudio.playSwoosh();
  }

  close() {
    this.isOpen = false;
    this.overlay.classList.remove("active");
    document.body.classList.remove("modal-open");
    if (window.redlineAudio) redlineAudio.playClickSound(500);
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.gallery.length) % this.gallery.length;
    this.updateImage();
    if (window.redlineAudio) redlineAudio.playClickSound(800);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.gallery.length;
    this.updateImage();
    if (window.redlineAudio) redlineAudio.playClickSound(1000);
  }

  updateImage() {
    const item = this.gallery[this.currentIndex];
    if (!item) return;

    // Trigger smooth transition
    this.imgEl.style.opacity = "0";
    this.imgEl.style.transform = "scale(0.96)";

    setTimeout(() => {
      this.imgEl.src = item.image;
      this.imgEl.alt = item.title;
      this.titleEl.textContent = item.title;
      this.carEl.textContent = item.car;
      this.metaEl.textContent = `${item.subtitle} • ${item.camera}`;
      this.counterEl.textContent = `${String(this.currentIndex + 1).padStart(2, "0")} / ${String(this.gallery.length).padStart(2, "0")}`;

      this.imgEl.onload = () => {
        this.imgEl.style.opacity = "1";
        this.imgEl.style.transform = "scale(1)";
      };
    }, 120);
  }
}
