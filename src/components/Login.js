import Header from "./Header";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { PHOTO } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const emailVal = email.current?.value;
    const passVal = password.current?.value;
    const nameVal = isSignInForm ? null : name.current?.value;

    const message = checkValidData(emailVal, passVal, nameVal);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailVal, passVal)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameVal,
            photoURL: PHOTO,
          })
            .then(() => {
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(
                addUser({ uid, email, displayName, photoURL })
              );
            })
            .catch((error) => setErrorMessage(error.message));
        })
        .catch((error) =>
          setErrorMessage(error.code + "-" + error.message)
        );
    } else {
      signInWithEmailAndPassword(auth, emailVal, passVal)
        .then((userCredential) => {})
        .catch((error) =>
          setErrorMessage(error.code + "-" + error.message)
        );
    }
  };

  const handleSignUpClick = () => setSignInForm(!isSignInForm);

  return (
    <div>
      <Header />
      <div className="w-full h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {isSignInForm ? "Welcome Back" : "Create an Account"}
          </h2>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            )}
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />

            {errorMessage && (
              <p className="text-sm text-red-500 text-center">{errorMessage}</p>
            )}

            <button
              onClick={handleButtonClick}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isSignInForm ? "New to Movie Mentor? " : "Already have an account? "}
            <span
              onClick={handleSignUpClick}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {isSignInForm ? "Sign up" : "Sign in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
