import {useEffect, useState} from "react";
import {Service} from "../types/service";
import {Incidents} from "./incidents-service";

const api = "https://bikewise.org:443/api/v2/incidents";
const per_page = 10;
const incident_type = "theft";
const proximity = "45.521728%2C-122.67326";
const proximity_square = "100";

const useTotalIncidentsService = () => {
    const [result, setResults] = useState<Service<any>>({
        status: 'loading'
    })

    useEffect(() => {
        const url = `${api}?per_page=${15000}&incident_type=${incident_type}&proximity=${proximity}&proximity_square=${proximity_square}`;
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
    }, []);

    return result;
};


export default useTotalIncidentsService;