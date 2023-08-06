import React, { useEffect, useState } from "react";
import "./BuyCardPrepare.css"; 
import { Col, Container, Row } from "react-bootstrap";
import { updateOrder } from "../../services/apicalls";
import { userData } from "../../pages/Login/userSlice";
import { useSelector } from "react-redux";

export const BuyCardPrepare = ({id,date, statusOrder,products, name, surname, address,city,postalCode}) => {

    const dataUser = useSelector(userData)

    const token = dataUser.credentials.token


    const [newStatus, setNewStatus] = useState("")

    useEffect(()=>{
        if(newStatus !== ""){
            updateOrder(token, newStatus, id)

        }
    })

    return(
        <div className="buyCardPrepareDesign">
            <Container>
                <Row>
                    <Col>
                    <div className="buyDate textSize textBold">
                        {date}
                    </div>
                    </Col>

                    <Col xs={12} sm={12} md={4} lg={4} className="d-flex align-items-center">
                        <div className="statusBuy textSize textBold">
                            {statusOrder}
                        </div>
                    </Col>
                </Row>

                <Row className="d-flex flex-column">
                    <Col className="textSize textBold">Productos:</Col>

                    {products.length > 0

                        ? products.map((product)=>(
                            
                            <Col className="productFind d-flex flex-row">
                                <div className="productReferences mt-2 textSize"> Referencia: {product.reference}</div>

                                <div className="productName mt-2 textSize ms-4"> Nombre: {product.name}</div>
                            </Col>
                        )) : null 
                    
                    }
                </Row>

                <Col xs={12} sm={12} md={12} lg={12} className="textSize textBold mt-3"> Datos del usuario: </Col>
                <Row className="d-flex justify-content-around  productFind">
                    <Col xs={12} sm={12} md={4} lg={4} className=" d-flex flex-row text-center align-items-center justify-content-center mt-2 mb-2"> Nombre: <p className=" d-flex align-items-center kustify-content-center ms-2 textBold textSize mt-3">{name}</p></Col>
                    <Col xs={12} sm={12} md={4} lg={4} className=" d-flex flex-row text-center align-items-center justify-content-center mt-2 mb-2">Apellido: <p className="ms-2 textBold textSize mt-3">{surname}</p></Col>
                    <Col xs={12} sm={12} md={4} lg={4} className=" d-flex flex-row text-center align-items-center justify-content-center mt-2 mb-2"> Código postal: <p className="ms-2 textBold textSize mt-3">{postalCode}</p></Col>
                    <Col xs={12} sm={12} md={4} lg={4} className=" d-flex flex-row text-center align-items-center justify-content-center mb-2">Dirección: <p className="ms-2 textBold textSize mt-3">{address}</p></Col>
                    <Col xs={12} sm={12} md={4} lg={4} className=" d-flex flex-row text-center align-items-center justify-content-center mb-2">Ciudad: <p className="ms-2 textBold textSize mt-3">{city}</p></Col>
                    
                </Row>

                <Row className="d-flexjustify-content-center">

                    {statusOrder === "confirmed"

                        ?   <Col xs={12} sm={12} md={12} lg={12} className="d-flex justify-content-center mt-2 mb-2">
                                <div className="buttonSendData cursorPointer p-2 text-center" onClick={()=>setNewStatus(2)}>Cambiar status a enviado</div>
                            </Col> 
                        

                        :  statusOrder === "delivered"
                                ? null 
                                :<Col xs={12} sm={12} md={12} lg={12} className="d-flex justify-content-center mt-2">
                                <div className="buttonSendData cursorPointer p-2 text-center" onClick={()=>setNewStatus(3)}>Cambiar status a entregado</div>
                                </Col> 
                    
            
                    
                    }
                    
                    
                </Row>
            </Container>
        </div>
    )

}