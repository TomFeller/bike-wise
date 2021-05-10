import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import IndicatesGallery from "./components/incidents-gallery/";
import SingleIncident from "./components/single-incident/";
// import SingleIncident from "./components/single-incident/";

function App() {

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/incident/:id">
                        <SingleIncident/>
                    </Route>
                    <Route path="/gallery/:pageIndex?">
                        <IndicatesGallery/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
