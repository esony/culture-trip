import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import css from './index.module.css'
import Location from '../types/Location'
import { PAGE_TITLE, PAGE_DESCRIPTION } from '../utils/constants'
import Modal from '../components/Modal/Modal'
import cn from 'classnames'

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
  const [modalOpen, setModalOpen] = useState(true)
  const [hasClicked, setHasClicked] = useState(true)

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
    setHasClicked(true)
    if (places.length === 0) {
      return
    }

    const max = places.length - 1
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

  const handleCloseModal = () => {
    setHasClicked(false)
    setModalOpen(false)
  }

  return (
    <>
      <Head>
        <title>Culture Trip</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={PAGE_TITLE} key="og-title" />
        <meta
          property="og:description"
          content={PAGE_DESCRIPTION}
          key="og-description"
        />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
      </Head>
      <main>
        <Modal isOpen={modalOpen}>
          <h1 className={css.modalHeader}>
            Tired of fighting over where to go? Look no further!
          </h1>
          <p>
            Use modern technology to find a place of culture to visit. You will
            even be provided with instructions on how to get there.
          </p>
          <button className={css.modalButton} onClick={handleCloseModal}>
            Start
          </button>
        </Modal>
        <button
          onClick={pickNewDestination}
          className={cn(css.button, { [css.highlight]: !hasClicked })}
        >
          Pick a new destination
        </button>
        <DynamicMap
          itinerary={data?.plan.itineraries[0]}
          destination={selectedPlace}
        />
        <div className={css.copyright}>
          <div>Travel itinerary © HSL 2021</div>
          <div>Marketing information © MyHelsinki OpenAPI</div>
        </div>
      </main>
    </>
  )
}
