import { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import css from './DestinationCard.module.css'
import Location from '../../types/Location'
import { secondsToDisplayTime } from '../../utils/utils'

type Props = {
  destination: Location
  itinerary: any
}

const DestinationCard = ({ destination, itinerary }: Props) => {
  const { location, name, description, opening_hours } = destination
  const today = new Date().getDay()

  const [routeOpen, setRouteOpen] = useState(false)

  useEffect(() => {
    setRouteOpen(false)
  }, [destination])

  return (
    <Marker
      position={[location.lat, location.lon]}
      title={name.en}
      alt={name.en}
    >
      <Popup className={css.popup}>
        <img src={description.images[0]?.url} className={css.thumbnail} />
        <section className={css.description}>
          <h1 className={css.cardHeader}>{name.en}</h1>
          <p>{description.body}</p>
          <div className={css.openingHours}>
            Open today: {opening_hours.hours[today].opens} -&nbsp;
            {opening_hours.hours[today].closes}
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
                {itinerary.legs.map((x: any, i: number) => {
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
