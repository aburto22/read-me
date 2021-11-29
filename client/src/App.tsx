import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { checkAuth } from "./api/apiUser";

const Main = React.lazy(() => import("./components/Main"));
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));

// TODO: Create context for userId to then fetch links.
// TODO: Set initial value based on checkAuth outcome.
// TODO: Then set value when users login or logout.
// TODO: Users that register get loged in immediately.

const App = (): JSX.Element => {
  useEffect(() => {
    checkAuth().then((data) => console.log(data));
  });

  return (
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
  );
};

export default App;
