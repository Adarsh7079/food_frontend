import React, { useContext, useEffect, useState } from "react";
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
      "from-[#d9a74a] via-[#2d6756] to-[#123d30]",
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
      "from-[#f3d7a1] via-[#d9a74a] to-[#123d30]",
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
  const [activeOffer, setActiveOffer] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const {
    cartItems,
    addToCart,
    updateQuantity,
    navigate,
    cartPopupItem,
    clearCart,
  } = useContext(ShopContext);

  useEffect(() => {
    if (isCarouselPaused) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveOffer((current) => (current + 1) % bannerOffers.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isCarouselPaused]);

  const showOffer = (index) => {
    setActiveOffer((index + bannerOffers.length) % bannerOffers.length);
  };

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
    <section className="relative isolate -mx-4 w-[calc(100%+2rem)] overflow-hidden bg-[linear-gradient(145deg,#fffaf2_0%,#f6eedb_58%,#f2e7cf_100%)] px-4 py-8 sm:-mx-[5vw] sm:w-[calc(100%+10vw)] sm:px-[5vw] md:-mx-[7vw] md:w-[calc(100%+14vw)] md:px-[7vw] lg:-mx-[9vw] lg:w-[calc(100%+18vw)] lg:px-[9vw] sm:py-12 pb-32">

      <div className="relative mx-auto max-w-6xl space-y-12">

        <div
          className="relative isolate min-h-[340px] overflow-hidden rounded-3xl bg-[#123d30] shadow-[0_22px_55px_-28px_rgba(18,61,48,0.55)] sm:min-h-[400px]"
          aria-roledescription="carousel"
          aria-label="Current food offers"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
        >
          {bannerOffers.map((offer, index) => (
            <div
              key={offer.id}
              className={`absolute inset-0 transition-opacity duration-700 ${index === activeOffer ? "opacity-100" : "pointer-events-none opacity-0"}`}
              aria-hidden={index !== activeOffer}
              inert={index !== activeOffer}
            >
              <img
                src={offer.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d2d22]/95 via-[#123d30]/75 to-[#123d30]/10" />
              <div className="relative flex min-h-[340px] max-w-xl flex-col items-start justify-center px-6 py-12 text-[#fffaf2] sm:min-h-[400px] sm:px-12 lg:px-16">
                <span className="mb-5 rounded-full border border-[#f3d7a1]/40 bg-[#f3d7a1]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#f3d7a1]">
                  Limited-time offer · {offer.code}
                </span>
                <h2 className="max-w-lg font-serif text-4xl font-bold leading-tight sm:text-5xl">
                  {offer.title}
                </h2>
                <p className="mt-3 text-base text-[#fffaf2]/85 sm:text-lg">
                  {offer.subtitle}. Order fresh, homestyle favourites from ZaykaNest.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/menu")}
                  className="mt-7 rounded-xl bg-[#f3d7a1] px-6 py-3 text-sm font-bold text-[#123d30] shadow-lg transition hover:bg-[#d9a74a] active:scale-95"
                >
                  Explore the menu
                </button>
              </div>
            </div>
          ))}

          <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2 sm:bottom-7 sm:right-8">
            <button
              type="button"
              onClick={() => showOffer(activeOffer - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#123d30]/70 text-lg text-white backdrop-blur transition hover:bg-[#123d30]"
              aria-label="Previous offer"
            >
              &#8592;
            </button>
            {bannerOffers.map((offer, index) => (
              <button
                key={offer.id}
                type="button"
                onClick={() => showOffer(index)}
                className={`h-2.5 rounded-full transition-all ${index === activeOffer ? "w-7 bg-[#f3d7a1]" : "w-2.5 bg-white/65 hover:bg-white"}`}
                aria-label={`Show offer ${index + 1}: ${offer.title}`}
                aria-current={index === activeOffer ? "true" : undefined}
              />
            ))}
            <button
              type="button"
              onClick={() => showOffer(activeOffer + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#123d30]/70 text-lg text-white backdrop-blur transition hover:bg-[#123d30]"
              aria-label="Next offer"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="text-center">

          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#123d30] bg-[#d9a74a]/10 px-4 py-1.5 rounded-full border border-[#d9a74a]/30 mb-3">
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
                  className="group relative bg-gradient-to-b from-[#fffaf2] via-[#f6eedb] to-[#f2e7cf] border border-[#d9a74a]/35 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                >

                  <div className="absolute inset-x-8 top-0 h-px bg-[#d9a74a]/40" />

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

                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#123d30] bg-[#f3d7a1]/60 px-3 py-1 rounded-full mb-2 border border-[#d9a74a]/40">
                    {item.tag}
                  </span>

                  <h3 className="font-bold text-lg text-stone-900">
                    {item.title}
                  </h3>

                  {/* Price */}

                  <div className="mt-2">

                    <span className="font-black text-xl text-[#123d30] bg-[#f3d7a1]/45 px-3 py-1 rounded-lg">
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
                          className="w-7 h-7 flex items-center justify-center text-[#123d30] hover:text-[#2d6756] text-lg font-semibold transition-colors"
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
                          className="w-7 h-7 flex items-center justify-center text-[#123d30] hover:text-[#2d6756] text-lg font-semibold transition-colors"
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
                        className="text-sm font-bold border border-[#d9a74a]/40 bg-gradient-to-r from-[#123d30] to-[#2d6756] text-[#fffaf2] px-5 py-2.5 rounded-xl shadow-md transition hover:from-[#0d2d22] hover:to-[#1d4d3e] active:scale-95"
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
                className="group bg-[#fffaf2] border border-[#d9a74a]/30 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
              >

                <div className="h-40 overflow-hidden relative">

                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 bg-[#123d30]/90 text-[#f3d7a1] text-[11px] font-mono font-bold px-3 py-1 rounded-lg">
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

            <button className="text-xs font-bold text-[#123d30] bg-[#f3d7a1]/35 px-3.5 py-2 rounded-xl border border-[#d9a74a]/35 hover:bg-[#f3d7a1]/60 transition-colors">
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
                    className="group bg-[#fffaf2]/85 rounded-2xl p-3 border border-[#d9a74a]/25 hover:border-[#d9a74a]/60 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
                  >

                    {/* IMAGE */}

                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 ring-2 ring-[#d9a74a]/60 shadow-md">

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

                    <div className="w-full mt-3 pt-2 border-t border-[#d9a74a]/25 flex items-center justify-between gap-2">

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
                            className="w-6 h-6 flex items-center justify-center text-[#123d30] hover:text-[#2d6756] text-base font-semibold transition-colors"
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
                            className="w-6 h-6 flex items-center justify-center text-[#123d30] hover:text-[#2d6756] text-base font-semibold transition-colors"
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
                          className="text-[11px] font-bold bg-gradient-to-r from-[#123d30] to-[#2d6756] text-[#fffaf2] px-2.5 py-1.5 rounded-lg hover:from-[#0d2d22] hover:to-[#1d4d3e] active:scale-95 transition-all"
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

            <div className="bg-[#0d2d22]/95 backdrop-blur-xl border border-[#d9a74a]/40 shadow-2xl rounded-2xl p-3 sm:p-4">

              <div className="flex items-center justify-between gap-3">

                {/* PRODUCT */}

                <div className="flex items-center gap-3 min-w-0">

                  <div className="relative shrink-0">

                    <img
                      src={cartPopupItem.image}
                      alt={cartPopupItem.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-[#d9a74a]/60"
                    />

                    <span className="absolute -top-2 -right-2 bg-[#f3d7a1] text-[#123d30] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                      {totalCartItems}
                    </span>

                  </div>

                  <div className="min-w-0">

                    <p className="text-[#f3d7a1] text-[10px] uppercase tracking-widest font-bold">
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
                    className="bg-gradient-to-r from-[#123d30] to-[#2d6756] hover:from-[#0d2d22] hover:to-[#1d4d3e] text-[#fffaf2] font-black text-xs sm:text-sm px-4 sm:px-6 py-3 rounded-xl shadow-lg active:scale-95 transition-all"
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
