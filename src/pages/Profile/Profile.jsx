import React, { useEffect, useState } from "react";
import "./Profile.css";
import { UserLateralNavbar } from "../../common/UserLateralNavbar/UserLateralNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import { Col, Container, Row } from "react-bootstrap";
import { BuyCard } from "../../common/BuyCard/BuyCard";
import { getAllOrdersByUserID } from "../../services/apicalls";
import Spinner from 'react-bootstrap/Spinner';


export const Profile = () => {

    const navigate = useNavigate()

    const dataUser = useSelector(userData)

    const role_ID= dataUser.dataUser.role

    const token = dataUser.credentials.token

    const userID = dataUser.dataUser.id


    //Check if the user 
    
    useEffect(() => {
        if (role_ID === "" || role_ID < 1 || role_ID > 4) {
            navigate("/");
        }
    }, [role_ID, navigate]);

    const [orders, setOrders] = useState([])

    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(()=>{
        if (orders.length === 0){
            getAllOrdersByUserID(token,userID)
                .then((results) => {
                    setOrders(results.data.data)
                    setShowSpinner(false)                    
                })
                .catch((error) => console.log(error))
                setShowSpinner(false);
        }

    },[orders,token])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(false)
        }, 2000);
    
            return () => clearTimeout(timer)
        }, []);

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
                <Row className="d-flex flex-row justify-content-center aling-items-center ">
                    

                    {orders.length > 0

                        ? orders.map((order) =>(

                            <Col key={order.id} xs={12} sm={10} md={10} lg={10}>
                                <BuyCard 
                                order={order} 
                                date={order.date} 
                                status={order.status_orders.name}
                                products={order.products}
                                picture={order.products}
                                price={order.price}
                                name={order.name}
                                />
                            </Col>
                        ))
                        : showSpinner ? (
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="d-flex flex-row justify-content-center align-items-center"
                            >
                              <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </Spinner>
                            </Col>
                          ) : (
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              className="d-flex flex-row justify-content-center align-items-center"
                            >
                              <div>No tienes ningún pedido.</div>
                            </Col>
                          )}
                </Row>

            </Container>
        </div>

        </div>
    )

}