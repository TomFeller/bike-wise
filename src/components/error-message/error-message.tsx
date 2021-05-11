import React from "react";
import {MdError} from "react-icons/md";

const ErrorMessage = () => {
    return (
        <div>
            <p>An error has occurred</p>
            <MdError size={40}/>
        </div>
    )
};

export default ErrorMessage;