import { useState, useMemo, createContext, Dispatch } from "react";

interface IUserContext {
  userId: string;
  setUserId: Dispatch<React.SetStateAction<string>>;
}

const initial = {
  userId: "",
  setUserId: () => {
    throw new Error("No user context available.");
  },
};

export const UserContext = createContext<IUserContext>(initial);

export const UserContextProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [userId, setUserId] = useState<string>("");

  const UserContextValue = useMemo(() => ({ userId, setUserId }), [userId]);

  return (
    <UserContext.Provider value={UserContextValue}>
      {children}
    </UserContext.Provider>
  );
};
