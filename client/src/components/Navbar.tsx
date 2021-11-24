import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  return (
    <header className="h-navbar w-full bg-gray-dark border-b border-gray-500 lg:fixed z-20">
      <nav className="mx-auto max-w-screen-lg h-full">
        <ul className="flex items-center h-full">
          <li>
            <Link className="text-xl" to="/">
              Read Me
            </Link>
          </li>
          <li className="ml-auto">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
