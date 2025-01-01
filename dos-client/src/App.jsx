import React, { useRef, useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Toast } from "primereact/toast";
import { ToggleButton } from "primereact/togglebutton";
import { ProgressSpinner } from "primereact/progressspinner";
import "./App.css";
const Login = lazy(() => import("./Pages/Login"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const ResetPassword=lazy(()=>import("./Pages/ResetPassword"));
const AdminDashboard=lazy(()=>import("./Pages/AdminDashboard"));
const SecurityDashboard=lazy(()=>import("./Pages/SecurityDashboard"));
const WardenDashboard=lazy(()=>import("./Pages/WardenDashboard"));
const StudentDashboard=lazy(()=>import("./Pages/StudentDashboard"));
export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const handleThemeChange = (e) => {
    const selectedTheme = e.value ? "dark" : "light";
    setIsDarkTheme(e.value);
    localStorage.setItem("theme", selectedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDarkTheme(savedTheme === "dark");
  }, []);
  useEffect(() => {
    const themeLink = document.getElementById("theme-link");
    if (isDarkTheme) {
      themeLink.href =
        "https://unpkg.com/primereact/resources/themes/lara-light-cyan/theme.css";
    } else {
      themeLink.href =
        "https://unpkg.com/primereact/resources/themes/lara-dark-cyan/theme.css";
    }
  }, [isDarkTheme]);
  const toast = useRef(null);
  return (
    <div>
      <Toast ref={toast} />
      <div className="toggle-button-container">
        <ToggleButton
          checked={isDarkTheme}
          onChange={handleThemeChange}
          onLabel="Dark"
          offLabel="Light"
          onIcon="pi pi-moon"
          offIcon="pi pi-sun"
          className="w-8rem"
        />
      </div>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="loading-container">
              <ProgressSpinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Login toast={toast} />} />
            <Route
              path="/forgotpassword"
              element={<ForgotPassword toast={toast} />}
            />
            <Route path="/resetpassword" element={<ResetPassword toast={toast}/>}/>
            <Route path="/admindashboard" element={<AdminDashboard/>}/>
            <Route path="/studentdashboard" element={<StudentDashboard/>}/>
            <Route path="/wardendashboard" element={<WardenDashboard/>}/>
            <Route path="/securitydashboard" element={<SecurityDashboard/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
