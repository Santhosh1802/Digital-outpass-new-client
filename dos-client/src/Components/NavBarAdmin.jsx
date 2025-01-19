import React from 'react';
import { Menubar } from 'primereact/menubar';  
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { persistor } from "../store";
import axios from 'axios';
export default function NavBarAdmin() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleLogout=async()=>{
        persistor.purge().then(()=>{
            dispatch({type:"user/logout"});
            navigate("/");
        })
        await axios.delete(process.env.REACT_APP_SESSION_LOGOUT,{withCredentials:true});
    }
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command:()=>navigate("/admindashboard")
            
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command:()=>navigate("/adminprofile")
        },
        {
            label: 'Manage Students',
            icon: 'pi pi-user-edit',
            command:()=>navigate("/adminmanagestudent")
        },
        {
            label: 'Manage Wardens',
            icon: 'pi pi-user-edit',
            command:()=>navigate("/adminmanagewarden")
        },
        {
            label: 'Manage Securities',
            icon: 'pi pi-user-edit',
            command:()=>navigate("/adminmanagesecurity")
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command:()=>handleLogout()
        }
    ];

    const start = <img alt="logo" src="https://i.postimg.cc/xdPzZMgM/Logo.jpg" height="40" className="mr-2" style={{borderRadius:"5px",marginRight:"7em"}}></img>;

    return (
        <div className="card" style={{ position: "fixed", top: 0,width:"99%",marginTop:"8px", zIndex: 1 }}>
            <Menubar model={items} end={start}/>
        </div>
    )
}
        