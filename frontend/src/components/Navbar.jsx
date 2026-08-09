import React, {
  useContext,
  useState,
} from "react";

import { assets } from "../assets/assets";

import {
  Link,
  NavLink,
} from "react-router-dom";

import { ShopContext } from "../context/ShopContextContext";

const Navbar = () => {
  const [visible, setVisible] =
    useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    localStorage.removeItem("token");

    setToken("");

    setCartItems({});

    navigate("/login");
  };

  // =====================================================
  // CART COUNT
  // =====================================================

  const cartCount = getCartCount();

  return (
    <>
      {/* =================================================
          STICKY NAVBAR
      ================================================== */}

      <header className="sticky top-0 z-[1000] w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">

        <div className="flex items-center justify-between py-5 px-4 sm:px-8 font-medium">

          {/* =================================================
              LOGO
          ================================================== */}

          <Link to="/">
            <img
              src={assets.logo}
              className="w-36 sm:w-44"
              alt="Logo"
            />
          </Link>

          {/* =================================================
              DESKTOP MENU
          ================================================== */}

          <div className="hidden sm:flex items-center gap-8 text-sm text-gray-700">

            <NavLink
              to="/"
              className="hover:text-black transition-colors"
            >
              HOME
            </NavLink>

            <NavLink
              to="/menu"
              className="hover:text-black transition-colors"
            >
              MENU
            </NavLink>

            <NavLink
              to="/about"
              className="hover:text-black transition-colors"
            >
              ABOUT
            </NavLink>

            <NavLink
              to="/contact"
              className="hover:text-black transition-colors"
            >
              CONTACT
            </NavLink>

          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <div className="flex items-center gap-5">

            {/* SEARCH */}

            <img
              onClick={() =>
                setShowSearch(true)
              }
              className="w-5 cursor-pointer hover:scale-110 transition-transform"
              src={assets.search_icon}
              alt="Search"
            />

            {/* =================================================
                PROFILE
            ================================================== */}

            <div className="group relative">

              <img
                onClick={() =>
                  token
                    ? null
                    : navigate("/login")
                }
                className="w-5 cursor-pointer hover:scale-110 transition-transform"
                src={
                  assets.profile_icon
                }
                alt="Profile"
              />

              {token && (
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-[1100]">

                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-500 rounded-xl shadow-xl border border-gray-100">

                    <p
                      onClick={() =>
                        navigate(
                          "/my-profile"
                        )
                      }
                      className="cursor-pointer hover:text-black transition-colors"
                    >
                      My Profile
                    </p>

                    <p
                      onClick={() =>
                        navigate(
                          "/orders"
                        )
                      }
                      className="cursor-pointer hover:text-black transition-colors"
                    >
                      Orders
                    </p>

                    <p
                      onClick={logout}
                      className="cursor-pointer hover:text-black transition-colors"
                    >
                      Logout
                    </p>

                  </div>

                </div>
              )}

            </div>

            {/* =================================================
                CART
            ================================================== */}

            <Link
              to="/cart"
              className="relative inline-flex"
            >

              <img
                src={assets.cart_icon}
                className="w-5 min-w-5 hover:scale-110 transition-transform"
                alt="Cart"
              />

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -right-2
                    -bottom-2
                    min-w-[18px]
                    h-[18px]
                    px-1
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-white
                    text-[9px]
                    font-bold
                  "
                >
                  {cartCount}
                </span>
              )}

            </Link>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================== */}

            <img
              onClick={() =>
                setVisible(true)
              }
              className="w-5 cursor-pointer sm:hidden"
              src={assets.menu_icon}
              alt="Menu"
            />

          </div>

        </div>

      </header>

      {/* =================================================
          MOBILE SIDEBAR
      ================================================== */}

      <div
        className={`
          fixed
          top-0
          right-0
          bottom-0
          z-[2000]
          bg-white
          shadow-2xl
          transform
          transition-transform
          duration-300
          ${
            visible
              ? "translate-x-0 w-full sm:w-80"
              : "translate-x-full w-full sm:w-80"
          }
        `}
        style={{
          maxWidth: "100%",
        }}
      >

        <div className="flex flex-col text-gray-700 h-full">

          {/* BACK BUTTON */}

          <div className="flex items-center gap-4 p-4 border-b">

            <button
              onClick={() =>
                setVisible(false)
              }
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
            >

              <img
                src={
                  assets.dropdown_icon
                }
                alt="Back"
              />

              <span>
                Back
              </span>

            </button>

          </div>

          {/* MOBILE NAV */}

          <nav className="flex-1 overflow-auto">

            <NavLink
              onClick={() =>
                setVisible(false)
              }
              className="block py-4 pl-6 border-b hover:bg-orange-50"
              to="/"
            >
              HOME
            </NavLink>

            <NavLink
              onClick={() =>
                setVisible(false)
              }
              className="block py-4 pl-6 border-b hover:bg-orange-50"
              to="/menu"
            >
              MENU
            </NavLink>

            <NavLink
              onClick={() =>
                setVisible(false)
              }
              className="block py-4 pl-6 border-b hover:bg-orange-50"
              to="/about"
            >
              ABOUT
            </NavLink>

            <NavLink
              onClick={() =>
                setVisible(false)
              }
              className="block py-4 pl-6 border-b hover:bg-orange-50"
              to="/contact"
            >
              CONTACT
            </NavLink>

            {/* MOBILE CART */}

            <NavLink
              onClick={() =>
                setVisible(false)
              }
              className="flex items-center justify-between py-4 pl-6 pr-6 border-b hover:bg-orange-50"
              to="/cart"
            >

              <span>
                CART
              </span>

              {cartCount > 0 && (
                <span className="bg-black text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}

            </NavLink>

          </nav>

        </div>

      </div>
    </>
  );
};

export default Navbar;