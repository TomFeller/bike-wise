import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import useIncidentsService from "../../services/incidents-service";
import GalleryLoading from "./gallery-loading";
import GalleryItems from "./gallery-items";
import GallerySearchForm from "./gallery-search-form";
import GalleryNoResults from "./gallery-no-results";
import "./incidents-gallery.scss";

export const IndicatesGallery: React.FC = () => {
    const history = useHistory();
    const params = useParams<{ pageIndex: string, query: string }>();
    const pageIndex = params.pageIndex;
    const query = params.query;
    const fetch = useIncidentsService(-1, parseInt(pageIndex), query || "");
    const [searchValue, setSearchValue] = useState(query || "");

    const onSearchChange = (value: string) => setSearchValue(value);
    const onSearchSubmit = () => history.push(`/gallery/${1}/${searchValue}`);

    const isLoading = fetch.status === 'loading';
    const isError = fetch.status === 'error';
    const noIncidentsFound = fetch.status === 'loaded' && fetch.payload.incidents.length === 0

    return (
        <div className={'container incidents-gallery'}>
            <div className={'my-5'}>
                <h1>Thefts in Berlin Metropolitan area</h1>
                <h4>Total theifs: 13611</h4>
                {query && <h4>Filter By: {query}</h4>}
            </div>

            {isLoading && <GalleryLoading/>}

            {fetch.status === 'loaded' &&
            <>
                {!noIncidentsFound && <GallerySearchForm searchValue={searchValue}
                                                         pageIndex={parseInt(pageIndex)}
                                                         onSearchChange={onSearchChange}
                                                         onSearchSubmit={onSearchSubmit}/>}

                {noIncidentsFound ? <GalleryNoResults/> : <GalleryItems incidents={fetch.payload.incidents} />}

                <GallerySearchForm searchValue={searchValue}
                                   pageIndex={noIncidentsFound ? -1 : parseInt(pageIndex)}
                                   onSearchChange={onSearchChange} onSearchSubmit={onSearchSubmit}/>
            </>
            }
            {isError && <div>ERROR</div>}
        </div>
    )
};

