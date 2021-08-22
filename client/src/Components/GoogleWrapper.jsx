import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as carData from "../carData.json";
import mapStyles from "../Styles/mapStyles";
import * as IoIcons from 'react-icons/fa';

const GoogleWrapper = (props) => {
    const [ selectedCar, setSelectedCar ] = useState(null);
    const [ showMarker, setMarker ] = useState(false);

    useEffect(() => {
      setMarker(true);
    }, [])

    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") {
          setSelectedCar(null);
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
        {carData.features.map(car => (
          showMarker &&
          <Marker
            key={car.properties.CAR_ID}
            position={{
              lat: car.geometry.coordinates[1],
              lng: car.geometry.coordinates[0]
            }}
            onClick={() => {
              setSelectedCar(car);
            }}
            icon={{
              url: () => <IoIcons.location-sharp/>,
              scaledSize: new window.google.maps.Size(25, 25)
            }}
          />
        ))}
        {selectedCar && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedCar(null);
            }}
            position={{
              lat: selectedCar.geometry.coordinates[1],
              lng: selectedCar.geometry.coordinates[0]
            }}
          >
            <div>
              <h2>{selectedCar.properties.NAME}</h2>
              <p>{selectedCar.properties.DESCRIPTIO}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }

export default GoogleWrapper;