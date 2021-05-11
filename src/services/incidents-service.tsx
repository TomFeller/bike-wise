import {useEffect, useState} from "react";
import {Service} from "../types/service";
import {IIncident} from "../types/incidents";

export interface Incidents {
    incidents: IIncident[]
    incident:IIncident
}

const api = "https://bikewise.org:443/api/v2/incidents";

const useIncidentsService = (id?:number, pageIndex?: number, query?:string) => {
    const [result, setResults] = useState<Service<Incidents>>({
        status:'loading'
    })

    useEffect(() => {
        const url = id && id >= 0 ?
            `${api}/${id}` :
            `${api}?page=${pageIndex}&per_page=10&incident_type=theft&proximity=45.521728%2C-122.67326&proximity_square=100&query=${query}`;
        fetch(url, {
            headers: {
                "Cache-Control": "max-age=0, private, must-revalidate",
                "Content-Type": "application/json"
            }

        })
            .then(response => response.json())
            .then(response => {
                setResults({status:'loaded',payload:response})
            })
            .catch(error => setResults({status:'error', error}))
    }, [id, pageIndex, query])


    return result;
};

export default useIncidentsService;