import React from "react";
import "./Cart.css";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { cartInfo } from "../AllProducts/cartSlice";
import { CartProductCard } from "../../common/CartProductCard/CartProductCard";
import { useNavigate } from "react-router-dom";
import { userData } from "../Login/userSlice";

export const Cart = () => {
  const navigate = useNavigate();

  const products = useSelector(cartInfo);

  const dataUser = useSelector(userData);

  const token = dataUser.credentials.token;

  const total = products.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );

  const travelToPay = () => {
    if (token === "") {
      navigate("/Login");
    }

    navigate("/pay");
  };

  return (
    <div className="cartDesign">
      <Container className="d-flex justify-content-center align-items-center">
        <div className="cartContent d-flex flex-column justify-content-center align-items-center mt-3">
          <Row>
            <Col>
              <div className="cartTitle">ARTICULOS EN EL CARRITO</div>
            </Col>
          </Row>

          <Row className="m-2 d-flex align-items-center  mb-5">
            <Col className="d-flex flex-column align-items-center">
              <Row className="d-flex justify-content-center align-items-center">
                {products.length > 0
                  ? products.map((product) => (
                      <Col
                        key={product.id}
                        xs={10}
                        sm={12}
                        md={7}
                        lg={product.length > 2 ? 4 : 7}
                      >
                        <CartProductCard
                          id={product.id}
                          image={product.image}
                          name={product.name}
                          price={product.price}
                          quantity={product.quantity}
                        />
                      </Col>
                    ))
                  : null}
              </Row>
            </Col>
            <Container fluid className="d-flex justify-content-center">
              <Row className="d-flex align-items-center justify-content-center">
                <Col>
                  {products.length === 0 ? null : (
                    <div
                      className="payButton p-2 m-2"
                      onClick={() => travelToPay()}
                    >
                      PAGAR: {total}€{" "}
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </Row>
        </div>
      </Container>
    </div>
  );
};
