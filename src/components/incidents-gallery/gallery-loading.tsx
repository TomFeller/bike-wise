import React from "react";
import ContentLoader from "react-content-loader";
import {Col, Row} from "react-bootstrap";

const GalleryLoading = () => {
    return (
        <Row>
            <Col md={6}>
                <ContentLoader/>
            </Col>
            <Col md={6}>
                <ContentLoader/>
            </Col>
            <Col md={6}>
                <ContentLoader/>
            </Col>
            <Col md={6}>
                <ContentLoader/>
            </Col>
            <Col md={6}>
                <ContentLoader/>
            </Col>
            <Col md={6}>
                <ContentLoader/>
            </Col>
            <Col md={6}>
                <ContentLoader/>
            </Col>
            <Col md={6}>
                <ContentLoader/>
            </Col>
            <Col md={6}>
                <ContentLoader/>
            </Col>
            <Col md={6}>
                <ContentLoader/>
            </Col>
        </Row>
    )
}

export default GalleryLoading;