import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContextContext";

// =====================================================
// CIRCULAR OFFERS
// =====================================================

const circularOffers = [
  {
    id: "1",
    title: "Paneer Special",
    price: "₹260",
    tag: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop",
    gradient:
      "from-amber-500 via-rose-500 to-purple-600",
  },

  {
    id: "2",
    title: "Chicken Biryani",
    price: "₹320",
    tag: "Chef Special",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop",
    gradient:
      "from-emerald-400 via-teal-500 to-indigo-500",
  },

  {
    id: "8",
    title: "Mango Lassi",
    price: "₹80",
    tag: "Trending",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop",
    gradient:
      "from-orange-400 via-amber-500 to-yellow-400",
  },
];

// =====================================================
// BANNERS
// =====================================================

const bannerOffers = [
  {
    id: 1,
    title: "First Order: 20% OFF",
    subtitle: "On orders above ₹499",
    code: "WELCOME20",
    image:
      "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 2,
    title: "Weekend Thali Offer",
    subtitle: "Flat 15% discount",
    code: "WEEKEND15",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 3,
    title: "Biryani Feast Deal",
    subtitle: "Free Raita + Cold Drink",
    code: "FEASTDEAL",
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
  },
];

// =====================================================
// POPULAR DISHES
// =====================================================

const regularItems = [
  {
    id: "1",
    name: "Paneer Butter Masala",
    rating: "4.8",
    reviews: "120+",
    price: "₹260",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop",
  },

  {
    id: "10",
    name: "Tandoori Chicken",
    rating: "4.9",
    reviews: "250+",
    price: "₹310",
    image:
      "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop",
  },

  {
    id: "8",
    name: "Mango Lassi",
    rating: "4.7",
    reviews: "95+",
    price: "₹80",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop",
  },

  {
    id: "3",
    name: "Dal Makhani",
    rating: "4.8",
    reviews: "310+",
    price: "₹220",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop",
  },

  {
    id: "5",
    name: "Veg Dum Biryani",
    rating: "4.9",
    reviews: "180+",
    price: "₹240",
    image:
      "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=500&auto=format&fit=crop",
  },

  {
    id: "7",
    name: "Gulab Jamun (2 Pcs)",
    rating: "4.6",
    reviews: "85+",
    price: "₹90",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop",
  },
];

