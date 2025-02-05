import React from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { persistor } from "../store";
import axios from "axios";
export default function NavBarWarden() {
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
  };
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/wardendashboard"),
    },
    {
      label: "Profile",
      icon: "pi pi-user",
      command:()=>navigate("/wardenprofile")
    },
    {
      label:"Manage Students",
      icon:"pi pi-user-edit",
      command:()=>navigate("/wardenmanagestudent")
    },
    {
      label: "View History",
      icon: "pi pi-eye",
      command:()=>navigate("/wardenviewhistory")
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
      src="dos.png"
      height="40"
      className="mr-2"
      style={{ borderRadius: "5px",marginRight: "120px",marginTop:"2px"}}
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
