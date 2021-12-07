import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { userLogout, getUsername } from "../api/apiUser";

const Navbar = (): JSX.Element => {
  const { userId, setUserId } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    getUsername().then((data) => {
      if (data && !(data instanceof Error)) {
        setUsername(data);
      }
    });
  }, [userId]);

  const handleLogout = async (): Promise<void> => {
    const data = await userLogout();
    if (!(data instanceof Error)) {
      setUserId(data || "");
      setUsername("");
    }
  };

  return (
    <header className="h-navbar w-full bg-gray-dark border-b border-gray-500 lg:fixed z-20">
      <nav className="mx-auto max-w-screen-lg h-full">
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
          {username && <li className="text-sm italic ml-auto">{username}</li>}
          <li className={`${!username && "ml-auto"}`}>
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
      </nav>
    </header>
  );
};

export default Navbar;
