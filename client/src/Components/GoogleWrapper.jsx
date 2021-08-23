import React from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyles from "../Styles/mapStyles";

const GoogleWrapper = (props) => {  
  const { selectedCar, showMarker, setSelectedCar, mapChange } = props;
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 25.094697724251578, lng: 55.15988586164573 }} 
      defaultOptions={{ styles: mapStyles }}
    >
      {showMarker &&
        <Marker
          key={mapChange.id}
          position={{
            lat: mapChange.geometry.coordinates[0] || "",
            lng: mapChange.geometry.coordinates[1] || ""
          }}
          onClick={() => {
            setSelectedCar(mapChange);
          }}
        />
      }
      {selectedCar && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedCar(null);
          }}
          position={{
            lat: mapChange.geometry.coordinates[0],
            lng: mapChange.geometry.coordinates[1]
          }}
        >
          <div>
            <h2>{mapChange.name}</h2>
            <p>{mapChange.desc}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default GoogleWrapper;