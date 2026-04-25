import Header from "./Header";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { PHOTO } from "../utils/constants";
import { getAuthErrorMessage } from "../utils/firebaseErrors";
import toast from "react-hot-toast"; // ✅ Toasts
import lang from "../utils/languageConstants";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // ✅ Toast IDs to prevent duplicates
  const LOGIN_SUCCESS_TOAST_ID = "login-success";
  const SIGNUP_SUCCESS_TOAST_ID = "signup-success";

  const handleButtonClick = async () => {
    const emailVal = email.current?.value;
    const passVal = password.current?.value;
    const nameVal = isSignInForm ? null : name.current?.value;

    // ✅ Basic validation
    const message = checkValidData(emailVal, passVal, nameVal);
    setErrorMessage(message);
    if (message) return;

    setLoading(true);

    if (!isSignInForm) {
      // ✅ Sign Up flow
      createUserWithEmailAndPassword(auth, emailVal, passVal)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameVal,
            photoURL: PHOTO,
          })
            .then(() => {
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              toast.success("🎉 " + lang[langKey].accountCreated, {
                id: SIGNUP_SUCCESS_TOAST_ID,
              });
            })
            .catch((error) => {
              const msg = getAuthErrorMessage(error.code);
              setErrorMessage(msg);
              toast.error(msg);
            });
        })
        .catch((error) => {
          const msg = getAuthErrorMessage(error.code);
          setErrorMessage(msg);
          toast.error(msg);
        })
        .finally(() => setLoading(false));
    } else {
      // ✅ Sign In flow
      signInWithEmailAndPassword(auth, emailVal, passVal)
        .then(() => {
          console.log("Toast fired from Login.js");
          toast.success("✅ " + lang[langKey].signedIn, {
            id: LOGIN_SUCCESS_TOAST_ID,
          });
        })
        .catch((error) => {
          const msg = getAuthErrorMessage(error.code);
          setErrorMessage(msg);
          toast.error(msg);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleSignUpClick = () => setSignInForm(!isSignInForm);

  return (
    <div>
      <Header />
      <div className="w-full h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {isSignInForm
              ? lang[langKey].welcomeBack
              : lang[langKey].createAccount}
          </h2>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder={lang[langKey].fullName}
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            )}
            <input
              ref={email}
              type="email"
              placeholder={lang[langKey].email}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              ref={password}
              type="password"
              placeholder={lang[langKey].password}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />

            {/* Inline validation error */}
            {errorMessage && (
              <p className="text-sm text-red-500 text-center">{errorMessage}</p>
            )}

            <button
              onClick={handleButtonClick}
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center"
            >
              {loading ? (
                <div
                  role="status"
                  aria-label="loading"
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                ></div>
              ) : isSignInForm ? (
                lang[langKey].signIn
              ) : (
                lang[langKey].signUp
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isSignInForm
              ? lang[langKey].newToApp + " "
              : lang[langKey].alreadyHaveAccount + " "}
            <span
              onClick={handleSignUpClick}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {isSignInForm ? lang[langKey].signUp : lang[langKey].signIn}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
