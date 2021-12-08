import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../api/apiUser";
import UserContext from "../context/UserContext";
import { validateEmail } from "../helpers/forms";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  const formValid = validateEmail(email) && password.length > 5;

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (formValid) {
      const data = await userLogin(email, password);
      if (data === null || data instanceof Error) {
        setErrorMessage(data ? data.message : "Wrong email or password");
      } else {
        setEmail("");
        setPassword("");
        setUserId(data);
        navigate("/");
      }
    }
  };

  return (
    <div className="lg:pt-navbar max-w-screen-sm mx-auto min-h-screen-navbar flex flex-col justify-around items-center">
      <div className="max-w-xs px-6 py-8 bg-gray-dark w-full">
        <form className="mb-6">
          <h1 className="text-xl text-center mb-4">Login</h1>
          <p className="text-xs text-red-500 mb-2 text-center">
            {errorMessage}
          </p>
          <label htmlFor="email" className="flex flex-col mb-4 mt-2">
            <span className="text-sm mb-1">email:</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              !formValid && "opacity-50 cursor-default"
            }`}
            onClick={handleSubmit}
            disabled={!formValid}
          >
            Login
          </button>
        </form>
        <div className="border-b border-gray-200 mb-6 mx-4" />
        <div className="mb-6">
          <p className="text-center mb-2">Alternatively, you can use: </p>
          <ul className="flex justify-center">
            <li className="mr-2 hover:bg-white">
              <a
                href={`${process.env.REACT_APP_SERVER_URL}/api/auth/google`}
                title="Login with Google"
              >
                <img
                  src="/icons/google.png"
                  alt="Google icon"
                  className="h-14 p-2"
                />
              </a>
            </li>
            <li className="mr-2 hover:bg-white">
              <a
                href={`${process.env.REACT_APP_SERVER_URL}/api/auth/facebook`}
                title="Login with Facebook"
              >
                <img
                  src="/icons/facebook.png"
                  alt="Facebook icon"
                  className="h-14 p-2"
                />
              </a>
            </li>
          </ul>
        </div>
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
