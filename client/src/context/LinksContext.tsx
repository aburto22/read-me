import { useState, useEffect, useMemo, createContext, Dispatch } from "react";
import { getLinks } from "../api/apiLinks";

interface ILinksContext {
  links: ILink[];
  isLoading: boolean;
  setLinks: Dispatch<React.SetStateAction<ILink[]>>;
}

const initial = {
  links: [],
  isLoading: true,
  setLinks: () => {
    throw new Error("No links context available.");
  },
};

export const LinksContext = createContext<ILinksContext>(initial);

export const LinksContextProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [links, setLinks] = useState<ILink[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getLinks().then((data) => {
      setIsLoading(false);
      if (data instanceof Error) {
        console.error(data);
        return;
      }
      if (data.length > 0) {
        setLinks(data);
      }
    });
  }, []);

  const LinksContextValue = useMemo(
    () => ({ links, setLinks, isLoading }),
    [links, isLoading]
  );

  return (
    <LinksContext.Provider value={LinksContextValue}>
      {children}
    </LinksContext.Provider>
  );
};
