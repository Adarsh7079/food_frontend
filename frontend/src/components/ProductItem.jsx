import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContextContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, description }) => {
  const { currency, addToCart } = useContext(ShopContext);
  const [imgError, setImgError] = useState(false);

  const mainSrc = Array.isArray(image) ? image[0] : image;

  const handleAddToCart = async () => {
    await addToCart(id, "default");
  };

  return (
    <div className="group block text-gray-700">
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_-35px_rgba(251,109,27,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_-35px_rgba(251,109,27,0.45)]">
        <Link to={`/product/${id}`} className="block cursor-pointer">
        <div className="relative overflow-hidden rounded-t-[2rem] bg-orange-50">
          {mainSrc && !imgError ? (
            <img
              className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
              src={mainSrc}
              alt={name || "Dish image"}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div
              role="img"
              aria-label={name || "No image available"}
              className="flex h-52 items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 text-gray-600"
            >
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v6m0 8v6M4 12h16" />
                </svg>
                <span className="mt-3 block text-sm font-medium text-gray-700">{name || "No image"}</span>
              </div>
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700 shadow-sm">
            Popular
          </span>
        </div>
        </Link>
        <div className="space-y-3 p-5">
          <Link to={`/product/${id}`} className="block">
            <p className="text-lg font-semibold text-gray-900">{name}</p>
            <p className="mt-2 text-sm text-gray-500 h-14 overflow-hidden">{description}</p>
          </Link>
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-gradient-to-r from-[#ffb56b] to-[#fb6d1b] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-200">
              {currency}
              {price}
            </span>
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
