import React from "react";
import {IIncident} from "../../types/incidents";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import IncidentThumbnail from "./incident-thumbnail";

interface IProps {
    incidents: IIncident[]
}

const GalleryItems: React.FC<IProps> = ({incidents}) => {
    return (
        <Row className={"mb-3"}>
            {incidents.map((incident: IIncident) => {
                const {id} = incident;
                return <Col lg={6} key={id} className={"incidents-gallery-item"}>
                    <Link to={`/incident/${id}`}>
                        <IncidentThumbnail {...incident}/>
                    </Link>
                </Col>
            })}
        </Row>
    )
};

export default GalleryItems;