import React from 'react';
import { Menubar } from 'primereact/menubar';  
export default function NavBar() {
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
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
        }
    ];

    const start = <img alt="logo" src="https://i.postimg.cc/xdPzZMgM/Logo.jpg" height="40" className="mr-2" style={{borderRadius:"5px"}}></img>;

    return (
        <div className="card">
            <Menubar model={items} start={start} />
        </div>
    )
}
        