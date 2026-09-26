import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContextContext";
import { defaultIndianFoodItems } from "../data/defaultIndianFoodItems";

import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [shareLocation, setShareLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    navigate,
    backendUrl,
    token,
    setCartItems,
    getCartPricing,
    products,
  } = useContext(ShopContext);
  const pricing = getCartPricing();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "Gurugram",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const getLocationDetails = () =>
    new Promise((resolve) => {
      if (!shareLocation || !navigator.geolocation) {
        resolve("Location not shared");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          resolve(
            `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
          ),
        () => {
          toast.info("Location was not shared. The delivery address will be used instead.");
          resolve("Location not shared")
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });

  const openOrderConfirmationInWhatsApp = (orderItems, pricing, location) => {
    const itemLines = orderItems
      .map((item) => `• ${item.name} × ${item.quantity} — ₹${item.price * item.quantity}`)
      .join("\n");
    const message = [
      "*New ZaykaNest COD Order*",
      `Customer: ${formData.firstName} ${formData.lastName}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      `Address: ${formData.street}, ${formData.city}`,
      `Location: ${location}`,
      "",
      "*Items*",
      itemLines,
      "",
      `Subtotal: ₹${pricing.subtotal.toFixed(2)}`,
      ...(pricing.discount > 0
        ? [`Offer discount (${pricing.discountPercent}%): -₹${pricing.discount.toFixed(2)}`]
        : []),
      `Delivery: ${pricing.shippingFee === 0 ? "FREE" : `₹${pricing.shippingFee.toFixed(2)}`}`,
      `Payment: Cash on Delivery`,
      `Final amount: ₹${pricing.total.toFixed(2)}`,
    ].join("\n");
    const encodedMessage = encodeURIComponent(message);

    window.location.assign(
      `https://wa.me/919709628329?text=${encodedMessage}`
    );
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

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

    const cityValue = formData.city.trim().toLowerCase();
    if (
      !cityValue.includes("gurugram") &&
      !cityValue.includes("gurgaon") &&
      !cityValue.includes("gurugam")
    ) {
      toast.error(
        "We deliver only within Gurugram (Gurgaon). Please enter Gurugram as your city."
      );
      return;
    }

    const location = await getLocationDetails();
    const pricing = getCartPricing();
    let orderData = {
      address: `${formData.firstName} ${formData.lastName}, ${formData.street}, ${formData.city}, Phone: ${formData.phone}, Email: ${formData.email}`,
      items: orderItems,
      amount: pricing.total,
      paymentMethod: "COD",
    };

    try {
      setIsSubmitting(true);
      // Guest orders are sent directly to the delivery team on WhatsApp.
      // Signed-in customers are also saved to their account order history.
      if (!token) {
        setCartItems({});
        openOrderConfirmationInWhatsApp(orderItems, pricing, location);
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        openOrderConfirmationInWhatsApp(orderItems, pricing, location);
      } else {
        toast.error(response.data.message || "Failed to place COD order.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Unable to complete the order.");
    } finally {
      setIsSubmitting(false);
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

        <div className="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 shadow-sm">
          <p className="font-semibold">Delivery area notice</p>
          <p className="mt-1 text-xs leading-relaxed text-stone-700">
            We currently accept orders only from Gurugram (Gurgaon). Please keep the city as Gurugram so we can serve you quickly.
          </p>
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
          <select
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full bg-white text-stone-900"
          >
            <option value="Gurugram">Gurugram</option>
          </select>
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
        <label className="mt-2 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-stone-700">
          <input
            type="checkbox"
            checked={shareLocation}
            onChange={(event) => setShareLocation(event.target.checked)}
            className="mt-1 h-4 w-4 accent-orange-600"
          />
          <span>
            Share my current location with the delivery team. We will request your browser location only when you place this order.
          </span>
        </label>
      </div>
      {/* Righr Side  */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="mt-4">
            <div className="rounded-xl border border-green-500 bg-green-50 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Cash on Delivery
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Pay in cash when your order is delivered.
                  </p>
                  <p className="mt-3 text-xs font-semibold text-[#2d6756]">
                    {pricing.discount > 0
                      ? `You save ₹${pricing.discount.toFixed(2)} with the ${pricing.discountPercent}% offer.`
                      : "Get 20% off when your items total ₹499 or more."}
                  </p>
                </div>
                <div className="h-5 w-5 rounded-full border border-green-500 bg-green-500"></div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-green-200 pt-3">
                <span className="text-sm font-semibold text-gray-700">Final amount to pay</span>
                <span className="text-xl font-black text-[#123d30]">₹{pricing.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-16 py-3 text-sm rounded-full"
            >
              {isSubmitting ? "PLACING ORDER..." : "PLACE COD ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
