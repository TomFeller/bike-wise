import React from "react";
import Figure from "react-bootstrap/Figure";
import {IIncident} from "../../types/incidents";
import THUMBNAIL from "../../assets/thumbnail.jpg";
import moment from "moment";

const IncidentThumbnail: React.FC<IIncident> = (
    {
        title,
        media,
        occurred_at, source,
        updated_at,

    }) => {
    const occurredAt = moment(parseInt(occurred_at + "000")).calendar();
    const updatedAt = moment(parseInt(updated_at + "000")).calendar();
    return (
        <Figure className={"d-flex m-0 py-3"}>
            <Figure.Image
                width={150}
                height={150}
                alt={title}
                className={"d-block mb-0"}
                src={media.image_url_thumb || THUMBNAIL}/>
            <Figure.Caption className={"p-3 align-left"}>
                <h6>{title}</h6>
                <p><span className={"bold"}>{`Occurred_at: `}</span>{occurredAt}</p>
                <p><span className={"bold"}>{`Updated_at: `}</span>{updatedAt}</p>
            </Figure.Caption>

        </Figure>
    )
};

export default IncidentThumbnail;