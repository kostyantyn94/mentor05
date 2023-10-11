import React, {useCallback, useState} from "react";
import {useJsApiLoader} from "@react-google-maps/api";

import {Map, MODES} from "./components/Map"
import {Autocomplete} from "./components/Autocomplete";
import {PlacesList} from "./components/PlacesList";

import s from './App.module.css';
import {SidebarWrapper} from "./components/SidebarWrapper";

const API_KEY = process.env.REACT_APP_API_KEY

const defaultCenter = {
  lat: 48.22,
  lng: 31.10
};


const libraries = ['places']

const App = () => {
  const [center, setCenter] = React.useState(defaultCenter)
  const [mode, setMode] = React.useState(MODES.MOVE)
  const [markers, setMarkers] = React.useState([])
  const [sidebarOpened, setSidebarOpened] = useState(true);


  const {isLoaded} = useJsApiLoader({
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

  const toggleMode = React.useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKER);
        break;
      case MODES.SET_MARKER:
        setMode(MODES.MOVE);
        break;
      default:
        setMode(MODES.MOVE);
    }
    console.log(mode)
  }, [mode])

  const onMarkerAdd = (coordinates) => {
    setMarkers([...markers, coordinates]);
  }

  const clear = React.useCallback(() => {
    setMarkers([])
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarOpened(!sidebarOpened);
  }, [sidebarOpened]);

  return (
    <div>
      <SidebarWrapper className={s.addressSearchContainer} isOpened={sidebarOpened}>
        <div className={s.autocompleteWrapper}>
          <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect}/>
          <button className={s.modeToggle} onClick={toggleMode}>Set markers</button>
          <button className={s.modeToggle} onClick={clear}>Clear</button>
        </div>
        <PlacesList/>
      </SidebarWrapper>
      <button className={s.collapseButton} onClick={toggleSidebar}>{sidebarOpened ? 'Collapse' : 'Expand'}</button>
      {isLoaded ? <Map center={center} mode={mode} markers={markers} onMarkerAdd={onMarkerAdd}/> : <h2>Loading</h2>}
    </div>
  );
}

export default App;
