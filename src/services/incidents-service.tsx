import {useEffect, useState} from "react";
import {Service} from "../types/service";
import {IIncident} from "../types/incidents";

export interface Incidents {
    incidents: IIncident[]
    incident: IIncident
}

const api = "https://bikewise.org:443/api/v2/incidents";
const per_page = 10;
const incident_type = "theft";
const proximity = "45.521728%2C-122.67326";
const proximity_square = "100";

const useIncidentsService = (id?: number, pageIndex?: number, query?: string, occurred_after?: number, occurred_before?: number) => {

    const [result, setResults] = useState<Service<Incidents>>({
        status: 'loading'
    })


    const queryString = query
    useEffect(() => {
        const url = id && id >= 0 ? `${api}/${id}` : `${api}?page=${pageIndex}&per_page=${per_page}&incident_type=${incident_type}&proximity=${proximity}&proximity_square=${proximity_square}&occurred_before=${occurred_before && occurred_before > 100 ? occurred_before : ""}&occurred_after=${occurred_after && occurred_after > 100 ? occurred_after : ""}&query=${queryString}`;
        fetch(url, {
            headers: {
                "Cache-Control": "max-age=0, private, must-revalidate",
                "Content-Type": "application/json"
            }

        })
            .then(response => response.json())
            .then(response => {
                setResults({status: 'loaded', payload: response})
            })
            .catch(error => setResults({status: 'error', error}))
    }, [id, occurred_after, occurred_before, pageIndex, query, queryString])


    return result;
};


export default useIncidentsService;