(function () {
  const defaultOrder = 7
  const width = 375
  const height = 375
  const frames = 80
  const phases = utils.distribute(frames)

  // Canvas setup
  const element = document.querySelector('.wavebox')
  const context = element.getContext('2d')
  const next = loop => window.requestAnimationFrame(loop)

  // Model & view setup
  const collection = utils.times(width * height, index => {
    const x = index % width
    const y = Math.floor(index / width)

    return new Quasi.Models.Wave({ x, y, phases })
  })

  const view = new Quasi.Views.Quasicrystal({
    context, collection, next, width, height
  })

  // Select box
  const select = document.querySelector('.order')
  const order = new Quasi.Views.Order({ element: select, collection })

  order.update(defaultOrder)
  order.render()

  // Initialize wave box
  context.scale(1.34, 1.34)
  view.render()
})()
