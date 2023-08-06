import React, { useEffect } from "react";
import "./DeleteAccount.css"; 
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../Login/userSlice";
import { useNavigate } from "react-router-dom";
import { cancelAccount } from "../../services/apicalls";

export const DeleteAccount = () => {

    const navigate = useNavigate()

    const dataUser = useSelector(userData)

    const dispatch = useDispatch()

    const token = dataUser.credentials.token

    useEffect(()=>{

        if(token === ""){
            navigate("/")
        }

        if(token < 4){
            navigate("/Profile")
        }
    }, [token])

    const cancelUser = () =>{

        cancelAccount(token)
            .then((response)=>{
                if(response.status === 200){
                    dispatch(logout());
                    navigate("/");
                }
            })
    }



    return(
        
        <div className="deleteAccountDesign d-flex align-items-center justify-content-center">
            

            <Container>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col className="d-flex justify-content-center align-items-center">
                        CANCELAR CUENTA
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center mt-4">
                        ¿Estás seguro de querer <span className="mx-1 ">cancelar</span>  tu cuenta? 
                    </Col>
                </Row>
                <Row className="d-flex justify-content-around align-items-center mt-5">
                    <Col xs={3} sm={3} md={3} lg={2} className="d-flex justify-content-center">
                        <div className="cancelAccount d-flex justify-content-center align-items-center cursorPointer textBold" 
                        onClick={()=>cancelUser()}>CANCELAR</div> 
                    </Col>
                    <Col xs={3} sm={3} md={3} lg={2} className="d-flex justify-content-center">
                        <div className="returnButton d-flex justify-content-center align-items-center cursorPointer textBold" 
                                onClick={()=>navigate("/")}>VOLVER</div>
                        </Col>
                </Row>
            </Container>
            

        </div>

    )

}