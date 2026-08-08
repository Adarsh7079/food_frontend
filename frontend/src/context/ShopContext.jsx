import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { defaultIndianFoodItems } from "../data/defaultIndianFoodItems";
import { ShopContext } from "./ShopContextContext";

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 20;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState(defaultIndianFoodItems);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    const product = products.find((product) => product._id === itemId);
    const normalizedSize = size || (product?.sizes?.length ? "" : "default");

    if (product?.sizes?.length && !normalizedSize) {
      toast.error("Select a portion first");
      return;
    }

    const cartSize = normalizedSize || "default";
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][cartSize]) {
        cartData[itemId][cartSize] += 1;
      } else {
        cartData[itemId][cartSize] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][cartSize] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size: cartSize },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItems) {
      const itemInfo = products.find((product) => product._id === productId);

      if (!itemInfo) continue; // skip if product not found

      for (const variant in cartItems[productId]) {
        const quantity = cartItems[productId][variant];

        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  // const getCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const items in cartItems) {
  //     let itemInfo = products.find((product) => product._id === items);
  //     for (const item in cartItems[item]) {
  //       try {
  //         if (cartItems[items][item] > 0) {
  //           totalAmount += itemInfo.price * cartItems[items][item];
  //         }
  //       } catch (error) {}
  //     }
  //   }
  //   return totalAmount;
  // };

  const getProductData = useCallback(async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        const apiProducts = response.data.products || [];
        const mergedProducts = [...apiProducts];
        defaultIndianFoodItems.forEach((item) => {
          if (!mergedProducts.find((product) => product._id === item._id)) {
            mergedProducts.push(item);
          }
        });
        setProducts(mergedProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl]);

  const getUserCart = useCallback(
    async (token) => {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/get",
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems(response.data.cartData);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
    [backendUrl]
  );

  useEffect(() => {
    getProductData();
  }, [getProductData]);

  // after reloading the page stay login in
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, [token, getUserCart]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
