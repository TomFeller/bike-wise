import React from "react";
import {IIncident} from "../types/incidents";
import {useHistory} from "react-router-dom";
import useIncidentsService from "../services/incidents-service";


const SingleIncident: React.FC = () => {
    const history = useHistory();
    const incidentId = history.location.pathname.replace("/incident/", "");
    const fetch = useIncidentsService(incidentId);

    return (
        <div className={"container"}>

            {fetch.status === 'loading' && <div>LOADING</div>}
            {fetch.status === 'loaded' && <Incident key={fetch.payload.incident.id} {...fetch.payload.incident}/>}
            {fetch.status === 'error' && <div>ERROR</div>}
        </div>
    )
};

const Incident: React.FC<IIncident> = (
    {id, title, address, media, description}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>Address: {address}</p>
            {media.image_url && <img width={"100%"} src={media.image_url}/>}
        </div>
    )
}

export default SingleIncident;