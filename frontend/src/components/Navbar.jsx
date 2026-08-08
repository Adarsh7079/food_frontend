import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContextContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={assets.logo} className="w-36" alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border border-gray-300 h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/menu" className="flex flex-col items-center gap-1">
          <p>MENU</p>
          <hr className="w-2/4 border border-gray-300 h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border border-gray-300 h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr
            className="w-2/4 border border-gray-300 h-[1.5px] 
           bg-gray-300 hidden"
          />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          className="w-5 cursor-pointer"
          src={assets.search_icon}
          alt=""
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt=""
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="cursor-pointer hover:text-black "
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5 " alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt=""
        />
      </div>

      {/* sidebar menu for small screen (sliding panel) */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 transform bg-white shadow-lg transition-transform duration-300 ${
          visible ? "translate-x-0 w-full sm:w-80" : "translate-x-full w-full sm:w-80"
        }`}
        style={{ maxWidth: "100%" }}
      >
        <div className="flex flex-col text-gray-700 h-full">
          <div className="flex items-center gap-4 p-4 border-b">
            <button onClick={() => setVisible(false)} className="flex items-center gap-2 text-sm text-gray-600">
              <img src={assets.dropdown_icon} alt="Back" />
              <span>Back</span>
            </button>
          </div>
          <nav className="flex-1 overflow-auto">
            <NavLink
              onClick={() => setVisible(false)}
              className="block py-4 pl-6 border-b hover:bg-orange-50"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="block py-4 pl-6 border-b hover:bg-orange-50"
              to="/menu"
            >
              MENU
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="block py-4 pl-6 border-b hover:bg-orange-50"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="block py-4 pl-6 border-b hover:bg-orange-50"
              to="/contact"
            >
              CONTACT
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
