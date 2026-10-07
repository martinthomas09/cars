/**
 * REDLINE Instant Search Engine - High-Performance Real-Time Filter
 * Searches names, brands, powertrains, and telemetry specifications.
 * Supports hotkeys (Ctrl/Cmd + K, Escape), highlighted tokens, and quick tags.
 */

class RedlineSearch {
  constructor(carsData) {
    this.cars = carsData;
    this.isOpen = false;

    this.overlay = document.getElementById("search-modal-overlay");
    this.modal = document.getElementById("search-modal");
    this.input = document.getElementById("search-input");
    this.clearBtn = document.getElementById("search-clear-btn");
    this.closeBtn = document.getElementById("search-close-btn");
    this.resultsContainer = document.getElementById("search-results-list");
    this.resultsCount = document.getElementById("search-count-label");
    this.tagsContainer = document.getElementById("search-quick-tags");
    this.openBtns = document.querySelectorAll(".open-search-trigger");

    this.init();
  }

  init() {
    if (!this.overlay || !this.input) return;
    this.bindEvents();
    this.renderInitialState();
  }

  bindEvents() {
    // Open trigger buttons
    this.openBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Close button & overlay click
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    if (this.overlay) {
      this.overlay.addEventListener("click", (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }

    // Clear button
    if (this.clearBtn) {
      this.clearBtn.addEventListener("click", () => {
        this.input.value = "";
        this.clearBtn.classList.remove("visible");
        this.renderInitialState();
        this.input.focus();
      });
    }

    // Input typing
    this.input.addEventListener("input", () => {
      const query = this.input.value.trim();
      if (this.clearBtn) {
        this.clearBtn.classList.toggle("visible", query.length > 0);
      }
      this.performSearch(query);
    });

    // Quick tags click
    if (this.tagsContainer) {
      this.tagsContainer.addEventListener("click", (e) => {
        const tagBtn = e.target.closest(".search-tag-chip");
        if (tagBtn) {
          const query = tagBtn.dataset.query;
          this.input.value = query;
          if (this.clearBtn) this.clearBtn.classList.add("visible");
          if (window.redlineAudio) redlineAudio.playClickSound(1000);
          this.performSearch(query);
          this.input.focus();
        }
      });
    }

    // Global keyboard shortcuts (Ctrl/Cmd + K, Escape)
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      } else if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Delegate click on search result item to open car details modal
    if (this.resultsContainer) {
      this.resultsContainer.addEventListener("click", (e) => {
        const item = e.target.closest(".search-result-card");
        if (item) {
          const carId = item.dataset.carId;
          this.close();
          if (window.redlineModal) {
            window.redlineModal.open(carId);
          }
        }
      });
    }
  }

  open() {
    this.isOpen = true;
    this.overlay.classList.add("active");
    document.body.classList.add("modal-open");
    if (window.redlineAudio) redlineAudio.playSwoosh();

    setTimeout(() => {
      this.input.focus();
      this.input.select();
    }, 150);
  }

  close() {
    this.isOpen = false;
    this.overlay.classList.remove("active");
    document.body.classList.remove("modal-open");
    if (window.redlineAudio) redlineAudio.playClickSound(600);
  }

  renderInitialState() {
    this.resultsCount.textContent = `All ${this.cars.length} Supercars Available`;
    this.renderResults(this.cars, "");
  }

  performSearch(query) {
    if (!query) {
      this.renderInitialState();
      return;
    }

    const q = query.toLowerCase();

    const matches = this.cars.filter((car) => {
      const matchName = car.name.toLowerCase().includes(q);
      const matchBrand = car.brand.toLowerCase().includes(q);
      const matchEngine = car.engine.toLowerCase().includes(q);
      const matchCategory = car.category.toLowerCase().includes(q);
      const matchHp = car.horsepower.toLowerCase().includes(q);
      const matchSpeed = car.topSpeed.toLowerCase().includes(q);
      const matchTagline = car.tagline.toLowerCase().includes(q);
      const matchFeatures = car.features.some((f) => f.toLowerCase().includes(q));

      // Numerical matching (e.g., "1000", "400")
      const numQuery = parseInt(q.replace(/\D/g, ""), 10);
      let matchNum = false;
      if (!isNaN(numQuery) && numQuery > 100) {
        matchNum = car.hpVal >= numQuery || car.topSpeedVal >= numQuery;
      }

      return matchName || matchBrand || matchEngine || matchCategory || matchHp || matchSpeed || matchTagline || matchFeatures || matchNum;
    });

    this.resultsCount.textContent = matches.length === 1 ? "1 Match Found" : `${matches.length} Matches Found`;
    this.renderResults(matches, query);
  }

  highlightMatch(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    return text.replace(regex, '<span class="highlight-token">$1</span>');
  }

  renderResults(list, query) {
    if (!this.resultsContainer) return;

    if (list.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="search-empty-state">
          <div class="search-empty-icon">
            <i class="fa-solid fa-gauge-simple-high"></i>
          </div>
          <h3>NO VEHICLES MATCHING "${query.toUpperCase()}"</h3>
          <p>Try searching for brand names, V12 engines, hybrid systems, or speed criteria.</p>
          <div class="search-suggested-row">
            <span>Suggestions:</span>
            <button class="search-tag-chip" data-query="V12">V12</button>
            <button class="search-tag-chip" data-query="Ferrari">Ferrari</button>
            <button class="search-tag-chip" data-query="1,000 HP">1000 HP</button>
            <button class="search-tag-chip" data-query="Track">Track</button>
          </div>
        </div>
      `;
      return;
    }

    this.resultsContainer.innerHTML = list
      .map((car) => {
        const brandHl = this.highlightMatch(car.brand, query);
        const nameHl = this.highlightMatch(car.name, query);
        const engineHl = this.highlightMatch(car.engine, query);

        return `
        <div class="search-result-card" data-car-id="${car.id}">
          <div class="search-card-thumb">
            <img src="${car.image}" alt="${car.brand} ${car.name}" loading="lazy" />
            <div class="search-card-thumb-badge">${car.category.toUpperCase()}</div>
          </div>
          <div class="search-card-details">
            <div class="search-card-brand">${brandHl}</div>
            <div class="search-card-name">${nameHl}</div>
            <div class="search-card-powertrain"><i class="fa-solid fa-bolt"></i> ${engineHl}</div>
            <div class="search-card-metrics">
              <span class="metric-pill"><i class="fa-solid fa-fire"></i> ${car.horsepower}</span>
              <span class="metric-pill"><i class="fa-solid fa-gauge-high"></i> ${car.topSpeed}</span>
              <span class="metric-pill"><i class="fa-solid fa-stopwatch"></i> ${car.acceleration}</span>
            </div>
          </div>
          <div class="search-card-price-action">
            <div class="search-card-price">${car.price}</div>
            <div class="search-card-view-btn">
              <span>VIEW TELEMETRY</span>
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }
}
