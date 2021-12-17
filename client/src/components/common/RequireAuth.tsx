import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const RequireAuth = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { userId } = useContext(UserContext);

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
