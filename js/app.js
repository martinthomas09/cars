/**
 * REDLINE Application Controller - Main orchestrator
 * Initializes all modules, telemetry animations, filter engines,
 * interactive speed dyno, scroll transitions, and custom cursor.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize sub-engines
  window.redlineParticles = new RedlineParticles("hero-particles-canvas");
  window.redlineCarousel = new RedlineShowcaseCarousel(SHOWCASE_SLIDES);
  window.redlineSearch = new RedlineSearch(SUPERCARS_DATA);
  window.redlineModal = new RedlineCarModal(SUPERCARS_DATA);
  window.redlineLightbox = new RedlineLightbox(GALLERY_DATA);

  // Initialize UI features
  initNavigation();
  initSupercarsGrid();
  initBrandsSection();
  initGallerySection();
  initPerformanceTelemetry();
  initSpeedDynoWidget();
  initCustomCursor();
  initNewsletter();
  initAudioToggle();
});

/* ==========================================================================
   Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById("main-nav");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileDrawer = document.getElementById("mobile-nav-drawer");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  // Scroll appearance
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("nav-scrolled");
    } else {
      navbar.classList.remove("nav-scrolled");
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      mobileToggle.classList.toggle("active", isOpen);
      document.body.classList.toggle("drawer-open", isOpen);
      if (window.redlineAudio) redlineAudio.playClickSound(isOpen ? 1200 : 700);
    });

    // Close on link click
    mobileDrawer.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileToggle.classList.remove("active");
        document.body.classList.remove("drawer-open");
      });
    });
  }

  // Smooth scroll with offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        if (window.redlineAudio) redlineAudio.playClickSound(950);
      }
    });
  });

  // Active section indicator on scroll
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ==========================================================================
   Supercars Grid & Filter Engine
   ========================================================================== */
