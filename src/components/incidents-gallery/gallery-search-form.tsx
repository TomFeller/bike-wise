import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import {Col, Row} from "react-bootstrap";

interface IProps {
    searchValue: string,
    onSearchChange: (value: string) => void,
    onSearchSubmit: () => void,
    pageIndex: number
}

const GallerySearchForm: React.FC<IProps> = ({searchValue, onSearchChange, onSearchSubmit, pageIndex}) => {

    const [selectedDayRange, setSelectedDayRange] = useState<any>({
        from: null,
        to: null
    });

    useEffect(() => {
console.log("selectedDayRange", selectedDayRange);
    }, [selectedDayRange])

    return (
        <Row className={"d-flex align-items-center flex-wrap"}>
            <Col>
            <Form className={"mb-3 w-100"}>
                <div className={"d-flex align-items-center justify-content-between"}>
                    <DatePicker
                        value={selectedDayRange}
                        onChange={setSelectedDayRange}
                         shouldHighlightWeekends
                    />
                    <div className={"d-flex"}>
                    <Form.Control placeholder="Search..."
                                  value={searchValue}
                                  onChange={(event) => onSearchChange(event.currentTarget.value)}/>
                    <Button variant="primary" type="submit" onClick={onSearchSubmit} className={"ms-3"}>
                        Submit
                    </Button>
                    </div>
                </div>
            </Form>
            </Col>
        </Row>
    )
}

export default GallerySearchForm;