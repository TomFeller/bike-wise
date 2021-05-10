import React from "react";
import {Col, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {IIncident} from "../../types/incidents";
import useIncidentsService from "../../services/incidents-service";
import IncidentThumbnail from "./incident-thumbnail";
import GalleryPagination from "./gallery-pagination";
import "./incidents-gallery.scss";

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