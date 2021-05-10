import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {IIncident} from "../../types/incidents";
import useIncidentsService from "../../services/incidents-service";
import Map from "../map/map";

const geocode_key = "AIzaSyAqBFP8h4QLMBXq-AMhRPH5kIiD1KApFIE";

export const SingleIncident: React.FC = () => {
    const history = useHistory();
    const incidentId = history.location.pathname.replace("/incident/", "");
    const fetch = useIncidentsService(parseInt(incidentId));



    return (
        <div className={"container"}>

            {fetch.status === 'loading' && <div>LOADING</div>}
            {fetch.status === 'loaded' && <Incident key={fetch.payload.incident.id} {...fetch.payload.incident}/>}
            {fetch.status === 'error' && <div>ERROR</div>}
        </div>
    )
};

const Incident: React.FC<IIncident> = (
    {
        id,
        title,
        address,
        media,
        description,
        location_description
    }) => {



    const {image_url} = media;
    const location = {
        address: address,
        lat:0,
        lng:0
    };
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>Address: {address}</p>
            <Map location={location} zoomLevel={17} />



            {location_description && <p>{location_description}</p>}
            {image_url && <img width={"100%"} src={image_url}/>}
        </div>
    )
}