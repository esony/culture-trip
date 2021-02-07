import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import polylineUtil from '@mapbox/polyline'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import css from './Map.module.css'
import Location from '../../types/Location'
import { getColor } from '../../utils/utils'
import DestinationCard from './DestinationCard'

type Props = {
  itinerary: any
  destination?: Location
}

const Map = ({ itinerary, destination }: Props) => {
  L.Icon.Default.imagePath = '/'

  return (
    <MapContainer
      center={[60.16699, 24.93988]}
      zoom={13}
      scrollWheelZoom={true}
      className={css.mapContainer}
    >
      <TileLayer
        id="hsl-map"
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        url="https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png"
      />
      {destination && (
        <DestinationCard destination={destination} itinerary={itinerary} />
      )}
      {itinerary &&
        itinerary.legs.map((leg: any, i: number) => {
          const color = getColor(leg.mode)

          return (
            <Polyline
              key={i}
              positions={polylineUtil.decode(leg.legGeometry.points)}
              color={color}
            ></Polyline>
          )
        })}
    </MapContainer>
  )
}

export default Map
