import React from "react";
import "./UserCardDetail.css"; 
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../../pages/Login/userSlice";

export const UserCardDetail = ({role, deleted_at, email, name, surname, id, created_at, city, postalCode, address}) => {

    const dataUser = useSelector(userData)

    console.log(role)

    // const userRole = dataUser.dataUser.role

    const userRole = 1

    // const deleted_at = "A"

    console.log(deleted_at)

    return(
        <div className="userCardDetailDesign">

            <Container className="fontSize text-center p-3" >
                <Row className="d-flex justify-content-around">
                    <Col xs={6} sm={5} md={5} lg={4}>
                        <div className="userCardRole scrollIfNeeded ">{role.role}</div>
                    </Col>
                    
                    <Col xs={6} sm={5} md={5} lg={4}>
                        <div className="userCardStatus scrollIfNeeded">{created_at}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>                        
                        <div className="userCardEmail mt-2 scrollIfNeeded">{email}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>                        
                        <div className="userCardEmail mt-2 scrollIfNeeded">{name}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>                        
                        <div className="userCardEmail mt-2 scrollIfNeeded">{surname}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={4}>                        
                        <div className="userCardEmail mt-2 scrollIfNeeded">{city}</div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={2}>                        
                        <div className="userCardEmail mt-2 scrollIfNeeded">{postalCode}</div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6}>                        
                        <div className="userCardEmail mt-2 scrollIfNeeded">{address}</div>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-around mt-4">
                    {userRole === 1 && role.id >= 2 || userRole === 2 && role.id >= 3
                    
                        ? <Col xs={3} sm={3} md={3} lg={3} className="d-flex justify-content-center align-items-center">
                        <div className="changeRole buttonUserCardDetail">CAMBIAR ROL</div>                        
                        
                            </Col>
                        : null
                    
                    }

                    {
                        deleted_at === null || deleted_at === "" || deleted_at === undefined

                        ? null
                        : <Col xs={3} sm={3} md={3} lg={3} className="d-flex justify-content-center align-items-center">
                                <div className="restoreAccount buttonUserCardDetail">Habilitar cuenta</div>                        
                        
                            </Col>
                    }

                    <Col xs={3} sm={3} md={3} lg={3} className="d-flex justify-content-center align-items-center">
                        <div className="deleteAccount buttonUserCardDetail">ELIMINAR CUENTA </div>
                    </Col>
                    
                </Row>
            </Container>


        </div>
    )

}