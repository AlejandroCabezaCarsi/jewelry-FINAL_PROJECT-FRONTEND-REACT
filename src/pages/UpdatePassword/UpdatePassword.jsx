import React, { useState } from "react";
import "./UpdatePassword.css";
import { Col, Container, Row } from "react-bootstrap";
import { InputText } from "../../common/InputText/InputText";
import { checkError } from "../../services/useful";
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import { updatePassword } from "../../services/apicalls";
import { useNavigate } from "react-router-dom";

export const UpdatePassword = () => {

  const navigate = useNavigate();

  const dataUser = useSelector(userData);

  const token = dataUser.credentials.token;

  //CHECK IF THE USER IS LOGGED

  if(token === ""){
    navigate("/")
  }

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [credentialsError, setCredentialsError] = useState({
    passwordError: "",
  });

  const [newCredentialsError, setNewCredentialsError] = useState({
    newPasswordError: "",
  });
  
  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");


  // HANDLER OLD PASSWORD

  const inputHandler = (e) => {
    setPasswordData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //CHECK IF THE OLD PASSWORD IS VALID

  const inputCheck = (e) => {
    let mensajeError = checkError(e.target.name, e.target.value);

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: mensajeError,
    }));
  };

  //HANDLER NEW PASSWORD

  const inputHandlerNewPassword = (e) => {
    setPasswordData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //CHECK IF THE NEW PASSWORD IS VALID

  const inputCheckNewPassword = (e) => {
    let mensajeError = checkError(e.target.name, e.target.value);

    setNewCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: mensajeError,
    }));
  };

  //CALLING THE API THROUGH UPDATEPASSWORD

  const callUpdatePassword = async () => {
    try {

      const response = await updatePassword(token, passwordData);

      if (response.status === 200) {
        setSuccessMessage("Contraseña actualizada correctamente!");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/Profile");
        }, 3000);
      } else {
        setErrorMessage(
          "Hubo un error en la actualización de la contraseña. Inténtalo de nuevo más tarde."
        );
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Hubo un problema en el servidor. Inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <div className="updatePasswordDesign d-flex flex-column">
            <div className="backProfile" onClick={()=>navigate("/Profile")}>Volver a mi perfil</div>
      <Container className="d-flex justify-content-center align-items-center">
        <div className="updatePasswordForm">
          <Row>
            <Col>
              <div className="updatePasswordTitle">ACTUALIZA LA CONTRASEÑA</div>
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
                type={"password"}
                design={
                  credentialsError.passwordError === ""
                    ? "normalInput"
                    : "normalInput errorInput"
                }
                placeholder={"  Antigua contraseña..."}
                name={"oldPassword"}
                functionHandler={inputHandler}
                onBlurFunction={inputCheck}
              />
              <div className="errorText">{credentialsError.passwordError}</div>
            </Col>
            <Col
              xs={7}
              sm={7}
              md={7}
              lg={7}
              xl={7}
              className="d-flex flex-column align-items-center text-center"
            >
              <InputText
                type={"password"}
                design={
                  newCredentialsError.newPasswordError === ""
                    ? "normalInput"
                    : "normalInput errorInput"
                }
                placeholder={"  Nueva contraseña..."}
                name={"newPassword"}
                functionHandler={inputHandlerNewPassword}
                onBlurFunction={inputCheckNewPassword}
              />
              <div className="errorText">
                {newCredentialsError.newPasswordError}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <div
                className="sendNewPassword"
                onClick={() => callUpdatePassword(token, passwordData)}
              >
                ACTUALIZAR!
              </div>
              {credentialsError.passwordError ||
              newCredentialsError.newPasswordError ? (
                <div className="registerErrorMessage">
                  Todos los campos deben estar rellenados correctamente.
                </div>
              ) : null}
              {errorMessage && <div className="errorText">{errorMessage}</div>}
              {successMessage && (
                <div className="successText">{successMessage}</div>
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="passwordForgotten text-center ">
                Si no recuerdas tu contraseña envía un correo a
                sylviecarsipassword@gmail.com
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
