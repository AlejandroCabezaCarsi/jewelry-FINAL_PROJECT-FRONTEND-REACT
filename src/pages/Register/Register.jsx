import React, { useState } from "react";
import "./Register.css";
import { InputText } from "../../common/InputText/InputText";
import { Container, Row, Col } from "react-bootstrap";
import { checkError } from "../../services/useful";
import { register } from "../../services/apicalls";
import { useNavigate } from "react-router-dom";

export const Register = () => {

    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        name:"",
        surname: "",
        email: "",
        password: "",
        city: "" ,
        postalCode: "",
        address:"",
        role_ID: 4, 
        isActive: true
       

      });
    
      const [credentialsError, setCredentialsError] = useState({
        emailError: "",
        passwordError: "",
      });

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

  const [errorMessage, setErrorMessage] = useState("");   

  const registerMe = async () => {
    try {
      const response = await register(credentials);

      if (response.status === 201) {
       navigate("/")
      } else {
        setErrorMessage("Hubo un error en el registro. Inténtalo de nuevo más tarde.");
      }
    } catch (error) {
      setErrorMessage("Hubo un problema en el servidor. Inténtalo de nuevo más tarde.");
    }
  };


    return(
        <div className="registerDesign">


            <Container>

            <div className="registerFormDesign">

              <Row>
                <Col className="text-center mb-3 mt-4">
                  <div className="registerTitle">
                    REGISTER
                  </div>
                </Col>
              </Row>

            <Row className="d-flex flex-row ">
          

              <Col  
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className="d-flex flex-row justify-content-center"
              >
              
                <InputText
                  type={"text"}
                  design={"normalInput"}
                  placeholder={"  Name..."}
                  name={"name"}
                  functionHandler={inputHandler}
                  onBlurFunction={inputCheck}
                        
                />
                </Col>
                <Col  
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className="d-flex flex-row justify-content-center"
              >
                <InputText
                type={"text"}
                          design={"normalInput"}
                          placeholder={"  Surname..."}
                          name={"surname"}
                          functionHandler={inputHandler}
                          onBlurFunction={inputCheck}
                        
                />
                </Col>
            </Row>


            <Row className="d-flex flex-row ">

              <Col  
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className="d-flex flex-column align-items-center"
              >
              
                <InputText
                  type={"email"}
                  design={
                    credentialsError.emailError === ""
                      ? "normalInput"
                      : "normalInput errorInput"
                  }
                  placeholder={"  Email..."}
                  name={"email"}
                  functionHandler={inputHandler}
                  onBlurFunction={inputCheck}
                        
                />
                <div className="errorText">{credentialsError.emailError}</div>
                </Col>
                <Col  
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className="d-flex flex-row justify-content-center"
              >
                <InputText
                type={"password"}
                design={
                  credentialsError.passwordError === ""
                    ? "normalInput"
                    : "normalInput errorInput"
                }
                          placeholder={"  Password..."}
                          name={"password"}
                          functionHandler={inputHandler}
                          onBlurFunction={inputCheck}
                        
                />
                </Col>
            </Row>


            <Row className="d-flex flex-row ">

              <Col  
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className="d-flex flex-row justify-content-center"
              >
              
                <InputText
                  type={"text"}
                  design={"normalInput"}
                  placeholder={"  City..."}
                  name={"city"}
                  functionHandler={inputHandler}
                  onBlurFunction={inputCheck}
                        
                />
                </Col>
                <Col  
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className="d-flex flex-row justify-content-center"
              >
                <InputText
                type={"text"}
                design={"normalInput"}
                          placeholder={"  Postal Code..."}
                          name={"postalCode"}
                          functionHandler={inputHandler}
                          onBlurFunction={inputCheck}
                        
                />
                </Col>
            </Row>
            <Row className="d-flex flex-row mb-4 ">

              <Col  
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className="d-flex flex-row justify-content-center"
              >
              
                <InputText
                  type={"text"}
                  design={"normalInput"}
                  placeholder={"  Address..."}
                  name={"address"}
                  functionHandler={inputHandler}
                  onBlurFunction={inputCheck}
                        
                />
                
                </Col>
              <Col  
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className="d-flex flex-column align-items-center"
              >
              
              <div
                onClick={credentialsError.emailError || credentialsError.passwordError ? null : registerMe}
                className={`registerButton ${credentialsError.emailError || credentialsError.passwordError ? 'inactiveButton' : ''}`}
              >
                Register
              </div>
              {credentialsError.emailError || credentialsError.passwordError ? (
            <div className="registerErrorMessage">
              Todos los campos deben estar rellenados correctamente.
            </div>
          ) : null}
          {errorMessage && <div className="errorText">{errorMessage}</div>}
                
                </Col>
                
            </Row>
            </div>

            </Container>



            
        </div>
    )

}