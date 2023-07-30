import React from "react";
import "./CartProductCard.css";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../../pages/AllProducts/cartSlice";

export const CartProductCard = ({id, image,name, price, quantity}) => {

    const dispatch = useDispatch()

    const handleDecreaseQuantity = () => {
        dispatch(decreaseQuantity(id));
      };

      const handleRemoveFromCart = () => {
        dispatch(removeFromCart(id));
      };

      const handleIncreaseQuantity = () => {
        dispatch(increaseQuantity(id));
      };

    return(
        <div className="cartProductCarcDesign d-flex align-items-center h-100 p-3 mt-4 mb-4 ">
            <Container>
                <Row className="d-flex flex-row">
                    <Col  xs={12} sm={12} md={5} lg={5} className="d-flex align-items-center justify-content-center">
                        <img src={image}className="cartProductCardPicture"/>
                    </Col>

                    <Col>
                        <Row className="d-flex justify-content-around align-items-center ">
                            <Col  xs={12} sm={12} md={12} lg={12} className="mb-4 mt-3">
                            <div className="">{name}</div>
                            </Col>
                            <Col  xs={12} sm={12} md={12} lg={12} className="mb-4">                        
                            <div className="">{price}€</div>
                            </Col>
                            <Col  xs={12} sm={12} md={12} lg={12}>                        
                            <div className="">x{quantity}</div>
                            </Col>
                        </Row>
                    
                    </Col> 
                </Row>
                <Row className="d-flex justify-content-between align-items-center">
                    <Col  xs={6} sm={3} md={3} lg={5}className="d-flex justify-content-around align-items-center mb-2 mt-3">
                        <div className="plusButton" onClick={handleIncreaseQuantity} ></div>
                        <div className="minusButton"onClick={handleDecreaseQuantity}></div>
                        <div className="trashButton" onClick={handleRemoveFromCart}></div>
                    </Col>
                    <Col xs={6} sm={3} md={3} lg={3} className="d-flex flex-row justify-content-end">
                        <div className="totalPrice">Total: <div>{price*quantity}€</div></div>
                    </Col>
                </Row>

            </Container>
        </div>
    )

}