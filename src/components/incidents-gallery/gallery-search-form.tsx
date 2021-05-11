import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GalleryPagination from "./gallery-pagination";

interface IProps {
    searchValue: string,
    onSearchChange: (value: string) => void,
    onSearchSubmit: () => void,
    pageIndex: number
}

const GallerySearchForm: React.FC<IProps> = ({searchValue, onSearchChange, onSearchSubmit, pageIndex}) => {
    return (
        <div className={"d-flex align-items-center justify-content-center flex-wrap"}>
            {pageIndex > 0 && <GalleryPagination length={5} pageIndex={pageIndex}/>}
            <Form className={"mb-3 ms-3"}>
                <div className={"d-flex "}>
                    <Form.Control placeholder="Search..."
                                  value={searchValue}
                                  onChange={(event) => onSearchChange(event.currentTarget.value)}/>
                    <Button variant="primary" type="submit" onClick={onSearchSubmit} className={"ms-3"}>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default GallerySearchForm;