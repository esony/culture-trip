import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet'
import polylineUtil from '@mapbox/polyline'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import css from './Map.module.css'
import Location from '../../types/Location'
import { getColor } from '../../utils/utils'
import DestinationCard from './DestinationCard'
import { useEffect, useMemo, useRef } from 'react'
import { Marker as MarkerType } from 'leaflet'

type Props = {
  itinerary: any
  destination?: Location
  origin: { lat: number; lon: number }
  setOrigin: any
}

const Map = ({ itinerary, destination, origin, setOrigin }: Props) => {
  L.Icon.Default.imagePath = '/'

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setOrigin({
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          })
        },
        (error) => {
          console.log(error)
        },
        {
          timeout: 5000,
        }
      )
    }
  }, [])

  const originRef = useRef<MarkerType<any>>(null)
  const handleDragOrigin = useMemo(
    () => ({
      dragend() {
        const marker = originRef.current
        if (marker != null) {
          const { lat, lng: lon } = marker.getLatLng()
          setOrigin({ lat, lon })
        }
      },
    }),
    []
  )

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
      <Marker
        position={[origin.lat, origin.lon]}
        title="Origin"
        draggable={true}
        eventHandlers={handleDragOrigin}
        ref={originRef}
      ></Marker>
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
