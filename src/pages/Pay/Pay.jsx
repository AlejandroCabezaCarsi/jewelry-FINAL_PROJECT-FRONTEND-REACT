import React, { useState } from "react";
import "./Pay.css"; 
import { Col, Container, Row } from "react-bootstrap";
import { InputText } from "../../common/InputText/InputText";
import { checkError } from "../../services/useful";
import { useSelector } from "react-redux";
import { cartInfo } from "../AllProducts/cartSlice";
import { userData } from "../Login/userSlice";
import { createOrder } from "../../services/apicalls";
import { useNavigate } from "react-router-dom";


export const Pay = () => {

    const navigate = useNavigate()

    const [credentialsError, setCredentialsError] = useState({
        creditCardError: "",
    })

    const [credentials, setCredentials = useState] = useState("")

    const inputHandler = (e) => {
        setCredentials((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      const inputCheck = (e) => {
        let mensajeError = checkError(e.target.name, e.target.value);
    
        setCredentialsError((prevState) => ({
          ...prevState,
          [e.target.name + "Error"]: mensajeError,
        }));
      };

    const dataUser = useSelector(userData)

    const token = dataUser.credentials.token

    const products = useSelector(cartInfo) 

    const total = products.reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0);

    const createOrderFront = () => { 

        const productIds = products.flatMap((item) => Array.from({ length: item.quantity }, () => item.id));

        createOrder(token, productIds)
            .then((response)=>{
                navigate("/Profile")
            })

    }

    return(
        <div className="payDesign">

            <Container className="d-flex justify-content-center align-items-center ">
                <div className="payForm d-flex flex-column align-items-center justify-content-center p-3">
                    <Row>
                        <Col>
                            <div className="payTitle">Introduce tus datos bancarios</div>
                        </Col>
                    </Row>

                    <Row className="d-flex flex-column text-center">
                        <Col>
                            <InputText
                              type={"number"}
                              design={
                                  credentialsError.creditCardError === ""
                                  ? "normalInput"
                                  : "normalInput errorInput"
                                }
                                placeholder={"  Tarjeta de crédito..."}
                                name={"creditCard"}
                                functionHandler={inputHandler}
                                onBlurFunction={inputCheck}
                                />
                        </Col>
                        <Col><div className="creditCardError"></div>{credentialsError.creditCardError}</Col>
                    </Row>
                    <Row className="d-flex flex-column text-center">
                        <Col>
                            <InputText
                              type={"text"}
                              design={"normalInput"}
                                placeholder={"  Nombre del titular..."}
                                name={"creditCard"}
                                functionHandler={inputHandler}
                                onBlurFunction={inputCheck}
                                />
                        </Col>
                    </Row>
                    <Row className="d-flex flex-column text-center">
                        <Col>
                            <InputText
                              type={"number"}
                              design={"normalInput"}
                                placeholder={"  CVC..."}
                                name={"cvc"}
                                functionHandler={inputHandler}
                                onBlurFunction={inputCheck}
                                />
                        </Col>
                    </Row>
                    <Row className="d-flex flex-column text-center">
                        <Col xs={12} md={12} lg={12} className="d-flex justify-content-center">
                            <div className="createOrderButton p-2 text-center mt-4" onClick={()=>createOrderFront()}>PAGAR {total}€</div>
                        </Col>
                        {credentialsError.creditCardError !== ""
                        
                            ? <div className="errorPay">"Rellena todos los campos correctamente</div>
                            : null
                        }
                    </Row>
                </div>
            </Container>

        </div>
    )

}