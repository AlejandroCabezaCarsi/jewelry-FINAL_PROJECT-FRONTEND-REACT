import React, { useEffect, useState } from "react";
import "./UserDetail.css"; 
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { UserLateralNavbar } from "../../common/UserLateralNavbar/UserLateralNavbar";
import { getUserDataByID } from "../../services/apicalls";

export const UserDetail = () => {
    const navigate = useNavigate()

    const dataUser = useSelector(userData)

    const role = dataUser.dataUser.role

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

    return(
        <div className="userDetailDesign">

        <Container fluid>

            <Row>
                <Col sm={3} md={3} lg={3}>
                    <UserLateralNavbar/>
                </Col>
                <Col sm={9} md={9} lg={9} className="d-flex justify-content-center">
                    <div className="detailContent">

                        <Container fluid className="fondo">
                            <Row>
                                <Col>
                                    <div className="userDetailName">{userDataBackend.name}</div>
                                </Col>
                                
                            </Row>
                        </Container>


                    </div>
                </Col>
            </Row>
        </Container>


        </div>
    )

}