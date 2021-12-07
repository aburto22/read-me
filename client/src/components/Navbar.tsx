import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { userLogout, getUsername } from "../api/apiUser";
import Svg from "./common/svg";

const Navbar = (): JSX.Element => {
  const { userId, setUserId } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [isNavShowing, setIsNavShowing] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      getUsername().then((data) => {
        if (data && !(data instanceof Error)) {
          setUsername(data);
        }
      });
    }
  }, [userId]);

  useEffect(() => {
    const closeNavbar = (event: MouseEvent) => {
      if (!event.target || !isNavShowing) {
        return;
      }

      const element = event.target as HTMLElement;

      if (element.tagName === "A" || element.tagName === "BUTTON") {
        setIsNavShowing(false);
      }
    };

    document.addEventListener("click", closeNavbar);

    return () => document.removeEventListener("click", closeNavbar);
  });

  const handleLogout = async (): Promise<void> => {
    const data = await userLogout();
    if (!(data instanceof Error)) {
      setUserId(data || "");
      setUsername("");
    }
  };

  const handleToggle = () => {
    setIsNavShowing((val) => !val);
  };

  return (
    <header className="h-navbar w-full bg-gray-dark border-b border-gray-500 lg:fixed z-40">
      <nav className="mx-auto max-w-screen-lg h-full relative">
        <ul className="flex items-center h-full px-2 sm:px-4">
          <li>
            <Link
              className="sm:text-xl px-2 py-1 flex items-center mr-auto"
              to="/"
            >
              <img
                src="/favicon-32x32.png"
                alt="Read me icon"
                className="h-6 mr-2 mt-1"
              />
              Read-Me
            </Link>
          </li>
          <li className="ml-auto sm:hidden">
            <button type="button" onClick={handleToggle} className="p-2">
              <Svg name="menu" />
            </button>
          </li>
          <li className="sm:ml-auto">
            <ul
              className={`${
                isNavShowing ? "flex" : "hidden"
              } fixed min-h-screen right-0 top-0 w-full z-50 bg-gray-dark flex-col items-center justify-center 
              sm:flex sm:flex-row sm:w-auto sm:static sm:min-h-0`}
            >
              <li>
                <button
                  type="button"
                  onClick={handleToggle}
                  className="absolute top-2 right-2 sm:hidden p-2"
                >
                  <Svg name="close" />
                </button>
              </li>
              {username && <li className="italic py-2 px-4 ">{username}</li>}
              <li>
                {userId ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="py-2 px-4 hover:bg-white hover:text-gray-dark"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="py-2 px-4 hover:bg-white hover:text-gray-dark"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
