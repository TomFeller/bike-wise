import {useEffect, useState} from "react";
import {Service} from "../types/service";
import {IIncident} from "../types/incidents";

export interface ICount {
    non: number
    stolen: number
    proximity: number
}

const api = "http://bikeindex.org:443/api/v3";

const incident_type = "theft";
const location = "1";
const proximity_square = "100";

const useTotalService = (query?: string, occurred_after?: number, occurred_before?: number) => {
    const [result, setResults] = useState<Service<ICount>>({
        status: 'loading'
    });
    const queryString = query;
    useEffect(() => {
        console.log("vdvsdvsdvsvsvsvdvsd")
        const url = `${api}/search/count?incident_type=${incident_type}&location=${location}&distance=${proximity_square}&stolenness=stolen`;
        const token = "UdySf1fvlpqg98yLUs_vSAxf5qfwqYHMnBAN4c4rUXc";
        fetch(`${url}&access_token=${token}`)
            .then(response => response.json())
            .then(response => {
                setResults({status: 'loaded', payload: response})
            })
            .catch(error => setResults({status: 'error', error}))
    }, [occurred_after, occurred_before, query, queryString])


    return result;
};

export default useTotalService;