function initSupercarsGrid() {
  const grid = document.getElementById("supercars-grid");
  const filterBtns = document.querySelectorAll(".car-filter-btn");

  let currentCategory = "all";

  function renderGrid(category = "all", brandFilter = null) {
    let filtered = SUPERCARS_DATA;

    if (brandFilter) {
      filtered = filtered.filter((c) => c.brand.toLowerCase() === brandFilter.toLowerCase());
    } else if (category !== "all") {
      filtered = filtered.filter((c) => c.category === category);
    }

    grid.innerHTML = filtered
      .map(
        (car) => `
      <div class="car-card tilt-card" data-car-id="${car.id}">
        <div class="car-card-inner">
          <div class="car-card-glow"></div>
          
          <div class="car-card-media">
            <img src="${car.image}" alt="${car.brand} ${car.name}" class="car-card-img" loading="lazy" />
            <div class="car-card-badges">
              <span class="card-badge-brand">${car.brand}</span>
              <span class="card-badge-cat">${car.category.toUpperCase()}</span>
            </div>
            <button class="card-quick-rev" data-car-id="${car.id}" title="Rev Exhaust Sound">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>

          <div class="car-card-content">
            <div class="car-card-title-row">
              <h3 class="car-card-name">${car.name}</h3>
              <span class="car-card-price">${car.price}</span>
            </div>
            <p class="car-card-engine">${car.engine.split("+")[0]}</p>

            <div class="car-card-telemetry">
              <div class="telemetry-pill">
                <i class="fa-solid fa-fire text-red"></i>
                <div>
                  <span class="telemetry-val">${car.horsepower}</span>
                  <span class="telemetry-lbl">POWER</span>
                </div>
              </div>
              <div class="telemetry-pill">
                <i class="fa-solid fa-gauge-high text-red"></i>
                <div>
                  <span class="telemetry-val">${car.topSpeed}</span>
                  <span class="telemetry-lbl">TOP SPEED</span>
                </div>
              </div>
              <div class="telemetry-pill">
                <i class="fa-solid fa-stopwatch text-red"></i>
                <div>
                  <span class="telemetry-val">${car.acceleration}</span>
                  <span class="telemetry-lbl">0-100 KM/H</span>
                </div>
              </div>
            </div>

            <div class="car-card-actions">
              <button class="btn btn-red w-100 view-car-details-btn" data-car-id="${car.id}">
                <span>VIEW TELEMETRY & SPECS</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    attachCardTiltEffects();
  }

  // Filter button clicks
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.filter;
      if (window.redlineAudio) redlineAudio.playClickSound(1050);
      renderGrid(currentCategory);
    });
  });

  // Delegate click for Details & Quick Rev
  grid.addEventListener("click", (e) => {
    const detailsBtn = e.target.closest(".view-car-details-btn") || e.target.closest(".car-card-media");
    const revBtn = e.target.closest(".card-quick-rev");

    if (revBtn) {
      e.stopPropagation();
      revBtn.classList.add("active-rev");
      if (window.redlineAudio) {
        window.redlineAudio.triggerRevBurst(() => {
          revBtn.classList.remove("active-rev");
        });
      }
      return;
    }

    const card = e.target.closest(".car-card");
    if (card && (detailsBtn || !revBtn)) {
      const carId = card.dataset.carId;
      if (window.redlineModal) window.redlineModal.open(carId);
    }
  });

  // Initial render
  renderGrid("all");

  // Allow brands section to trigger filter
  window.filterCarsByBrand = (brandName) => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    const allBtn = document.querySelector('.car-filter-btn[data-filter="all"]');
    if (allBtn) allBtn.classList.add("active");
    renderGrid("all", brandName);

    // Scroll to supercars
    const section = document.getElementById("supercars");
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };
}

/* ==========================================================================
   3D Tilt Effect for Cards
   ========================================================================== */
function attachCardTiltEffects() {
  const cards = document.querySelectorAll(".tilt-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

      const glow = card.querySelector(".car-card-glow");
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(235, 10, 30, 0.25) 0%, transparent 70%)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      const glow = card.querySelector(".car-card-glow");
      if (glow) glow.style.background = "transparent";
    });
  });
}

/* ==========================================================================
   Brands Section
   ========================================================================== */
function initBrandsSection() {
  const grid = document.getElementById("brands-grid");
  if (!grid) return;

  grid.innerHTML = BRANDS_DATA.map(
    (b) => `
    <div class="brand-card" data-brand="${b.name}">
      <div class="brand-card-glow"></div>
      <div class="brand-card-top">
        <span class="brand-flag">${b.flag}</span>
        <span class="brand-year">EST. ${b.founded}</span>
      </div>
      <div class="brand-icon-wrap">
        <i class="${b.icon}"></i>
      </div>
      <h3 class="brand-title">${b.name}</h3>
      <div class="brand-origin">${b.origin}</div>
      <div class="brand-flagship">FLAGSHIP: <span>${b.flagship}</span></div>
      <p class="brand-desc">${b.description}</p>
      <div class="brand-action-link">
        <span>SHOWCASE CARS</span>
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  `
  ).join("");

  // Brand click triggers filter
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".brand-card");
    if (card) {
      const brandName = card.dataset.brand;
      if (window.redlineAudio) redlineAudio.playClickSound(1150);
      if (window.filterCarsByBrand) {
        window.filterCarsByBrand(brandName);
      }
    }
  });
}

/* ==========================================================================
   Cinematic Masonry Gallery
   ========================================================================== */
function initGallerySection() {
  const grid = document.getElementById("gallery-grid");
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  if (!grid) return;

  function renderGallery(tag = "all") {
    const filtered = tag === "all" ? GALLERY_DATA : GALLERY_DATA.filter((item) => item.tag === tag);

    grid.innerHTML = filtered
      .map(
        (item) => `
      <div class="gallery-item ${item.aspect}" data-id="${item.id}" data-tag="${item.tag}">
        <div class="gallery-item-inner">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="gallery-overlay">
            <div class="gallery-badge">${item.tag.toUpperCase()}</div>
            <div class="gallery-info">
              <h4 class="gallery-item-title">${item.title}</h4>
              <p class="gallery-item-subtitle">${item.subtitle}</p>
              <div class="gallery-item-meta"><i class="fa-solid fa-camera"></i> ${item.camera}</div>
            </div>
            <div class="gallery-expand-icon">
              <i class="fa-solid fa-expand"></i>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Filter clicks
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const tag = btn.dataset.tag;
      if (window.redlineAudio) redlineAudio.playClickSound(1000);
      renderGallery(tag);
    });
  });

  // Lightbox click
  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (item) {
      const id = item.dataset.id;
      const index = GALLERY_DATA.findIndex((g) => g.id === id);
      if (index !== -1 && window.redlineLightbox) {
        window.redlineLightbox.open(index);
      }
    }
  });

  renderGallery("all");
}

