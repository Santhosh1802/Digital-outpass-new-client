import React, { useState } from "react";
import NavBarStudent from "../Components/NavBarStudent";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { GenerateQR } from "../Api";
import { useSelector } from "react-redux";
export default function StudentViewQR() {
  const [qr, setQr] = useState("");
  const id=useSelector((state)=>state.user.id);
  const handleQr=async()=>{
    const res=await GenerateQR(id);
    console.log(res.data);
    setQr(res.data);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NavBarStudent />
      <h1 style={{ marginTop: "4em" }}>Outpass QR</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          border: "1px solid black",
          width: "370px",
          height: "370px",
          marginTop: "2em",
        }}
      >
        <Image
          src={`data:image/jpeg;base64,${qr}`}
          alt=""
          width="370px"
          height="370px"
          preview
          style={{
            border: "2px solid black",
            width: "370px",
            height: "370px",
            borderRadius: "2em",
          }}
        />
      </div>
      <Button
        label="Refresh QR"
        style={{ marginTop: "2em" }}
        onClick={handleQr}
      />
    </div>
  );
}
