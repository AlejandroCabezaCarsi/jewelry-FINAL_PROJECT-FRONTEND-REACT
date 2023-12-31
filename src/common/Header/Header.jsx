import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";
import { ChangeViewButton } from "../ChangeViewButton/ChangeViewButton";
import { useSelector } from "react-redux";
import { userData } from "../../pages/Login/userSlice";
import { useNavigate } from "react-router-dom";
import { cartInfo } from "../../pages/AllProducts/cartSlice";

export const Header = () => {
  const dataUser = useSelector(userData);

  const token = dataUser.credentials.token;

  const navigate = useNavigate();

  const cart = useSelector(cartInfo)

  
  const getTotalProductQuantity = () => {
    let totalQuantity = 0;

    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });
  
    return totalQuantity;
  };

  const totalProductQuantity = getTotalProductQuantity();


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <div className="jewlryLogo" onClick={() => navigate("/")}></div>
          <Navbar.Brand href="/">Joyería Sylvie</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex align-items-center">
              <div className="navLinksLeft d-flex">
                <Nav.Link className="p-4" href="/AllProducts">
                  Productos
                </Nav.Link>
              </div>
            </Nav>

            <Nav>
              {token !== "" ? (
                <div className="navLinksRight">
                  <div
                    className="profileButton p-3"
                    onClick={() => navigate("/Profile")}
                  ></div>

                  <div
                    className="cartButton p-3  ms-3"
                    onClick={() => navigate("/Cart")}
                  >
                    {totalProductQuantity === 0 
                    ? null
                    : <div className="cartLength textBold d-flex justify-content-center align-items-center">{totalProductQuantity}</div>
                    }

                  </div>
                </div>
              ) : (
                <div className="navLinksRight align-items-center">
                  <div className="PRUEBA p-3 pointer">
                    <ChangeViewButton name={"Login"} path={"/Login"} />
                  </div>
                  <div
                    className="cartButton p-3  ms-3"
                    onClick={() => navigate("/Cart")}
                  >
                    {totalProductQuantity === 0 
                    ? null
                    : <div className="cartLength textBold d-flex justify-content-center align-items-center">{totalProductQuantity}</div>
                    }
                  </div>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
