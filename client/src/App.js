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
    goemetry: {
      lat: "",
      lng: ""
    },
    name: ""
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

  const MapWrapper = withScriptjs(withGoogleMap(() => 
    <GoogleWrapper 
      selectedCar={selectedCar}
      showMarker={showMarker}
      setSelectedCar={setSelectedCar}
    />));
    
  useEffect(() => {
    navClick();
  }, [])

  const navClick = () => {
    carData.features.map(data => {
      setMapChange({
        goemetry: {
          lat: data.coordinates,
          lng: data.coordinates
        },
        name: data.properties.NAME
      })
    })
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
