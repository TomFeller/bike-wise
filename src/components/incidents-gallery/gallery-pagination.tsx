import React from "react";
import {useHistory} from "react-router-dom"
import Pagination from "react-bootstrap/Pagination"

type IProps = {
    length: number,
    pageIndex: number
}

const GalleryPagination: React.FC<IProps> = ({length, pageIndex}) => {
    const history = useHistory();
    let items = [];
    const navigate = (index: number) => history.push(`/gallery/${index}`);
    for (let number = 1; number <= length; number++) {
        items.push(
            <Pagination.Item key={number}
                             active={number === pageIndex}
                             className={"p-0"}
                             activeLabel={""}
                             onClick={() => navigate(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Pagination size={"sm"}>
            <Pagination.Prev onClick={() => navigate(pageIndex - 1)} />
            {items}
            <Pagination.Next onClick={() => navigate(pageIndex + 1)}/>
        </Pagination>
    )
}

export default GalleryPagination;