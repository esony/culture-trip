import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import css from './Map.module.css'

const Map = () => {
  L.Icon.Default.imagePath = '/'

  return (
    <MapContainer
      center={[60.192059, 24.945831]}
      zoom={13}
      scrollWheelZoom={true}
      className={css.mapContainer}
    >
      <TileLayer
        id="hsl-map"
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        url="https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png"
      />
      <Marker position={[60.192059, 24.945831]}>
        <Popup>
          <h2>A place of interest</h2>
          <br /> There must be something here!
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
