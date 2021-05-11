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
    for (let number = pageIndex; number <= length + pageIndex; number++) {
        items.push(
            <Pagination.Item key={number}
                             active={number === pageIndex}
                             className={"p-0"}
                             style={itemStyle}
                             activeLabel={""}
                             onClick={() => navigate(number)}>
                {number}
            </Pagination.Item>
        );
    }


    return (
        <div className={"d-flex justify-content-center"}>
        <Pagination size={"sm"}>
            {pageIndex > 1 &&
            <Pagination.Prev onClick={() => navigate(pageIndex - 1)}>{"<"}</Pagination.Prev>
            }
            {items}
            <Pagination.Next onClick={() => navigate(pageIndex + 1)}>{">"}</Pagination.Next>
        </Pagination>
        </div>
    )
}

const itemStyle = {width:"32px", height:"32px"}

export default GalleryPagination;
