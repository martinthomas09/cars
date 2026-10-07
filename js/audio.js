/**
 * REDLINE Audio Engine - High-Fidelity Web Audio Procedural Synthesizer
 * Generates roaring supercar exhaust notes, screaming high-RPM redline runs,
 * turbo spool, aggressive backfire pops, and futuristic UI feedback.
 */

class RedlineAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isEngineRunning = false;
    this.masterGain = null;
    this.engineGain = null;
    this.filter = null;
    this.distortionNode = null;
    this.currentRPM = 1000;
    this.targetRPM = 1000;
    this.activeOscillators = [];
    this.dynoOsc1 = null;
    this.dynoOsc2 = null;
    this.dynoSub = null;
    this.dynoNoise = null;
    this.dynoGain = null;
    this.dynoFilter = null;
    this.animFrame = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.65, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Waveshaper distortion for raw exhaust rasp
      this.distortionNode = this.ctx.createWaveShaper();
      this.distortionNode.curve = this.makeDistortionCurve(22);
      this.distortionNode.oversample = "4x";

      // Engine Bus
      this.engineGain = this.ctx.createGain();
      this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime);

      // Resonant Lowpass / Bandpass Filter
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(850, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(4.5, this.ctx.currentTime);

      this.filter.connect(this.distortionNode);
      this.distortionNode.connect(this.engineGain);
      this.engineGain.connect(this.masterGain);
    } catch (e) {
      console.warn("Web Audio API initialization note:", e);
    }
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  makeDistortionCurve(amount = 20) {
    const k = typeof amount === "number" ? amount : 20;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : 0.65;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  /* ------------------------------------------------------------------------
     UI Clicks & Feedback
     ------------------------------------------------------------------------ */
  playClickSound(freq = 1100) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  playSwoosh() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.12);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  /* ------------------------------------------------------------------------
     Exhaust Pop / Gunfire Backfire Crackles
     ------------------------------------------------------------------------ */
  playExhaustPop(intensity = 0.4) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.09);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Noise with sharp initial transient
      for (let i = 0; i < bufferSize; i++) {
        const decay = 1 - i / bufferSize;
        data[i] = (Math.random() * 2 - 1) * decay * decay;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1100 + Math.random() * 800, now);
      filter.Q.setValueAtTime(2.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(intensity, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.09);
    } catch (e) {}
  }

  /* ------------------------------------------------------------------------
     Instant Hypercar Rev Burst (Used by Rev Buttons & Modal)
     Simulates explosive throttle blip to 9,200 RPM with rich V12 screams & pops
     ------------------------------------------------------------------------ */
  triggerRevBurst(callback) {
    if (this.isMuted) {
      if (callback) callback();
      return;
    }
    this.ensureContext();
    if (!this.ctx) {
      if (callback) callback();
      return;
    }

    const now = this.ctx.currentTime;

    try {
      // 1. Dual detuned oscillators for screaming V12 multi-cylinder roar
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const oscSub = this.ctx.createOscillator();

      osc1.type = "sawtooth";
      osc2.type = "square";
      oscSub.type = "triangle";

      // 2. Turbo spool high-whistle
      const turboOsc = this.ctx.createOscillator();
      turboOsc.type = "sine";

      // Frequencies: Idle (160Hz) -> Redline Scream (720Hz fundamental with 1,440Hz harmonics)
      osc1.frequency.setValueAtTime(180, now);
      osc1.frequency.exponentialRampToValueAtTime(680, now + 0.55); // Throttle smash
      osc1.frequency.setValueAtTime(740, now + 0.7); // Redline bounce
      osc1.frequency.exponentialRampToValueAtTime(180, now + 1.4); // Overrun decel

      osc2.frequency.setValueAtTime(184, now); // +4Hz detune for massive stereo phase
      osc2.frequency.exponentialRampToValueAtTime(695, now + 0.55);
      osc2.frequency.setValueAtTime(750, now + 0.7);
      osc2.frequency.exponentialRampToValueAtTime(184, now + 1.4);

      oscSub.frequency.setValueAtTime(90, now);
      oscSub.frequency.exponentialRampToValueAtTime(340, now + 0.55);
      oscSub.frequency.exponentialRampToValueAtTime(90, now + 1.4);

      turboOsc.frequency.setValueAtTime(1400, now);
      turboOsc.frequency.exponentialRampToValueAtTime(3600, now + 0.55);
      turboOsc.frequency.exponentialRampToValueAtTime(800, now + 1.3);

      // Filters
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(4200, now + 0.55); // Open exhaust valves
      filter.frequency.exponentialRampToValueAtTime(600, now + 1.4);
      filter.Q.setValueAtTime(4.0, now);

      // Volume envelope
      const burstGain = this.ctx.createGain();
      burstGain.gain.setValueAtTime(0.01, now);
      burstGain.gain.exponentialRampToValueAtTime(0.55, now + 0.15); // Ramp up
      burstGain.gain.setValueAtTime(0.65, now + 0.55); // Peak scream
      burstGain.gain.setValueAtTime(0.45, now + 0.85); // Overrun burble
      burstGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5); // Fade to stop

      const turboGain = this.ctx.createGain();
      turboGain.gain.setValueAtTime(0.001, now);
      turboGain.gain.exponentialRampToValueAtTime(0.12, now + 0.5);
      turboGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      // Connect graph
      osc1.connect(filter);
      osc2.connect(filter);
      oscSub.connect(filter);
      turboOsc.connect(turboGain);
      turboGain.connect(this.masterGain);

      filter.connect(this.distortionNode || this.masterGain);
      if (this.distortionNode) {
        this.distortionNode.connect(burstGain);
      } else {
        filter.connect(burstGain);
      }
      burstGain.connect(this.masterGain);

      // Start sound
      osc1.start(now);
      osc2.start(now);
      oscSub.start(now);
      turboOsc.start(now);

      const stopTime = now + 1.55;
      osc1.stop(stopTime);
      osc2.stop(stopTime);
      oscSub.stop(stopTime);
      turboOsc.stop(stopTime);

      // Timed backfire crackles on deceleration
      setTimeout(() => this.playExhaustPop(0.45), 720);
      setTimeout(() => this.playExhaustPop(0.5), 880);
      setTimeout(() => this.playExhaustPop(0.38), 1050);

      // Completion callback
      setTimeout(() => {
        if (callback) callback();
      }, 1500);
    } catch (e) {
      console.warn("Rev burst playback error:", e);
      if (callback) callback();
    }
  }

  /* ------------------------------------------------------------------------
     Continuous Dyno / Speedometer Engine Synthesizer
     ------------------------------------------------------------------------ */
  startEngine() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx || this.isEngineRunning) return;

    try {
      this.isEngineRunning = true;
      const now = this.ctx.currentTime;

      this.dynoOsc1 = this.ctx.createOscillator();
      this.dynoOsc2 = this.ctx.createOscillator();
      this.dynoSub = this.ctx.createOscillator();

      this.dynoOsc1.type = "sawtooth";
      this.dynoOsc2.type = "square";
      this.dynoSub.type = "triangle";

      this.dynoGain = this.ctx.createGain();
      this.dynoGain.gain.setValueAtTime(0.05, now);
      this.dynoGain.gain.linearRampToValueAtTime(0.42, now + 0.2);

      this.dynoFilter = this.ctx.createBiquadFilter();
      this.dynoFilter.type = "lowpass";
      this.dynoFilter.frequency.setValueAtTime(900, now);
      this.dynoFilter.Q.setValueAtTime(4.0, now);

      this.dynoOsc1.frequency.setValueAtTime(140, now);
      this.dynoOsc2.frequency.setValueAtTime(144, now);
      this.dynoSub.frequency.setValueAtTime(70, now);

      this.dynoOsc1.connect(this.dynoFilter);
      this.dynoOsc2.connect(this.dynoFilter);
      this.dynoSub.connect(this.dynoFilter);

      this.dynoFilter.connect(this.dynoGain);
      this.dynoGain.connect(this.masterGain);

      this.dynoOsc1.start(now);
      this.dynoOsc2.start(now);
      this.dynoSub.start(now);
    } catch (e) {}
  }

  setRPM(rpm) {
    if (!this.isEngineRunning || !this.ctx || this.isMuted) return;
    const clamped = Math.max(1000, Math.min(9500, rpm));
    const now = this.ctx.currentTime;

    // Convert RPM (1000 to 9500) to screaming frequency (140 Hz to 720 Hz)
    const baseFreq = 140 + ((clamped - 1000) / 8500) * 580;
    const filterFreq = 800 + ((clamped - 1000) / 8500) * 3800;

    if (this.dynoOsc1) this.dynoOsc1.frequency.setTargetAtTime(baseFreq, now, 0.04);
    if (this.dynoOsc2) this.dynoOsc2.frequency.setTargetAtTime(baseFreq * 1.01, now, 0.04);
    if (this.dynoSub) this.dynoSub.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.04);
    if (this.dynoFilter) this.dynoFilter.frequency.setTargetAtTime(filterFreq, now, 0.04);
  }

  stopEngine() {
    if (!this.isEngineRunning) return;
    this.isEngineRunning = false;

    if (this.dynoGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.dynoGain.gain.linearRampToValueAtTime(0.0001, now + 0.2);
      setTimeout(() => {
        try {
          if (this.dynoOsc1) { this.dynoOsc1.stop(); this.dynoOsc1.disconnect(); }
          if (this.dynoOsc2) { this.dynoOsc2.stop(); this.dynoOsc2.disconnect(); }
          if (this.dynoSub) { this.dynoSub.stop(); this.dynoSub.disconnect(); }
        } catch (e) {}
        this.dynoOsc1 = null;
        this.dynoOsc2 = null;
        this.dynoSub = null;
      }, 250);
    }
  }
}

// Instantiate and bind to both global and window namespaces
const redlineAudio = new RedlineAudioEngine();
window.redlineAudio = redlineAudio;
