import React from "react";
import "./ProductCard.css";
import { Col, Container, Row } from "react-bootstrap";

export const ProductCard = ({image, name}) => {

    return(
        <div className="productCardDesign d-flex justify-content-center align-items-center p-3">

            <Container className="">
                <Row>
                    <Col xs={10} sm={10} md={10} xl={12} className="d-flex justify-content-center align-items-center mb-3">
                        <div className="productCardImage">{image}</div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={10} sm={10} md={10} xl={12} className="d-flex justify-content-center align-items-center mb-2">

                        <div className="productCardName">{name}HOLA</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} sm={10} md={10} xl={12} className="d-flex justify-content-center align-items-center mb-3">
                        <div className="productCardPrice">{name}HOLA€</div>
                    </Col>
                </Row>
                <Row>
                        <Col xs={10} sm={10} md={10} xl={12} className="d-flex justify-content-center align-items-center">
                            <div className="addToCartButton text-center">AÑADIR</div>
                        </Col>
                </Row>
            </Container>


        </div>
    )

}