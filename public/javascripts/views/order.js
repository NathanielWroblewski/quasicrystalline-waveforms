namespace('Quasi.Views')

const OPTIONS = [
  { name: 'four', value: 4 },
  { name: 'five', value: 5 },
  { name: 'six', value: 6 },
  { name: 'seven', value: 7 },
  { name: 'eight', value: 8 },
  { name: 'nine', value: 9 },
  { name: 'ten', value: 10 },
  { name: 'eleven', value: 11 },
  { name: 'twelve', value: 12 },
  { name: 'thirteen', value: 13 }
]

class Order {
  constructor ({ element, collection }) {
    this.element = element
    this.collection = collection

    this.setListeners()
  }

  setListeners () {
    this.element.addEventListener('change', ({ target: { value } }) =>
      this.update(value)
    )
  }

  update (order) {
    const newAngles = utils.distribute(parseInt(order, 10))

    this.collection.forEach(wave => wave.angles = newAngles)
  }

  template () {
    return OPTIONS.reduce((memo, { name, value }) => {
      return memo + `<option value=${value} ${value === 7 && 'selected'}>${name}</option>`
    }, '')
  }

  render () {
    this.element.innerHTML = this.template()
  }
}

Quasi.Views.Order = Order

