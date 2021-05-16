import React from "react";
import moment from "moment";

interface IProps {
    address: string,
    occurred_at: number,
    updated_at: number
}

const IncidentDetails: React.FC<IProps> = (
    {address, occurred_at, updated_at}
) => {
    const occurredAt = moment(parseInt(occurred_at + "000")).calendar();

    return (
        <div className={"align-left"}>
            <p><span className={"bold"}>Stolen From:</span> {address}</p>
            <p><span className={"bold"}>{`Date of theft: `}</span>{occurredAt}</p>
        </div>
    )
}

export default IncidentDetails