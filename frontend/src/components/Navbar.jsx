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
    search,
    setSearch,
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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    navigate("/menu");
  };

  return (
    <>
      {/* =================================================
          STICKY NAVBAR
      ================================================== */}

      <header className="sticky top-0 z-[1000] w-full border-b border-amber-100  shadow-[0_8px_30px_-18px_rgba(120,53,15,0.35)] backdrop-blur-xl">

<div className="flex items-center justify-between py-3 px-3 sm:px-8 font-medium">

          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="ZaykaNest home"
          >
            <img
              src="/logo.png"
              alt="ZaykaNest"
              className="h-11 w-11 rounded-full object-cover sm:h-14 sm:w-14"
            />
            <span className="hidden font-serif text-xl font-bold tracking-tight text-orange-600 sm:inline sm:text-2xl">
              ZaykaNest
            </span>
          </Link>

          {/* =================================================
              DESKTOP MENU
          ================================================== */}

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50/70 p-1.5 text-sm text-stone-700">

            <NavLink
              to="/"
              className={({ isActive }) => `rounded-full px-4 py-2 font-semibold transition ${isActive ? "bg-stone-900 text-amber-100 shadow-sm" : "hover:bg-white hover:text-amber-800"}`}
            >
              HOME
            </NavLink>

            <NavLink
              to="/menu"
              className={({ isActive }) => `rounded-full px-4 py-2 font-semibold transition ${isActive ? "bg-stone-900 text-amber-100 shadow-sm" : "hover:bg-white hover:text-amber-800"}`}
            >
              MENU
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => `rounded-full px-4 py-2 font-semibold transition ${isActive ? "bg-stone-900 text-amber-100 shadow-sm" : "hover:bg-white hover:text-amber-800"}`}
            >
              ABOUT
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => `rounded-full px-4 py-2 font-semibold transition ${isActive ? "bg-stone-900 text-amber-100 shadow-sm" : "hover:bg-white hover:text-amber-800"}`}
            >
              CONTACT
            </NavLink>

          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <div className="flex items-center gap-3">

            {/* SEARCH */}

            <label className="hidden items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 md:flex">
              <img className="h-4 w-4" src={assets.search_icon} alt="" />
              <input
                value={search}
                onChange={handleSearchChange}
                className="w-28 bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400 lg:w-40"
                placeholder="Search dishes"
                aria-label="Search dishes"
              />
            </label>

            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-100 bg-amber-50 transition hover:scale-105 hover:bg-amber-100 md:hidden"
              aria-label="Search menu"
            >
              <img className="h-5 w-5" src={assets.search_icon} alt="" />
            </button>

            {/* =================================================
                PROFILE
            ================================================== */}

            <div className="group relative">

              <button
                type="button"
                onClick={() =>
                  token
                    ? null
                    : navigate("/login")
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-100 bg-amber-50 transition hover:scale-105 hover:bg-amber-100"
                aria-label="Profile"
              >
                <img className="h-5 w-5" src={assets.profile_icon} alt="" />
              </button>

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
              className="relative inline-flex rounded-full bg-amber-50 p-2"
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
              className="h-10 w-10 cursor-pointer rounded-full border border-amber-100 bg-amber-50 p-2.5 transition hover:bg-amber-100 sm:hidden"
              src={assets.menu_icon}
              alt="Menu"
            />

          </div>

        </div>

      </header>

      {/* =================================================
          MOBILE SIDEBAR
      ================================================== */}

      {visible && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[1900] bg-stone-950/30 backdrop-blur-sm sm:hidden"
        />
      )}

      <div
        className={`
          fixed
          top-0
          right-0
          bottom-0
          z-[2000]
          bg-gradient-to-b
          from-[#fffdf8]
          to-amber-50
          shadow-[0_0_55px_rgba(68,38,14,0.28)]
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

          <div className="flex items-center justify-between gap-4 border-b border-amber-100 bg-white/70 p-4">

            <Link
              to="/"
              onClick={() => setVisible(false)}
              className="flex items-center gap-2"
              aria-label="ZaykaNest home"
            >
              <img
                src="/logo.png"
                alt="ZaykaNest"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="font-serif text-lg font-bold text-orange-600">
                ZaykaNest
              </span>
            </Link>

            <button
              onClick={() =>
                setVisible(false)
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-sm text-amber-800 transition hover:bg-amber-100"
            >

              <img
                src={
                  assets.dropdown_icon
                }
                alt="Back"
                className="h-4 w-4 rotate-180"
              />

            </button>

          </div>

          {/* MOBILE NAV */}

          <nav className="flex-1 space-y-2 overflow-auto p-4">

            <NavLink
              onClick={() =>
                setVisible(false)
              }
              className={({ isActive }) => `block rounded-2xl px-5 py-4 text-sm font-bold tracking-wide transition ${isActive ? "bg-stone-900 text-amber-100 shadow-lg" : "bg-white/70 text-stone-700 hover:bg-amber-100"}`}
              to="/"
            >
              HOME
            </NavLink>

            <NavLink
              onClick={() =>
                setVisible(false)
              }
              className={({ isActive }) => `block rounded-2xl px-5 py-4 text-sm font-bold tracking-wide transition ${isActive ? "bg-stone-900 text-amber-100 shadow-lg" : "bg-white/70 text-stone-700 hover:bg-amber-100"}`}
              to="/menu"
            >
              MENU
            </NavLink>

            <NavLink
              onClick={() =>
                setVisible(false)
              }
              className={({ isActive }) => `block rounded-2xl px-5 py-4 text-sm font-bold tracking-wide transition ${isActive ? "bg-stone-900 text-amber-100 shadow-lg" : "bg-white/70 text-stone-700 hover:bg-amber-100"}`}
              to="/about"
            >
              ABOUT
            </NavLink>

            <NavLink
              onClick={() =>
                setVisible(false)
              }
              className={({ isActive }) => `block rounded-2xl px-5 py-4 text-sm font-bold tracking-wide transition ${isActive ? "bg-stone-900 text-amber-100 shadow-lg" : "bg-white/70 text-stone-700 hover:bg-amber-100"}`}
              to="/contact"
            >
              CONTACT
            </NavLink>

            {/* MOBILE CART */}

            <NavLink
              onClick={() =>
                setVisible(false)
              }
              className={({ isActive }) => `flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-bold tracking-wide transition ${isActive ? "bg-stone-900 text-amber-100 shadow-lg" : "bg-white/70 text-stone-700 hover:bg-amber-100"}`}
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
