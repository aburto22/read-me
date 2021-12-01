import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { checkAuth } from "./api/apiUser";
import UserContext from "./context/UserContext";

const Main = React.lazy(() => import("./components/Main"));
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));

// TODO: Users that register get loged in immediately.

const App = (): JSX.Element => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    checkAuth().then((data) => {
      if (data && data.userId) {
        setUserId(data.userId);
      }
    });
  }, []);

  const UserContextValue = useMemo(() => ({ userId, setUserId }), [userId]);

  return (
    <UserContext.Provider value={UserContextValue}>
      <div className="bg-gray-primary text-white min-h-screen">
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </div>
    </UserContext.Provider>
  );
};

export default App;
