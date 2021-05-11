import React, {useState} from 'react'
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode"
import './map.scss';
import LocationPin from "./location-pin";


export interface ILocation {
    address: string,
    lat: number,
    lng: number,
}

type IProps = {
    location: ILocation,
    zoomLevel?: number,
}

const api_key = "AIzaSyBcyVBegToxQP5G-KDm7xVM0AeFl-zbWKA";
const geocode_key = "AIzaSyAqBFP8h4QLMBXq-AMhRPH5kIiD1KApFIE";
const Map: React.FC<IProps> = ({location, zoomLevel = 8}) => {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    Geocode.setApiKey(geocode_key);

    Geocode.fromAddress(location.address).then(
        (response: any) => {
            const {lat, lng} = response.results[0].geometry.location;
            setLat(lat);
            setLng(lng);
        },
        (error: any) => {
            console.error(error);
        }
    );

    if (!lat || !lng) {
        return <div>loading</div>
    }

    return <div className="map">
        <div className="google-map">
            <GoogleMapReact bootstrapURLKeys={{key: api_key}}
                            defaultCenter={{...location, lat: lat, lng: lng}}
                            defaultZoom={zoomLevel}>
                <LocationPin lat={lat}
                             lng={lng}
                             address={location.address}/>
            </GoogleMapReact>
        </div>
    </div>
};



export default Map;