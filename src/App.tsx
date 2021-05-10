import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import IndicatesGallery from "./components/incidents-gallery";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SingleIncident from "./components/single-incident";

function App() {

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/incident/:id">
                        <SingleIncident/>
                    </Route>
                    <Route path="/">
                        <IndicatesGallery/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
