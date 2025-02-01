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
        if(id===undefined){
          console.log("No id");
        }
        const res=await GetStudentInfo(id);
        
        if(res.data===""){
          navigate("/studentfirstupdate");
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchStudentInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <NavBarStudent />
      <div style={{ textAlign: "center" ,marginTop:"4em"}}>
        <h1>Welcome Student</h1>
      </div>
      <StudentGuide />
    </div>
  );
}
