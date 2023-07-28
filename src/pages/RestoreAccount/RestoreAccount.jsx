import React, { useState } from "react";
import "./RestoreAccount.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import { InputText } from "../../common/InputText/InputText";
import { checkError } from "../../services/useful";
import { restoreUser } from "../../services/apicalls";

export const RestoreAccount = () => {

    const navigate = useNavigate();

    const dataUser = useSelector(userData);
  
    const token = dataUser.credentials.token;
  
    //CHECK IF THE USER IS LOGGED
  
    if(token === ""){
      navigate("/")
    }
  
    const [email, setEmail] = useState("");
    console.log(email)
    console.log(token)
    
    const [emailError, setEmailError] = useState({
      emailError: "",
    });
  
   
    const [errorMessage, setErrorMessage] = useState("");

    console.log(errorMessage)
  
    const [successMessage, setSuccessMessage] = useState("");
  
  
    const inputHandler = (e) => {
      setEmail((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    //CHECK IF THE EMAIL IS VALID
  
    const inputCheck = (e) => {
      let mensajeError = checkError(e.target.name, e.target.value);
  
      setEmailError((prevState) => ({
        ...prevState,
        [e.target.name + "Error"]: mensajeError,
      }));
    };

    const restoreUserByEmail = () =>{
        restoreUser(token, email)
            .then((response)=>{
                console.log(response)
            })
    }

    return(
        <div className="restoreAccountDesign">

            <Container>
                <div className="restoreAccountForm">
                <Row>
                    <Col>
                        <div className="restoreAccountTitle">HABILITAR CUENTA</div>
                    </Col>
                </Row>

                <Row className="d-flex align-items-center justify-content-center">
            <Col
              xs={7}
              sm={7}
              md={7}
              lg={7}
              xl={7}
              className="d-flex flex-column align-items-center text-center"
            >
              <InputText
                type={"email"}
                design={
                  emailError.emailError === ""
                    ? "normalInput"
                    : "normalInput errorInput"
                }
                placeholder={"  Antigua contraseña..."}
                name={"email"}
                functionHandler={inputHandler}
                onBlurFunction={inputCheck}
              />
              <div className="errorText">{emailError.emailError}</div>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <div
                className="sendNewPassword"
                onClick={() => restoreUserByEmail()}
              >
                ACTUALIZAR!
              </div>
              {emailError 
              ? (
                <div className="registerErrorMessage text-center mt-2">
                  Todos los campos deben estar rellenados correctamente.
                </div>
              ) : null}

              {errorMessage && <div className="errorText">{errorMessage}</div>}
              {successMessage && (<div className="successText">{successMessage}</div>)}
            </Col>
          </Row>

                </div>

            </Container>
        </div>
    )

}