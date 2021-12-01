import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { userLogout } from "../api/apiUser";

const Navbar = (): JSX.Element => {
  const { userId, setUserId } = useContext(UserContext);

  const handleLogout = async (): Promise<void> => {
    const data = await userLogout();
    setUserId(data ? data.userId : "");
  };

  return (
    <header className="h-navbar w-full bg-gray-dark border-b border-gray-500 lg:fixed z-20">
      <nav className="mx-auto max-w-screen-lg h-full">
        <ul className="flex items-center h-full px-4">
          <li>
            <Link className="text-xl px-2 py-1" to="/">
              Read Me
            </Link>
          </li>
          <li className="ml-auto">
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
