import React, { useEffect, useState } from "react";
import "./RestoreUserAccount.css"; 
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getOneDeletedUserByID, getUserDataByID, restoreUser } from "../../services/apicalls";
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";

export const RestoreUserAccount = () => {

    const navigate = useNavigate()

    let {id} = useParams()


    const dataUser = useSelector(userData)

    const userRole = dataUser.dataUser.role

    const token = dataUser.credentials.token

    const [userDataBackend, setUserDataBackend] = useState([])

    const [sure, setSure] = useState("")

    const [successMessage, setSuccessMessage] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    useEffect(()=>{

        if (userDataBackend.length === 0){
            getOneDeletedUserByID(token,{id})
            .then((response)=>{
                setUserDataBackend(response.data.data)

                if(response.data.data.length === 0){
                    navigate(`/UserDetail/${id}`)
                }
                
            })
            .catch((error) => {
                console.log('Error retrieving orders', error);})
            }

    },[userDataBackend, token])

    const restoreUserFunction = (token, id) => {

        restoreUser(id,token)
            .then((response)=>{
                if(response.status === 200){
                    setSuccessMessage("Cuenta activada con exito!")
                    setTimeout(() => {
                        navigate(`/AllUsers`)
                    }, 1500);
                } else {
                    setErrorMessage("Hubo un problema, intentalo más tarde")
                }
            })
            .catch((error) => {
                console.log('Error restoring user account', error);})

    }

    return(
        <div className="restoreUserAccountDesign">

            <Container fluid className="d-flex justify-content-center align-items-center">
                <div className="restoreUserAccountForm d-flex flex-column align-items-center"> 
                    <Row>
                        <Col>
                            <div className="restoreUserAccountTitle">
                                ACTIVAR CUENTA
                            </div>
                        </Col>
                    </Row>

                    <Row className="d-flex flex-row text-center">
                        <Col xs={6} sm={6} md={6} lg={6} >
                            <div className="sureMessage mt-4">Estás seguro de querer reactivar la cuenta de: </div>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            
                                {userDataBackend.length > 0

                                    ? userDataBackend.map((user)=>(
                                        <div className="d-flex flex-column align-items-center justify-content-center">
                                            <div className="nameAndSurnameRestoreUserAccount mt-4 fontWeight">{user.name}</div>
                                            <div className="nameAndSurnameRestoreUserAccount mt-1 fontWeight">{user.surname}</div>
                                        </div>
                                    ))
                                    : null
                                }
                            
                        </Col>
                    </Row>

                    <Row className="d-flex flex-row justify-content-around mt-4">

                        {sure === ""
                        
                            ?   <>
                                    <Col  xs={6} sm={6} md={6} lg={6} className="text-center mt-4 mb-4">
                                        <div className="sureButton p-2" onClick={()=>setSure("Sure")}>Activar</div>
                                    </Col>
                                    <Col  xs={6} sm={6} md={6} lg={6} className="text-center mt-4 mb-4">
                                        <div className="returnButtonRestore p-2"  onClick={()=>navigate(`/UserDetail/${id}`)}>Volver</div>
                                    </Col>
                                </>
                            :   <>
                                    <Col  xs={12} sm={12} md={12} lg={12} className="text-center">
                                        <div className="lastSure">¿SEGURO?</div>
                                    </Col>
                                    <Col  xs={6} sm={6} md={6} lg={6} className="text-center mt-4 mb-4">
                                        <div className="sureButton p-2" onClick={()=>restoreUserFunction(id,token)}>Activar</div>
                                    </Col>
                                    <Col  xs={6} sm={6} md={6} lg={6} className="text-center mt-4 mb-4">
                                        <div className="returnButtonRestore p-2" onClick={()=>navigate(`/UserDetail/${id}`)}>Volver</div>
                                    </Col>
                                </>
                        
                    }
                    
                    </Row>
                    <Row>
                        {successMessage !== ""
                            ? <Col>
                                <div className="successMessage">{successMessage}</div>
                            </Col>
                            : <Col>
                                <div className="errorMessage">{errorMessage}</div>
                            </Col>
                        }
                    </Row>
                </div>
            </Container>

        </div>
    )

}