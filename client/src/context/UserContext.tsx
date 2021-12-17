import { useState, useEffect, useMemo, createContext, Dispatch } from "react";
import { checkAuth } from "../api/apiUser";

interface IUserContext {
  userId: string;
  isLoading: boolean;
  setUserId: Dispatch<React.SetStateAction<string>>;
}

const initial = {
  userId: "",
  isLoading: true,
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth().then((data) => {
      setIsLoading(false);
      if (data instanceof Error) {
        console.error(data);
        return;
      }

      if (data) {
        setUserId(data);
      }
    });
  }, []);

  const UserContextValue = useMemo(
    () => ({ userId, setUserId, isLoading }),
    [userId, isLoading]
  );

  return (
    <UserContext.Provider value={UserContextValue}>
      {children}
    </UserContext.Provider>
  );
};
