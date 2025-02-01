import React, { useState, useEffect } from "react";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { GetSecurityProfile } from "../Api";
import { useSelector } from "react-redux";
import NavBarSecurity from "../Components/NavBarSecurity";
export default function SecurityProfile({ toast }) {
  const [profileData, setProfileData] = useState({
    name: "",
    primary_number: "",
    profile: "",
  });
  const [loading, setLoading] = useState(true);
  const id = useSelector((state) => state.user.id);
  useEffect(() => {
    const fetchWardenInfo = async () => {
      try {
        const res = await GetSecurityProfile();
        console.log(res);
        
        setProfileData(res.data.result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWardenInfo();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
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
      <NavBarSecurity />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "5em",
        }}
      >
        <h1>Warden Profile</h1>
        <Image
          src={`data:image/jpeg;base64,${profileData.profile}`}
          alt=""
          preview
          style={{
            border: "px solid black",
            width: "200px",
            height: "200px",
          }}
          width="200px"
          height="200px"
          className="inputfield"
        />

        <div className="inputfield">
          <label htmlFor="name">Name</label>
          <br />
          <InputText
            id="name"
            keyfilter={"alpha"}
            value={profileData.name}
            readOnly
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
          />
        </div>

        <div className="inputfield">
          <label htmlFor="mobile">Mobile</label>
          <br />
          <InputText
            id="mobile"
            keyfilter={"num"}
            value={profileData.primary_number}
            readOnly
            onChange={(e) =>
              setProfileData({ ...profileData, mobile: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
