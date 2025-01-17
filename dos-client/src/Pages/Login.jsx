import React, { useState} from "react";
import Logo from "../Components/Logo";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { LoginPost } from "../Api";
import {useNavigate} from "react-router-dom";
import { useDispatch} from "react-redux";
import { setId, setUserType,setStoreEmail } from "../features/user/userSlice";
export default function Login({ toast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        dispatch(setStoreEmail(res.email))
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
          padding: "5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",
          borderRadius: "2em",
          boxShadow: "rgba(99, 99, 99, 0.4) 0px 5px 12px 0px"
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
            style={{ width: "275px" }}
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
