import React from "react";
import "./ChangeViewButtonUserLateralNavbar.css";
import { useNavigate } from "react-router-dom";

export const ChangeViewButtonUserLateralNavbar = ({ path, name }) => {
  const navigate = useNavigate();

  return (
    <div
      className="ChangeViewButtonUserLateralNavbar"
      onClick={() => navigate(path)}
    >
      {name}
    </div>
  );
};
