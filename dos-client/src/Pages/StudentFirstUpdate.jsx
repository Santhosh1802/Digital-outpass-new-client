import React, { useState } from "react";
//import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import NavBarStudent from "../Components/NavBarStudent";
import { Button } from "primereact/button";
//import { FileUpload } from "primereact/fileupload";
import { CreateStudent } from "../Api";
import { useSelector } from "react-redux";
export default function StudentFirstUpdate() {
  const id=useSelector((state)=>state.user.id);
  const [profileData, setProfileData] = useState({
    name: "",
    mobile: "",
    department: "",
    parent_name: "",
    parent_mobile: "",
    guardian_name: "",
    guardian_mobile: "",
    home_addr: "",
    login:id,
  });
  // const handleFileUpload = (e) => {
  //   const file = e.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setProfileData({
  //       ...profileData,
  //       profile: `${reader.result.split(",")[1]}`,
  //     });
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profileData);
    const res = await CreateStudent(profileData);
    console.log(res);
  };
  return (
    <div>
      <NavBarStudent></NavBarStudent>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5em",
          }}
        >
          <h1>Fill Student Profile</h1>
          {/* <Image
            src={
              profileData.profile
                ? `data:image/jpeg;base64,${profileData.profile}`
                : ""
            }
            alt="profile"
            width="200px"
            height="200px"
            preview
            style={{
              border: "2px solid black",
              width: "200px",
              height: "200px",
              borderRadius: "2em",
            }}
          />
          <br />
          <FileUpload
            accept="image/*"
            mode="basic"
            chooseLabel="Upload Profile Image"
            onSelect={handleFileUpload}
          /> */}
          <br />
          <div>
            <label htmlFor="name">Student Name</label>
            <br />
            <InputText
              id="name"
              keyfilter={"alpha"}
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }

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
              onChange={(e) =>
                setProfileData({ ...profileData, mobile: e.target.value })
              }

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
              onChange={(e) =>
                setProfileData({ ...profileData, department: e.target.value })
              }
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
              onChange={(e) =>
                setProfileData({ ...profileData, parent_name: e.target.value })
              }
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
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  parent_mobile: e.target.value,
                })
              }
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
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  guardian_name: e.target.value,
                })
              }
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
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  guardian_mobile: e.target.value,
                })
              }
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
              onChange={(e) =>
                setProfileData({ ...profileData, home_addr: e.target.value })
              }
              style={{ width: "245px" }}
            />
          </div>
          <br />
          <Button
            label="Update Profile"
            severity="success"
            style={{ width: "245px" }}
          />
          <br />
        </div>
      </form>
    </div>
  );
}
