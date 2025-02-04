import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetOutpassRequests } from "../Api";
import ViewOutPassHistory from "../Components/ViewOutPassHistory";
import NavBarWarden from "../Components/NavBarWarden";
export default function WardenViewHistory() {
  const [data, setData] = useState({});
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    async function getDetails(token) {
      const res = await GetOutpassRequests(token);
      setData(res.data);
    }
    getDetails(token);
  }, [token]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NavBarWarden />
      <div style={{ marginTop: "4em" ,width:"80%"}}>
        <ViewOutPassHistory details={data} token={token} />
      </div>
    </div>
  );
}
