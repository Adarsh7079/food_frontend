import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContextContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, description, rating }) => {
  const { currency, addToCart } = useContext(ShopContext);
  const [imgError, setImgError] = useState(false);

  const mainSrc = Array.isArray(image) ? image[0] : image;

  const handleAddToCart = async () => {
    await addToCart(id, "default");
  };

  return (
    <div className="group block text-stone-700">
      <div className="overflow-hidden rounded-[2rem] border border-[#d9c9ab] bg-[#fffdf8] shadow-[0_18px_45px_-30px_rgba(18,61,48,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#123d30]/40 hover:shadow-[0_24px_55px_-28px_rgba(18,61,48,0.42)]">
        <Link to={`/product/${id}`} className="block cursor-pointer">
        <div className="relative overflow-hidden rounded-t-[2rem] bg-[#f7f1e7]">
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
              className="flex h-52 items-center justify-center bg-gradient-to-br from-[#f7f1e7] to-[#e8d7b5] text-stone-600"
            >
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-[#123d30]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v6m0 8v6M4 12h16" />
                </svg>
                <span className="mt-3 block text-sm font-medium text-stone-700">{name || "No image"}</span>
              </div>
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full border border-[#d9c9ab] bg-[#f7f1e7]/95 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#123d30] shadow-sm">
            Popular
          </span>
        </div>
        </Link>
        <div className="space-y-3 p-5">
          <Link to={`/product/${id}`} className="block">
            <div className="flex items-start justify-between gap-3">
              <p className="text-lg font-bold text-stone-900">{name}</p>
              {rating && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700 ring-1 ring-green-200">
                  <span aria-hidden="true">★</span>
                  {rating}
                </span>
              )}
            </div>
            <p className="mt-2 h-14 overflow-hidden text-sm text-stone-500">{description}</p>
          </Link>
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-[#123d30] px-4 py-2 text-sm font-bold text-[#f7f1e7] shadow-md shadow-stone-200">
              {currency}
              {price}
            </span>
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full bg-gradient-to-r from-[#123d30] to-[#2d6756] px-5 py-2 text-sm font-bold text-[#f7f1e7] shadow-md shadow-[#d9a74a]/20 transition hover:from-[#0d2d22] hover:to-[#1d4d3e]"
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
