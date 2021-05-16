import React, {useCallback, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import {Col, Row} from "react-bootstrap";
import _ from "lodash";
import {AutocompleteBikes} from "../autocomplete/autocomplete-bikes";

interface IProps {
    searchValue: string,
    onSearchChange: (value: string) => void,
    onSearchSubmit: () => void,
    pageIndex: number,
    setFromDate: (date: number) => void
    setToDate: (date: number) => void
}

interface IDate {
    day: number,
    month: number,
    year: number
}

const GallerySearchForm: React.FC<IProps> = (
    {
        searchValue,
        onSearchChange,
        setFromDate,
        setToDate,
    }) => {

    const [autocompleteOptions, setAutocompleteOptions] = useState<any[]>([]);
    const [selectedDayRange, setSelectedDayRange] = useState<any>({
        from: null,
        to: null
    });
    const [isAutocompleteLoading, setIsAutocompleteLoading] = useState(false);

    const {from, to} = selectedDayRange
    const dateConverter = (date: IDate) => `${date.year}-${date.month}-${date.day}`;

    const debouncedSave = useCallback(
        _.debounce(nextValue => {
            const url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&query=${nextValue}&location=IP&distance=10&stolenness=stolen&access_token=UdySf1fvlpqg98yLUs_vSAxf5qfwqYHMnBAN4c4rUXc`;
            setIsAutocompleteLoading(true);
            fetch(url).then(response => response.json())
                .then(response => {
                    setAutocompleteOptions(response.bikes)
                    setIsAutocompleteLoading(false);
                })
                .catch(error => console.log(error))
        }, 1000),
        []);

    const onChange = (value: string) => {
        onSearchChange(value);
        setAutocompleteOptions([])
        debouncedSave(value);
    }


    useEffect(() => {
        if (from) {
            const d = new Date(dateConverter(from)).getTime().toString();
            setFromDate(parseInt(d.slice(0, -3)));
        }
        if (to) {
            const d = new Date(dateConverter(to)).getTime().toString();
            setToDate(parseInt(d.slice(0, -3)));
        }
    }, [from, selectedDayRange, setFromDate, setToDate, to]);

    const getFormatInputText = () => {
        return (from && to) ? `${dateConverter(from).replaceAll("-", "/")} - ${dateConverter(to).replaceAll("-", "/")}` : ""
    }

    return (
        <Row className={"d-flex align-items-center flex-wrap"}>
            <Col>
                <Form className={"mb-3 w-100"}>
                    <div className={"d-flex flex-wrap align-items-center justify-content-between"}>
                        <DatePicker
                            value={selectedDayRange}
                            onChange={setSelectedDayRange}
                            inputPlaceholder={"Filter by date range"}
                            shouldHighlightWeekends
                            formatInputText={getFormatInputText}
                        />
                        <div className={"d-flex position-relative"}>
                            <Form.Control placeholder="Search..."
                                          value={searchValue}
                                          onChange={(event) => onChange(event.currentTarget.value)}/>
                            <AutocompleteBikes items={autocompleteOptions} isLoading={isAutocompleteLoading}/>
                            {/*<Button variant="primary" type="submit" onClick={onSearchSubmit} className={"ms-3"}>*/}
                            {/*    Submit*/}
                            {/*</Button>*/}
                        </div>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default GallerySearchForm;