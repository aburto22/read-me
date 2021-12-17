import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const OnlyNonAuth = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { userId } = useContext(UserContext);

  if (userId) {
    return <Navigate to="/" />;
  }

  return children;
};

export default OnlyNonAuth;
