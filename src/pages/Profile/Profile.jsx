import React, { useEffect } from "react";
import "./Profile.css";
import { UserLateralNavbar } from "../../common/UserLateralNavbar/UserLateralNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../Login/userSlice";

export const Profile = () => {

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

    return(
        <div className="profileDesign">

            <UserLateralNavbar/>
        </div>
    )

}