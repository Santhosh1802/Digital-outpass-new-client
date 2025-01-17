import React from "react";
import NavBarStudent from "../Components/NavBarStudent";
import { Button } from "primereact/button";

export default function StudentViewQR() {
  
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <NavBarStudent />
      <h1 style={{marginTop:"4em"}}>Outpass QR</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          border: "1px solid black",
          width: "370px",
          height: "370px",
          marginTop:"2em",
        }}
      >
        
      </div>
      <Button label="Refresh QR" style={{marginTop:"2em"}}/>
    </div>
  );
}