const SpecialOffers = () => {
  const {
    cartItems,
    addToCart,
    updateQuantity,
    navigate,
    cartPopupItem,
    clearCart,
  } = useContext(ShopContext);

  // =====================================================
  // GET QUANTITY
  // =====================================================

  const getQuantity = (itemId) => {
    if (!cartItems?.[itemId]) {
      return 0;
    }

    return Object.values(
      cartItems[itemId]
    ).reduce(
      (total, quantity) =>
        total + Number(quantity || 0),
      0
    );
  };

  // =====================================================
  // ADD
  // =====================================================

  const handleAddToCart = async (item) => {
    await addToCart(
      item.id,
      "default"
    );
  };

  // =====================================================
  // INCREASE
  // =====================================================

  const increaseQuantity = async (item) => {
    const currentQuantity =
      getQuantity(item.id);

    await updateQuantity(
      item.id,
      "default",
      currentQuantity + 1
    );
  };

  // =====================================================
  // DECREASE
  // =====================================================

  const decreaseQuantity = async (item) => {
    const currentQuantity =
      getQuantity(item.id);

    if (currentQuantity <= 0) {
      return;
    }

    await updateQuantity(
      item.id,
      "default",
      currentQuantity - 1
    );
  };

  // =====================================================
  // TOTAL CART ITEMS
  // =====================================================

  const totalCartItems =
    Object.values(
      cartItems || {}
    ).reduce(
      (total, productVariants) => {
        if (!productVariants) {
          return total;
        }

        return (
          total +
          Object.values(
            productVariants
          ).reduce(
            (sum, quantity) =>
              sum +
              Number(quantity || 0),
            0
          )
        );
      },
      0
    );

  return (
    <section className="w-full py-10 px-4 sm:px-8 pb-32">

      <div className="max-w-6xl mx-auto space-y-12">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="text-center">

          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 mb-3">
            Indian Rasoi Specials
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
            Our Special Offers
          </h2>

        </div>

        {/* =================================================
            CIRCULAR OFFERS
        ================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {circularOffers.map(
            (item) => {

              const quantity =
                getQuantity(item.id);

              return (
                <div
                  key={item.id}
                  className="group relative bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-transparent backdrop-blur-md border border-amber-200/60 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                >

                  <div className="absolute top-0 w-32 h-32 bg-amber-400/15 rounded-full blur-2xl" />

                  {/* Image */}

                  <div
                    className={`relative p-[3px] rounded-full bg-gradient-to-tr ${item.gradient} mb-4 shadow-md`}
                  >

                    <div className="bg-white p-1 rounded-full">

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                      />

                    </div>

                  </div>

                  {/* Tag */}

                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/70 px-3 py-1 rounded-full mb-2 border border-amber-300/50">
                    {item.tag}
                  </span>

                  <h3 className="font-bold text-lg text-stone-900">
                    {item.title}
                  </h3>

                  {/* Price */}

                  <div className="mt-2">

                    <span className="font-black text-xl text-amber-700 bg-amber-500/10 px-3 py-1 rounded-lg">
                      {item.price}
                    </span>

                  </div>

                  {/* =================================================
                      SIMPLE QUANTITY CONTROL
                      SAME AS MENU
                  ================================================== */}

                  <div className="mt-4">

                    {quantity > 0 ? (

                      <div className="flex items-center gap-3">

                        {/* MINUS */}

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-amber-600 text-lg font-semibold transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        {/* NUMBER */}

                        <span className="min-w-[22px] text-center text-sm font-bold text-stone-900">
                          {quantity}
                        </span>

                        {/* PLUS */}

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-amber-600 text-lg font-semibold transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                      </div>

                    ) : (

                      <button
                        onClick={() =>
                          handleAddToCart(
                            item
                          )
                        }
                        className="text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-5 py-2.5 rounded-xl shadow-md active:scale-95 transition-all"
                      >
                        ADD +
                      </button>

                    )}

                  </div>

                </div>
              );
            }
          )}

        </div>

        {/* =================================================
            PROMO BANNERS
        ================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {bannerOffers.map(
            (banner) => (
              <div
                key={banner.id}
                className="group bg-amber-50/30 backdrop-blur-md border border-amber-200/50 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
              >

                <div className="h-40 overflow-hidden relative">

                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 bg-stone-900/80 text-amber-300 text-[11px] font-mono font-bold px-3 py-1 rounded-lg">
                    {banner.code}
                  </span>

                </div>

                <div className="p-4">

                  <h4 className="font-bold text-base text-stone-900">
                    {banner.title}
                  </h4>

                  <p className="text-xs text-stone-600 mt-1">
                    {banner.subtitle}
                  </p>

                </div>

              </div>
            )
          )}

        </div>

        {/* =================================================
            POPULAR DISHES
        ================================================== */}

        <div>

          <div className="flex items-center justify-between mb-6">

            <h3 className="text-xl font-bold text-stone-900">
              Popular Dishes
            </h3>

            <button className="text-xs font-bold text-amber-800 bg-amber-500/10 px-3.5 py-2 rounded-xl border border-amber-500/20">
              View All ({regularItems.length})
            </button>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">

            {regularItems.map(
              (item) => {

                const quantity =
                  getQuantity(
                    item.id
                  );

                return (
                  <div
                    key={item.id}
                    className="group bg-amber-50/40 backdrop-blur-md rounded-2xl p-3 border border-amber-200/50 hover:border-amber-400/80 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
                  >

                    {/* IMAGE */}

                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 ring-2 ring-amber-300/60 shadow-md">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <div className="w-full flex-1">

                      {/* RATING */}

                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full mb-1">

                        <span>
                          ★ {item.rating}
                        </span>

                        <span className="text-stone-500 font-normal">
                          ({item.reviews})
                        </span>

                      </div>

                      {/* NAME */}

                      <h4 className="font-bold text-xs text-stone-800 line-clamp-2 mt-1 min-h-[32px] flex items-center justify-center">
                        {item.name}
                      </h4>

                    </div>

                    {/* PRICE + QUANTITY */}

                    <div className="w-full mt-3 pt-2 border-t border-amber-200/40 flex items-center justify-between gap-2">

                      <span className="font-black text-sm text-stone-900">
                        {item.price}
                      </span>

                      {quantity > 0 ? (

                        /* SAME SIMPLE STYLE AS MENU */

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-amber-600 text-base font-semibold transition-colors"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>

                          <span className="min-w-[18px] text-center text-xs font-bold text-stone-900">
                            {quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-amber-600 text-base font-semibold transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>

                        </div>

                      ) : (

                        <button
                          onClick={() =>
                            handleAddToCart(
                              item
                            )
                          }
                          className="text-[11px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2.5 py-1.5 rounded-lg active:scale-95 transition-all"
                        >
                          ADD +
                        </button>

                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </div>

      {/* =================================================
          FLOATING CART POPUP
      ================================================== */}

      {totalCartItems > 0 &&
        cartPopupItem && (

          <div className="fixed bottom-4 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-[720px] z-[100]">

            <div className="bg-stone-950/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl rounded-2xl p-3 sm:p-4">

              <div className="flex items-center justify-between gap-3">

                {/* PRODUCT */}

                <div className="flex items-center gap-3 min-w-0">

                  <div className="relative shrink-0">

                    <img
                      src={cartPopupItem.image}
                      alt={cartPopupItem.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-amber-400/50"
                    />

                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                      {totalCartItems}
                    </span>

                  </div>

                  <div className="min-w-0">

                    <p className="text-amber-400 text-[10px] uppercase tracking-widest font-bold">
                      Added to cart
                    </p>

                    <h4 className="text-white font-bold text-sm sm:text-base truncate max-w-[130px] sm:max-w-[240px]">
                      {cartPopupItem.name}
                    </h4>

                    <p className="text-stone-400 text-xs">
                      {totalCartItems}{" "}
                      {totalCartItems === 1
                        ? "item"
                        : "items"}{" "}
                      in cart
                    </p>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex items-center gap-2 shrink-0">

                  {/* CLEAR CART */}

                  <button
                    onClick={clearCart}
                    className="hidden sm:block text-xs font-bold text-red-300 border border-red-400/30 hover:bg-red-500/10 px-3 py-2.5 rounded-xl transition"
                  >
                    Clear Cart
                  </button>

                  {/* MOBILE CLEAR */}

                  <button
                    onClick={clearCart}
                    className="sm:hidden w-9 h-9 flex items-center justify-center text-red-300 border border-red-400/30 rounded-xl text-xs font-bold"
                    title="Clear Cart"
                  >
                    ×
                  </button>

                  {/* CART */}

                  <button
                    onClick={() =>
                      navigate("/cart")
                    }
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm px-4 sm:px-6 py-3 rounded-xl shadow-lg active:scale-95 transition-all"
                  >

                    <span className="sm:hidden">
                      Cart
                    </span>

                    <span className="hidden sm:inline">
                      Go to Cart /
                      Checkout
                    </span>

                  </button>

                </div>

              </div>

            </div>

          </div>

        )}

    </section>
  );
};

export default SpecialOffers;
