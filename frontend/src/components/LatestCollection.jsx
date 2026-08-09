import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextContext";
import { Link } from "react-router-dom";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <div className="my-14 rounded-[2rem] bg-white/95 p-6 shadow-[0_30px_80px_-45px_rgba(251,109,27,0.25)] sm:p-8">
      <div className="text-center py-6">
        <Title text1={"OUR"} text2={"MENU"} />
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Explore a selection of fresh, flavourful dishes from Khana Khazana.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/menu"
          className="inline-flex rounded-full border border-orange-600 px-6 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
        >
          View full menu
        </Link>
        <Link
          to="/cart"
          className="inline-flex rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
        >
          Go to cart & place order
        </Link>
      </div>
    </div>
  );
};

export default LatestCollection;
