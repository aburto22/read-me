import React, { Suspense, useState, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { checkAuth } from "./api/apiUser";
import Navbar from "./components/Navbar";
import { UserContext, UserContextProvider } from "./context/UserContext";
import RequireAuth from "./components/common/RequireAuth";
import OnlyNonAuth from "./components/common/OnlyNonAuth";
import Loading from "./components/Loading";

const Main = React.lazy(() => import("./components/Main"));
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const LoginError = React.lazy(() => import("./components/LoginError"));

const App = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setUserId } = useContext(UserContext);

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

  return (
    <UserContextProvider>
      <div className="bg-gray-primary text-white min-h-screen">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Navbar />
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
          </>
        )}
      </div>
    </UserContextProvider>
  );
};

export default App;
