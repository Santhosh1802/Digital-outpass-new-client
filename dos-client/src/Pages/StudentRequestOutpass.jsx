import React, { useState} from "react";
import NavBarStudent from "../Components/NavBarStudent";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

export default function StudentRequestOutpass() {
  const [reason, setReason] = useState("");
  const [outTime, setOutTime] = useState("");
  const [inTime,setInTime]=useState("");

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <NavBarStudent />
      <form>
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
          <div>
          <label htmlFor="reason">Reason</label>
          <br />
          <InputText
            id="reason"
            keyfilter={"alpha"}
            value={reason}
            placeholder="Your Reason"
            onChange={(e) => setReason(e.target.value)}
          />
          </div>
          <br />
          <div>
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
          <br />
          <div>
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
          <br />
          <Button label="Send Request" severity="success" style={{width:"245px"}}/>
        </div>
      </form>
    </div>
  );
}
