import React, { useEffect, useState } from "react";
import "./AllUsers.css";
import { Col, Container, Row } from "react-bootstrap";
import { UserLateralNavbar } from "../../common/UserLateralNavbar/UserLateralNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";
import {
  getAllDeletedUsers,
  getAllRoles,
  getAllUsers,
  getAllUsersFiltered,
} from "../../services/apicalls";
import { UserCard } from "../../common/UserCard/UserCard";
import { Switch } from "@mui/material";

export const AllUsers = () => {
  const navigate = useNavigate();

  const dataUser = useSelector(userData);

  const token = dataUser.credentials.token;

  const role_ID = dataUser.dataUser.role;
  
    if (role_ID != 1 && role_ID != 2) {
      navigate("/");
    }


  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers(token)
        .then((results) => {
          setUsers(results.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [users, token]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getAllRoles(token).then((response) => {
      setRoles(response.data.data);
    });
  }, [token]);

  const [roleSelected, setRoleSelected] = useState("");

  const handleRoleSelected = (event) => {
    setRoleSelected(event.target.value);
  };

  const [nameOrEmail, setNameOrEmail] = useState("");

  const handleNameOrEmail = (event) => {
    setNameOrEmail(event.target.value);
  };

  useEffect(() => {
    if (roleSelected != "" || nameOrEmail != "") {
      const bring = setTimeout(() => {
        getAllUsersFiltered(token, roleSelected, nameOrEmail)
          .then((response) => {
            setUsers(response.data.data);
          })
          .catch((error) => console.log(error));
      }, 350);

      return () => clearTimeout(bring);
    } else {
      getAllUsers(token)
        .then((results) => {
          setUsers(results.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [roleSelected, nameOrEmail]);

  const [deleted_at, setDeleted_at] = useState(false);

  const handleDeleted_at = () => {
    setDeleted_at((prevState) => !prevState);
  };

  useEffect(() => {
    if (deleted_at === true) {
      getAllDeletedUsers(token)
        .then((response) => {
          setUsers(response.data.data);
        })
        .catch((error) => console.log(error));
    } else {
      getAllUsers(token)
        .then((results) => {
          setUsers(results.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [deleted_at]);

  return (
    <div className="allUsersDesign">
      <Container fluid>
        <Row className="d-flex justify-content-between">
          <Col xs={2} sm={2} md={2} lg={2}>
            <div className="lateralNavbar ">
              <Container fluid>
                <Row>
                  <Col sm={2} md={2} lg={2}>
                    <UserLateralNavbar />
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col xs={10} sm={10} md={9} lg={9}>
            <div className="allUsersContent">
              <Container>
                <div className="filterNavbar">
                  <Container>
                    <Row className="d-flex align-items-center justify-content-center">
                      <Col
                        xs={10}
                        sm={2}
                        md={2}
                        lg={4}
                        className="d-flex justify-content-center mb-3"
                      >
                        <select
                          value={roleSelected}
                          onChange={handleRoleSelected}
                        >
                          <option value="">Filtrar por rol</option>
                          {roles.length > 0
                            ? roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                  {role.role}
                                </option>
                              ))
                            : null}
                        </select>
                      </Col>
                      <Col
                        xs={10}
                        sm={2}
                        md={2}
                        lg={4}
                        className="d-flex justify-content-center mb-3"
                      >
                        <input
                          type="text"
                          value={nameOrEmail}
                          onChange={handleNameOrEmail}
                        />
                      </Col>
                      <Col
                        xs={10}
                        sm={2}
                        md={2}
                        lg={4}
                        className="d-flex justify-content-center"
                      >
                        <input
                          type="checkbox"
                          checked={deleted_at}
                          onChange={handleDeleted_at}
                        />
                        <div className="checkboxText ms-2">
                          Solo usuarios inactivos
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Row>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <Col key={user.id} xs={12} sm={6} md={6} lg={4}>
                        <UserCard
                          role={user.role.role}
                          deleted_at={
                            user.deleted_at === null ? "Active" : "Inactive"
                          }
                          email={user.email}
                          name={user.name}
                          surname={user.surname}
                          id={user.id}
                        />
                      </Col>
                    ))
                  ) : (
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <div className="emptyOrders">CARGANDO USUARIOS</div>
                    </Col>
                  )}
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
