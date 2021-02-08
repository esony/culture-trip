import { useEffect, createRef } from 'react'
import { Marker, Popup } from 'react-leaflet'
import css from './DestinationCard.module.css'
import Location from '../../types/Location'
import { secondsToDisplayTime } from '../../utils/utils'
import { Marker as MarkerType } from 'leaflet'
import Itinerary from '../../types/Itinerary'

type Props = {
  destination: Location
  itinerary?: Itinerary
  routeOpen: boolean
  setRouteOpen: (value: boolean) => void
}

const DestinationCard = ({
  destination,
  itinerary,
  routeOpen,
  setRouteOpen,
}: Props) => {
  const { location, name, description, opening_hours } = destination
  const blinkerRef = createRef<MarkerType<any>>()
  const today = new Date().getDay()

  useEffect(() => {
    setRouteOpen(false)
  }, [destination])

  useEffect(() => {
    blinkerRef.current?.openPopup()
  }, [blinkerRef])

  return (
    <Marker
      position={[location.lat, location.lon]}
      title={name.en}
      alt={name.en}
      ref={blinkerRef}
    >
      <Popup className={css.popup}>
        <img src={description.images[0]?.url} className={css.thumbnail} />
        <section className={css.description}>
          <h1 className={css.cardHeader}>{name.en}</h1>
          <p>{description.body}</p>
          <div className={css.openingHours}>
            Open today: {opening_hours.hours[today].opens?.substr(0, 5)}
            &nbsp;-&nbsp;
            {opening_hours.hours[today].closes?.substr(0, 5)}
            <br />
            Travel time: &nbsp;
            {itinerary && secondsToDisplayTime(itinerary.duration)}
          </div>

          <div className={css.route}>
            <button onClick={() => setRouteOpen(!routeOpen)}>
              {routeOpen ? 'Hide route' : 'Show route'}
            </button>
            {routeOpen && itinerary && (
              <div className={css.routeDetails}>
                {itinerary.legs.map((x, i) => {
                  const duration = secondsToDisplayTime(x.duration)

                  return (
                    <div className={css.routeLegRow} key={i}>
                      <div>
                        {x.mode} ({duration})
                      </div>
                      <div>
                        {x.route?.shortName} &nbsp;
                        {x.from?.name} - {x.to?.name}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </Popup>
    </Marker>
  )
}

export default DestinationCard
