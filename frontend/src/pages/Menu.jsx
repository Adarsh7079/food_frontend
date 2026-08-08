import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContextContext";
import { defaultIndianFoodItems } from "../data/defaultIndianFoodItems";

const Menu = () => {
  const context = useContext(ShopContext) || {};
  const { products: contextProducts, addToCart } = context;

  // Use context products if available, otherwise fall back to Indian food items
  const sourceProducts =
    contextProducts && contextProducts.length > 0
      ? contextProducts
      : defaultIndianFoodItems;

  const [filterProducts, setFilterProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Veg"); // 'Veg' or 'Non-Veg'
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("relevant");

  const categories = ["All", "Biryani", "Curries", "Starters", "Breads", "Desserts", "Drinks"];

  const applyFilterAndSort = () => {
    let productsCopy = [...sourceProducts];

    // Filter by Veg / Non-Veg Tab
    productsCopy = productsCopy.filter(
      (item) => item.subCategory?.toLowerCase() === activeTab.toLowerCase()
    );

    // Filter by Dropdown Category
    if (selectedCategory !== "All") {
      productsCopy = productsCopy.filter(
        (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort Items
    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [selectedCategory, activeTab, sortType, searchQuery, contextProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Title */}
      <div className="text-center mb-8">
        <Title text1={"INDIAN"} text2={"FOOD MENU"} />
        <p className="text-gray-500 text-sm mt-2">
          Taste the authentic spices and flavors of traditional Indian cooking
        </p>
      </div>

      {/* Veg / Non-Veg Segmented Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center shadow-inner gap-2">
          <button
            onClick={() => setActiveTab("Veg")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeTab === "Veg"
                ? "bg-white text-green-700 shadow-md scale-105"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-green-600 inline-block border border-white"></span>
            Pure Veg
          </button>
          <button
            onClick={() => setActiveTab("Non-Veg")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeTab === "Non-Veg"
                ? "bg-white text-red-700 shadow-md scale-105"
                : "text-gray-600 hover:text-red-600"
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-red-600 inline-block border border-white"></span>
            Non-Veg
          </button>
        </div>
      </div>

      {/* Controls Bar: Search + Category Dropdown + Sort Dropdown */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search Paneer, Biryani, Naan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5"
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

        {/* Dropdowns Group */}
        <div className="flex flex-wrap w-full md:w-auto items-center gap-3">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:inline">
              Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:inline">
              Sort:
            </span>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              <option value="relevant">Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Food Cards Grid */}
      {filterProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Indicators */}
                <div className="relative aspect-video sm:aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={Array.isArray(item.image) ? item.image[0] : item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Veg/Non-Veg Icon Badge */}
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.subCategory === "Veg"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    ></span>
                    {item.subCategory}
                  </span>
                  {/* Category Tag */}
                  <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md font-medium uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Card Header & Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800 text-base group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    {item.rating && (
                      <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                        ★ {item.rating}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer: Price in INR + Add Button */}
              <div className="p-4 pt-0 flex items-center justify-between mt-auto">
                <div>
                  <span className="text-xs text-gray-400 block">Price</span>
                  <span className="text-lg font-bold text-gray-900">
                    ₹{item.price}
                  </span>
                </div>
                <button
                  onClick={() => addToCart && addToCart(item._id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-medium text-sm transition-colors shadow-sm active:scale-95"
                >
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium text-base">
            No Indian items found for this selection.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-3 text-sm text-orange-600 hover:text-orange-700 font-semibold underline"
          >
            Clear Search & Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;