import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import "./autocomplete.scss";
import Loader from "../loader";
import classNames from "classnames";
import {useEventListener} from "../../services/use-event-listener";

type IProps = {
    items: any[]
    isLoading: boolean
}

export const AutocompleteBikes: React.FC<IProps> = (
    {items, isLoading}
) => {
    const [hoveringFrame, setHoveringFrame] = useState(-1);
    const history = useHistory();

    useEventListener(
        'keydown',
        ({key}) => {
            switch (key) {
                case "ArrowDown":
                    if (hoveringFrame < items?.length) {
                        setHoveringFrame(hoveringFrame + 1);
                    }
                    break;
                case "ArrowUp":
                    if (hoveringFrame >= 0) {
                        setHoveringFrame(hoveringFrame - 1);
                    }
                    break;
                case "Enter":
                    if (hoveringFrame >=0) {
                        history.push(`/incident/${items[hoveringFrame].id}`);
                    }
                    break;
                default:
                    return
            }
        }
    );
    return (
        <div className={classNames("autocomplete", {loading: isLoading})}>
            {isLoading && <Loader/>}
            {items.map((item, index) => <p key={item.id}
                                           className={classNames("autocomplete-item", {hover: hoveringFrame === index})}>
                <Link to={`/incident/${item.id}`}>{item.title} </Link>
            </p>)}
        </div>
    )
};