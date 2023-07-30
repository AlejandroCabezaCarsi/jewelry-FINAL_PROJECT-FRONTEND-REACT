import React from "react";
import "./Cart.css"
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { cartInfo } from "../AllProducts/cartSlice";
import { CartProductCard } from "../../common/CartProductCard/CartProductCard";

export const Cart = () => {

    const products = useSelector(cartInfo)

    console.log(products)

    return(
        <div className="cartDesign">
            <Container>
                <div className="cartContent d-flex flex-column justify-content-center align-items-center mt-3">
                    <Row>
                        <Col>
                            <div className="cartTitle">ARTICULOS EN EL CARRITO</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            
                                <Row>

                                    {products.length > 0 
                                    
                                        ? products.map((product)=>(
                                            <Col key={product.id}>
                                                <CartProductCard
                                                id={product.id}
                                                image={product.image}
                                                name={product.name}
                                                price={product.price}
                                                quantity={product.quantity}
                                                />
                                            </Col>
                                        ))

                                        :null
                                    
                                    }
                                    
                                </Row>
                            
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )

}