import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContextContext";
import { defaultIndianFoodItems } from "../data/defaultIndianFoodItems";

const Menu = () => {
  const {
    products: contextProducts,
    addToCart,
    updateQuantity,
    cartItems,
    cartPopupItem,
    clearCart,
    navigate,
    search,
    setSearch,
  } = useContext(ShopContext);

  // =====================================================
  // PRODUCTS
  // =====================================================

  const sourceProducts =
    contextProducts && contextProducts.length > 0
      ? contextProducts
      : defaultIndianFoodItems;

  // =====================================================
  // STATES
  // =====================================================

  const [filterProducts, setFilterProducts] = useState([]);

  const [activeTab, setActiveTab] = useState("Veg");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [sortType, setSortType] =
    useState("relevant");

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    "All",
    "Biryani",
    "Curries",
    "Starters",
    "Breads",
    "Desserts",
    "Drinks",
  ];

  // =====================================================
  // GET QUANTITY OF PARTICULAR PRODUCT
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
  // TOTAL CART COUNT
  // =====================================================

  const totalCartItems =
    Object.values(cartItems || {}).reduce(
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
              sum + Number(quantity || 0),
            0
          )
        );
      },
      0
    );

  // =====================================================
  // FILTER + SORT
  // =====================================================

  useEffect(() => {
    let productsCopy = [...sourceProducts];

    // Veg / Non-Veg
    productsCopy =
      productsCopy.filter(
        (item) =>
          item.subCategory
            ?.toLowerCase() ===
          activeTab.toLowerCase()
      );

    // Category
    if (
      selectedCategory !== "All"
    ) {
      productsCopy =
        productsCopy.filter(
          (item) =>
            item.category
              ?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );
    }

    // Search
    const effectiveSearch = searchQuery || search;
    if (
      effectiveSearch.trim() !== ""
    ) {
      productsCopy =
        productsCopy.filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(
                effectiveSearch
                  .toLowerCase()
              )
        );
    }

    // Sort
    if (
      sortType === "low-high"
    ) {
      productsCopy.sort(
        (a, b) =>
          a.price - b.price
      );
    }

    if (
      sortType === "high-low"
    ) {
      productsCopy.sort(
        (a, b) =>
          b.price - a.price
      );
    }

    setFilterProducts(
      productsCopy
    );
  }, [
    selectedCategory,
    activeTab,
    sortType,
    searchQuery,
    search,
    contextProducts,
  ]);

  // =====================================================
  // ADD PRODUCT
  // =====================================================

  const handleAddToCart = async (
    item
  ) => {
    await addToCart(
      item._id,
      "default"
    );
  };

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = async (
    item
  ) => {
    const currentQuantity =
      getQuantity(item._id);

    await updateQuantity(
      item._id,
      "default",
      currentQuantity + 1
    );
  };

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = async (
    item
  ) => {
    const currentQuantity =
      getQuantity(item._id);

    if (currentQuantity <= 0) {
      return;
    }

    await updateQuantity(
      item._id,
      "default",
      currentQuantity - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-32 sm:px-6 lg:px-8">

      {/* =================================================
          HEADER
      ================================================== */}

      <div className="mb-8 rounded-[2rem] border border-amber-100 bg-gradient-to-br from-amber-50 via-[#fffdf8] to-orange-50 px-6 py-9 text-center shadow-[0_20px_50px_-38px_rgba(146,64,14,0.45)]">

        <Title
          text1={"INDIAN"}
          text2={"FOOD MENU"}
        />

        <p className="mt-2 text-sm text-stone-600">
          Taste the authentic spices and flavors
          of traditional Indian cooking
        </p>

      </div>

      {/* =================================================
          VEG / NON VEG
      ================================================== */}

      <div className="flex justify-center mb-8">

        <div className="flex items-center gap-2 rounded-2xl border border-amber-100 bg-amber-50 p-1.5 shadow-inner">

          {/* VEG */}

          <button
            onClick={() =>
              setActiveTab("Veg")
            }
            className={`
              flex
              items-center
              gap-2
              px-6
              py-2.5
              rounded-xl
              font-semibold
              text-sm
              transition-all
              duration-300
              ${
                activeTab === "Veg"
                  ? "bg-white text-green-700 shadow-md scale-105 ring-1 ring-green-100"
                  : "text-stone-600 hover:bg-white hover:text-green-600"
              }
            `}
          >

            <span className="w-3 h-3 rounded-full bg-green-600 inline-block border border-white" />

            Pure Veg

          </button>

          {/* NON VEG */}

          <button
            onClick={() =>
              setActiveTab(
                "Non-Veg"
              )
            }
            className={`
              flex
              items-center
              gap-2
              px-6
              py-2.5
              rounded-xl
              font-semibold
              text-sm
              transition-all
              duration-300
              ${
                activeTab ===
                "Non-Veg"
                  ? "bg-white text-red-700 shadow-md scale-105 ring-1 ring-red-100"
                  : "text-stone-600 hover:bg-white hover:text-red-600"
              }
            `}
          >

            <span className="w-3 h-3 rounded-full bg-red-600 inline-block border border-white" />

            Non-Veg

          </button>

        </div>

      </div>

      {/* =================================================
          SEARCH + FILTERS
      ================================================== */}

      <div className="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-amber-100 bg-white/90 p-4 shadow-[0_14px_35px_-28px_rgba(146,64,14,0.45)] md:flex-row">

        {/* SEARCH */}

        <div className="relative w-full md:w-1/3">

          <input
            type="text"
            placeholder="Search Paneer, Biryani, Naan..."
            value={searchQuery}
              onChange={(e) =>
                {
                  setSearchQuery(e.target.value);
                  setSearch(e.target.value);
                }
              }
            className="w-full rounded-xl border border-amber-200 bg-amber-50/50 py-2.5 pl-10 pr-4 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-amber-400"
          />

          <svg
            className="absolute left-3.5 top-3.5 h-4 w-4 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

        </div>

        {/* FILTERS */}

        <div className="flex flex-wrap w-full md:w-auto items-center gap-3">

          {/* CATEGORY */}

          <div className="flex items-center gap-2 w-full sm:w-auto">

            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:inline">
              Category:
            </span>

            <select
              value={
                selectedCategory
              }
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value
                )
              }
              className="w-full cursor-pointer rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-2.5 text-sm font-medium text-stone-700 outline-none focus:ring-2 focus:ring-amber-400 sm:w-auto"
            >

              {categories.map(
                (cat) => (
                  <option
                    key={cat}
                    value={cat}
                  >
                    {cat === "All"
                      ? "All Categories"
                      : cat}
                  </option>
                )
              )}

            </select>

          </div>

          {/* SORT */}

          <div className="flex items-center gap-2 w-full sm:w-auto">

            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:inline">
              Sort:
            </span>

            <select
              value={sortType}
              onChange={(e) =>
                setSortType(
                  e.target.value
                )
              }
              className="w-full cursor-pointer rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-2.5 text-sm font-medium text-stone-700 outline-none focus:ring-2 focus:ring-amber-400 sm:w-auto"
            >

              <option value="relevant">
                Relevant
              </option>

              <option value="low-high">
                Price: Low to High
              </option>

              <option value="high-low">
                Price: High to Low
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* =================================================
          FOOD CARDS
      ================================================== */}

      {filterProducts.length >
      0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filterProducts.map(
            (item) => {
              const quantity =
                getQuantity(
                  item._id
                );

              return (
                <div
                  key={item._id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-100 bg-[#fffdf8] shadow-[0_16px_40px_-30px_rgba(120,53,15,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_22px_45px_-28px_rgba(120,53,15,0.48)]"
                >

                  {/* ===========================
                      IMAGE
                  ============================ */}

                  <div>

                    <div className="relative aspect-video overflow-hidden bg-amber-50 sm:aspect-square">

                      <img
                        src={
                          Array.isArray(
                            item.image
                          )
                            ? item.image[0]
                            : item.image
                        }
                        alt={
                          item.name
                        }
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Veg / Non Veg */}

                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm">

                        <span
                          className={`
                            w-2.5
                            h-2.5
                            rounded-full
                            ${
                              item.subCategory ===
                              "Veg"
                                ? "bg-green-600"
                                : "bg-red-600"
                            }
                          `}
                        />

                        {
                          item.subCategory
                        }

                      </span>

                      {/* Category */}

                      <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md font-medium uppercase tracking-wider">
                        {
                          item.category
                        }
                      </span>

                    </div>

                    {/* ===========================
                        DETAILS
                    ============================ */}

                    <div className="p-4">

                      <div className="flex justify-between items-start gap-2 mb-1">

                        <h3 className="text-base font-bold text-stone-800 transition-colors group-hover:text-amber-700">

                          {
                            item.name
                          }

                        </h3>

                        {item.rating && (
                          <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">

                            ★{" "}
                            {
                              item.rating
                            }

                          </span>
                        )}

                      </div>

                    </div>

                  </div>

                  {/* ===========================
                      PRICE + CART
                  ============================ */}

                  <div className="p-4 pt-0 flex items-center justify-between mt-auto">

                    <div>

                      <span className="block text-xs text-stone-400">
                        Price
                      </span>

                      <span className="text-lg font-black text-stone-900">
                        ₹
                        {
                          item.price
                        }
                      </span>

                    </div>

                    {/* ===========================
                        QUANTITY / ADD
                    ============================ */}

                    {quantity > 0 ? (

                      <div className="flex items-center gap-2">

                        {/* MINUS */}

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-semibold text-stone-600 transition-colors hover:bg-amber-100 hover:text-amber-700"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        {/* NUMBER */}

                        <span className="min-w-[25px] text-center text-sm font-bold text-gray-900">
                          {
                            quantity
                          }
                        </span>

                        {/* PLUS */}

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-orange-600 text-lg font-semibold transition-colors"
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
                        className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-sm font-bold text-white shadow-md shadow-amber-200 transition hover:from-amber-600 hover:to-orange-600 active:scale-95"
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

      ) : (

        /* =================================================
            NO PRODUCTS
        ================================================== */

        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">

          <div className="text-4xl mb-3">
            🍽️
          </div>

          <p className="text-gray-500 font-medium text-base">
            No Indian items found
            for this selection.
          </p>

          <button
            onClick={() => {
              setSelectedCategory(
                "All"
              );

              setSearchQuery("");
            }}
            className="mt-3 text-sm text-orange-600 hover:text-orange-700 font-semibold underline"
          >
            Clear Search &
            Filters
          </button>

        </div>

      )}

      {/* =================================================
          FLOATING CART POPUP
      ================================================== */}

      {totalCartItems > 0 &&
        cartPopupItem && (

          <div className="fixed bottom-4 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-[720px] z-[100]">

            <div className="bg-stone-950/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl rounded-2xl p-3 sm:p-4">

              <div className="flex items-center justify-between gap-3">

                {/* ===========================
                    PRODUCT IMAGE + INFO
                ============================ */}

                <div className="flex items-center gap-3 min-w-0">

                  <div className="relative shrink-0">

                    <img
                      src={
                        cartPopupItem.image
                      }
                      alt={
                        cartPopupItem.name
                      }
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-amber-400/50"
                    />

                    {/* TOTAL COUNT */}

                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                      {
                        totalCartItems
                      }
                    </span>

                  </div>

                  <div className="min-w-0">

                    <p className="text-amber-400 text-[10px] uppercase tracking-widest font-bold">
                      Added to cart
                    </p>

                    <h4 className="text-white font-bold text-sm sm:text-base truncate max-w-[130px] sm:max-w-[240px]">
                      {
                        cartPopupItem.name
                      }
                    </h4>

                    <p className="text-stone-400 text-xs">
                      {
                        totalCartItems
                      }{" "}
                      {
                        totalCartItems ===
                        1
                          ? "item"
                          : "items"
                      }{" "}
                      in cart
                    </p>

                  </div>

                </div>

                {/* ===========================
                    ACTION BUTTONS
                ============================ */}

                <div className="flex items-center gap-2 shrink-0">

                  {/* CLEAR CART */}

                  <button
                    onClick={
                      clearCart
                    }
                    className="hidden sm:block text-xs font-bold text-red-300 border border-red-400/30 hover:bg-red-500/10 px-3 py-2.5 rounded-xl transition"
                  >
                    Clear Cart
                  </button>

                  {/* MOBILE CLEAR */}

                  <button
                    onClick={
                      clearCart
                    }
                    className="sm:hidden w-9 h-9 flex items-center justify-center text-red-300 border border-red-400/30 rounded-xl text-xs font-bold"
                    title="Clear Cart"
                  >
                    ×
                  </button>

                  {/* GO TO CART */}

                  <button
                    onClick={() =>
                      navigate(
                        "/cart"
                      )
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

    </div>
  );
};

export default Menu;
