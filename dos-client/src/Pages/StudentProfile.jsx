import React, { useState } from "react";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import NavBarStudent from "../Components/NavBarStudent";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
export default function StudentProfile() {
  const [profileData,setProfileData]=useState({
    name:"",
    mobile:"",
    department:"",
    parent_name:"",
    parent_mobile:"",
    guardian_name:"",
    guardian_mobile:"",
    home_addr:"",
    profile:"",
    email:""
  })
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <NavBarStudent></NavBarStudent>
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
          <h1>Student Profile</h1>
          <Image
            src={`data:image/jpeg;base64,${profileData.profile}`}
            alt="profile"
            preview
            style={{
              border: "2px solid black",
              width: "200px",
              height: "200px",
              borderRadius: "2em",
            }}
          />
          <br />
          <FileUpload accept="image/*" mode="basic" chooseLabel="Upload Profile Image"/>
          <br />
          <div>
          <label htmlFor="name">Student Name</label>
          <br />
          <InputText
            id="name"
            keyfilter={"alpha"}
            value={profileData.name}
            onChange={(e) => setProfileData({...profileData,name:e.target.value})}
            
          />
          </div>
          <br />
          <div>
          <label htmlFor="mobile">Student Mobile</label>
          <br />
          <InputText
            id="mobile"
            keyfilter={"num"}
            value={profileData.mobile}
            onChange={(e) => setProfileData({...profileData,mobile:e.target.value})}
          />
          </div>
          <br />
          <div>
          <label htmlFor="department">Student Department</label>
          <br />
          <InputText
            id="department"
            keyfilter={"alpha"}
            value={profileData.department}
            onChange={(e) => setProfileData({...profileData,department:e.target.value})}
          />
          </div>
          <br />
          <div>
          <label htmlFor="parent_name">Parent Name</label>
          <br />
          <InputText
            id="parent_name"
            keyfilter={"alpha"}
            value={profileData.parent_name}
            onChange={(e) => setProfileData({...profileData,parent_name:e.target.value})}
          />
          </div>
          <br />
          <div>
          <label htmlFor="parent_mobile">Parent Mobile</label>
          <br />
          <InputText
            id="parent_mobile"
            keyfilter={"num"}
            value={profileData.parent_mobile}
            onChange={(e) => setProfileData({...profileData,parent_mobile:e.target.value})}
          />
          </div>
          <br />
          <div>
          <label htmlFor="guardian_name">Guardian Name</label>
          <br />
          <InputText
            id="guardian_name"
            keyfilter={"alpha"}
            value={profileData.guardian_name}
            onChange={(e) => setProfileData({...profileData,guardian_name:e.target.value})}
          />
          </div>
          <br />
          <div>
          <label htmlFor="guardian_mobile">Guardian Mobile</label>
          <br />
          <InputText
            id="guardian_mobile"
            keyfilter={"num"}
            value={profileData.guardian_mobile}
            onChange={(e) => setProfileData({...profileData,guardian_mobile:e.target.value})}
          />
          </div>
          <br />
          <div>
          <label htmlFor="home_addr">Home Address</label>
          <br />
          <InputTextarea
            id="home_addr"
            keyfilter={"alphanum"}
            value={profileData.home_addr}
            onChange={(e) => setProfileData({...profileData,home_addr:e.target.value})}
            style={{width:"245px"}}
          />
          </div>
          <br />
          <Button label="Update Profile" severity="success" style={{width:"245px"}}/>
          <br />
        </div>
      </form>
    </div>
  );
}
