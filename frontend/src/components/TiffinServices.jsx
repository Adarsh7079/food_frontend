import React from "react";

const TiffinService = () => {
  return (
    <section className="my-16 px-4 max-w-6xl mx-auto">
      <div className="relative bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 rounded-3xl p-8 sm:p-12 text-white overflow-hidden border border-amber-500/20 shadow-xl">
        <div className="relative z-10 max-w-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 rounded-full">
            Daily Tiffin Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif mt-4 text-amber-100">
            Ghar Ka Khaana, Delivered Daily.
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
            Subscribe to our weekly or monthly meal plans. Fresh, hygienic, and home-style cooked North & South Indian meals delivered right to your office or home.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95">
              Explore Meal Plans
            </button>
            <span className="text-xs text-amber-300/80 font-medium">
              Starts at just ₹99/meal
            </span>
          </div>
        </div>
        
        {/* Decorative Badge */}
        <div className="hidden md:flex absolute -right-6 -bottom-6 w-72 h-72 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md items-center justify-center p-8 text-center">
          <div className="text-amber-200">
            <span className="text-4xl font-extrabold block">100%</span>
            <span className="text-xs uppercase font-bold tracking-wider">Hygienic & Fresh</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TiffinService;