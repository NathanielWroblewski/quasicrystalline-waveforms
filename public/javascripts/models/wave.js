namespace('Quasi.Models')

class Wave {
  constructor ({ x, y, angles = [], phases = [] }) {
    this.x = x
    this.y = y
    this.angles = angles
    this.phases = phases
    this.phase = 0
  }

  // the cosine of all the y-values rotated by theta and moved forward by phase
  waveform (theta) {
    const cth = Math.cos(theta)
    const sth = Math.sin(theta)
    const phase = this.phases[this.phase]

    return (Math.cos((cth * this.x) + (sth * this.y) + phase) + 1) / 2
  }

  combine (waveforms) {
    const result = waveforms.reduce((waveform, memo) => memo + waveform, 0)

    return this.wrap(result)
  }

  // wraps value between 1 and 0
  wrap (value) {
    if (Math.floor(value) % 2 == 0) {
      return value % 1
    } else {
      return 1 - (value % 1)
    }
  }

  advance () {
    this.phase = (this.phase + 1) % this.phases.length
  }

  toJSON () {
    const x = this.x
    const y = this.y
    const waves = this.angles.map(theta => this.waveform(theta))
    const value = this.combine(waves)

    return { x, y, value }
  }
}

Quasi.Models.Wave = Wave
