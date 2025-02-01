/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from "react";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import NavBarStudent from "../Components/NavBarStudent";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { GetStudentInfo, UpdateStudentInfo } from "../Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function StudentProfile({toast}) {
  const [profileData, setProfileData] = useState({
    name: "",
    mobile: "",
    department: "",
    parent_name: "",
    parent_mobile: "",
    guardian_name: "",
    guardian_mobile: "",
    home_addr: "",
    profile: "",
  });
  const[loading,setLoading]=useState(true);
  const id = useSelector((state) => state.user.id);
  const email=useSelector((state)=>state.user.email);
  const navigate=useNavigate();
  useEffect(() => {
      const fetchStudentInfo=async()=>{
        try {
          const res=await GetStudentInfo(id);
          console.log(res.data);
          
          setProfileData(res.data);
          setLoading(false);
          if(res.data===""){
            navigate("/studentfirstupdate");
          }
        } catch (error) {
          //console.log(error);
        }
      }
      fetchStudentInfo();
    }, []);
    const handleFileUpload = (e) => {
      const file = e.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          profile: `${reader.result.split(",")[1]}`,
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    const handleUpdate=(e)=>{
      e.preventDefault();
      UpdateStudentInfo(email,profileData)
      .then((res)=>{
        if(res.error===""){
          toast.current.show({severity:"success",summary:"Success",detail:res.message});
        }
        if(res.message===""){
          toast.current.show({severity:"error",summary:"Error",detail:res.error})
        }
      })
    }
    if(loading){
      return <div>Loading...</div>
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
      <NavBarStudent></NavBarStudent>
      <form onSubmit={handleUpdate}>
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

          <FileUpload
            accept="image/*"
            mode="basic"
            chooseLabel="Upload Profile Image"
            className="inputfield"
            onSelect={handleFileUpload}
          />

          <div className="inputfield">
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

          <div className="inputfield">
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

          <div className="inputfield">
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

          <div className="inputfield">
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

          <div className="inputfield">
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

          <div className="inputfield">
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

          <div className="inputfield">
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

          <div className="inputfield">
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

          <Button
            label="Update Profile"
            severity="success"
            style={{ width: "245px" }}
          />
        </div>
      </form>
    </div>
  );
}
