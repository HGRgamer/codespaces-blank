import { useContext, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AllContext } from "../context/context";

export const SignUp = () => {
  const context = useContext(AllContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });
  const handleInput = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  const handleSignUp = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        number: userData.number,
        password: userData.password,
      }),
    });
    const data = await res.json();
    setServerResponse(data.message);

    if (res.ok) {
      setUserData({
        name: "",
        number: "",
        email: "",
        password: "",
      });
      context.setIsLoggedIn(true);
      setIsLoading(false);
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="mx-auto flex min-h-full flex-1 flex-col justify-center items-center bg-secondary p-6 mt-8 rounded-xl lg:px-8 w-5/6">
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-[2rem] font-algerian leading-9 tracking-tight text-white">
            Create a new account
          </h2>
        </div>

        <div className="mt-6 justify-center flex flex-col  sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6 justify-center flex flex-col ">
            <div>
              <label
                htmlFor="Name"
                className="block font-medium leading-6 text-white text-xl"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="Name"
                  name="name"
                  type="text"
                  required
                  value={userData.name}
                  onChange={handleInput}
                  autoComplete=""
                  className="block border border-border bg-primary text-center w-full rounded-md  py-1.5 text-white shadow-sm  placeholder:text-gray-400 placeholder:text-2xl  text-xl sm:leading-6"
                />
              </div>
              {!userData.name && (
                <p className="text-red text-sm"> Name is required</p>
              )}
            </div>

            <div>
              <label
                htmlFor="number"
                className="block font-medium leading-6 text-white text-xl"
              >
                Number
              </label>
              <div className="mt-2">
                <input
                  id="number"
                  name="number"
                  type="number"
                  required
                  value={userData.number}
                  onChange={handleInput}
                  autoComplete="none"
                  className="block bg-primary text-center w-full rounded-md border border-border py-1.5 text-white shadow-sm  placeholder:text-gray-400 placeholder:text-2xl  text-xl sm:leading-6"
                />
              </div>
              {!userData.number && (
                <p className="text-red text-sm">Number is required</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-medium leading-6 text-white text-xl"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={userData.email}
                  onChange={handleInput}
                  autoComplete="email"
                  className="block bg-primary text-center w-full rounded-md border border-border py-1.5 text-white shadow-sm  placeholder:text-gray-400 placeholder:text-2xl  text-xl sm:leading-6"
                />
              </div>
              {!userData.email && (
                <p className="text-red text-sm">Email is required</p>
              )}
            </div>

            <div className="rounded-xl">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block font-medium leading-6 text-white text-xl"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <label className="input border border-border bg-primary rounded-lg flex items-center gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={userData.password}
                    onChange={handleInput}
                    className="block bg-primary text-center w-full rounded-md border-0 py-1.5 text-white shadow-sm  placeholder:text-gray-400 placeholder:text-2xl  text-xl sm:leading-6"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 ml-2 w-6 opacity-70"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-xl ml-2" />
                    ) : (
                      <FaEye className="text-xl ml-2" />
                    )}
                  </svg>
                </label>
              </div>
              {!userData.password && (
                <p className="text-sm text-red">Password is required</p>
              )}
              {/* {error && <p className="text-red-600 text">{error}</p>} */}
            </div>

            <div>
              <button
                onClick={handleSignUp}
                className="flex w-full justify-center rounded-md bg-textcol text-[#ffffff] hover:bg-accent px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              
                {isLoading ? "Loading..." : "Sign up"}
              </button>
            </div>
          </div>
          <p className="mt-4 text-md text-red">
            {serverResponse && serverResponse}
          </p>
          <p className="mt-4 text-center text-sm text-white">
            Already have an account?{" "}
            <NavLink
              to="/signin"
              className="font-semibold leading-6  text-blue hover:text-accent/75"
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};
