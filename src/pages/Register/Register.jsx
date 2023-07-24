import React, { useState } from "react";
import "./Register.css";
import { InputText } from "../../common/InputText/InputText";
import { Container, Row, Col } from "react-bootstrap";
import { checkError } from "../../services/useful";
import { register } from "../../services/apicalls";

export const Register = () => {

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

  const registerMe = () =>{
    register(credentials)
  }


    return(
        <div className="registerDesign">


            <Container>

            <div className="registerFormDesign">

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
                className="d-flex justify-content-center"
              >
              
              <div onClick={() => registerMe()} className="registerButton">
                      Register
                    </div>
                
                </Col>
                
            </Row>
            </div>

            </Container>



            
        </div>
    )

}