import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import css from './index.module.css'
import Location from '../types/Location'

const DynamicMap = dynamic(() => import('../components/Map/Map'), {
  ssr: false,
})

const ITINERARIES = gql`
  query Itinerary($destination: InputCoordinates) {
    plan(
      from: { lat: 60.16699, lon: 24.93988 }
      to: $destination
      numItineraries: 1
    ) {
      itineraries {
        duration
        legs {
          startTime
          endTime
          mode
          from {
            name
          }
          to {
            name
          }
          route {
            shortName
          }
          duration
          realTime
          distance
          transitLeg
          legGeometry {
            length
            points
          }
        }
      }
    }
  }
`

export default function Home() {
  const [places, setPlaces] = useState<Array<Location>>([])
  const [selectedPlace, setSelectedPlace] = useState<Location>()

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await fetch('/api/places')
      const data = await response.json()
      setPlaces(data)
    }

    fetchPlaces()
  }, [])

  const { data, refetch: fetchRoute } = useQuery(ITINERARIES, {
    variables: {},
    fetchPolicy: 'standby',
  })

  const pickNewDestination = () => {
    if (places.length === 0) {
      return
    }

    const max = places.length - 1 || 0
    const randomIndex = Math.floor(Math.random() * max)
    const newDestination = places[randomIndex]

    setSelectedPlace(newDestination)
    fetchRoute({
      destination: {
        lat: newDestination.location.lat,
        lon: newDestination.location.lon,
      },
    })
  }

  return (
    <>
      <Head>
        <title>Culture Trip</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <button onClick={pickNewDestination} className={css.button}>
          Pick new destination
        </button>
        <DynamicMap itinerary={data?.plan.itineraries[0]} destination={selectedPlace} />
      </main>
    </>
  )
}
