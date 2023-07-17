import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";

export const Header = () => {
  return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto d-flex align-items-center">
                        <div className="navLinksLeft d-flex">
                            <Nav.Link className="p-4" href="#home">Home</Nav.Link>
                            <Nav.Link className="p-4" href="#link">Link</Nav.Link>
                            <NavDropdown className="m-3" title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

                            </NavDropdown>
                        </div>
                    </Nav>

                    <Nav>

                        <div className="navLinksRight">
                            <div className="PRUEBA p-3">HOLA</div>
                            <div className="PRUEBA p-3">HOLA</div>
                        </div>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  );
};
