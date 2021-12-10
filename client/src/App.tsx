import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { checkAuth } from "./api/apiUser";
import UserContext from "./context/UserContext";
import RequireAuth from "./components/common/RequireAuth";
import OnlyNonAuth from "./components/common/OnlyNonAuth";
import Loading from "./components/Loading";

const Main = React.lazy(() => import("./components/Main"));
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const LoginError = React.lazy(() => import("./components/LoginError"));

const App = (): JSX.Element => {
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth().then((data) => {
      setIsLoading(false);

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
        {isLoading ? (
          <Loading />
        ) : (
          <Suspense fallback={<Loading />}>
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
              <Route path="oauth-login" element={<LoginError />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        )}
      </div>
    </UserContext.Provider>
  );
};

export default App;
