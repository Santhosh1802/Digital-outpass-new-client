import React, { useState} from "react";
import NavBarStudent from "../Components/NavBarStudent";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { CreateTransaction } from "../Api";


export default function StudentRequestOutpass({toast}) {
  const [reason, setReason] = useState("");
  const [outTime, setOutTime] = useState("");
  const [inTime,setInTime]=useState("");
  const id=useSelector((state)=>state.user.id);
  const handleRequest=(e)=>{
    e.preventDefault();
    const data={
      in_time:inTime,
      out_time:outTime,
      reason:reason,
      login:id,
    }
    //console.log(data);
    if(reason===""||outTime===""||inTime===""){
      toast.current.show({severity:"warn",summary:"Warning",detail:"Please fill all fields"});
      return;
    }
    if(inTime===outTime){
      toast.current.show({severity:"warn",summary:"Warning",detail:"In time and Out time should be unique"});
      return;
    }
    CreateTransaction(data)
    .then((res)=>{
      if(res.error===""){
        toast.current.show({severity:"success",summary:"Success",detail:"Request Sent"});
      }
    })
  }
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <NavBarStudent />
      <form onSubmit={handleRequest} style={{width:"80%"}}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5em",
          }}
        >
          <h1>Request Outpass</h1>
          <div className="inputfield">
          <label htmlFor="reason">Reason</label>
          <br />
          <InputText
            id="reason"
            value={reason}
            placeholder="Your Reason"
            onChange={(e) => setReason(e.target.value)}
          />
          </div>
          
          <div className="inputfield">
          <label htmlFor="out_date">Out Time</label>
          <br />
          <Calendar
            id="out_date"
            value={outTime}
            onChange={(e) => setOutTime(e.target.value)}
            showTime
            hourFormat="12"
            placeholder="Select Out Time"
          />
          </div>
          
          <div className="inputfield">
          <label htmlFor="in_time">In Time</label>
          <br />
          <Calendar
            id="in_time"
            value={inTime}
            onChange={(e) => setInTime(e.target.value)}
            showTime
            hourFormat="12"
            placeholder="Select In Time"
          />
          </div>
          
          <Button type="submit" label="Send Request" severity="success" style={{width:"250px"}}/>
        </div>
      </form>
    </div>
  );
}
