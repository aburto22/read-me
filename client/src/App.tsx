import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { checkAuth } from "./api/apiUser";
import UserContext from "./context/UserContext";
import RequireAuth from "./components/common/RequireAuth";
import OnlyNonAuth from "./components/common/OnlyNonAuth";

const Main = React.lazy(() => import("./components/Main"));
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));

// TODO: Error for existing username not registering correctly.

const App = (): JSX.Element => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    checkAuth().then((data) => {
      if (data instanceof Error) {
        throw data;
      }

      if (data) {
        setUserId(data);
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
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Main />
                </RequireAuth>
              }
            />
            <Route
              path="/login"
              element={
                <OnlyNonAuth>
                  <Login />
                </OnlyNonAuth>
              }
            />
            <Route
              path="/register"
              element={
                <OnlyNonAuth>
                  <Register />
                </OnlyNonAuth>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </UserContext.Provider>
  );
};

export default App;
