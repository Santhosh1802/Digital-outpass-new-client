import React from "react";
import NavBarStudent from "../Components/NavBarStudent";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function StudentViewRequestStatus() {
  
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <NavBarStudent />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop:"5em"
        }}
      >
        <h1>Outpass Request Status</h1>
        <DataTable emptyMessage="No Request Found">
          <Column field="out_time" header="Out Time"></Column>
          <Column field="in_time" header="In Time"></Column>
          <Column field="reason" header="Reason"></Column>
          <Column field="status" header="Status"></Column>
        </DataTable>
      </div>
    </div>
  );
}
