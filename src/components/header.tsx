import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <div className="flex justify-between items-center bg-slate-100 p-4 shadow-md">
      {/* Logo Section */}
      <div className="md:ml-10">
        <Link to="/">
          <img src="/logo.png" alt="Shop Nestle" className="w-32 h-auto" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-6 md:mr-10">
        <Link
          className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-semibold"
          onClick={() => setIsOpen(false)}
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-semibold"
          onClick={() => setIsOpen(false)}
          to="/search"
        >
          <FaSearch className="text-xl" />
        </Link>
        <Link
          className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-semibold"
          onClick={() => setIsOpen(false)}
          to="/cart"
        >
          <FaShoppingBag className="text-xl" />
        </Link>
        {user?._id ? (
          <>
            <button
              className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <FaUser className="text-xl" />
            </button>
            {isOpen && (
              <div className="absolute top-16 right-10 bg-white shadow-lg rounded-lg p-4 z-10 w-48">
                <div className="flex flex-col space-y-3">
                  {user.role === "admin" && (
                    <Link
                      className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                      to="/admin/dashboard"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                    to="/orders"
                  >
                    Orders
                  </Link>
                  <button
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-300"
                    onClick={logoutHandler}
                  >
                    <FaSignOutAlt className="mr-2" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Link
            className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-semibold"
            to="/login"
          >
            <FaSignInAlt className="text-xl" />
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
