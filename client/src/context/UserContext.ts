import React from "react";

interface IUserContext {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const initial = {
  userId: "",
  setUserId: () => {
    throw new Error("No user context available.");
  },
};

const UserContext = React.createContext<IUserContext>(initial);

export default UserContext;
