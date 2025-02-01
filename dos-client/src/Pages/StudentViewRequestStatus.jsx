import React, { useEffect, useState } from "react";
import NavBarStudent from "../Components/NavBarStudent";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { GetTransactionStatus } from "../Api";

export default function StudentViewRequestStatus() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetTransactionStatus();
        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
      <div style={{ width: "80%", overflow: "scroll", marginTop: "4em" }}>
        <div>
          <h1>Outpass Request Status</h1>
          <DataTable value={data} emptyMessage="No Request Found">
            <Column field="out_time" header="Out Time"></Column>
            <Column field="in_time" header="In Time"></Column>
            <Column field="reason" header="Reason"></Column>
            <Column field="status" header="Status"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}
