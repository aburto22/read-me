import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

const Main = React.lazy(() => import("./components/Main"));
const Login = React.lazy(() => import("./components/Login"));

const App = (): JSX.Element => (
  <div className="bg-gray-primary text-white min-h-screen">
    <Navbar />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  </div>
);

export default App;
