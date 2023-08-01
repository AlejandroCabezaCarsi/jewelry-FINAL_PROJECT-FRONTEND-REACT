import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../pages/AllProducts/cartSlice";

export const ProductCard = ({ id, image, name, price }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const cartProduct = cartItems.find((item) => item.id === id);
  const cartUnits = cartProduct ? cartProduct.quantity : 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ id, image, name, price }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(id));
  };

  const showOptions = cartUnits > 0;

  return (
    <div className="productCardDesign d-flex justify-content-center align-items-center p-3">
      <Container className="">
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            xl={12}
            className="d-flex justify-content-center align-items-center mb-3"
          >
            <div className="productCardImage">
              <img
                src={image}
                alt="Imagen del producto"
                className="productPicture"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            xl={12}
            className="d-flex justify-content-center align-items-center mb-2"
          >
            <div className="productCardName textBold">{name}</div>
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            xl={12}
            className="d-flex justify-content-center align-items-center mb-3"
          >
            <div className="productCardPrice">{price}€</div>
          </Col>
        </Row>
        {showOptions ? (
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              xl={12}
              className="d-flex justify-content-center align-items-center"
            >
              <Row className="cartOptions d-flex flex-row justify-content-around">
                <Col
                  className="minusButton d-flex justify-content-center align-items-center"
                  xs={4}
                  sm={4}
                  md={4}
                  xl={4}
                  onClick={handleDecreaseQuantity}
                ></Col>
                <Col
                  className="d-flex flex-row d-flex flex-row justify-content-center align-items-center textBold"
                  xs={4}
                  sm={4}
                  md={4}
                  xl={4}
                >
                  <div className="unitsText d-flex flex-row justify-content-center align-items-center">
                    {cartUnits}
                  </div>
                  Ud.
                </Col>
                <Col
                  className=" plusButton d-flex justify-content-center align-items-center"
                  xs={4}
                  sm={4}
                  md={4}
                  xl={4}
                  onClick={handleIncreaseQuantity}
                ></Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              xl={12}
              className="d-flex justify-content-center align-items-center"
            >
              <div
                className="addToCartButton text-center"
                onClick={handleAddToCart}
              >
                AÑADIR
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};
