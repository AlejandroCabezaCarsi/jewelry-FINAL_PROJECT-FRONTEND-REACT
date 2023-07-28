import React, { useEffect, useState } from "react";
import "./UserDetail.css"; 
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { UserLateralNavbar } from "../../common/UserLateralNavbar/UserLateralNavbar";
import { getAllOrdersByUserID, getOneDeletedUserByID, getUserDataByID } from "../../services/apicalls";
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
                <Col xs={3} sm={3} md={3} lg={3}>
                    <UserLateralNavbar/>
                </Col>
                <Col xs={9} sm={9} md={9} lg={9} className="d-flex justify-content-center">
                    <div className="detailContent d-flex flex-row justify-content-center align-items-center ">

                        <Container fluid className="d-flex flex-column justify-content-center ">
                            <Row className="r">
                                <Col xs={12} sm={9} md={9} lg={12} className="d-flex justify-content-center" >
                                    {userDataBackend.length > 0
                                        ? userDataBackend.map((user)=> (
                                            <UserCardDetail
                                                deleted_at = {(user.deleted_at).split('T')[0]}
                                                email = {user.email}
                                                name = {user.name}
                                                surname = {user.surname}
                                                id = {user.id}
                                                created_at = {(user.created_at).split('T')[0] }
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
                                <Col xs={12} sm={9} md={9} lg={9} className="text-center mb-3">
                                    <div className="userDetailOrdersTitle">TODAS LAS COMPRAS DEL USUARIO</div>
                                </Col>
                            </Row>

                            <Row className="d-flex justify-content-center">
                                {orders.length !== 0
                                    ? orders.map((order=>(
                                        <Col xs={12} sm={8} md={8} lg={8}>
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