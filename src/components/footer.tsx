import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-gray-200 py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-6 md:mb-0">
                    <img src="/logo.png" alt="Shop Nestle" className="w-32 h-auto mb-4" />
                    <p className="text-sm text-gray-400">Your one-stop shop for everything you need.</p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                    <Link
                        className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
                        to="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
                        to="/shop"
                    >
                        Shop
                    </Link>
                    <Link
                        className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
                        to="/about"
                    >
                        About Us
                    </Link>
                    <Link
                        className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
                        to="/contact"
                    >
                        Contact
                    </Link>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-6 mt-6 md:mt-0">
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
                    >
                        <FaFacebookF className="text-xl" />
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
                    >
                        <FaTwitter className="text-xl" />
                    </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
                    >
                        <FaInstagram className="text-xl" />
                    </a>
                </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                <p className="text-sm text-gray-500">© {new Date().getFullYear()} Shop Nestle. All rights reserved.</p>
                <p className="text-sm text-gray-500">123 Main Street, Anytown, USA</p>
                <p className="text-sm text-gray-500">Email: support@shopnestle.com | Phone: +1 (123) 456-7890</p>
            </div>
        </footer>
    );
};

export default Footer;
