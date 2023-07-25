import React, { useState } from "react";
import "./UpdateProfile.css";
import { Col, Container, Row } from "react-bootstrap";
import { InputText } from "../../common/InputText/InputText";
import { updateUser } from "../../services/apicalls";
import { checkError } from "../../services/useful";
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import { useNavigate } from "react-router-dom";

export const UpdateProfile = () => {
  const navigate = useNavigate();

  const dataUser = useSelector(userData);

  const token = dataUser.credentials.token;

  console.log(token);

  const [credentials, setCredentials] = useState({
    name: "",
    surname: "",
    email: "",
    city: "",
    postalCode: "",
    address: "",
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

  const [successMessage, setSuccessMessage] = useState("");

  const updateMe = async () => {
    try {
      const dataToSend = {};

      if (credentials.name.trim() !== "") {
        dataToSend.name = credentials.name.trim();
      }

      if (credentials.surname.trim() !== "") {
        dataToSend.surname = credentials.surname.trim();
      }

      if (credentials.email.trim() !== "") {
        dataToSend.email = credentials.email.trim();
      }

      if (credentials.city.trim() !== "") {
        dataToSend.city = credentials.city.trim();
      }

      if (credentials.postalCode.trim() !== "") {
        dataToSend.postalCode = credentials.postalCode.trim();
      }

      if (credentials.address.trim() !== "") {
        dataToSend.address = credentials.address.trim();
      }

      if (Object.keys(dataToSend).length === 0) {
        setErrorMessage("Debes rellenar al menos un campo para actualizar.");
        return;
      }

      const response = await updateUser(token, dataToSend);

      if (response.status === 200 || response.status === 204) {
        setSuccessMessage("¡Datos actualizados correctamente!");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/Profile");
        }, 3000);
      } else {
        setErrorMessage(
          "Hubo un error en la actualización de los datos. Inténtalo de nuevo más tarde."
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
    <div className="updateProfileDesign">
      <Container className="d-flex flex-column align-items-center borderUpdate">
        <div className="updateForm p-4">
          <Row>
            <Col
              sm={12}
              md={12}
              lg={12}
              className="d-flex justify-content-center"
            >
              <div className="updateTitle">ACTUALIZA TUS DATOS</div>
            </Col>
          </Row>

          <Row className="text-center">
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
                placeholder={"Nombre..."}
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
                placeholder={"Apellido..."}
                name={"surname"}
              />
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
              className="d-flex flex-row justify-content-center"
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
                placeholder={"Ciudad..."}
                name={"city"}
              />
            </Col>
          </Row>
          <Row>
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
                placeholder={"Código postal..."}
                name={"postalCode"}
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
                placeholder={"Direccion..."}
                name={"address"}
              />
            </Col>
          </Row>

          <Row>
            <Col className="d-flex flex-column align-items-center mb-3">
              <div
                onClick={
                  credentialsError.emailError || credentialsError.passwordError
                    ? null
                    : updateMe
                }
                className={`registerButton ${
                  credentialsError.emailError || credentialsError.passwordError
                    ? "inactiveButton"
                    : ""
                }`}
              >
                Update
              </div>
              {credentialsError.emailError || credentialsError.passwordError ? (
                <div className="registerErrorMessage">
                  Todos los campos deben estar rellenados correctamente.
                </div>
              ) : null}

              {errorMessage && <div className="errorText">{errorMessage}</div>}
              {successMessage && <div className="successMessage">{successMessage}</div>}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
