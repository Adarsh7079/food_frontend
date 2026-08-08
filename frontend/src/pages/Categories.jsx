import React from "react";

// Top Circular Story Offers
const circularOffers = [
  {
    id: 1,
    title: "Thali Combo",
    price: "₹249",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
    gradient: "from-amber-500 via-rose-500 to-purple-600",
  },
  {
    id: 2,
    title: "Biryani Pot",
    price: "₹199",
    tag: "Chef Special",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80",
    gradient: "from-emerald-400 via-teal-500 to-indigo-500",
  },
  {
    id: 3,
    title: "Lassi Combo",
    price: "₹120",
    tag: "Trending",
    image: "https://images.unsplash.com/photo-1571006682860-3cd8ad1779b7?auto=format&fit=crop&w=500&q=80",
    gradient: "from-orange-400 via-amber-500 to-yellow-400",
  },
];

// Middle Promo Banners
const bannerOffers = [
  {
    id: 1,
    title: "First Order: 20% OFF",
    subtitle: "On orders above ₹499",
    code: "WELCOME20",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Weekend Thali Offer",
    subtitle: "Flat 15% discount",
    code: "WEEKEND15",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Biryani Feast Deal",
    subtitle: "Free Raita + Cold Drink",
    code: "FEASTDEAL",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
  },
];

// Popular Dishes Grid
const regularItems = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    rating: "4.8",
    reviews: "120+",
    price: "₹150",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Tandoori Chicken",
    rating: "4.9",
    reviews: "250+",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Shahi Kheer",
    rating: "4.7",
    reviews: "95+",
    price: "₹80",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Dal Makhani",
    rating: "4.8",
    reviews: "310+",
    price: "₹140",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Veg Hyderabadi Biryani",
    rating: "4.9",
    reviews: "180+",
    price: "₹170",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Gulab Jamun (2 pcs)",
    rating: "4.6",
    reviews: "85+",
    price: "₹60",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=500&q=80",
  },
];

const SpecialOffers = () => {
  return (
    <section className="w-full py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-500/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/20 shadow-xs mb-3">
            Indian Rasoi Specials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            Our Special Offers
          </h2>
        </div>

        {/* 1. Circle Highlight Offers (Upgraded Design) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {circularOffers.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-transparent backdrop-blur-md border border-amber-200/60 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden"
            >
              {/* Subtle Soft Radial Glow behind the avatar */}
              <div className="absolute top-0 w-32 h-32 bg-amber-400/15 rounded-full blur-2xl group-hover:bg-amber-500/25 transition-colors" />

              {/* Gradient Border Ring Avatar */}
              <div className={`relative p-[3px] rounded-full bg-gradient-to-tr ${item.gradient} mb-4 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                <div className="bg-white/90 backdrop-blur-xs p-1 rounded-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-inner"
                  />
                </div>
              </div>

              {/* Tag Badge */}
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/70 backdrop-blur-xs px-3 py-1 rounded-full mb-2 border border-amber-300/50 shadow-2xs">
                {item.tag}
              </span>

              {/* Title & Price */}
              <h3 className="font-bold text-lg text-stone-900">{item.title}</h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-stone-500 line-through">₹{parseInt(item.price.replace('₹','')) + 50}</span>
                <span className="font-black text-xl text-amber-700 bg-amber-500/10 px-3 py-0.5 rounded-lg border border-amber-500/20">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Middle Promo Banners (Non-White Tinted Glass) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bannerOffers.map((banner) => (
            <div
              key={banner.id}
              className="group bg-amber-50/30 backdrop-blur-md border border-amber-200/50 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="h-40 overflow-hidden relative">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-300 text-[11px] font-mono font-bold px-3 py-1 rounded-lg border border-amber-400/20 shadow-xs">
                  {banner.code}
                </span>
              </div>
              <div className="p-4 bg-gradient-to-b from-amber-50/40 to-orange-100/30">
                <h4 className="font-bold text-base text-stone-900 leading-snug">
                  {banner.title}
                </h4>
                <p className="text-xs text-stone-600 mt-1">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Popular Dishes Grid (Transparent Warm Cards) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Popular Dishes
            </h3>
            <button className="text-xs font-bold text-amber-800 bg-amber-500/10 hover:bg-amber-500/20 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-500/20 transition-all">
              View All ({regularItems.length})
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {regularItems.map((item) => (
              <div
                key={item.id}
                className="group bg-amber-50/40 backdrop-blur-md rounded-2xl p-3 border border-amber-200/50 hover:border-amber-400/80 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center justify-between cursor-pointer"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 ring-2 ring-amber-300/60 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full flex-1 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-200/40 px-2 py-0.5 rounded-full mb-1 border border-amber-300/30">
                      <span>★ {item.rating}</span>
                      <span className="text-stone-500 font-normal">({item.reviews})</span>
                    </div>
                    <h4 className="font-bold text-xs text-stone-800 line-clamp-2 mt-1 min-h-[32px] flex items-center justify-center">
                      {item.name}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-amber-200/40 flex items-center justify-between">
                    <span className="font-black text-sm text-stone-900">
                      {item.price}
                    </span>
                    <button className="text-[11px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white px-2.5 py-1 rounded-lg transition-all shadow-xs">
                      ADD +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SpecialOffers;