import React, { useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import {Map} from "./components/Map"
import { Autocomplete } from "./components/Autocomplete";

import s from './App.module.css';

const API_KEY = process.env.REACT_APP_API_KEY

const defaultCenter = {
  lat: 48.22,
  lng: 31.10
};

const libraries = ['places']

const App = () => {
  const [center, setCenter] = React.useState(defaultCenter)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries
  })

  const onPlaceSelect = React.useCallback(
    (coordinates) => {
      setCenter(coordinates)
    },
    [],
  )

  return (
    <div>
      <div className={s.addressSearchContainer}>
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
      </div>
      {isLoaded ? <Map center={center} /> : <h2>Loading</h2>}
    </div>
  );
}

export default App;
