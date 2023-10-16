import React, {useRef} from 'react';
import {GoogleMap, DirectionsRenderer} from '@react-google-maps/api';
import s from './Map.module.css'
import {defaultTheme} from './Theme';
import {CurrentLocationMarker} from '../CurrentLocationMarker/CurrentLocationMarker';
import {Marker} from '../Marker'

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme
}

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1
}

const Map = ({center, markers}) => {

  const mapRef = React.useRef(undefined)

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined
  }, []);

  return <div className={s.container}>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={defaultOptions}
    >
      <DirectionsRenderer directions={markers} />
      <CurrentLocationMarker position={center}/>
      {markers.map((pos) => {
        return <Marker position={pos}/>
      })}
    </GoogleMap>
  </div>
}

export {Map}
