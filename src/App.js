import React, {useCallback, useState} from "react";
import {useJsApiLoader} from "@react-google-maps/api";
import {DirectionsService} from '@react-google-maps/api';
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
      const place = {
        name,
        id: place_id
      }
      setCenter(coordinates)
      setMarkers([...markers, coordinates])
      setPlaces([...places, place])

      if (places.length >= 2) {
        DirectionsService.route({
          origin: markers[0],
          destination: markers[markers.length-1],
          travelMode: "driving",
        }, (result, status) => {
          console.log(result, status)
          // if (status === google.maps.DirectionsStatus.OK) {
          //   this.setState({
          //     directions: result,
          //   });
          // } else {
          //   console.error(`error fetching directions ${result}`);
          // }
        });
      }
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
      {isLoaded ? <Map center={center} markers={markers} /> : <h2>Loading</h2>}
    </div>
  );
}

export default App;
