import { useEffect, useState } from "react";
import logo from "../assets/movieMentor.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleSearchView } from "../utils/searchSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showSearch = useSelector((store) => store.search.showSearch);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSearchClick = () => {
    dispatch(toggleSearchView());
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

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center z-50">
      <img className="w-44" src={logo} alt="MovieMentor-logo" />
      {user?.email && (
        <div className="relative flex items-center space-x-8">
          {showSearch && (
            <select
              className="p-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="text-white hover:underline bg-purple-800 px-6 py-2 rounded-xl"
            onClick={handleSearchClick}
          >
            {showSearch ? "Home" : "Search"}
          </button>
          <img
            src={user?.photoURL}
            alt="user"
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
            onClick={toggleMenu}
          />
          {showMenu && (
            <div className="absolute right-0 top-14 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-36 z-50">
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-md transition"
                onClick={() => {
                  signOut(auth)
                    .then(() => {})
                    .catch(() => navigate("/error"));
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
