import React, { useEffect, useState } from "react";
import "./BuyCard.css"; 
import { Col, Container, Row } from "react-bootstrap";

export const BuyCard = ({date,status,products, pictures, price}) => {


    return (
        <div className="buyCardDesign">
            <Container>
                <Row className="d-flex flex-row justify-content-around">
                    <Col xs={7} sm={5} md={5} lg={5}>
                        <div className="buyDate">{date}</div>
                    </Col>
                    <Col xs={5}sm={4} md={4} lg={4}>
                        <div className="statusBuy">{status}</div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="numberOfProducts">Productos: {products?.length}</div>
                    </Col>
                </Row>

                <div className="space"></div>
        
                <Row className="d-flex justify-content-center">
                    <Col xs={11} sm={11} md={11} lg={11}>                          
                            {   products
                                    ? products?.map((product)=>(
                                        
                                        <Row className="d-flex flex-column align-items-center justify-content-center borderProduct mb-3 p-2">

                                            <Col xs={12} sm={12} md={12} lg={12} className="d-flex justify-content-center mb-3">
                                                <div className="productPicture"><img src={product.image} alt="Imagen del producto" className="productPicture" /></div>
                                            </Col>

                                            <Col xs={12} sm={5} md={5} lg={9}>

                                                <Row className="d-flex justify-content-center align-items-center ">


                                                    <Col xs={12} sm={12} md={12} lg={12}>
                                                    <div className="productReference d-flex flex-row justify-content-around mb-1">Número de referencia: <p className="ms-3 textBold">{product.reference}</p></div>
                                                    </Col>
                                                    <Col  xs={12} sm={12} md={12} lg={12}>
                                                    <div className="productName d-flex flex-row justify-content-around mb-1">Nombre del producto: <p className="ms-3 textBold">{product.name}</p></div>
                                                    </Col>
                                                    <Col  xs={12} sm={12} md={12} lg={12} >
                                                    <div className="productPrice d-flex flex-row justify-content-around mb-1">Precio: <p className="ms-3 textBold">{product.price}€</p></div>
                                                    </Col>

                                                </Row>
                                            </Col>
                                        

                                        </Row>
                                        ))
                                        : null
                                    }          
                    </Col>
                </Row>
        
                <Row>
                    <Col>
                        <div className="price">TOTAL:
                            <div className="priceFont ms-2 textBold">{price}€</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}