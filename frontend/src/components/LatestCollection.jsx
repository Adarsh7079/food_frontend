import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextContext";
import { Link } from "react-router-dom";
import Title from "./Title";
import MultiCardCarousel from "./MultiCardCarousel";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-amber-100 bg-gradient-to-br from-[#fffdf8] via-amber-50/70 to-orange-50/60 p-5 shadow-[0_24px_60px_-42px_rgba(146,64,14,0.38)] sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="relative text-center">
        <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-green-700 ring-1 ring-green-200">
          Freshly prepared
        </span>
        <div className="mt-3"><Title text1={"KHANA KHAZANA"} text2={"MENU"} /></div>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Explore a selection of fresh, flavourful dishes from Khana Khazana.
        </p>
      </div>

      <div className="relative mt-7">
        <MultiCardCarousel items={latestProducts} interval={4000} />
      </div>

      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/menu"
          className="inline-flex rounded-full border border-amber-300 bg-white/80 px-6 py-3 text-sm font-bold text-amber-800 transition hover:border-amber-500 hover:bg-amber-50"
        >
          View full menu
        </Link>
        <Link
          to="/cart"
          className="inline-flex rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-amber-200 transition hover:from-amber-600 hover:to-orange-600"
        >
          Go to cart & place order
        </Link>
      </div>
    </div>
  );
};

export default LatestCollection;
