import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useSelector } from "react-redux";
import { VerifyQr } from "../Api";
import NavBarSecurity from "../Components/NavBarSecurity";

export default function SecurityDashboard() {
  const [scanEnabled, setScanEnabled] = useState(true);
  // const [message, setMessage] = useState("");
  // const [data, setData] = useState("");
  const token = useSelector((state) => state.user.token);
  const handleScan = (result) => {
    console.log("Scanned data:", result[0].rawValue);
    setScanEnabled(false);
    VerifyQr(token, result[0].rawValue);
    setTimeout(() => {
      setScanEnabled(true);
    }, 1000);
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
            {scanEnabled && (
              <Scanner
                onScan={handleScan}
                scanDelay={100}
                onError={(error) => console.log("Scanner error:", error)}
                styles={{width:"100%",height:"100%"}}      
              />
            )}
            {/* {<h1>{message}</h1>} */}
          </div>
          <div
            style={{
              border: "2px solid black",
              width: "600px",
              height: "570px",
              marginLeft: "5em",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
