import React, { useEffect } from "react";
import NavBarStudent from "../Components/NavBarStudent";
import { GetStudentInfo } from "../Api";
import { useNavigate } from "react-router-dom";
import StudentGuide from "../Components/StudentGuide";
import { useSelector } from "react-redux";
export default function StudentDashboard() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.id);
  useEffect(() => {
    const fetchStudentInfo=async()=>{
      try {
        const res=await GetStudentInfo(id);
        console.log(res.data);
        
        if(res.data===""){
          navigate("/studentfirstupdate");
        }
      } catch (error) {
        //console.log(error);
        
      }
    }
    fetchStudentInfo();
  }, [navigate,id]);

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <NavBarStudent />
      <div style={{ textAlign: "center" }}>
        <h1>Welcome Student</h1>
      </div>
      <StudentGuide />
    </div>
  );
}
