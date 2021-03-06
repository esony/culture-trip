export const getColor = (mode: string) => {
  switch (mode) {
    case 'BUS':
      return 'steelblue'
    case 'WALK':
      return 'forestgreen'
    case 'TRAM':
      return 'brown'
    case 'RAIL':
      return 'violet'
    default:
      return 'cornflowerblue'
  }
}

export const secondsToDisplayTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
  totalSeconds %= 3600
  const minutes = Math.round(totalSeconds / 60)

  return (hours > 0 ? `${hours}h` : '') + `${minutes} min`
}
