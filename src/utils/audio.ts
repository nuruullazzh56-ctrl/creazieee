/**
 * Web Audio API gentle romantic ambient music synthesizer.
 * Creates an elegant, soft romantic harp/piano-like acoustic loop for the wedding invitation.
 * Runs 100% reliably in browser offline or online without external audio network dependencies.
 */

class RomanticMusicPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private noteIndex = 0;

  // Gentle acoustic chords sequence (D major / B minor romantic progression)
  private sequence: number[] = [
    // Frequencies (Hz): D4, F#4, A4, D5, C#5, B4, A4, G4, F#4, E4
    293.66, 369.99, 440.0, 587.33,
    554.37, 440.0, 493.88, 369.99,
    440.0, 329.63, 369.99, 293.66,
    369.99, 440.0, 587.33, 440.0,
    392.00, 329.63, 293.66, 220.0
  ];

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  public async start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    this.isPlaying = true;
    this.playNextNote();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private playNextNote() {
    if (!this.isPlaying || !this.ctx) return;

    const freq = this.sequence[this.noteIndex % this.sequence.length];
    this.noteIndex++;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft tone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Low-pass filter for warm, cozy acoustic tone
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      // Gentle attack and long smooth decay
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.0);
    } catch {
      // Audio node failure fallback
    }

    // Interval to next note
    const delay = (this.noteIndex % 4 === 0) ? 950 : 550;
    this.timerId = window.setTimeout(() => this.playNextNote(), delay);
  }
}

export const musicPlayer = new RomanticMusicPlayer();
