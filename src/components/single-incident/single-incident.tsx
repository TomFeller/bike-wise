import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useIncidentsService from "../../services/incidents-service";
import Incident from "./incident";
import SingleLoading from "./single-loading";
import ErrorMessage from "../error-message/error-message";

export const SingleIncident: React.FC = () => {
    const params = useParams<{ id: string }>();
    const incidentId = params.id;
    const fetchItem = useIncidentsService(parseInt(incidentId));
    const [v3Bike, setV3Bike] = useState<any>();

    useEffect(() => {
        fetch(`https://bikeindex.org:443/api/v3/bikes/${incidentId}?access_token=UdySf1fvlpqg98yLUs_vSAxf5qfwqYHMnBAN4c4rUXc`)
            .then(res => res.json())
            .then(data => setV3Bike(data?.bike))
    }, [incidentId]);

    return (
        <div className={"container"}>
            {fetchItem.status === 'loading' && <SingleLoading/>}
            {fetchItem.status === 'loaded' && fetchItem.payload.incident &&
            <Incident key={fetchItem.payload.incident.id} {...fetchItem.payload.incident}/>}

            {v3Bike && <Incident key={v3Bike.id}
                                 {...v3Bike}
                                 occurred_at={v3Bike.date_stolen}
                                 address={v3Bike.stolen_record.location}
                                 lat={v3Bike.stolen_record.latitude}
                                 lng={v3Bike.stolen_record.longitude}
                                 media={{image_url: v3Bike.large_img}}
            />}

            {fetchItem.status === 'error' && <ErrorMessage/>}
        </div>
    )
};