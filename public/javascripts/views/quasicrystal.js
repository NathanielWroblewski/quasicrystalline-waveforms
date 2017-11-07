namespace('Quasi.Views')

class Quasicrystal {
  constructor ({ context, collection, width, height, next }) {
    this.context = context
    this.collection = collection
    this.width = width
    this.height = height
    this.next = next
  }

  update () {
    this.collection.map(model => model.advance())
  }

  draw (data) {
    return data.forEach(({ x, y, value }) => {
      const color = Math.floor(value * 255)
      const rgb = `rgb(${color}, ${color}, ${color})`

      this.context.beginPath()
      this.context.lineWidth = 1
      this.context.fillStyle = rgb
      this.context.strokeStyle = rgb
      this.context.rect(x, y, 1, 1)
      this.context.stroke()
      this.context.fill()
    })
  }

  clear () {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  render () {
    const data = this.collection.map(model => model.toJSON())

    this.clear()
    this.update()
    this.draw(data)
    this.next(() => this.render())
  }
}

Quasi.Views.Quasicrystal = Quasicrystal

