import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import IndicatesGallery from "./components/incidents-gallery";
import SingleIncident from "./components/single-incident";
import './App.scss';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/incident/:id">
                        <SingleIncident/>
                    </Route>
                    <Route path="/gallery/:pageIndex?/:query?">
                        <IndicatesGallery/>
                    </Route>
                    <Redirect to="/gallery/1"/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
