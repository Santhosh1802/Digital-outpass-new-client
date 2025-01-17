import React from 'react';
import { Menubar } from 'primereact/menubar'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { persistor } from "../store"; 
export default function NavBarWarden() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleLogout=async()=>{
        persistor.purge().then(()=>{
            dispatch({type:"user/logout"});
            navigate("/");
        })
    }
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command:()=>navigate("/wardendashboard")
            
        },
        {
            label: 'Profile',
            icon: 'pi pi-user'
        },
        {
            label: 'View History',
            icon: 'pi pi-eye'
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command:()=>handleLogout()
        }
    ];

    const start = <img alt="logo" src="https://i.postimg.cc/xdPzZMgM/Logo.jpg" height="40" className="mr-2" style={{borderRadius:"5px"}}></img>;

    return (
        <div className="card" style={{ position: "fixed", top: 0,width:"99%",marginTop:"8px", zIndex: 1 }}>
            <Menubar model={items} start={start} />
        </div>
    )
}
        