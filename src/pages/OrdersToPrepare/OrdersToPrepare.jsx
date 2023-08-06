import React, { useEffect, useState } from "react";
import "./OrdersToPrepare.css"; 
import { Col, Container, Row } from "react-bootstrap";
import { UserLateralNavbar } from "../../common/UserLateralNavbar/UserLateralNavbar";
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import { useNavigate } from "react-router-dom";
import { getAllOrders, getAllStatusOrders } from "../../services/apicalls";
import Spinner from 'react-bootstrap/Spinner';
import { BuyCard } from "../../common/BuyCard/BuyCard";
import { BuyCardPrepare } from "../../common/BuyCardPrepare/BuyCardPrepare";



export const OrdersToPrepare = () => {

    const navigate = useNavigate()

    const dataUser = useSelector(userData)

    const token = dataUser.credentials.token

    

    const role = dataUser.dataUser.role

    const [orders, setOrders] = useState([])

    const [statusOrderSelected, setStatusOrderSelected] = useState("")

    const handleStatusOrderSelected = (event) => {
        setStatusOrderSelected(event.target.value);
      };

    const [showSpinner, setShowSpinner] = useState(true);


    useEffect(()=>{
        if(role > 3 || token === ""){
            navigate("/")
        }
    })

    useEffect(()=>{
        if (orders.length === 0 || statusOrderSelected !== ""){
            getAllOrders(statusOrderSelected, token )
                .then((results) => {
                    setOrders(results.data.data)
                    setShowSpinner(false)                    
                })
                .catch((error) => console.log(error))
                setShowSpinner(false);
        }

    },[statusOrderSelected, orders])

    const [statusOrders, setStatusOrders] = useState([]);

  useEffect(() => {

    if (statusOrders.length === 0){
        getAllStatusOrders(token)
        .then((response) => {
          setStatusOrders(response.data.data);
        });
    }
  }, [statusOrders]);


    return(
        <div className="ordersToPrepareDesign">
            <div className="lateralNavbarOrdersToPrepare ">
            <Container fluid>
                <Row>
                    <Col sm={2} md={2} lg={2}>                    
                        <UserLateralNavbar/>
                    </Col>   
                </Row>
            </Container>
            
        </div>

        <div className="contentOrdersToPrepare d-flex justify-content-center align-items-center">

        <Container>

        <Row className="d-flex justify-content-center align-items-center mt-3 filterNavbar p-2">
          <Col
            xs={12}
            sm={12}
            md={4}
            lg={4}
            className="d-flex justify-content-center mb-2"
          >
            <select value={statusOrderSelected} onChange={handleStatusOrderSelected}>
              <option value="">Filtrar por status</option>
              {statusOrders.length > 0
                ? statusOrders.map((statusOrder) => (
                    <option key={statusOrder.id} value={statusOrder.id}>
                      {statusOrder.name}
                    </option>
                  ))
                : null}
            </select>
          </Col>
          </Row>
                <Row className="d-flex flex-row justify-content-center aling-items-center ">
                    
                    {orders.length > 0

                    

                        ? orders.map((order) =>(
                            
                            <Col key={order.id} xs={12} sm={10} md={10} lg={10} className="mt-4">
                                <BuyCardPrepare
                                id={order.id}
                                date={order.date} 
                                statusOrder={order.status_orders.name} 
                                products={order.products} 
                                name={order.user.name} 
                                surname={order.user.surname}
                                address={order.user.address}
                                city={order.user.address}
                                postalCode={order.user.postalCode}

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
                              <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </Spinner>
                            </Col>
                          )}
                </Row>

            </Container>
            </div>
        </div>
        
    )

}