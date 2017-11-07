(function () {
  let order = 7 // number of waves to combine
  const angles = utils.distribute(order)
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

    return new Quasi.Models.Wave({ x, y, angles, phases })
  })

  const view = new Quasi.Views.Quasicrystal({
    context, collection, next, width, height
  })

  // Select box listener
  const select = document.querySelector('.order')
  const reorder = ({ target: { value } }) => {
    order = parseInt(value, 10)
    const newAngles = utils.distribute(order)

    collection.forEach(wave => wave.angles = newAngles)
  }
  select.addEventListener('change', reorder)

  // Initialize
  context.scale(1.34, 1.34)
  view.render()
})()
