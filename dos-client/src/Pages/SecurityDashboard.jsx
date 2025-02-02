/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useSelector } from "react-redux";
import { VerifyQr } from "../Api";
import NavBarSecurity from "../Components/NavBarSecurity";

export default function SecurityDashboard({toast}) {
  //const [scanEnabled, setScanEnabled] = useState(true);
  const [data, setData] = useState({
    profile: "",
    name: "",
    department: "",
    mobile: "",
    message:""
  });
  const token = useSelector((state) => state.user.token);
  const handleScan = async (result) => {
    console.log("Scanned data:", result[0].rawValue);
    //setScanEnabled(false);
    const res = await VerifyQr(token, result[0].rawValue).then((res)=>{
      setData({
        name: res.data.name,
        profile: res.data.profile,
        department: res.data.department,
        phone: res.data.mobile,
        message:res.message
      });
      if(res.error!==""){
          toast.current.show({severity:"error",summary:"Error",detail:"Qr Code Expired"});
      }
    })
    // setTimeout(() => {
    //   setScanEnabled(true);
    // }, 1000);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NavBarSecurity />
      <div style={{ marginTop: "4em" }}>
        <h1>Welcome Security</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "500px", height: "500px" }}>
            
              <Scanner
                onScan={handleScan}
                scanDelay={100}
                onError={(error) => console.log("Scanner error:", error)}
                styles={{ width: "100%", height: "100%" }}
              />
          </div>
          <div
            style={{
              border: "2px solid black",
              width: "600px",
              height: "570px",
              marginLeft: "5em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Scanned Profile Details</h2>
            <img
              src={`data:image/jpeg;base64,${data.profile}`}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
              }}
            >
              <p>
                <strong>Name:</strong> {data.name}
              </p>
              <p>
                <strong>Department:</strong> {data.department}
              </p>
              <p>
                <strong>Phone:</strong> {data.phone}
              </p>
              <h1 style={{color:"green",fontSize:"1em"}}>{data.message}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
