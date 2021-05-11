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
    const updatedAt = moment(parseInt(updated_at + "000")).calendar();
    return (
        <div>
            <p className={"align-left"}><span className={"bold"}>Stolen From:</span> {address}</p>
            <p className={"align-left"}>
                <span className={"bold"}>{`Date of theft: `}</span>
                {occurredAt}
            </p>
            <p className={"align-left"}>
                <span className={"bold"}>{`Date of report of theft: `}</span>
                {updatedAt}
            </p>
        </div>
    )
}

export default IncidentDetails