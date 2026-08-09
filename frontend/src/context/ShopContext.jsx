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

  const [products, setProducts] = useState(
    defaultIndianFoodItems
  );

  const [token, setToken] = useState("");

  // =====================================================
  // CART POPUP ITEM
  // =====================================================
  const [cartPopupItem, setCartPopupItem] = useState(() => {
    try {
      const savedItem =
        localStorage.getItem("cartPopupItem");

      return savedItem
        ? JSON.parse(savedItem)
        : null;
    } catch (error) {
      return null;
    }
  });

  const navigate = useNavigate();

  // =====================================================
  // ADD TO CART
  // =====================================================
  const addToCart = async (itemId, size) => {
    const product = products.find(
      (product) => product._id === itemId
    );

    if (!product) {
      toast.error("Product not found");
      return;
    }

    const normalizedSize =
      size ||
      (product?.sizes?.length ? "" : "default");

    if (
      product?.sizes?.length &&
      !normalizedSize
    ) {
      toast.error("Select a portion first");
      return;
    }

    const cartSize =
      normalizedSize || "default";

    // ===================================================
    // SAVE POPUP ITEM
    // ===================================================
    const popupItem = {
      id: product._id,
      name: product.name,
      image: Array.isArray(product.image)
        ? product.image[0]
        : product.image,
    };

    setCartPopupItem(popupItem);

    localStorage.setItem(
      "cartPopupItem",
      JSON.stringify(popupItem)
    );

    // ===================================================
    // UPDATE CART
    // ===================================================
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

    // ===================================================
    // BACKEND
    // ===================================================
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          {
            itemId,
            size: cartSize,
          },
          {
            headers: {
              token,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // =====================================================
  // GET CART COUNT
  // =====================================================
  const getCartCount = () => {
    let totalCount = 0;

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        try {
          const quantity =
            cartItems[productId][size];

          if (quantity > 0) {
            totalCount += quantity;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return totalCount;
  };

  // =====================================================
  // UPDATE QUANTITY
  // =====================================================
  const updateQuantity = async (
    itemId,
    size,
    quantity
  ) => {
    let cartData = structuredClone(cartItems);

    // Remove item if quantity reaches zero
    if (quantity <= 0) {
      if (cartData[itemId]) {
        delete cartData[itemId][size];

        if (
          Object.keys(cartData[itemId])
            .length === 0
        ) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }

      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    // ===================================================
    // BACKEND
    // ===================================================
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          {
            itemId,
            size,
            quantity,
          },
          {
            headers: {
              token,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // =====================================================
  // CLEAR CART
  // =====================================================
  const clearCart = async () => {
    setCartItems({});

    setCartPopupItem(null);

    localStorage.removeItem(
      "cartPopupItem"
    );

    /*
      Frontend cart is cleared immediately.

      If your backend has a clear-cart API,
      we can connect it here later.
    */
  };

  // =====================================================
  // GET CART AMOUNT
  // =====================================================
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItems) {
      const itemInfo = products.find(
        (product) =>
          product._id === productId
      );

      if (!itemInfo) continue;

      for (const variant in cartItems[productId]) {
        const quantity =
          cartItems[productId][variant];

        if (quantity > 0) {
          totalAmount +=
            itemInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  // =====================================================
  // GET PRODUCTS
  // =====================================================
  const getProductData =
    useCallback(async () => {
      try {
        const response = await axios.get(
          backendUrl +
            "/api/product/list"
        );

        if (response.data.success) {
          const apiProducts =
            response.data.products || [];

          const mergedProducts = [
            ...apiProducts,
          ];

          defaultIndianFoodItems.forEach(
            (item) => {
              if (
                !mergedProducts.find(
                  (product) =>
                    product._id === item._id
                )
              ) {
                mergedProducts.push(item);
              }
            }
          );

          setProducts(
            mergedProducts
          );
        } else {
          toast.error(
            response.data.message
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }, [backendUrl]);

  // =====================================================
  // GET USER CART
  // =====================================================
  const getUserCart =
    useCallback(
      async (token) => {
        try {
          const response =
            await axios.post(
              backendUrl +
                "/api/cart/get",
              {},
              {
                headers: {
                  token,
                },
              }
            );

          if (
            response.data.success
          ) {
            setCartItems(
              response.data.cartData
            );
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
      [backendUrl]
    );

  // =====================================================
  // LOAD PRODUCTS
  // =====================================================
  useEffect(() => {
    getProductData();
  }, [getProductData]);

  // =====================================================
  // KEEP USER LOGGED IN
  // =====================================================
  useEffect(() => {
    if (
      !token &&
      localStorage.getItem("token")
    ) {
      const storedToken =
        localStorage.getItem("token");

      setToken(storedToken);

      getUserCart(storedToken);
    }
  }, [token, getUserCart]);

  // =====================================================
  // REMOVE POPUP WHEN CART BECOMES EMPTY
  // =====================================================
  useEffect(() => {
    const count = getCartCount();

    if (count === 0) {
      setCartPopupItem(null);

      localStorage.removeItem(
        "cartPopupItem"
      );
    }
  }, [cartItems]);

  // =====================================================
  // CONTEXT VALUE
  // =====================================================
  const value = {
    products,

    currency,

    delivery_fee,

    search,
    setSearch,

    showSearch,
    setShowSearch,

    cartItems,
    setCartItems,

    addToCart,

    updateQuantity,

    clearCart,

    getCartCount,

    getCartAmount,

    navigate,

    backendUrl,

    setToken,

    token,

    // Popup
    cartPopupItem,
    setCartPopupItem,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;