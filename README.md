# 🏎️ REDLINE — The Art of Speed
### Premium Futuristic Supercar Showcase & Digital Showroom

A state-of-the-art automotive web application built with a **Black × Red × Carbon Fiber × High-Tech Telemetry** aesthetic. Engineered to evoke the sensory adrenaline of hypercar engineering.

---

## 🎨 Visual Architecture & Design Language
- **Matte Carbon & Black Palette**: Near-black foundations (`#050608`, `#07080a`, `#0d0f14`) paired with subtle woven carbon fiber CSS gradients.
- **Ferrari Corsa & Hypercar Crimson**: High-intensity red accents (`#E10600`, `#FF1E27`, `#FF0033`) with glowing neon halos, metallic borders, and glassmorphism (`backdrop-filter: blur(20px)`).
- **Typography**: Racing display headings (`Orbitron`, `Syne`), technical telemetry numerals (`Chakra Petch`), and luxury editorial body text (`Plus Jakarta Sans`).

---

## 🏎️ Core Sections & Interactive Features

1. **Cinematic Hero Portal**
   - High-resolution Ferrari SF90 Stradale visual background with continuous breathing camera animation.
   - Live **HTML5 Canvas Particle Engine**: Simulates burning embers, high-velocity laser streaks, and subtle cursor repulsion.
   - Headline: **"THE ART OF SPEED"** with subtitle *"Where engineering meets obsession."*
   - Red glowing **Explore Cars** call-to-action + mouse scroll indicator.

2. **Fixed Glassmorphic Navigation Bar**
   - Solidifies on scroll with frosted glass backdrop, blur, and neon bottom border glow.
   - Brand Emblem: **REDLINE** with titanium lightning glyph.
   - Instant Search Modal trigger (`Ctrl + K`).
   - Procedural Sound toggle (Mute / Unmute).
   - Mobile animated drawer with full touch navigation.

3. **Supercars Grid & Filter Engine**
   - 8 Flagship hypercars:
     - **Ferrari SF90 Stradale** (1,000 HP • 340 km/h • 2.5s)
     - **Lamborghini Revuelto** (1,015 HP • 350+ km/h • 2.5s)
     - **McLaren 750S** (750 HP • 332 km/h • 2.8s)
     - **Porsche 911 GT3 RS** (525 HP • 296 km/h • 3.2s)
     - **Aston Martin Valkyrie** (1,160 HP • 355 km/h • 2.6s)
     - **Bugatti Chiron Pur Sport** (1,500 HP • 350 km/h • 2.3s)
     - **Koenigsegg Jesko Attack** (1,600 HP • 480+ km/h • 2.5s)
     - **Pagani Huayra Roadster BC** (802 HP • 380 km/h • 2.8s)
   - Category filtering: All, Hypercars, Track Weapons, Hybrid Electrified, V12 Beasts.
   - Interactive 3D mouse tilt perspective on cards with coordinate-based red lighting flares.
   - "Quick Rev" sound button directly on each card thumbnail.

4. **Sliding Car Showcase (Carousel)**
   - Curated spotlight for 4 apex hypercars (Jesko, SF90, Valkyrie, Chiron).
   - Live spec meter bars (Horsepower, Top Speed, Acceleration, Downforce).
   - Auto-advance timer (6.5s) with real-time red progress bar and `01 / 04` counter.
   - Touch swipe gestures, pause-on-hover, and keyboard arrow key navigation.

5. **Performance & Virtual Chassis Dyno Simulator**
   - Viewport-triggered animated counters for **1,600 HP**, **485 km/h**, **2.3s 0-100**, and **1,400 kg Downforce**.
   - **Interactive Speed Dyno**:
     - Press and hold **"ACCELERATE"** to launch the car!
     - Watch the digital speedometer climb to 485 km/h.
     - Sequential gear shifts from 1st through 7th gear with shift light flashes.
     - High-RPM tachometer revving to 9,500 RPM with limiter stutter and authentic exhaust backfire pops.

6. **Prestige Brands Directory**
   - Ferrari, Lamborghini, Porsche, McLaren, Bugatti, Koenigsegg, Aston Martin, and Pagani.
   - Country heraldry, founded years, and flagship models.
   - **Interactive Marque Filter**: Clicking any brand card automatically filters the Supercars grid to that manufacturer and smoothly scrolls to it.

7. **Cinematic Masonry Gallery & Lightbox**
   - Filter tags: Circuit & Track, Carbon & Aero, Bespoke Cockpits, Night Rollers.
   - Fullscreen lightbox with zoom, EXIF camera metadata, next/previous buttons, and touch swipe gestures.

8. **Real-Time Search Engine (`Ctrl + K`)**
   - Instant search across car names, brands, engine types, and horsepower thresholds.
   - Dynamic token highlighting in search results.
   - Quick one-click filter tags (`V12`, `Ferrari`, `1000 HP`, `Track Focus`).
   - "No results found" zero-state with intelligent search recommendations.
   - Press `Escape` or backdrop click to close.

9. **Procedural Web Audio Engine**
   - Built on the HTML5 Web Audio API — zero external audio files required!
   - Procedural dual-oscillator synthesis for deep rumble idle, throttle modulation, 9,500 RPM screaming exhaust, turbo spools, and crackling exhaust backfires.
   - Mechanical UI sound feedback on buttons and slider transitions.

10. **Automotive Footer**
    - REDLINE identity statement: *"Built for speed. Designed for obsession."*
    - Interactive VIP Gazette newsletter subscription with validation.
    - Global showroom hubs (Monaco, Tokyo, Dubai, London, Miami).

---

## ⚡ Quick Start

### Option 1: Direct File
Simply double-click `index.html` in your web browser. No build steps or node modules required!

### Option 2: Local HTTP Server
Run the included python launcher:
```powershell
python server.py
```
Or with standard Python:
```powershell
python -m http.server 8000
```
Then open `http://localhost:8000`.

---

## ⌨️ Keyboard Shortcuts
- `Ctrl + K` or `Cmd + K`: Open / Close Instant Search
- `Escape`: Close Search Modal / Car Details Modal / Gallery Lightbox
- `Left Arrow` / `Right Arrow`: Navigate Showcase Slides / Gallery Lightbox Images

---

## 📁 Project Structure
```
redline-supercars/
├── index.html            # Main semantic markup
├── server.py             # Optional local HTTP server launcher
├── README.md             # Documentation & specifications
├── css/
│   ├── style.css         # CSS variables, typography, resets, animations
│   └── components.css    # Responsive components, modals, dyno, cards
└── js/
    ├── data.js           # Complete dataset for 8 supercars, brands & gallery
    ├── audio.js          # Procedural Web Audio API sound synthesizer
    ├── particles.js      # Canvas speed sparks & floating ember engine
    ├── carousel.js       # Cinematic showcase slider & progress bar
    ├── search.js         # Real-time search engine with keyword highlighting
    ├── modal.js          # Car details deep telemetry modal & VIP booking
    ├── lightbox.js       # Fullscreen gallery lightbox with EXIF metadata
    └── app.js            # Main controller orchestrating all modules
```
