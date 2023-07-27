import React, { useEffect, useState } from "react";
import "./UserDetail.css"; 
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { UserLateralNavbar } from "../../common/UserLateralNavbar/UserLateralNavbar";
import { getAllOrdersByUserID, getUserDataByID } from "../../services/apicalls";
import { UserCardDetail } from "../../common/UserCardDetail/UserCardDetail";
import { BuyCard } from "../../common/BuyCard/BuyCard";

export const UserDetail = () => {
    const navigate = useNavigate()

    const dataUser = useSelector(userData)

    const userRole = dataUser.dataUser.role

    const token = dataUser.credentials.token

    let {id} = useParams()

    console.log(id)

    // if (role > 2 ){
    //     navigate("/")
    // }

    const [userDataBackend, setUserDataBackend] = useState([])

    console.log(userDataBackend)


    useEffect(()=>{

        if(userDataBackend.length === 0){
            getUserDataByID(token, id)
                .then((response)=>{
                    setUserDataBackend(response.data.data)
                })
        }
    }, [])

    const [orders, setOrders] = useState([])

    useEffect(()=>{

        if(orders.length === 0){
            getAllOrdersByUserID(token, id)
                .then((response)=>{
                    setOrders(response.data.data)
                })
                .catch((error) => {
                    console.log('Error retrieving orders', error);})}
        

    },[])

    return(
        <div className="userDetailDesign">

        <Container fluid>

            <Row>
                <Col sm={3} md={3} lg={3}>
                    <UserLateralNavbar/>
                </Col>
                <Col sm={9} md={9} lg={9} className="d-flex justify-content-center">
                    <div className="detailContent">

                        <Container fluid>
                            <Row>
                                <Col className="d-flex ">
                                   {userDataBackend.lengt !== 0
                                        ? userDataBackend.map((user)=> (
                                            <UserCardDetail
                                            deleted_at = {user.deleted_at}
                                            email = {user.email}
                                            name = {user.name}
                                             surname = {user.surname}
                                             id = {user.id}
                                             created_at = {user.created_at}
                                              city = {user.city}
                                              postalCode = {user. postalCode}
                                              address = {user.address}
                                              role = {user.role}
                                            />
                                        
                                        ))
                                        : null
                                    }
                                </Col>
                                
                            </Row>

                            <Row className="d-flex justify-content-center">
                                <Col className="text-center mb-3">
                                    <div className="userDetailOrdersTitle">TODAS LAS COMPRAS DEL USUARIO</div>
                                </Col>
                            </Row>

                            <Row className="d-flex justify-content-center">
                                {orders.length !== 0
                                    ? orders.map((order=>(
                                        <Col sm={8} md={8} lg={8}>
                                            <BuyCard 
                                            date={order.date}
                                            status={order.status_orders.name}
                                            products={order.product.length}
                                            // picture={}
                                            // price ={}
                                            />
                                        </Col>
                                    )))
                                    : null
                                }

                            </Row>
                        </Container>


                    </div>
                </Col>
            </Row>
        </Container>

        

        

        </div>
    )

}