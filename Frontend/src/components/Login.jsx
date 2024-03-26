import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT, POST_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
function Login() {
  const [name, setName] = useState("");
  const [username, setUserame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setisLogin] = useState(true);
  function handleClick() {
    setisLogin(!isLogin);
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(name, email);
    // When login

    if (isLogin) {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(res);
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      // When sign up
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          {
            name,
            email,
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(res);
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex items-center w-[80%] justify-evenly">
        <div>
          <img
            className="w-[200px] invert"
            src="https://www.nikon.com.au/media/wysiwyg/ZLogo.png"
            alt="logo"
          />
        </div>
        <div>
          <div className="mb-8">
            <h1 className="font-bold text-5xl">Happening Now</h1>
            <h2 className="font-bold text-4xl mt-4">Join today.</h2>
          </div>
          <div className="mb-20">
            <h1 className="font-bold text-2xl mt-4 mb-2">
              {isLogin ? "Log in" : "Sign up"}
            </h1>
            <form onSubmit={submitHandler} className="flex flex-col w-[50%]">
              {!isLogin && (
                <>
                  <input
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)} //When name is changed, update name state
                    type="text"
                    name=""
                    id=""
                    className="my-1 px-3 py-1 border border-gray-400 outline-blue-500 rounded-full font-semibold"
                  />
                  <input
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUserame(event.target.value)}
                    type="text"
                    name=""
                    id=""
                    className="my-1 px-3 py-1 border border-gray-400  outline-blue-500 rounded-full font-semibold"
                  />
                </>
              )}
              <input
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                name=""
                id=""
                className="my-1 px-3 py-1 border border-gray-400  outline-blue-500 rounded-full font-semibold"
              />
              <input
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                name=""
                id=""
                className="my-1 px-3 py-1 border border-gray-400  outline-blue-500 rounded-full font-semibold"
              />
              <button className="my-2 py-1 border-none px-5 text-lg rounded-full text-white font-semibold bg-[#1D9Bf0] hover:bg-[#2e86c0]">
                {isLogin ? "Login" : "Create Account"}
              </button>
            </form>
            {/* <h1 className="font-bold mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </h1> */}
            <h1>
              {isLogin ? "Do not have an account?" : "Already have an account?"}{" "}
              <span
                onClick={handleClick}
                className="font-semibold text-blue-500 cursor-pointer"
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
