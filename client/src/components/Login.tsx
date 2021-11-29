import { useState } from "react";
import { Link } from "react-router-dom";
import { userLogin } from "../api/apiUser";

const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (username.length > 5 && password.length > 5) {
      const userId = await userLogin(username, password);
      console.log("userId: ", userId);
      setUsername("");
      setPassword("");
    }
  };

  const btnActive = username.length > 5 && password.length > 5;

  return (
    <div className="lg:pt-navbar max-w-screen-sm mx-auto min-h-screen-navbar flex flex-col justify-around items-center">
      <div className="max-w-xs px-6 py-8 bg-gray-dark w-full">
        <form className="mb-6">
          <h1 className="text-xl text-center mb-6">Login</h1>
          <label htmlFor="username" className="flex flex-col mb-4">
            <span className="text-sm mb-1">username:</span>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="text-gray-dark py-1 px-2 rounded"
            />
          </label>
          <label htmlFor="password" className="flex flex-col mb-6">
            <span className="text-sm mb-1">password:</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="text-gray-dark py-1 px-2 rounded"
              autoComplete="off"
            />
          </label>
          <button
            type="submit"
            className={`px-4 py-2 border rounded border-gray-500 bg-gray-dark text-white block mx-auto ${
              !btnActive && "opacity-50 cursor-default"
            }`}
            onClick={handleSubmit}
            disabled={!btnActive}
          >
            Login
          </button>
        </form>
        <div className="border-b border-gray-200 mb-6 mx-4" />
        <div>
          <p className="text-center">If you don&apos;t have an account,</p>
          <Link
            to="/register"
            className="text-blue-link hover:text-blue-hover underline text-center block"
          >
            click here to register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
