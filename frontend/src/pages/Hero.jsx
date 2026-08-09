import React from "react";
import uttapam from "../assets/uttapam.png"; // Placeholder image for the hero section
const Hero = () => {
  // Main featured dish image (North Indian Deluxe Thali Feast)
  const heroImage = "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80";

  // Pure North Indian Category Image URLs with Rasgulla for Desserts
  const categories = [
    {
      name: "North Indian Curries",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80", // Paneer Butter Masala
    },
    {
      name: "Butter Naan & Roti",
      image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=300&q=80", // Tandoori Roti & Naan
    },
    {
      name: "Desi Snacks & Tikka",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80", // Samosa / Paneer Tikka
    },
    {
      name: "Sweets & Rasgulla",
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80", // Fresh Sponge Rasgulla / Mithai
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-amber-50/40 backdrop-blur-md border border-amber-200/60 p-6 sm:p-10 lg:p-12 shadow-lg">
      {/* Background Soft Glow */}
      <div className="absolute -right-8 top-10 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

      {/* Main Grid */}
      <div className="relative grid gap-8 lg:grid-cols-2 items-center">
        {/* Left Side Content */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Khana Khazana"
              className="h-16 w-16 rounded-full object-cover shadow-sm"
            />
            <span className="inline-flex items-center rounded-full bg-amber-500/10 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-900 border border-amber-500/20">
              Cloud Kitchen • Khana Khazana
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-tight font-serif">
            Authentic  Indian Food at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
              Khana Khazana
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-stone-700 font-medium">
            Just a click away when you crave rich North Indian flavors. From butter-loaded naans and rich paneer curries to fresh Rasgullas and thalis, enjoy home-style recipes delivered piping hot.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="/menu"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200"
            >
              Order Now
            </a>
            <a
              href="/menu"
              className="inline-flex items-center justify-center rounded-2xl border border-amber-300/80 bg-amber-100/40 hover:bg-amber-100/70 backdrop-blur-md px-8 py-3.5 text-sm font-bold text-amber-900 transition-all duration-200"
            >
              View Menu
            </a>
          </div>

          {/* Highlights Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-amber-50/60 backdrop-blur-md p-4 border border-amber-200/50 shadow-2xs">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800">
              <span className="rounded-xl bg-amber-200/60 p-2 text-amber-800">🫓</span>
              Fresh Tandoori
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800">
              <span className="rounded-xl bg-amber-200/60 p-2 text-amber-800">🚀</span>
              Fast Delivery
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800">
              <span className="rounded-xl bg-amber-200/60 p-2 text-amber-800">🏡</span>
              Ghar Jaisa Swad
            </div>
          </div>
        </div>

        {/* Right Side Main Hero Image */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-amber-100/30 backdrop-blur-md p-3 border border-amber-200/60 shadow-md group">
            <img
              src={uttapam}
              alt="Maa Ka Rasoi North Indian Thali"
              className="w-full h-74 sm:h-110 object-cover rounded-2xl group-hover:scale-102 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-amber-200/50 pt-8">
        <div className="grid gap-6 lg:grid-cols-3 items-center">

          {/* Best Delivered Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-stone-900 mb-6 font-serif">
              North Indian Specialties
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div key={cat.name} className="flex flex-col items-center group cursor-pointer text-center">
                  <div className="w-20 h-20 rounded-full bg-amber-100/50 p-1 backdrop-blur-md border border-amber-300/60 shadow-sm transition transform group-hover:scale-108 group-hover:border-amber-500/80">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="mt-2 text-xs sm:text-sm font-bold text-stone-800 group-hover:text-amber-700 transition-colors">
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Opening Offer Card */}
          <div className="rounded-2xl border border-amber-300/60 bg-gradient-to-br from-amber-200/40 via-amber-100/30 to-orange-100/40 backdrop-blur-md p-5 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-300/50 px-2.5 py-1 rounded-md border border-amber-400/30">
              Opening Offer
            </span>
            <p className="mt-2 text-lg font-bold text-stone-900">
              50% OFF on your first order
            </p>
            <p className="text-xs text-stone-600 mt-1 font-medium">
              Free delivery on orders above ₹499.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
