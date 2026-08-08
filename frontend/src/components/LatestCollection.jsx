import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextContext";
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
        <Title text1={"Popular"} text2={"Dishes"} />
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Discover our most loved meals, served hot with vibrant flavors and cozy home-style comfort.
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
    </div>
  );
};

export default LatestCollection;
