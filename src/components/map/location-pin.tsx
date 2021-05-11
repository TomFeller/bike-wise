import React from "react";
import {MdPinDrop} from "react-icons/md";
import {ILocation} from "./map";

const LocationPin: React.FC<ILocation> = (
    {
        address,
        lat,
        lng
    }) => (
    <div className="pin">
        <MdPinDrop size={45}/>
        <p className="pin-text">{address}</p>
        <p>lat: {lat} </p>
        <p>lng: {lng} </p>
    </div>
)

export default LocationPin;