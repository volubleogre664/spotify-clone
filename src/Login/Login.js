import React from "react";
import { loginUrl } from "../spotify";
import "./Login.css";

function Login() {
  return (
    <div className="login">
      {/* Spotify Logo */}
      <img
        className=""
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="spotify logo"
      />

      {/* Login with spotify button */}
      <a className="login__spotify" href={loginUrl}>
        LOGIN WITH SPOTIFY
      </a>
    </div>
  );
}

export default Login;
