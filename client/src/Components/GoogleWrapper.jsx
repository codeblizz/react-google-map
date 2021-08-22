import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as carData from "../carData.json";
import mapStyles from "../Styles/mapStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GoogleWrapper = (props) => {
    const [ selectedPark, setSelectedPark ] = useState(null);
    const [ showMarker, setMarker ] = useState(false);

    useEffect(() => {
      setMarker(true);
    }, [])

    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") {
          setSelectedPark(null);
        }
      };
      setMarker(true);
      window.addEventListener("keydown", listener);
      return () => {
        window.removeEventListener("keydown", listener);
      };
    }, []);
  
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 25.094697724251578, lng: 55.15988586164573 }} 
        defaultOptions={{ styles: mapStyles }}
      >
        {carData.features.map(park => (
          showMarker &&
          <Marker
            key={park.properties.PARK_ID}
            position={{
              lat: park.geometry.coordinates[1],
              lng: park.geometry.coordinates[0]
            }}
            onClick={() => {
              setSelectedPark(park);
            }}
            icon={{
              url: () => <FontAwesomeIcon icon="location-dot"/>,
              scaledSize: new window.google.maps.Size(25, 25)
            }}
          />
        ))}
        {selectedPark && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedPark(null);
            }}
            position={{
              lat: selectedPark.geometry.coordinates[1],
              lng: selectedPark.geometry.coordinates[0]
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }

export default GoogleWrapper;