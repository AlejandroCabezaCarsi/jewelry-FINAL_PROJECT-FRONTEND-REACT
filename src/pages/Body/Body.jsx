import React from "react";
import {Routes, Route} from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { UpdateProfile } from "../UpdateProfile/UpdateProfile";
import { UpdatePassword } from "../UpdatePassword/UpdatePassword";
import { AllUsers } from "../AllUsers/AllUsers";
import { RestoreAccount } from "../RestoreAccount/RestoreAccount";
import { UserDetail } from "../UserDetail/UserDetail";


export const Body = () => {

    return(
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/Profile" element={<Profile/>}/>
                <Route path="/UpdateProfile" element={<UpdateProfile/>}/>
                <Route path="/UpdatePassword" element={<UpdatePassword/>}/>
                <Route path="/AllUsers" element={<AllUsers/>}/>
                <Route path="/RestoreAccount" element={<RestoreAccount/>}/>
                <Route path="/UserDetail/:id" element={<UserDetail/>}/>

            </Routes>
        </>
    )

}