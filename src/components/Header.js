import { useEffect, useState } from "react";
import logo from "../assets/Netflix-Logo.png";
//import userIcon from "../assets/user.jpg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //Unsubscribe from the onAuthStateChanged when component unmounts
    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="absolute w-screen px-8 py-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center z-50">
      <img className="w-44" src={logo} alt="Netflix-logo" />
      {user?.email && (
        <div className="relative">
          <img
            src={user?.photoURL}
            alt="user"
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
            onClick={toggleMenu}
          />
          {showMenu && (
            <div className="absolute right-0 mt-2 bg-black bg-opacity-90 text-white rounded shadow-lg py-2 z-50 w-32">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-red-600 rounded"
                onClick={() => {
                  signOut(auth)
                    .then(() => {})
                    .catch((error) => {
                      navigate("/error");
                    });
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
