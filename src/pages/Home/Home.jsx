import React, { useState } from "react";
import "./Home.css"; 
import { InputText } from "../../common/InputText/InputText";
import { UserCard } from "../../common/UserCard/UserCard";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const Home = () => {

   const navigate = useNavigate()

   return(
    <div className="homeDesign">

      <Container fluid className="d-flex justify-content-center align-items-center">
         <Row>
            <Col  xs={12} sm={12} md={12} lg={12} className="d-flex justify-content-center align-items-center" >
               <img src="../../src/assets/home1.png" className="bigPicture"/>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} className="d-flex justify-content-center">

               <div className="homeCard d-flex justify-content-center align-items-center mt-4" onClick={()=>navigate("/AllProducts")}>
                  <Row className="d-flex justify-content-center">
                     <Col className="d-flex justify-content-center">
                        <img src="../../src/assets/home2.png" className="smallImage"/>
                     </Col>
                     <Col className="d-flex align-items-center justify-content-center text-center">
                        <p>Descubre la nueva temporada de relojes en joyería Sylvie</p>
                     </Col>
                  </Row>

               </div>
            </Col>

            <Col xs={12} sm={12} md={12} lg={12} className="d-flex justify-content-center mt-5 mb-5">

               <div className="homeCard d-flex justify-content-center" onClick={()=>navigate("/Register")}>
               <Col className="d-flex align-items-center justify-content-center text-center">
                <p>Registrate gratis para recibir las últimas ofertas</p>
               </Col>
               <Col className="d-flex justify-content-center">
               <img src="../../src/assets/home3.png" className="smallImage" />
               </Col>


            </div>

            </Col>
         </Row>
      </Container>

    </div>

   )

}