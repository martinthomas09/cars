/**
 * REDLINE Car Details Modal - Deep Telemetry & Sound Simulator
 * Fullscreen glassmorphic dialog with interactive engine revving,
 * high-res gallery previews, comprehensive mechanical specs, and VIP inquiry form.
 */

class RedlineCarModal {
  constructor(carsData) {
    this.cars = carsData;
    this.currentCar = null;
    this.overlay = document.getElementById("car-modal-overlay");
    this.modal = document.getElementById("car-modal");
    this.closeBtn = document.getElementById("car-modal-close");
    this.contentContainer = document.getElementById("car-modal-body");

    this.init();
  }

  init() {
    if (!this.overlay || !this.contentContainer) return;
    this.bindEvents();
  }

  bindEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    if (this.overlay) {
      this.overlay.addEventListener("click", (e) => {
        if (e.target === this.overlay) this.close();
      });
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.overlay.classList.contains("active")) {
        this.close();
      }
    });
  }

  open(carId) {
    const car = this.cars.find((c) => c.id === carId);
    if (!car) return;

    this.currentCar = car;
    this.renderCarDetails(car);
    this.overlay.classList.add("active");
    document.body.classList.add("modal-open");

    if (window.redlineAudio) redlineAudio.playSwoosh();
  }

  close() {
    this.overlay.classList.remove("active");
    document.body.classList.remove("modal-open");
    if (window.redlineAudio) {
      redlineAudio.playClickSound(500);
      redlineAudio.stopEngine();
    }
  }

  renderCarDetails(car) {
    this.contentContainer.innerHTML = `
      <div class="car-modal-grid">
        <!-- Visual & Media Column -->
        <div class="car-modal-media-col">
          <div class="car-modal-main-image-wrap">
            <img id="modal-main-img" src="${car.image}" alt="${car.brand} ${car.name}" />
            <div class="modal-badge-row">
              <span class="badge-brand">${car.brand.toUpperCase()}</span>
              <span class="badge-cat">${car.category.toUpperCase()}</span>
            </div>
          </div>

          <div class="modal-thumbnails-row">
            ${car.galleryImages
              .map(
                (img, idx) => `
              <div class="modal-thumb-item ${idx === 0 ? "active" : ""}" data-src="${img}">
                <img src="${img}" alt="Preview ${idx + 1}" />
              </div>
            `
              )
              .join("")}
          </div>

          <!-- Interactive Engine Sound Synthesizer -->
          <div class="modal-engine-sound-card">
            <div class="sound-card-header">
              <div class="sound-card-title">
                <i class="fa-solid fa-volume-high text-red"></i>
                <span>ACOUSTIC EXHAUST TELEMETRY</span>
              </div>
              <span class="sound-card-spec">${car.engine.split("+")[0]}</span>
            </div>

            <div class="sound-tachometer-wrap">
              <div class="tacho-dial">
                <svg viewBox="0 0 200 120" class="tacho-svg">
                  <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="12" stroke-linecap="round"/>
                  <path id="tacho-arc" d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#redGrad)" stroke-width="12" stroke-dasharray="251" stroke-dashoffset="251" stroke-linecap="round"/>
                  <defs>
                    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#ff4444" />
                      <stop offset="70%" stop-color="#e10600" />
                      <stop offset="100%" stop-color="#ff0033" />
                    </linearGradient>
                  </defs>
                </svg>
                <div class="tacho-readout">
                  <span id="tacho-rpm-val">1,000</span>
                  <small>RPM</small>
                </div>
              </div>
            </div>

            <div class="sound-action-row">
              <button class="btn btn-red btn-glow w-100" id="modal-rev-btn">
                <i class="fa-solid fa-bolt"></i>
                <span id="modal-rev-label">REV ACOUSTIC EXHAUST</span>
              </button>
            </div>
            <div class="sound-disclaimer">Real-time procedural synthesis via Web Audio API • 9,500 RPM Redline Limit</div>
          </div>
        </div>

        <!-- Telemetry & Specs Column -->
        <div class="car-modal-info-col">
          <div class="car-modal-header">
            <div class="brand-origin-pill">
              <span>${car.brand} Automobili</span>
              <span class="bullet">•</span>
              <span>Model Year ${car.year}</span>
            </div>
            <h1 class="modal-car-title">${car.name}</h1>
            <div class="modal-tagline">"${car.tagline}"</div>
            <div class="modal-price-tag">${car.price} <small>BASE MSRP</small></div>
          </div>

          <p class="modal-description">${car.description}</p>

          <!-- Core Telemetry Metric Grid -->
          <div class="modal-metric-grid">
            <div class="modal-metric-box">
              <div class="box-icon"><i class="fa-solid fa-fire"></i></div>
              <div class="box-meta">
                <span class="box-label">POWER</span>
                <span class="box-val">${car.horsepower}</span>
              </div>
            </div>

            <div class="modal-metric-box">
              <div class="box-icon"><i class="fa-solid fa-gauge-high"></i></div>
              <div class="box-meta">
                <span class="box-label">TOP SPEED</span>
                <span class="box-val">${car.topSpeed}</span>
              </div>
            </div>

            <div class="modal-metric-box">
              <div class="box-icon"><i class="fa-solid fa-stopwatch"></i></div>
              <div class="box-meta">
                <span class="box-label">0 - 100 KM/H</span>
                <span class="box-val">${car.acceleration}</span>
              </div>
            </div>

            <div class="modal-metric-box">
              <div class="box-icon"><i class="fa-solid fa-flag-checkered"></i></div>
              <div class="box-meta">
                <span class="box-label">QUARTER MILE</span>
                <span class="box-val">${car.quarterMile}</span>
              </div>
            </div>
          </div>

          <!-- Deep Specs Table -->
          <div class="modal-specs-table-wrap">
            <h3 class="specs-table-heading">
              <i class="fa-solid fa-sliders text-red"></i> TECHNICAL SPECIFICATIONS
            </h3>
            <div class="specs-table">
              <div class="spec-row">
                <span class="spec-k">POWERTRAIN</span>
                <span class="spec-v">${car.engine}</span>
              </div>
              <div class="spec-row">
                <span class="spec-k">PEAK TORQUE</span>
                <span class="spec-v">${car.torque}</span>
              </div>
              <div class="spec-row">
                <span class="spec-k">TRANSMISSION</span>
                <span class="spec-v">${car.transmission}</span>
              </div>
              <div class="spec-row">
                <span class="spec-k">KERB WEIGHT</span>
                <span class="spec-v">${car.weight}</span>
              </div>
              <div class="spec-row">
                <span class="spec-k">DOWNFORCE</span>
                <span class="spec-v">${car.downforce}</span>
              </div>
              <div class="spec-row">
                <span class="spec-k">DRIVETRAIN</span>
                <span class="spec-v">${car.drivetrain}</span>
              </div>
            </div>
          </div>

          <!-- Engineering Highlights -->
          <div class="modal-features-wrap">
            <h3 class="specs-table-heading">
              <i class="fa-solid fa-shield-halved text-red"></i> AERONAUTIC & CHASSIS ENGINEERING
            </h3>
            <ul class="modal-features-list">
              ${car.features.map((f) => `<li><i class="fa-solid fa-circle-check text-red"></i> ${f}</li>`).join("")}
            </ul>
          </div>

          <!-- VIP Viewing / Acquisition Form -->
          <div class="modal-inquiry-box">
            <div class="inquiry-header">
              <h4>REQUEST PRIVATE CIRCUIT VIEWING</h4>
              <p>Reserve an exclusive bespoke briefing with a REDLINE Hypercar Specialist.</p>
            </div>
            <form id="modal-inquiry-form" class="inquiry-form">
              <div class="form-row">
                <div class="form-group">
                  <input type="text" id="inq-name" placeholder="Full Name" required />
                </div>
                <div class="form-group">
                  <input type="email" id="inq-email" placeholder="VIP Email" required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <select id="inq-showroom" required>
                    <option value="" disabled selected>Select Showroom Hub</option>
                    <option value="Monaco">Monaco • Port Hercule</option>
                    <option value="Dubai">Dubai • DIFC Galleria</option>
                    <option value="Tokyo">Tokyo • Ginza Apex</option>
                    <option value="London">London • Mayfair Heritage</option>
                    <option value="Miami">Miami • Brickell Marina</option>
                  </select>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-red w-100">
                    <span id="inq-btn-text">DISPATCH VIP INQUIRY</span>
                    <i class="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
              <div id="inquiry-status-msg" class="inquiry-status"></div>
            </form>
          </div>
        </div>
      </div>
    `;

    // Attach interactive listeners for the newly injected content
    this.attachModalInteractiveListeners(car);
  }

  attachModalInteractiveListeners(car) {
    // Thumbnail switcher
    const mainImg = document.getElementById("modal-main-img");
    const thumbs = this.contentContainer.querySelectorAll(".modal-thumb-item");
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        thumbs.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
        mainImg.src = thumb.dataset.src;
        if (window.redlineAudio) redlineAudio.playClickSound(900);
      });
    });

    // Sound rev button & tachometer animation
    const revBtn = document.getElementById("modal-rev-btn");
    const revLabel = document.getElementById("modal-rev-label");
    const rpmVal = document.getElementById("tacho-rpm-val");
    const tachoArc = document.getElementById("tacho-arc");

    let revInterval = null;

    if (revBtn) {
      revBtn.addEventListener("click", () => {
        if (!window.redlineAudio) return;

        revBtn.disabled = true;
        revBtn.classList.add("is-revving");
        revLabel.textContent = "REV LIMIT REACHED (9,200 RPM)";

        let rpm = 1000;
        const targetRpm = 9200;

        // Animate tachometer UI in sync with audio engine
        revInterval = setInterval(() => {
          if (rpm < targetRpm) {
            rpm += 450;
            if (rpm > targetRpm) rpm = targetRpm;
          }
          if (rpmVal) rpmVal.textContent = rpm.toLocaleString();
          // Arc stroke offset: 251 is 0%, 0 is 100%
          const pct = (rpm - 1000) / 8500;
          const offset = 251 - pct * 251;
          if (tachoArc) tachoArc.style.strokeDashoffset = offset;
        }, 30);

        window.redlineAudio.triggerRevBurst(() => {
          clearInterval(revInterval);
          // Return to idle
          let idleRpm = targetRpm;
          const returnInterval = setInterval(() => {
            idleRpm -= 600;
            if (idleRpm <= 1000) {
              idleRpm = 1000;
              clearInterval(returnInterval);
              revBtn.disabled = false;
              revBtn.classList.remove("is-revving");
              revLabel.textContent = "REV ACOUSTIC EXHAUST";
            }
            if (rpmVal) rpmVal.textContent = idleRpm.toLocaleString();
            const pct = (idleRpm - 1000) / 8500;
            const offset = 251 - pct * 251;
            if (tachoArc) tachoArc.style.strokeDashoffset = offset;
          }, 30);
        });
      });
    }

    // Inquiry form submit
    const form = document.getElementById("modal-inquiry-form");
    const statusMsg = document.getElementById("inquiry-status-msg");
    const submitBtnText = document.getElementById("inq-btn-text");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("inq-name").value;
        const email = document.getElementById("inq-email").value;
        const showroom = document.getElementById("inq-showroom").value;

        submitBtnText.textContent = "CONNECTING CONCIERGE...";

        setTimeout(() => {
          submitBtnText.textContent = "VIP INQUIRY DISPATCHED ✓";
          statusMsg.innerHTML = `
            <div class="inquiry-success-badge">
              <i class="fa-solid fa-circle-check"></i>
              <span>Confidential VIP docket established for <strong>${name}</strong> at <strong>REDLINE ${showroom}</strong>. Concierge team will reach <strong>${email}</strong> within 2 hours.</span>
            </div>
          `;
          if (window.redlineAudio) redlineAudio.playSwoosh();
          form.reset();
        }, 900);
      });
    }
  }
}
