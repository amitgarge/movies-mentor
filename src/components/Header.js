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
import lang from "../utils/languageConstants";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showSearch = useSelector((store) => store.search.showSearch);
  const langKey = useSelector((store) => store.config.lang); // ✅ current language

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
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header
      className="absolute top-0 left-0 w-full px-4 sm:px-6 py-3 
                   bg-gradient-to-b from-black/80 to-transparent 
                   flex justify-between items-center z-50"
    >
      {/* Logo */}
      <img className="w-24 sm:w-32 lg:w-44" src={logo} alt="MovieMentor-logo" />

      {/* Right-side actions */}
      {user?.email && (
        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
          <select
            aria-label={lang[langKey].language}
            className="p-1.5 sm:p-2 bg-white text-gray-800 border border-gray-300 rounded-md 
             shadow-md text-xs sm:text-sm lg:text-base cursor-pointer
             focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option
                key={lang.identifier}
                value={lang.identifier}
                className="text-gray-800 bg-white hover:bg-purple-100 cursor-pointer"
              >
                {lang.name}
              </option>
            ))}
          </select>
          {/* Search/Home Button */}
          <button
            className="text-white bg-purple-700 hover:bg-purple-800 
                   px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg 
                   text-xs sm:text-sm lg:text-base"
            onClick={handleSearchClick}
          >
            {showSearch ? lang[langKey].home : lang[langKey].search}
          </button>
          {/* Profile */}
          <div className="relative">
            <img
              src={user?.photoURL}
              alt="user"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer border border-gray-300"
              onClick={toggleMenu}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-32 sm:w-36 z-50">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-md transition"
                  onClick={() => {
                    signOut(auth)
                      .then(() => {})
                      .catch(() => navigate("/error"));
                  }}
                >
                  {lang[langKey].signOut}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
