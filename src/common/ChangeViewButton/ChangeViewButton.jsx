import React from "react";
import "./ChangeViewButton.css";
import { useNavigate } from "react-router-dom";

export const ChangeViewButton = ({ path, name }) => {
  const navigate = useNavigate();

  return (
    <div className="changeViewButtonDesign" onClick={() => navigate(path)}>
      {name}
    </div>
  );
};
