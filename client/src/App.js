import React, { useState } from "react";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import GoogleWrapper from "../src/Components/GoogleWrapper.jsx";
import Navbar from "./Components/NavBar.jsx"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { config } from "./utils";

export default function App() {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const MapWrapper = withScriptjs(withGoogleMap(GoogleWrapper));
  return (
    <Router>
      <Navbar sidebar={sidebar} showSidebar={showSidebar}/>
      <div style={{ width: `${sidebar ? "80vw" : "100vw"}`, height: "100vh", float: "right" }}>
        <Switch>
          {/* <Route exact path="/" render={() => ( */}
            <MapWrapper
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                config.REACT_APP_GOOGLE_KEY
              }`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          {/* )}/> */}
        </Switch>
      </div>
    </Router>
  );
}
