import React, { useState, useEffect } from "react";
import { instance } from './libs/services/api-client/apiClient';
import "./App.css";
import Header from "./libs/page-content/Header";
import Home from "./libs/home/HomeView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MaterialForm from "./libs/forms/MaterialForm";
import Report from "./libs/reports/Report";
import QRCodeReader from "./libs/qr/QRCodeReader";
import Invalid from "./libs/invalid/Invalid";
import UserManagement from "./libs/admin/UserManagement/UserManagement";
import Logs from "./libs/admin/Logs/Logs";

// MUI PRO
import { LicenseInfo } from "@mui/x-license-pro";
LicenseInfo.setLicenseKey(
  "962f492b63bc42efaa1912e1c879212cTz02MzgzOSxFPTE3MTI1MDY2MzYxODMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        await instance.get("/users/current").then((response) => {
          setUser(response.data);
        });
      } catch (error) {
        console.log('Error finding current user.\n' + error);
      }
      setIsLoading(false);
    }
    
    loadCurrentUser();
  }, []);

  console.log("user: ", user);
  return (
    <>
      {!isLoading && 
        <Router>
          {user ? (
            <>
              <Header user={user} />
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/material/:material/:action/:id?" element={<MaterialForm />} />
                <Route path="/report/:type/:id/" element={<Report />} />
                <Route path="/qr/read" element={<QRCodeReader />} />
                <Route path="/user-management" element={<UserManagement user={user} />} />
                <Route path="/logs" element={<Logs user={user} />} />
                <Route path="/invalid" element={<Invalid />} />
                <Route path="*" element={<Invalid />} />
              </Routes>
            </>
          ) : (
            <>
              <Header />
              <Routes>
                <Route path="*" exact={true} element={<Invalid />} />
              </Routes>
            </>
          )}
        </Router>
      }
    </>
  );
}

export default App;
