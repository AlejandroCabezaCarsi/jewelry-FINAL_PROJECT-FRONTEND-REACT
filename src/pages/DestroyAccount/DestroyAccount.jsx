import React, { useEffect, useState } from "react";
import "./DestroyAccount.css"; 
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import { destroyUser, getOneDeletedUserByID } from "../../services/apicalls";
import { InputText } from "../../common/InputText/InputText";
import { checkError } from "../../services/useful";

export const DestroyAccount = () => {

    const navigate = useNavigate()

    let {id} = useParams()

    console.log(id)

    const dataUser = useSelector(userData)

    const userRole = dataUser.dataUser.role

    const token = dataUser.credentials.token
    console.log(token)

    const [userDataBackend, setUserDataBackend] = useState([])

    const [sure, setSure] = useState("")

    console.log(sure)

    const [successMessage, setSuccessMessage] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    const [confirmation, setConfirmation] = useState("");

    const inputHandler = (e) => {
      setConfirmation((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const [deleteError, setDeleteError] = useState("")

    const inputCheck = (e) => {
        let mensajeError = checkError(e.target.name, e.target.value);
    
        setDeleteError(mensajeError)
      };

        useEffect(()=>{
        
            let userFounded = false
    
            if (userDataBackend.length === 0){
                getOneDeletedUserByID(token,{id})
                .then((response)=>{
                    console.log(response)
                    setUserDataBackend(response.data.data)
                    if(response.data.data.length === 0){
                      
                            console.log("ENTRO?")
                    
                            getUserDataByID(token, id)
        
                            .then((response)=>{
                                console.log(response)
                            setUserDataBackend(response.data.data)
                        })
                        .catch((error) => {
                            console.log('Error retrieving orders', error);})
                        
                    }else{
                        setUserDataBackend(response.data.data)
    
                    }
                })
                .catch((error) => {
                    console.log('Error retrieving orders', error);})
                }
                
                
        }, [])

        const destroyUserFunction = (token ,id) =>{
            destroyUser(token,id)
                .then((response)=>{
                    if(response.status === 200){
                        setSuccessMessage("USUARIO ELIMINADO CON EXITO")
                        setTimeout(() => {
                            navigate("/AllUsers")
                        }, 1000);
                    }else{
                        setErrorMessage("Ha habido un problema con la eliminación")
                    }

                })
                .catch((error) => {
                    console.log('Error retrieving orders', error);
                })
                
        }

        

    return(
        <div className="destroyAccountDesign">
            <Container  fluid className="d-flex justify-content-center align-items-center">
            <div className="destroyAccountForm d-flex flex-column align-items-center"> 
                <Row>
                    <Col>
                    <div className="destroyAccountTitle">
                                ELIMINAR CUENTA
                            </div>
                    </Col>
                </Row>
                <Row className="d-flex flex-row text-center">
                        <Col xs={6} sm={6} md={6} lg={6} >
                            <div className="sureMessage mt-4">Estás seguro de querer ELIMINAR la cuenta de: </div>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            
                                {userDataBackend.length > 0

                                    ? userDataBackend.map((user)=>(
                                        <div className="nameAndSurnameRestoreUserAccount mt-4 fontWeight">{user.name}{user.surname}</div>
                                    ))
                                    : null
                                }
                            
                        </Col>
                    </Row>
                    

                        {sure === "" 
                            ?<Row className="d-flex flex-row mt-5">
                                <Col>
                                <div className="destroyUserButton" onClick={()=>setSure("seguro")}>ELIMINAR</div>
                                </Col>
                                <Col>
                                    <div className="returnDeleteButton">VOLVER</div>
                                </Col>
                            </Row>
                            : <Row className="d-flex flex-column text-center">

                                <Col>
                                    <div className="deleteText mt-5">Escribe eliminar y después pulsa el botón eliminar</div>
                                </Col>
                                <Col>
                                    <div className="confirmDelete">
                                    <InputText
                                    type={"email"}
                                    design={
                                        deleteError === ""
                                          ? "normalInput"
                                          : "normalInput errorInput"
                                      }
                                    placeholder={"  Escribe ELIMINAR"}
                                    name={"delete"}
                                    functionHandler={inputHandler}
                                    onBlurFunction={inputCheck}
                                  /></div>
                                </Col>
                                {deleteError !== ""
                                    ? <Col>
                                        <div className="messageError">{deleteError}</div>
                                    </Col>
                                    : null
                                }
                                {
                                    confirmation === ""

                                    ? <Col>
                                        <div className="confirmationEmpty mt-3">↑Escribe ELIMINAR ↑</div>
                                        </Col>
                                    :<Col className="mt-5">
                                    <div className="sendDeleteData" 
                                         onClick={
                                        deleteError!== ""
                                            ? null
                                            : ()=>destroyUserFunction(token, id)
                                        
                                        } >ELIMINAR</div>
                                </Col>
                                }
                                
                                <Col>
                                        <div className="successOrError">{successMessage}{errorMessage}</div>
                                </Col>
                            </Row>
                            
                        }
                        
                    
                </div>
            </Container>
        </div>
    )

}