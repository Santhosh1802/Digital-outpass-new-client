/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NavBarAdmin from "../Components/NavBarAdmin";
import { Card } from "primereact/card";
import { GetAllSecurity, GetAllStudent, GetAllWarden,GetOutpassRequests } from "../Api";
import ViewOutPassHistory from "../Components/ViewOutPassHistory";
import { useSelector } from "react-redux";
export default function AdminDashboard() {
  const [data, setData] = useState({});
  const [counts,setCounts] = useState({security:0,warden:0,student:0,outpasses:0});
  const token=useSelector((state)=>state.user.token);
  useEffect(()=>{
    const getDetails=async()=>{
      const sec_res=await GetAllSecurity(token);
      const stu_res=await GetAllStudent(token);
      const war_res=await GetAllWarden(token);
      const trans_res = await GetOutpassRequests(token);
      if(trans_res){
      setData(trans_res.data);
      setCounts({
      security:sec_res.data.result.length,
      students:stu_res.data.result.length,
      warden:war_res.data.result.length,
      outpasses:trans_res.data.length,
      })}
    }
    getDetails();
  },[])
  const cardStyle = {
    textAlign: "center",
    //padding: "2rem",
    fontSize: "1.5rem",
    marginBottom: "1rem",
    display:"flex", 
    margin: "5px", 
    width:"120px"
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: "20px",
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
      <NavBarAdmin />
      <div style={{ marginTop: "4em",width:"80%" }}>
        <div style={containerStyle}>
          <div style={cardStyle}>
            <Card title="Warden Count">
              <h2>{counts.warden}</h2>
            </Card>
          </div>
          <div style={cardStyle}>
            <Card title="Security Count">
              <h2>{counts.security}</h2>
            </Card>
          </div>
          <div style={cardStyle}>
            <Card title="Student Count">
              <h2>{counts.students}</h2>
            </Card>
          </div>
          <div style={cardStyle}>
            <Card title="Outpass Count">
              <h2>{counts.outpasses}</h2>
            </Card>
          </div>
        </div>
        <ViewOutPassHistory details={data} token={token} />
      </div>
    </div>
  );
}
