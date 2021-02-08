type Itinerary = {
  duration: number
  legs: {
    mode: string
    from: {
      name: string
    }
    to: {
      name: string
    }
    route: {
      shortName: string
    }
    duration: number
    legGeometry: {
      length: number
      points: string
    }
  }[]
}

export default Itinerary
