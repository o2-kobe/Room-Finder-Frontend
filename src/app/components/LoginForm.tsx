import { Home } from "lucide-react";
import { useState } from "react";

const LoginForm = () => {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-50">
      <div className="w-full max-w-md p-7 rounded-sm shadow-2xl bg-white">
        <h3 className="mb-4 text-2xl font-semibold flex items-center gap-1">
          <Home /> StudentRooms Ghana
        </h3>

        <div className="flex  items-center gap-2 justify-center mb-3">
          <button
            onClick={() => setIsSignup(false)}
            className={`${isSignup ? "" : "bg-primary text-white"} border border-gray-300 p-2`}
          >
            LOGIN
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={`${isSignup ? "bg-primary text-white" : ""} border border-gray-300 p-2`}
          >
            SIGNUP
          </button>
        </div>

        <form className="flex flex-col gap-3 items-center w-full mx-auto">
          {isSignup ? (
            <div className="bg-gray-100 rounded-md w-full border border-gray-200">
              <input
                type="text"
                required
                id="username"
                name="username"
                placeholder="Enter username"
                className="p-3 text-sm outline-none bg-transparent w-full"
              />
            </div>
          ) : null}

          <div className="bg-gray-100 rounded-md w-full border border-gray-200">
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter email"
              className="p-3 text-sm outline-none bg-transparent w-full"
            />
          </div>

          {isSignup ? (
            <div className="w-full">
              <select
                required
                className="w-full p-2 bg-gray-100 rounded-md border border-gray-200"
                name=""
                id=""
              >
                <option value="">Select role</option>
                <option value="landlord">Landlord</option>
                <option value="hostelManager">Hostel Manager</option>
                <option value="guest">Guest</option>
              </select>
            </div>
          ) : null}

          <div className="bg-gray-100 rounded-md w-full border border-gray-200">
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter password"
              className="p-3 text-sm outline-none bg-transparent w-full"
            />
          </div>

          <button className="bg-primary hover:bg-violet- cursor-pointer text-white p-2 rounded-md w-full text-center">
            {isSignup ? "SIGN UP" : "LOG IN"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
