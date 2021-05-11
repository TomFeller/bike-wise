import {useEffect, useState} from "react";
import {Service} from "../types/service";
import {IIncident} from "../types/incidents";

export interface Incidents {
    incidents: IIncident[]
    incident:IIncident
}

const api = "https://bikewise.org:443/api/v2/locations";

const useLocationsService = () => {
    const [result, setResults] = useState<Service<any>>({
        status:'loading'
    })

    useEffect(() => {
        // const url = `${api}/page=${pageIndex}&per_page=10&proximity=45.521728%2C-122.67326&proximity_square=100`;

        const url =
            `${api}?per_page=10&proximity=45.521728%2C-122.67326&proximity_square=100`
        fetch(url)
            .then(response => response.json())
            .then(response => {
                setResults({status:'loaded',payload:response})
            })
            .catch(error => setResults({status:'error', error}))
    }, [])


    return result;
};

export default useLocationsService;