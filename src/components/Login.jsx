import React, { useState } from "react";

function Login() {
  const [isLogin, setisLogin] = useState(true);
  function handleClick() {
    setisLogin(!isLogin);
  }
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
            <form action="/submit" className="flex flex-col w-[50%]">
              {!isLogin && (
                <>
                  <input
                    placeholder="Name"
                    type="text"
                    name=""
                    id=""
                    className="my-1 px-3 py-1 border border-gray-400 outline-blue-500 rounded-full font-semibold"
                  />
                  <input
                    placeholder="Username"
                    type="text"
                    name=""
                    id=""
                    className="my-1 px-3 py-1 border border-gray-400  outline-blue-500 rounded-full font-semibold"
                  />
                </>
              )}
              <input
                placeholder="Email"
                type="email"
                name=""
                id=""
                className="my-1 px-3 py-1 border border-gray-400  outline-blue-500 rounded-full font-semibold"
              />
              <input
                placeholder="Password"
                type="password"
                name=""
                id=""
                className="my-1 px-3 py-1 border border-gray-400  outline-blue-500 rounded-full font-semibold"
              />
            </form>
            <button className="my-2 py-1 border-none px-5 text-lg rounded-full text-white font-semibold bg-[#1D9Bf0] hover:bg-[#2e86c0]">
              {isLogin ? "Login" : "Create Account"}
            </button>
            <h1 className="font-bold mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </h1>
            <button
              onClick={handleClick}
              className="my-2 py-1 border-gray-400 border px-5 text-lg rounded-full font-semibold  hover:bg-[#2e86c0] text-[#1D9Bf0]"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
