import { useState } from "react";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="lg:pt-navbar max-w-screen-sm mx-auto min-h-screen-navbar flex flex-col justify-around items-center">
      <form className="max-w-xs px-4 py-8 bg-gray-dark w-full">
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
        <label htmlFor="password" className="flex flex-col mb-6">
          <span className="text-sm mb-1">password:</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="text-gray-dark py-1 px-2 rounded"
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 border rounded border-gray-500 bg-gray-dark text-white block mx-auto"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
