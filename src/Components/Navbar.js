import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.svg"; // Import the logo image
import LoginNav from "./UI/LoginNav";
import ModeratorNav from "./admin/ModeratorNav";
import NormalNav from "./UI/NormalNav";
const NavBar = ({ history }) => {
  const userId = localStorage.getItem("user_id");

  const userAccess = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("userType");
      localStorage.removeItem("categoryId");
    }
    window.location = "/login";
  };
  return (
    <nav style={{backgroundColor:"#2f4867"}} className="navbar navbar-dark navbar-expand-md p-3" dir="rtl">
      <div className="container">
      <Link className="navbar-brand" to="/">
      <div className="logo">
      <img src={logo} alt="Logo" className="logo-image" style={{width:"3em" , height:"2.5em"}}/>
    </div>
        </Link>
     
        {localStorage.getItem("userType") === "normal" && (
          <NormalNav userId={userId} userAccess={userAccess} />
        )}
        {(localStorage.getItem("userType") === "moderator" ||
          localStorage.getItem("userType") === "delivery") && (
          <ModeratorNav userAccess={userAccess} />
        )}
        {localStorage.getItem("userType") === null && (
          <LoginNav userAccess={userAccess} />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
