import React, { useState } from "react";
import Logo from "../Components/Logo";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ForgotPasswordPost} from "../Api";
export default function ForgotPassword({ toast }) {
  const [email, setEmail] = useState("");
  const theme = localStorage.getItem("theme");
  const handleSendMail = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Email Required!",
        life: 2000,
      });
    }
    if (email !== "") {
      const res = await ForgotPasswordPost(email);
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
          background:
            theme === "dark" ? "rgb(208, 225, 253)" : "rgb(17, 24, 39)",
        }}
      >
        <Logo />
        <form onSubmit={handleSendMail}>
          <h1 style={{ textAlign: "center" }}>Forgot Password</h1>
          <label htmlFor="email">Email</label>
          <br />
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "275px"}}
            placeholder="Email"
          />
          <br />
          <br />
          <br />
          <div style={{ display: "inline-flex" }}>
            <Button label="Send Mail" severity="success" type="submit" />
            <Button
              label="Back to login"
              link
              type="button"
              onClick={() => window.open("/", "_self")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
