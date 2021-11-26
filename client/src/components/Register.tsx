import { useState } from "react";
import { Link } from "react-router-dom";

const Register = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verification, setVerification] = useState<string>("");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(email);
  };

  const btnActive =
    /\w+@\w+\.\w+/.test(email) &&
    password.length > 5 &&
    verification.length > 5;

  return (
    <div className="lg:pt-navbar max-w-screen-sm mx-auto min-h-screen-navbar flex flex-col justify-around items-center">
      <div className="max-w-xs px-6 py-8 bg-gray-dark w-full">
        <form className="mb-6">
          <h1 className="text-xl text-center mb-6">Login</h1>
          <label htmlFor="email" className="flex flex-col mb-4">
            <span className="text-sm mb-1">email:</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="text-gray-dark py-1 px-2 rounded"
            />
          </label>
          <label htmlFor="password" className="flex flex-col mb-4">
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
          <label htmlFor="password" className="flex flex-col mb-6">
            <span className="text-sm mb-1">password:</span>
            <input
              type="password"
              name="verification"
              value={verification}
              onChange={(event) => setVerification(event.target.value)}
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
            Sign up
          </button>
        </form>
        <div className="border-b border-gray-200 mb-6 mx-4" />
        <div>
          <p className="text-center">If you already have an account,</p>
          <Link
            to="/login"
            className="text-blue-link hover:text-blue-hover underline text-center block"
          >
            click here to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