/* ==========================================================================
   Performance Statistics & Telemetry Counters
   ========================================================================== */
function initPerformanceTelemetry() {
  const statElements = document.querySelectorAll(".stat-number[data-target]");
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateCounters();
        }
      });
    },
    { threshold: 0.25 }
  );

  const section = document.getElementById("performance");
  if (section) observer.observe(section);

  function animateCounters() {
    statElements.forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const isDecimal = el.dataset.decimal === "true";
      const duration = 2000;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const ease = 1 - (1 - progress) * (1 - progress);
        const current = target * ease;

        el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
        }
      }

      requestAnimationFrame(update);
    });
  }
}

/* ==========================================================================
   Interactive Speed Dyno & Tachometer Simulator
   ========================================================================== */
function initSpeedDynoWidget() {
  const throttleBtn = document.getElementById("dyno-throttle-btn");
  const speedVal = document.getElementById("dyno-speed-readout");
  const rpmVal = document.getElementById("dyno-rpm-readout");
  const gearVal = document.getElementById("dyno-gear-readout");
  const speedArc = document.getElementById("dyno-speed-arc");
  const shiftLight = document.getElementById("dyno-shift-light");

  if (!throttleBtn || !speedVal) return;

  let isAccelerating = false;
  let currentSpeed = 0;
  let currentRPM = 1000;
  let currentGear = 1;
  let animId = null;

  // Max specs: 485 km/h, 9500 RPM, 7 gears
  const gearRatios = [0, 80, 140, 210, 290, 370, 440, 485];

  function runDynoStep() {
    if (isAccelerating) {
      if (currentSpeed < 485) {
        currentSpeed += 1.8;
      }
      // Calculate gear based on speed
      for (let g = 1; g <= 7; g++) {
        if (currentSpeed <= gearRatios[g]) {
          if (currentGear !== g) {
            // Gear shifted! Flash shift light & pop exhaust
            currentGear = g;
            if (shiftLight) {
              shiftLight.classList.add("flash");
              setTimeout(() => shiftLight.classList.remove("flash"), 150);
            }
            if (window.redlineAudio) window.redlineAudio.playExhaustPop();
          }
          break;
        }
      }

      // RPM calculation within current gear
      const prevGearMax = gearRatios[currentGear - 1] || 0;
      const gearSpan = gearRatios[currentGear] - prevGearMax;
      const gearProgress = (currentSpeed - prevGearMax) / gearSpan;
      currentRPM = 3500 + gearProgress * 5800;

      if (currentRPM >= 9000) {
        shiftLight.classList.add("redline-flash");
      } else {
        shiftLight.classList.remove("redline-flash");
      }

      if (window.redlineAudio) {
        window.redlineAudio.setRPM(currentRPM);
      }
    } else {
      // Decelerating / Engine Braking
      if (currentSpeed > 0) {
        currentSpeed -= 2.5;
        if (currentSpeed < 0) currentSpeed = 0;
      }

      if (currentSpeed === 0) {
        currentGear = 1;
        currentRPM = 1000;
        shiftLight.classList.remove("redline-flash");
      } else {
        // Gear down
        for (let g = 1; g <= 7; g++) {
          if (currentSpeed <= gearRatios[g]) {
            currentGear = g;
            break;
          }
        }
        currentRPM = Math.max(1000, currentRPM - 180);
      }

      if (window.redlineAudio) {
        window.redlineAudio.setRPM(currentRPM);
      }
    }

    // Update Telemetry Display
    speedVal.textContent = Math.floor(currentSpeed);
    rpmVal.textContent = Math.floor(currentRPM).toLocaleString();
    gearVal.textContent = currentSpeed === 0 ? "N" : currentGear;

    // Arc offset (0 km/h = 251 offset, 485 km/h = 0 offset)
    const pct = Math.min(currentSpeed / 485, 1);
    if (speedArc) speedArc.style.strokeDashoffset = 251 - pct * 251;

    animId = requestAnimationFrame(runDynoStep);
  }

  animId = requestAnimationFrame(runDynoStep);

  function startThrottle() {
    isAccelerating = true;
    throttleBtn.classList.add("active-throttle");
    throttleBtn.querySelector(".throttle-text").textContent = "ACCELERATING • HOLD WIDE OPEN";
    if (window.redlineAudio) {
      if (!window.redlineAudio.isEngineRunning) {
        window.redlineAudio.startEngine();
      }
      window.redlineAudio.setRPM(4000);
    }
  }

  function stopThrottle() {
    isAccelerating = false;
    throttleBtn.classList.remove("active-throttle");
    throttleBtn.querySelector(".throttle-text").textContent = "PRESS & HOLD TO ACCELERATE";
    if (window.redlineAudio) {
      window.redlineAudio.playExhaustPop();
      setTimeout(() => {
        if (!isAccelerating && window.redlineAudio) {
          window.redlineAudio.stopEngine();
        }
      }, 1500);
    }
  }

  // Pointer & Touch Events
  throttleBtn.addEventListener("mousedown", startThrottle);
  window.addEventListener("mouseup", () => {
    if (isAccelerating) stopThrottle();
  });

  throttleBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    startThrottle();
  });
  window.addEventListener("touchend", () => {
    if (isAccelerating) stopThrottle();
  });
}

