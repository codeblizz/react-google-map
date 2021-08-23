import React, { useState, useEffect } from "react";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import GoogleWrapper from "../src/Components/GoogleWrapper.jsx";
import Navbar from "./Components/NavBar.jsx"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { config } from "./utils";
import { MenuNames } from "../src/Components/MenuNames";
import * as carData from "./carData.json";

export default function App() {
  const [ sidebar, setSidebar ] = useState(true);
  const [ selectedCar, setSelectedCar ] = useState(null);
  const [ showMarker, setMarker ] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [ mapChange, setMapChange ] = useState({
    id: null,
    geometry: {
      coordinates: []
    },
    name: "",
    desc: ""
  });

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

  const MapWrapper = withScriptjs(withGoogleMap(() => (
    <GoogleWrapper 
      selectedCar={selectedCar}
      showMarker={showMarker}
      setSelectedCar={setSelectedCar}
      mapChange={mapChange}
    />
  )));

  const navClick = (item) => {
    if(item){
      let filterdata = carData.features.filter(data => item.id === data.properties.CAR_ID)
      filterdata.map(data => {
        setMapChange({
          id: data.properties.CAR_ID,
          geometry: {
            coordinates: [
              data.geometry.coordinates[0],
              data.geometry.coordinates[1]
            ]
          },
          name: data.properties.NAME,
          desc: data.properties.DESCRIPTIO
        })
      })
    } else {
        setMapChange({
          id: null,
          geometry: {
            coordinates: []
          },
          name: "",
          desc: ""
        })
    }
  }

  return (
    <Router>
      <Navbar sidebar={sidebar} showSidebar={showSidebar} navClick={navClick} />
      <div style={{ width: `${sidebar ? "80vw" : "100vw"}`, height: "100vh", float: "right" }}>
        <Switch>
          {MenuNames.map((name) => (
            <Route
              key={name.title}
              exact={name.exact}
              path={name.path}
              children={() => (
                <MapWrapper
                  showMarker
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                    config.REACT_APP_GOOGLE_KEY
                  }`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              )}
            />
          ))}
        </Switch>
      </div>
    </Router>
  );
}
