import React from "react";
import {CardDeck, Col, Row} from "react-bootstrap";

import useIncidentsService from "../services/incidents-service";
import {IIncident} from "../types/incidents";
import IncidentThumbnail from "./incident-thumbnail";


const IndicatesGallery: React.FC = () => {
    const fetch = useIncidentsService();

    return (
        <div className={"container"}>
            <h1 className={"my-5"}>Thefts in Berlin Metropolitan area</h1>
            {fetch.status === 'loading'&& <div>LOADING</div>}
            {fetch.status === 'loaded'&&
            <Row>
                {fetch.payload.incidents.map((incident: IIncident) => {
                    return <Col sm={12} key={incident.id}><IncidentThumbnail {...incident}/></Col>
                })}
            </Row>
            }
            {fetch.status === 'error' && <div>ERROR</div>}
        </div>
    )
};

export default IndicatesGallery;