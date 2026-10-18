import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import ResendVerification from "./pages/ResendVerification";

const App = () => {
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const whatsappNumber = "919709628329";
  const whatsappOptions = [
    {
      label: "Order meals",
      message: "Hello ZaykaNest! I'd like to order meals. Please share today's menu.",
    },
    {
      label: "Office or party meals booking",
      message:
        "Hello ZaykaNest! I'd like to enquire about meal booking for an office or party.",
    },
    {
      label: "General information",
      message: "Hello ZaykaNest! I'd like some general information about your services.",
    },
  ];

  return (
    <div className="px-0 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/resend-verification" element={<ResendVerification />} />
      </Routes>
      <Footer />
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
        {isContactMenuOpen && (
          <section
            id="whatsapp-contact-menu"
            aria-label="WhatsApp contact options"
            className="w-[min(20rem,calc(100vw-2.5rem))] rounded-xl border border-stone-200 bg-white p-4 text-stone-800 shadow-2xl"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">Hi there! 👋</p>
                <p className="mt-1 text-sm leading-5 text-stone-600">
                  Chat with us on WhatsApp. How can we help?
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsContactMenuOpen(false)}
                aria-label="Close WhatsApp contact options"
                className="rounded p-1 text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-current">
                  <path d="m5.7 4.3 4.3 4.29 4.3-4.3 1.41 1.42-4.29 4.3 4.29 4.29-1.41 1.41L10 11.42l-4.3 4.29-1.4-1.41 4.28-4.3-4.29-4.29L5.7 4.3Z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {whatsappOptions.map(({ label, message }) => (
                <a
                  key={label}
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[#25D366]/40 bg-[#f0fff5] px-3 py-2.5 text-sm font-medium transition hover:bg-[#dcfce7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]"
                >
                  {label}
                </a>
              ))}
            </div>
          </section>
        )}

        <div className="flex items-center gap-3">
          <a
            href="tel:+919709628329"
            aria-label="Call ZaykaNest"
            title="Call ZaykaNest"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123d30] text-white shadow-lg transition hover:scale-105 hover:bg-[#1d4d3e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9a74a]"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.56 3.57.56.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.19 2.45.56 3.57a1 1 0 0 1-.25 1.02l-2.19 2.2Z" />
            </svg>
          </a>
          <button
            type="button"
            aria-label={isContactMenuOpen ? "Close WhatsApp contact options" : "Open WhatsApp contact options"}
            aria-expanded={isContactMenuOpen}
            aria-controls="whatsapp-contact-menu"
            onClick={() => setIsContactMenuOpen((open) => !open)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#128C7E]"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8 fill-current">
              <path d="M12.04 2a9.91 9.91 0 0 0-8.43 15.12L2.3 22l5.02-1.31A9.94 9.94 0 1 0 12.04 2Zm0 18.12a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-2.98.78.8-2.9-.2-.3a8.14 8.14 0 1 1 6.82 3.73Zm4.47-6.1c-.24-.12-1.4-.7-1.62-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.91-1.18-.7-.62-1.18-1.39-1.32-1.63-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.24 1.02.39 1.37.5.58.18 1.1.16 1.52.1.47-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
