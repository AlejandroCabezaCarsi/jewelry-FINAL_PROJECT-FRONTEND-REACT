import React from "react";
import "./UserCard.css"; 
import { Col, Container, Row } from "react-bootstrap";

export const UserCard = ({role,deleted_at, email, name, surname}) => {

    return(

        <div className="userCardDesign">
            <Container className="fontSize text-center p-3" >
                <Row>
                    <Col xs={6} sm={5} md={5} lg={6}>
                        <div className="userCardRole ">{role}</div>
                    </Col>
                    <Col xs={6} sm={5} md={5} lg={6}>
                        <div className="userCardStatus ">{deleted_at}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>                        
                        <div className="userCardEmail mt-2">{email}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>                        
                        <div className="userCardEmail mt-2">{name}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>                        
                        <div className="userCardEmail mt-2">{surname}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>                        
                        <div className="viewDetail mt-2">Abrir en detalle</div>
                    </Col>
                </Row>
            </Container>

        </div>

    )

}