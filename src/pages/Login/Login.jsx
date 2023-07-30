import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { InputText } from "../../common/InputText/InputText";
import { checkError } from "../../services/useful";
import { useDispatch } from "react-redux";
import { login } from "./userSlice";
import { getUserInfoByToken, loginMe } from "../../services/apicalls";

export const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [credentialsError, setCredentialsError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [welcome, setWelcome] = useState("");

  const [backendError, setBackendError] = useState("");

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

  //PARA EL MODO ESCRITURA DE REDUX

  const dispatch = useDispatch();

  const logMe = () => {
    loginMe(credentials)
      .then((resultado) => {
        const token = resultado.data.token;

        getUserInfoByToken(token)
          .then((userInfo) => {
            dispatch(
              login({
                token: token,
                name: userInfo.data.data.name,
                role: userInfo.data.data.role_ID,
                id: userInfo.data.data.id,
              })
            );

            setTimeout(() => {
              navigate("/");
            }, 3500);

            setWelcome(`Bienvenid@ de nuevo ${userInfo.data.data.name}`);
          })
          .catch((error) => {
            console.log("Error fetching user information:", error);
          });
      })
      .catch((error) => {
        console.log(error);
        setBackendError("Usuario o contraseña inválido");
      });
  };

  return (
    <div className="">
      {welcome !== "" ? (
        <div className="loginDesign d-flex align-items-center justify-content-center">
          <Container>
            <Row>
              <Col>
                <div className="welcomeMessage text-center"> {welcome} </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div className="form loginDesign">
          <Container fluid>
            <div className="rowLogin p-4 mb-5">
              <Row className=" d-flex justify-content-center flex-fill p-5">
                <Col
                  xs={0}
                  sm={0}
                  md={0}
                  lg={4}
                  xl={4}
                  className="d-flex justify-content-center align-items-center spaceLogin"
                >
                  <div className="loginPhoto"></div>
                </Col>
                <Col
                  xs={12}
                  sm={10}
                  md={4}
                  lg={5}
                  className="d-flex flex-column justify-content-center align-items-center "
                >
                  <div className="loginText">LOGIN</div>

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

                  <InputText
                    type={"password"}
                    design={
                      credentialsError.passwordError === ""
                        ? "normalInput "
                        : "normalInput errorInput"
                    }
                    placeholder={"  Contraseña..."}
                    name={"password"}
                    functionHandler={inputHandler}
                    onBlurFunction={inputCheck}
                  />
                  <div className="errorText">
                    {credentialsError.passwordError}
                  </div>

                  <div onClick={() => logMe()} className="botonLogin">
                    Login me!
                  </div>
                  <div className=" d-flex">Si no tienes cuenta, regístrate <p className="registerLink ms-1" onClick={()=>navigate("/Register")}>aquí</p></div>

                  {backendError !== "" ? (
                    <div className="errorBackend">{backendError}</div>
                  ) : null}
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};
