import React from "react";
import {useParams} from "react-router-dom";
import useIncidentsService from "../../services/incidents-service";
import Incident from "./incident";
import SingleLoading from "./single-loading";

export const SingleIncident: React.FC = () => {
    const params = useParams<{id:string}>();
    const incidentId = params.id;
    const fetch = useIncidentsService(parseInt(incidentId));
    return (
        <div className={"container"}>
            {fetch.status === 'loading' && <SingleLoading/>}
            {fetch.status === 'loaded' && <Incident key={fetch.payload.incident.id} {...fetch.payload.incident}/>}
            {fetch.status === 'error' && <div>ERROR</div>}
        </div>
    )
};