import React from "react";

interface IUserContext {
  userId: string;
  setUserId: (val: string) => void;
}

const initial = {
  userId: "",
  setUserId: (val: string) => {},
};

const UserContext = React.createContext<IUserContext>(initial);

export default UserContext;
