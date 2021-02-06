import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import polylineUtil from '@mapbox/polyline'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import css from './Map.module.css'
import Location from '../../types/Location'

type Props = {
  polylines: string[]
  destination?: Location
}

const Map = ({ polylines, destination }: Props) => {
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
        <Marker
          position={[destination.location.lat, destination.location.lon]}
          title={destination.name.en}
          alt={destination.name.en}
        >
          <Popup className={css.popup}>
            <img
              src={destination.description.images[0]?.url}
              className={css.thumbnail}
            />
            <div className={css.description}>
              <h2>{destination.name.en}</h2>
              {destination.description.body}
            </div>
          </Popup>
        </Marker>
      )}
      {polylines.map((x: any, i: number) => (
        <Polyline key={i} positions={polylineUtil.decode(x)}></Polyline>
      ))}
    </MapContainer>
  )
}

export default Map
