import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GetOutpassRequests } from "../Api";
import NavBarSecurity from "../Components/NavBarSecurity";
import ViewOutPassHistory from "../Components/ViewOutPassHistory";
export default function SecurityViewHistory() {
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
      <NavBarSecurity />
      <div style={{ marginTop: "4em" }}>
        <ViewOutPassHistory details={data} token={token} />
      </div>
    </div>
  );
}
