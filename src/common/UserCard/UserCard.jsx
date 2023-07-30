import React from "react";
import "./UserCard.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const UserCard = ({ role, deleted_at, email, name, surname, id }) => {
  const navigate = useNavigate();

  return (
    <div className="userCardDesign">
      <Container className="fontSize text-center p-3">
        <Row className="d-flex justify-content-center ">
          <Col xs={7} sm={5} md={5} lg={7}>
            <div
              className={
                deleted_at === "Active"
                  ? "userCardStatus scrollIfNeeded activeUser mb-2"
                  : "userCardStatus scrollIfNeeded deletedUser mb-2 "
              }
            >
              {deleted_at}
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="userCardRole scrollIfNeeded textBold ">{role}</div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="userCardEmail mt-2 scrollIfNeeded textBold">
              {email}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="userCardEmail mt-2 scrollIfNeeded">{name}</div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="userCardEmail mt-2 scrollIfNeeded">{surname}</div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div
              className="viewDetail mt-2 scrollIfNeeded"
              onClick={() => navigate(`/UserDetail/${id}`)}
            >
              Abrir en detalle
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
