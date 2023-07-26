import React, { useState } from "react";
import "./Home.css"; 
import { InputText } from "../../common/InputText/InputText";
import { UserCard } from "../../common/UserCard/UserCard";

export const Home = () => {

   return(
    <div className="homeDesign">

       <UserCard/>

    </div>

   )

}