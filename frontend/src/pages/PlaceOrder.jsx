import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContextContext";
import { defaultIndianFoodItems } from "../data/defaultIndianFoodItems";

import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [paymentCategory, setPaymentCategory] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!token) {
      toast.error("Please login to place your order.");
      navigate("/login");
      return;
    }

    let orderItems = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === items) ||
              defaultIndianFoodItems.find((product) => product._id === items)
          );
          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
    }

    if (orderItems.length === 0) {
      toast.error("Your cart is empty. Add items before placing an order.");
      return;
    }

    let orderData = {
      address: `${formData.firstName} ${formData.lastName}, ${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipcode}, ${formData.country}, Phone: ${formData.phone}, Email: ${formData.email}`,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
      paymentMethod: method === "cod" ? "COD" : method === "stripe" ? "Stripe" : "Razorpay",
    };

    const headers = { headers: { token } };

    try {
      switch (method) {
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            headers
          );
          if (response.data.success) {
            toast.success("Order placed successfully with Cash on Delivery.");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message || "Failed to place COD order.");
          }
          break;
        }

        case "stripe": {
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            headers
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message || "Stripe payment failed.");
          }
          break;
        }

        case "razorpay": {
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            headers
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          } else {
            toast.error(responseRazorpay.data.message || "Razorpay payment failed.");
          }
          break;
        }

        default: {
          toast.error("Invalid payment method selected");
          break;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Unable to complete the order.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>
      {/* Righr Side  */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="grid gap-3 sm:grid-cols-2 mt-4">
            <div
              onClick={() => {
                setPaymentCategory("cod");
                setMethod("cod");
              }}
              className={`cursor-pointer rounded-xl border p-4 transition-shadow duration-200 ${
                paymentCategory === "cod"
                  ? "border-green-500 bg-green-50 shadow-sm"
                  : "border-gray-300 bg-white hover:shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Cash on Delivery
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Pay in cash when your order is delivered.
                  </p>
                </div>
                <div className={`h-5 w-5 rounded-full border ${
                  paymentCategory === "cod"
                    ? "border-green-500 bg-green-500"
                    : "border-gray-400 bg-white"
                }`}></div>
              </div>
            </div>
            <div
              onClick={() => {
                setPaymentCategory("online");
                if (method === "cod") setMethod("stripe");
              }}
              className={`cursor-pointer rounded-xl border p-4 transition-shadow duration-200 ${
                paymentCategory === "online"
                  ? "border-green-500 bg-green-50 shadow-sm"
                  : "border-gray-300 bg-white hover:shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Online Payment
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Pay securely using Stripe or Razorpay.
                  </p>
                </div>
                <div className={`h-5 w-5 rounded-full border ${
                  paymentCategory === "online"
                    ? "border-green-500 bg-green-500"
                    : "border-gray-400 bg-white"
                }`}></div>
              </div>
            </div>
          </div>

          {paymentCategory === "online" ? (
            <div className="grid gap-3 sm:grid-cols-2 mt-4">
              <div
                onClick={() => setMethod("stripe")}
                className={`cursor-pointer rounded-xl border p-4 flex items-center gap-3 transition-shadow duration-200 ${
                  method === "stripe"
                    ? "border-green-500 bg-white shadow-sm"
                    : "border-gray-300 bg-white hover:shadow-lg"
                }`}
              >
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
                  <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Stripe
                  </p>
                  <p className="text-xs text-gray-500">Pay with card or UPI.</p>
                </div>
              </div>
              <div
                onClick={() => setMethod("razorpay")}
                className={`cursor-pointer rounded-xl border p-4 flex items-center gap-3 transition-shadow duration-200 ${
                  method === "razorpay"
                    ? "border-green-500 bg-white shadow-sm"
                    : "border-gray-300 bg-white hover:shadow-lg"
                }`}
              >
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
                  <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Razorpay
                  </p>
                  <p className="text-xs text-gray-500">Pay with UPI, cards, or wallet.</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm rounded-full"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
