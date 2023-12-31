import React, {useCallback, useState} from "react";
import {useJsApiLoader} from "@react-google-maps/api";
import {Map} from "./components/Map"
import {Autocomplete} from "./components/Autocomplete";
import {PlacesList} from "./components/PlacesList";

import s from './App.module.css';
import {SidebarWrapper} from "./components/SidebarWrapper";

const API_KEY = process.env.REACT_APP_API_KEY

const defaultCenter = {
  lat: 48.22,
  lng: 31.10
};

const App = () => {
  const [center, setCenter] = useState(defaultCenter)
  const [markers, setMarkers] = useState([])
  const [sidebarOpened, setSidebarOpened] = useState(true);
  const [places, setPlaces] = useState([])


  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: ['places']
  })

  const onPlaceSelect = React.useCallback(
    ({coordinates, name, place_id}) => {
      setCenter(coordinates);
      // todo make a new component which will hold 4 buttons (add as final dest., add as waypoint, add as starting point, cancel)
      // todo when user clicks on place from autocomplete, show component instead of places list

      // todo if user clicks cancel - show list instead of buttons, don't add city/place to places state variable
      // todo if user clicks add as final destination - update places array with new city/place value
      // todo if user clicks add as origin - update places array with new city/place value
      // todo if user clicks add as waypoint - update places array with new city/place value
      const place = {
        name,
        id: place_id,
        place_type: 'destination/waypoint/origin'
      }
      setMarkers([...markers, coordinates])
      setPlaces([...places, place])
    },
    [places, markers],
  )


  const clear = React.useCallback(() => {
    setMarkers([])
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarOpened(!sidebarOpened);
  }, [sidebarOpened]);

  const handlePlacesRemove = useCallback((placeId) => {
    console.log(placeId)
    const filteredPlaces = places.filter(place => place.id !== placeId)
    setPlaces(filteredPlaces)
  }, [places])

  return (
    <div>
      <SidebarWrapper className={s.addressSearchContainer} isOpened={sidebarOpened}>
        <div className={s.autocompleteWrapper}>
          <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect}/>
          {/* <button className={s.modeToggle} onClick={toggleMode}>Set markers</button> */}
          <button className={s.modeToggle} onClick={clear}>Clear</button>
        </div>
        <PlacesList places={places} onPlacesRemove={handlePlacesRemove} />
      </SidebarWrapper>
      <button className={s.collapseButton} onClick={toggleSidebar}>{sidebarOpened ? 'Collapse' : 'Expand'}</button>
      {isLoaded ? <Map places={places} center={center} /> : <h2>Loading</h2>}
    </div>
  );
}

export default App;
