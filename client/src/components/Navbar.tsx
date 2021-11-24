import { Link } from "react-router-dom";

const Navbar = (): JSX.Element => (
  <header className="h-navbar w-full bg-gray-dark border-b border-gray-500 lg:fixed z-20">
    <nav className="mx-auto max-w-screen-lg h-full">
      <ul className="flex items-center h-full px-4">
        <li>
          <Link className="text-xl px-2 py-1" to="/">
            Read Me
          </Link>
        </li>
        <li className="ml-auto">
          <Link
            to="/login"
            className="py-2 px-4 hover:bg-white hover:text-gray-dark"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navbar;
