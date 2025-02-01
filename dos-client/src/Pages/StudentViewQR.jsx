import React, { useState,useEffect } from "react";
import NavBarStudent from "../Components/NavBarStudent";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { GenerateQR} from "../Api";
export default function StudentViewQR() {
  const [qr, setQr] = useState("");
  useEffect(()=>{
    async function getqr(){
      const res= await GenerateQR();
      setQr(res.data);
    }
    getqr();
  },[])
  
  const handleQr=async()=>{
    const res=await GenerateQR();
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
          src={qr}
          alt=""
          width="370px"
          height="370px"
          preview
          style={{
            border: "px solid black",
            width: "370px",
            height: "370px",
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
