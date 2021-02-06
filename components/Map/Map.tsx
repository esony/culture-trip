import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import polylineUtil from '@mapbox/polyline'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import css from './Map.module.css'

type Props = {
  polylines: string[]
}

const Map = ({ polylines }: Props) => {
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
      <Marker position={[60.192059, 24.945831]}>
        <Popup>
          <h2>A place of interest</h2>
          <br /> There must be something here!
        </Popup>
      </Marker>
      {polylines.map((x: any, i: number) => (
        <Polyline key={i} positions={polylineUtil.decode(x)}></Polyline>
      ))}
    </MapContainer>
  )
}

export default Map
