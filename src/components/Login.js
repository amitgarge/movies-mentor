import Header from "./Header";
import bg from "../assets/bg.jpg";
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
    //Validate the form data
    const emailVal = email.current?.value;
    const passVal = password.current?.value;
    const nameVal = isSignInForm ? null : name.current?.value;

    const message = checkValidData(emailVal, passVal, nameVal);
    setErrorMessage(message);

    if (message) return;
    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(auth, emailVal, passVal)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameVal,
            photoURL: PHOTO,
          })
            .then(() => {
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(auth, emailVal, passVal)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

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
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col space-y-4"
          >
            {!isSignInForm && (
              <input
                ref={name}
                type="name"
                placeholder="Full Name"
                className="p-2 bg-gray-800 text-white border border-gray-600 rounded placeholder-gray-400"
                required
              />
            )}
            <input
              ref={email}
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="p-2 bg-gray-800 text-white border border-gray-600 rounded placeholder-gray-400"
              required
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="p-2 bg-gray-800 text-white border border-gray-600 rounded placeholder-gray-400"
              required
            />
            <p className="text-red-500">{errorMessage}</p>
            <button
              className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-300">
            {isSignInForm ? "New to NetflixGPT? " : "Already have an account "}
            <span
              onClick={handleSignUpClick}
              className="text-red-400 hover:underline cursor-pointer"
            >
              {isSignInForm ? "Sign up now" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
