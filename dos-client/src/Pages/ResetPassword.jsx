import React, { useState } from "react";
import Logo from "../Components/Logo";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { ResetPasswordPost } from "../Api";
import { useLocation} from "react-router-dom";
export default function ResetPassword({ toast }) {
  const [password, setPassword] = useState("");
  const [confirmpassword,setConfirmPassword]=useState("");
  const location=useLocation();
  const searchParams=new URLSearchParams(location.search);
  const token=searchParams.get("token");
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Password Required!",
        life: 2000,
      });
    }
    if (confirmpassword === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Confirm Password Required!",
        life: 2000,
      });
    }
    if (password !== "" && confirmpassword!=="") {
      const res = await ResetPasswordPost(password,confirmpassword,token);
      if (res.message === "") {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: res.error,
          life: 2000,
        });
      }
      if (res.error === "") {
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
          boxShadow: "rgba(99, 99, 99, 0.4) 0px 5px 12px 0px"
        }}
      >
        <Logo />
        <form onSubmit={handleResetPassword}>
          <h1 style={{ textAlign: "center" }}>Reset Password</h1>
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
          <label htmlFor="confirmpassword">Confirm Password</label>
          <br />
          <Password
            id="confirmpassword"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            toggleMask
            feedback={false}
            placeholder="Confirm Password"
            style={{width:"100%"}}
          />
          <br />
          <br />
          <br />
          <div style={{ display: "inline-flex" }}>
            <Button label="Reset Password" severity="success" type="submit" />
            <Button
              label="Back to login"
              link
              type="button"
              onClick={() =>
                window.open("/", "_self")
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
