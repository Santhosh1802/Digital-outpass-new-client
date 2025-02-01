import React from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { persistor } from "../store";
import axios from "axios";
export default function NavBarStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    persistor.purge().then(() => {
      dispatch({ type: "user/logout" });
      navigate("/");
    });
    await axios.delete(process.env.REACT_APP_SESSION_LOGOUT, {
      withCredentials: true,
    });
    //console.log(res);
  };
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/studentdashboard"),
    },
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => navigate("/studentprofile"),
    },
    {
      label: "Request Outpass",
      icon: "pi pi-car",
      command: () => navigate("/studentrequestoutpass"),
    },
    {
      label: "View Request Status",
      icon: "pi pi-eye",
      command: () => navigate("/studentviewrequeststatus"),
    },
    {
      label: "View QR",
      icon: "pi pi-qrcode",
      command: () => navigate("/studentviewqr"),
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => handleLogout(),
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://i.postimg.cc/xdPzZMgM/Logo.jpg"
      height="40"
      className="mr-2"
      style={{ borderRadius: "5px", marginRight: "120px",marginTop:"2px" }}
    ></img>
  );

  return (
    <div
      className="card"
      style={{
        position: "fixed",
        top: 0,
        width: "99%",
        marginTop: "8px",
        zIndex: 1,
      }}
    >
      <Menubar model={items} end={start} />
    </div>
  );
}
