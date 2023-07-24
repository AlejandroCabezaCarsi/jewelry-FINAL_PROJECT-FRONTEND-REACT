import React from "react";
import "./ChangeViewButtonUserLateralNavbar.css"

export const ChangeViewButtonUserLateralNavbar = ({path, name}) =>{

    return(
        <div className="ChangeViewButtonUserLateralNavbar" onClick={()=>Navigate(path)}>
            {name}
        </div>
    )

}