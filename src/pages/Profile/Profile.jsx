import React, { useEffect, useState } from "react";
import "./Profile.css";
import { UserLateralNavbar } from "../../common/UserLateralNavbar/UserLateralNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import { Col, Container, Row } from "react-bootstrap";
import { BuyCard } from "../../common/BuyCard/BuyCard";
import { getAllOrdersByUserID } from "../../services/apicalls";

export const Profile = () => {

    const navigate = useNavigate()

    const dataUser = useSelector(userData)

    const role_ID= dataUser.dataUser.role

    const token = dataUser.credentials.token

    const userID = dataUser.dataUser.id

    console.log("USERID " + userID)

    //Check if the user 
    
    useEffect(() => {
        if (role_ID === "" || role_ID < 1 || role_ID > 4) {
            navigate("/");
        }
    }, [role_ID, navigate]);

    const [orders, setOrders] = useState([])

    useEffect(()=>{
        if (orders.length === 0){
            getAllOrdersByUserID(token,userID)
                .then((results) => {
                    console.log(results)
                    setOrders(results.data.data)
                    
                })
                .catch((error) => console.log(error));
        }

    },[orders,token])

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
                    

                    {orders.length > 0

                        ? orders.map((order) =>(

                            <Col key={order.id} xs={12} sm={6} md={6} lg={10}>
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
                        : (
                            <Col xs={12} sm={12} md={12} lg={12}>                    
                                <div className="emptyOrders">NO TIENES NINGUNA COMPRA</div>
                            </Col>

                            
                        )
                    }
                </Row>

            </Container>
        </div>

        </div>
    )

}