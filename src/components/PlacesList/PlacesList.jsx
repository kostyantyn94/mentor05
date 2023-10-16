import React from 'react';
import PropTypes from 'prop-types';

export const PlacesList = ({places, onPlacesRemove}) => {
  console.log(places)
  return (
    <>
      {places.map(place=>(
        <div>
          {place.name}
          <button 
            onClick={()=> {onPlacesRemove(place.id)}}
          >
            Remove
          </button>
        </div>
      ))}
    </>
  );
};

PlacesList.propTypes = {
  places: PropTypes.bool,
  onPlacesRemove: PropTypes.func
};

PlacesList.defaultProps = {
  places: [],
  onPlacesRemove: () => {}
}