import React from "react";
import "./BuyCard.css"; 
import { Col, Container, Row } from "react-bootstrap";

export const BuyCard = ({date,status,products, picture, price}) => {

    return (
        <div className="buyCardDesign">
            <Container>
                <Row className="d-flex flex-row justify-content-around">
                    <Col xs={7} sm={5} md={5} lg={5}>
                        <div className="buyDate">{date} HOLA</div>
                    </Col>
                    <Col xs={5}sm={4} md={4} lg={4}>
                        <div className="statusBuy">{status} HOLA</div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="numberOfProducts">Productos: {products}</div>
                    </Col>
                </Row>

                <div className="space"></div>
        
                <Row>
                    <Col>
                        <div className="productPicture">HOLA{picture}</div>
                    </Col>
                </Row>
        
                <Row>
                    <Col>
                        <div className="price">TOTAL:
                            <div className="priceFont">{price}</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}