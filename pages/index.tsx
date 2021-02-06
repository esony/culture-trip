import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'

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
        legs {
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
  const [destination, setDestination] = useState({
    lat: 60.175294,
    lon: 24.684855,
  })

  const { loading, error, data } = useQuery(ITINERARIES, {
    variables: { destination },
  })

  if (error) {
    alert(error)
  }

  const polylines: Array<string> =
    loading || error
      ? []
      : data.plan.itineraries[0].legs.map((x: any) => x.legGeometry.points)

  return (
    <>
      <Head>
        <title>Culture Trip</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DynamicMap polylines={polylines} />
      </main>
    </>
  )
}
