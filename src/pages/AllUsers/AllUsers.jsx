import React, { useEffect, useState } from "react";
import "./AllUsers.css"; 
import { Col, Container, Row } from "react-bootstrap";
import { UserLateralNavbar } from "../../common/UserLateralNavbar/UserLateralNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import { getAllUsers } from "../../services/apicalls";
import { UserCard } from "../../common/UserCard/UserCard";

export const AllUsers = () => {

    const navigate = useNavigate()

    const dataUser = useSelector(userData)

    const token = dataUser.credentials.token

    const role_ID = dataUser.dataUser.role

    // useEffect(()=>{

    //     if(role_ID !== 1 || role_ID !== 2){
    //         navigate("/")
    //     }

    // },[role_ID, navigate]);

    const [users, setUsers] = useState([])

    useEffect(()=>{
        if(users.length === 0){
            getAllUsers(token)
                .then((results)=>{
                    setUsers(results.data.data)
                    console.log(results.data.data)
                })
                .catch((error) => console.log(error));
        }
    },[users, token])
    

    return(
        <div className="allUsersDesign">

            <div className="lateralNavbar ">
                <Container fluid>
                    <Row>
                        <Col sm={2} md={2} lg={2}>                    
                            <UserLateralNavbar/>
                        </Col>   
                    </Row>
                </Container>
            
            </div>

            <div className="allUsersContent">

                <Container>
                    <Row>

                        {users.length > 0
                        
                            ? users.map((user)=>(
                                <Col key={user.id} xs={12} sm={6} md={6} lg={4}>
                                    <UserCard
                                    
                                    role = {user.role.role}
                                    deleted_at = {user.deleted_at === null
                                                    ? "Active"
                                                    : "Inactive"
                                    }
                                    email = {user.email} 
                                    name = {user.name}
                                    surname = {user.surname}
                                    />
                                </Col>
                            ))
                            : (
                                <Col xs={12} sm={12} md={12} lg={12}>                    
                                <div className="emptyOrders">CARGANDO USUARIOS</div>
                            </Col>
                            )
                        
                        }

                    </Row>
                </Container>

            </div>

        </div>
    )

}