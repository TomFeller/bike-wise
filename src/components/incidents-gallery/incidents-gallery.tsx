import React from "react";
import {CardDeck, Col, Row} from "react-bootstrap";
import {Link, useParams, useLocation} from "react-router-dom";
import useIncidentsService from "../../services/incidents-service";
import {IIncident} from "../../types/incidents";
import IncidentThumbnail from "./incident-thumbnail";
import "./incidents-gallery.scss";

import Figure from "react-bootstrap/Figure";
import GalleryPagination from "./gallery-pagination";

export const IndicatesGallery: React.FC = () => {
    const params = useParams<{ pageIndex: string }>();
    const pageIndex = params.pageIndex;
    const fetch = useIncidentsService(-1, parseInt(pageIndex));


    return (
        <div className={"container incidents-gallery"}>
            <h1 className={"my-5"}>Thefts in Berlin Metropolitan area</h1>
            {fetch.status === 'loading' && <div>LOADING</div>}
            {fetch.status === 'loaded' &&
            <>
                <Row>
                    {fetch.payload.incidents.map((incident: IIncident) => {
                        return <Col sm={12} key={incident.id}>
                            <Link to={`/incident/${incident.id}`}>
                                <IncidentThumbnail {...incident}/>
                            </Link>
                        </Col>
                    })}
                </Row>
                <GalleryPagination length={10} pageIndex={parseInt(pageIndex)}/>
            </>
            }
            {fetch.status === 'error' && <div>ERROR</div>}
        </div>
    )
};