import React, { useEffect } from "react";
import "./UserLateralNavbar.css"; 
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/Login/userSlice";
import { useNavigate } from "react-router-dom";
import { ChangeViewButton } from "../ChangeViewButton/ChangeViewButton";
import { Col, Container, Row } from "react-bootstrap";
import { ChangeViewButtonUserLateralNavbar } from "../ChangeViewButtonUserLateralNavbar/ChangeViewButtonUserLateralNavbar";

export const UserLateralNavbar = () => {

    const navigate = useNavigate()

    const dataUser = useSelector(userData)

    console.log(dataUser.dataUser.role)

    const role_ID= dataUser.dataUser.role

    console.log(role_ID)
    
    useEffect(() => {
        if (role_ID === "" || role_ID < 1 || role_ID > 4) {
            navigate("/");
        }
    }, [role_ID, navigate]);
    const dispatch = useDispatch()

    const handleNavigateHome = () => {
        navigate("/")
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate("/")
    };

    

    return( 
        <div className="userLateralNavbarDesign">

                {role_ID === 1 ? (
                    <div className="userLateralNavbarDesign">

                    
                    </div>
                  ) : role_ID === 2 ? (
                      // Contenido para el role_ID igual a 2 (Rol 2)
                      <div className="userLateralNavbarDesign">
                    {/* Agrega aquí los elementos específicos para el Rol 2 */}
                    </div>
                  ) : role_ID === 3 ? (
                      // Contenido para el role_ID igual a 3 (Rol 3)
                      <div className="userLateralNavbarDesign">
                    {/* Agrega aquí los elementos específicos para el Rol 3 */}
                    </div>
                  ) : role_ID === 4 ? (
                      // Contenido para el role_ID igual a 4 (Rol 4)
                      
                    <div className="userLateralNavbarDesign">
                        
                    {
                        <Container className="d-flex justify-content-center">
                            <Row >
                                <Col sm={12} md={12}  lg={12} xl={12} className="d-flex flex-column align-items-center text-center mt-2">   
                                    <ChangeViewButtonUserLateralNavbar path={""} name={"Editar mi perfil"} />
                                    <div className="space"></div>
                                    <ChangeViewButtonUserLateralNavbar path={""} name={"Mis pedidos"} />
                                    <div className="space"></div>
                                    <ChangeViewButtonUserLateralNavbar path={""} name={"Editar mi contraseña"} />
                                    <div className="space"></div>
                                    <div className="logout" onClick={()=>{handleLogout()}}>
                                        <p className="logoutText">Logout</p>
                                        <div className="logoutImg"></div>
                                    </div>
                                </Col>
                            </Row>   
                        </Container>
                    }
                    </div>
                  ) : null}

        </div>
    )

}