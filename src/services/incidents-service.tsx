import {useEffect, useState} from "react";
import {Service} from "../types/service";
import {IIncident} from "../types/incidents";

export interface Incidents {
    incidents: IIncident[]
    incident:IIncident
}

const api = "https://bikewise.org:443/api/v2/incidents";

const useIncidentsService = (id?:string) => {
    const [pageIndex, setPageIndex] = useState(1);
    const [result, setResults] = useState<Service<Incidents>>({
        status:'loading'
    })

    useEffect(() => {
        // const url = `${api}/page=${pageIndex}&per_page=10&proximity=45.521728%2C-122.67326&proximity_square=100`;
        const url = id ? `${api}/${id}` : `${api}?page=${pageIndex}&per_page=10&incident_type=theft&proximity=45.521728%2C-122.67326&proximity_square=100`;
        fetch(url)
            .then(response => response.json())
            .then(response => setResults({status:'loaded',payload:response}))
            .catch(error => setResults({status:'error', error}))
    }, [pageIndex])


    return result;
};

export default useIncidentsService;