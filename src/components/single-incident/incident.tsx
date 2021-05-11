import React from "react";
import {IIncident} from "../../types/incidents";
import useLocationsService from "../../services/locations-service";
import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import THUMBNAIL from "../../assets/thumbnail.jpg";
import Map from "../map/map";
import IncidentDetails from "./incident-details";

const Incident: React.FC<IIncident> = (
    {
        id,
        title,
        address,
        media,
        description,
        occurred_at,
        updated_at,
    }) => {
    const {image_url} = media;
    const locationService = useLocationsService()
    const coordinates = locationService.status === "loaded" ? locationService.payload.features?.find((item: any) => item.properties.id === id).geometry.coordinates : ""
    const location = {address: address, lat: coordinates[0], lng: coordinates[1]};
    return (
        <Row>
            <Col xs={12} className={"align-left py-5"}>
                <div className={"d-flex justify-content-between align-items-center flex-wrap"}>
                <h1>{title}</h1>
                    <Link to={"/"}>Go back to gallery</Link>
                </div>
                <p>{description}</p>

            </Col>
            <Col md={6} lg={7} className={"mb-3"}>
                <img width={"100%"} alt={title} src={image_url || THUMBNAIL}/>
            </Col>
            <Col md={6} lg={5}>
                <Map location={location}
                     zoomLevel={17}/>
                <IncidentDetails address={address}
                                 occurred_at={occurred_at}
                                 updated_at={updated_at}/>
            </Col>
        </Row>
    )
}

export default Incident;