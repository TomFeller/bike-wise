import React, {useCallback, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import useIncidentsService from "../../services/incidents-service";
import GalleryLoading from "./gallery-loading";
import GalleryItems from "./gallery-items";
import GallerySearchForm from "./gallery-search-form";
import GalleryNoResults from "./gallery-no-results";
import "./incidents-gallery.scss";
import GalleryPagination from "./gallery-pagination";
import useTotalIncidentsService from "../../services/total-incidents";
import {MdError} from "react-icons/md"
import ErrorMessage from "../error-message/error-message";

export const IndicatesGallery: React.FC = () => {
    const history = useHistory();
    const params = useParams<{ pageIndex: string, query: string }>();
    const pageIndex = parseInt(params.pageIndex);

    const query = params.query;
    const {search} = history.location;

    const [searchValue, setSearchValue] = useState(query || "");
    const [fromDate, setFromDate] = useState<number>(-1);
    const [toDate, setToDate] = useState<number>(-1);
    const [totalIncidents, setTotalIncidents] = useState(0);
    const fetch = useIncidentsService(-1, pageIndex, query || "", fromDate, toDate);
    // const total = useTotalIncidentsService();

    const onSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const onSearchSubmit = useCallback(() => {
        setFromDate(-1);
        setToDate(-1);
        history.push(`/gallery/${1}/${searchValue}`);
    }, [history, searchValue]);

    const onDateChange = useCallback(() => {
        if (fromDate > 0 && toDate > 0) {
            history.push(`/gallery/${1}?from=${fromDate}&to${toDate}`);
        }
    }, [fromDate, history, toDate]);

    const isLoading = fetch.status === 'loading';
    const isError = fetch.status === 'error';
    const noIncidentsFound = fetch.status === 'loaded' && fetch.payload.incidents.length === 0

    // useEffect(() => {
    //     if (total.status === "loaded") {
    //         setTotalIncidents(total.payload.incidents.length);
    //     }
    //
    // }, [total.status])


    useEffect(() => {
        const updateDates = fromDate > 0 && toDate > 0 && !search.includes(fromDate.toString());
        if (updateDates) onDateChange();
    }, [fromDate, search, onDateChange, toDate]);


    return (
        <div className={'container incidents-gallery'}>
            <div className={'my-5'}>
                <h1>Thefts in Berlin Metropolitan area</h1>
                {totalIncidents > 0 && <h4>Total thefts: {totalIncidents}</h4>}
                {query && <h4>Filter By: {query}</h4>}
            </div>

            {isLoading && <GalleryLoading/>}

            {fetch.status === 'loaded' && <>
                <GallerySearchForm searchValue={searchValue}
                                   pageIndex={pageIndex}
                                   onSearchChange={onSearchChange}
                                   onSearchSubmit={onSearchSubmit}
                                   setFromDate={setFromDate}
                                   setToDate={setToDate}/>

                {noIncidentsFound ? <GalleryNoResults/> : <GalleryItems incidents={fetch.payload.incidents}/>}

                {fetch.payload.incidents.length > 9 && pageIndex > 0 &&
                <GalleryPagination length={5} pageIndex={pageIndex}/>}
            </>}

            {isError && <ErrorMessage/>}
        </div>
    )
};

