import React, { useEffect } from "react";
import "./Profile.css";
import { UserLateralNavbar } from "../../common/UserLateralNavbar/UserLateralNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import { Col, Container, Row } from "react-bootstrap";
import { BuyCard } from "../../common/BuyCard/BuyCard";

export const Profile = () => {

    const navigate = useNavigate()

    const dataUser = useSelector(userData)

    const role_ID= dataUser.dataUser.role
    
    useEffect(() => {
        if (role_ID === "" || role_ID < 1 || role_ID > 4) {
            navigate("/");
        }
    }, [role_ID, navigate]);

    return(
        <div className="profileDesign">
        <div className="lateralNavbar ">
            <Container fluid>
                <Row>
                    <Col sm={2} md={2} lg={2}>                    
                        <UserLateralNavbar/>
                    </Col>   
                </Row>
            </Container>
            
        </div>

        <div className="profileContent">
            <Container>
                <Row className="d-flex flex-row justify-content-around ">
                    <Col xs={12} sm={6} md={6} lg={6}>                    
                        <BuyCard/>
                    </Col>   
                    <Col xs={12} sm={6} md={6} lg={6}>                    
                        <BuyCard/>
                    </Col>   
                      
                </Row>

            </Container>
        </div>

        </div>
    )

}