/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from "react";
import Logo from "../Components/Logo";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { LoginPost } from "../Api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setId, setUserType, setStoreEmail,setStoreToken } from "../features/user/userSlice";
import axios from "axios";
export default function Login({ toast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function TestSession() {
    try {
      const res = await axios.get(process.env.REACT_APP_LOGIN_API, {
        withCredentials: true,
      });
      //console.log("Test",res.data);
      
      //console.log("Session Test Response:", res.data.result._id);
      if(res.data){
      if (res.data.status===201) {
        dispatch(setId(res.data.result._id));
        dispatch(setUserType(res.data.result.user_type));
        dispatch(setStoreEmail(res.data.result.email));
        dispatch(setStoreToken(res.data.result.token));
  
        if (res.data.result.user_type === "admin") {
          navigate("/admindashboard");
        }
        if (res.data.result.user_type === "student") {
          navigate("/studentdashboard");
        }
        if (res.data.result.user_type === "security") {
          navigate("/securitydashboard");
        }
        if (res.data.result.user_type === "warden") {
          navigate("/wardendashboard");
        }
      } else {
        //console.error("Invalid session:", res.data.message || "Unknown error");
      }
    }
    } catch (err) {
      //console.error("Session Test Error:", err.response?.data || err.message);
    }
  }
  useEffect(() => {
    TestSession();
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Email Required!",
        life: 2000,
      });
    }
    if (password === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Password Required!",
        life: 2000,
      });
    }
    if (email !== "" && password !== "") {
      const res = await LoginPost(email, password);
      if (res.message === "") {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: res.error,
          life: 2000,
        });
      }
      if (res.error === "") {
        dispatch(setId(res.id));
        dispatch(setUserType(res.user_type));
        dispatch(setStoreEmail(res.email));
        dispatch(setStoreToken(res.token));
        if (res.user_type === "admin") {
          navigate("/admindashboard");
        }
        if (res.user_type === "student") {
          navigate("/studentdashboard");
        }
        if (res.user_type === "security") {
          navigate("/securitydashboard");
        }
        if (res.user_type === "warden") {
          navigate("/wardendashboard");
        }
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: res.message,
          life: 2000,
        });
      }
    }
  };
  return (
    <div
      style={{
        width: "100%",
        height: "98vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "2em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",
          borderRadius: "2em",
          boxShadow: "rgba(99, 99, 99, 0.4) 0px 5px 12px 0px",
        }}
      >
        <Logo />
        <form onSubmit={handleLogin}>
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <label htmlFor="email">Email</label>
          <br />
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%" }}
            placeholder="Email"
            keyfilter={"email"}
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            feedback={false}
            placeholder="Password"
            style={{width:"100%"}}
          />
          <br />
          <br />
          <br />
          <div style={{ display: "inline-flex" }}>
            <Button label="Login" severity="success" type="submit" />
            <Button
              label="Forgot Password ?"
              link
              type="button"
              onClick={() => window.open("/forgotpassword", "_self")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