/* ==========================================================================
   Audio Toggle (Mute / Unmute)
   ========================================================================== */
function initAudioToggle() {
  const toggleBtn = document.getElementById("audio-toggle-btn");
  const toggleIcon = document.getElementById("audio-toggle-icon");
  const toggleText = document.getElementById("audio-toggle-text");

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    if (window.redlineAudio) {
      const isMuted = window.redlineAudio.toggleMute();
      if (toggleIcon) {
        toggleIcon.className = isMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
      }
      if (toggleText) {
        toggleText.textContent = isMuted ? "SOUND: OFF" : "SOUND: ON";
      }
      toggleBtn.classList.toggle("muted", isMuted);
    }
  });
}

/* ==========================================================================
   Newsletter Subscription
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  const status = document.getElementById("newsletter-status");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletter-email").value;
    const btn = form.querySelector('button[type="submit"]');

    btn.disabled = true;
    btn.innerHTML = '<span>TRANSMITTING...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<span>SUBSCRIBED ✓</span> <i class="fa-solid fa-check"></i>';
      status.innerHTML = `
        <div class="newsletter-success">
          <i class="fa-solid fa-circle-check text-red"></i>
          <span>VIP Gazette confirmation dispatched to <strong>${email}</strong>. Welcome to REDLINE.</span>
        </div>
      `;
      form.reset();
      if (window.redlineAudio) redlineAudio.playSwoosh();
    }, 800);
  });
}

/* ==========================================================================
   Futuristic Custom Glowing Cursor
   ========================================================================== */
function initCustomCursor() {
  // Only enable on non-touch devices
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const cursorDot = document.createElement("div");
  const cursorFollower = document.createElement("div");

  cursorDot.className = "redline-cursor-dot";
  cursorFollower.className = "redline-cursor-follower";

  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorFollower);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderCursor() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;

    cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover states on interactive elements
  const interactives = "a, button, .tilt-card, .brand-card, .gallery-item, input, select, .showcase-dot";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactives)) {
      cursorFollower.classList.add("cursor-hover");
      cursorDot.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactives)) {
      cursorFollower.classList.remove("cursor-hover");
      cursorDot.classList.remove("cursor-hover");
    }
  });
}
