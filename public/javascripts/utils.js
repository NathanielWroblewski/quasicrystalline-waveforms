namespace('utils')

utils.times = (number, fn) => {
  return new Array(number).fill(0).map((element, index) => fn(index))
}

utils.distribute = amount => {
  return utils.times(amount, index => 2 * Math.PI / amount * index)
}
