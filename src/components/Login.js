import Header from "./Header";
import bg from "../assets/bg.jpg";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);

  const handleSignUpClick = () => {
    setSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-80 text-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">{isSignInForm ? 'Sign In' : 'Sign Up'}</h2>

          <form className="flex flex-col space-y-4">
            {!isSignInForm && <input
              type="name"
              placeholder="Full Name"
              className="p-2 bg-gray-800 text-white border border-gray-600 rounded placeholder-gray-400"
            />}
            <input
              type="email"
              placeholder="Email"
              className="p-2 bg-gray-800 text-white border border-gray-600 rounded placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 bg-gray-800 text-white border border-gray-600 rounded placeholder-gray-400"
            />
            <button className="bg-red-600 text-white py-2 rounded hover:bg-red-700">
              {isSignInForm ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          {/* Sign up link using <Link> */}
          <p className="mt-6 text-center text-sm text-gray-300">
            {isSignInForm ? 'New to NetflixGPT? ' : 'Already have an account '}
            <span
              onClick={handleSignUpClick}
              className="text-red-400 hover:underline cursor-pointer"
            >
              {isSignInForm ? 'Sign up now' : 'Sign In'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
