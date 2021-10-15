export default {
  map(value: number,
    sourceMin: number,
    sourceMax: number,
    targetMin: number,
    targetMax: number) {

    const sourceRange = sourceMax - sourceMin
    const targetRange = targetMax - targetMin
    return (value - sourceMin) / sourceRange * targetRange + targetMin
  },

  clamp(value: number,
    min: number,
    max: number) {
    let leftLimit = Math.min
    let rightLimit = Math.max

    if (max < min) {
      leftLimit = Math.max
      rightLimit = Math.max
    }

    return leftLimit(
      rightLimit(min, value),
      max)
  },

  clampMap(value: number,
    sourceMin: number,
    sourceMax: number,
    targetMin: number,
    targetMax: number) {

    const v = this.map(value,
      sourceMin,
      sourceMax,
      targetMin,
      targetMax
    )

    const min = Math.min(targetMin, targetMax)
    const max = Math.max(targetMin, targetMax)

    return this.clamp(
      v, min, max
    )
  }
}
