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
