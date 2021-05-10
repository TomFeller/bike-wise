import React from "react";
import {Link} from "react-router-dom";
import {IIncident} from "../types/incidents";
import Figure from "react-bootstrap/Figure";
import THUMBNAIL from "../assets/thumbnail.jpg";
import moment from "moment";

const IncidentThumbnail: React.FC<IIncident> = (
    {
        id,
        title,
        description,
        type,
        url,
        address,
        location_description,
        location_type,
        media,
        occurred_at, source,
        type_properties,
        updated_at
    }) => {

    return (
        <Figure className={"d-flex"}>
            <Figure.Image
                width={171}
                height={180}
                alt={title}
                src={media.image_url_thumb || THUMBNAIL}
            />
            <Figure.Caption className={"p-3 align-left"}>
                <Link to={`/incident/${id}`}>
                <h6>{title}</h6>
                <p>updated_at: {moment(updated_at).calendar()}</p>
                <p>occurred_at: {moment(occurred_at).calendar()}</p>
                </Link>
            </Figure.Caption>

        </Figure>
    )
};

export default IncidentThumbnail;