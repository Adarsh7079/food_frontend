import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContextContext";
import Title from "./Title";

const CartTotal = () => {
  const {
    currency,
    delivery_fee,
    getCartAmount,
  } = useContext(ShopContext);

  // ==========================================
  // CART SUBTOTAL
  // ==========================================

  const subtotal = getCartAmount();

  // ==========================================
  // FREE DELIVERY LIMIT
  // ==========================================

  const FREE_DELIVERY_LIMIT = 499;

  // ==========================================
  // CHECK FREE DELIVERY
  // ==========================================

  const isFreeDelivery =
    subtotal >= FREE_DELIVERY_LIMIT;

  // ==========================================
  // SHIPPING FEE
  // ==========================================

  const shippingFee =
    subtotal === 0
      ? 0
      : isFreeDelivery
      ? 0
      : delivery_fee;

  // ==========================================
  // FINAL TOTAL
  // ==========================================

  const totalAmount =
    subtotal + shippingFee;

  // ==========================================
  // AMOUNT LEFT FOR FREE DELIVERY
  // ==========================================

  const amountLeft =
    Math.max(
      FREE_DELIVERY_LIMIT - subtotal,
      0
    );

  return (
    <div className="w-full">

      {/* ========================================
          TITLE
      ======================================== */}

      <div className="text-2xl">
        <Title
          text1={"CART"}
          text2={"TOTAL"}
        />
      </div>

      {/* ========================================
          TOTAL CARD
      ======================================== */}

      <div className="mt-4 bg-gradient-to-br from-amber-50 via-orange-50 to-white border border-amber-200/70 rounded-2xl p-5 shadow-sm">

        {/* ======================================
            SUBTOTAL
        ====================================== */}

        <div className="flex justify-between items-center text-sm">

          <p className="text-stone-600">
            Subtotal
          </p>

          <p className="font-semibold text-stone-900">
            {currency}
            {subtotal.toFixed(2)}
          </p>

        </div>

        <hr className="my-3 border-amber-200/70" />

        {/* ======================================
            SHIPPING
        ====================================== */}

        <div className="flex justify-between items-center text-sm">

          <p className="text-stone-600">
            Shipping Fee
          </p>

          {isFreeDelivery ? (

            <div className="flex items-center gap-2">

              {/* OLD PRICE */}

              <span className="text-xs text-stone-400 line-through">
                {currency}
                {delivery_fee}
              </span>

              {/* FREE */}

              <span className="font-bold text-green-600">
                FREE
              </span>

            </div>

          ) : (

            <p className="font-semibold text-stone-900">
              {currency}
              {shippingFee}
            </p>

          )}

        </div>

        {/* ======================================
            FREE DELIVERY PROGRESS MESSAGE
        ====================================== */}

        {subtotal > 0 &&
          !isFreeDelivery && (
            <div className="mt-4 rounded-xl bg-amber-100/70 border border-amber-200 px-3 py-2.5">

              <p className="text-xs text-amber-800">

                Add{" "}

                <span className="font-black">
                  {currency}
                  {amountLeft.toFixed(2)}
                </span>{" "}

                more to get{" "}

                <span className="font-bold">
                  FREE delivery 🚚
                </span>

              </p>

            </div>
          )}

        {/* ======================================
            FREE DELIVERY SUCCESS
        ====================================== */}

        {isFreeDelivery &&
          subtotal > 0 && (
            <div className="mt-4 rounded-xl bg-green-50 border border-green-200 px-3 py-2.5">

              <p className="text-xs text-green-700 font-semibold">
                🎉 Congratulations! You unlocked FREE delivery.
              </p>

            </div>
          )}

        <hr className="my-4 border-amber-200/70" />

        {/* ======================================
            FINAL TOTAL
        ====================================== */}

        <div className="flex justify-between items-center">

          <div>

            <p className="font-bold text-stone-900">
              Total
            </p>

            {subtotal > 0 && (
              <p className="text-[11px] text-stone-500 mt-0.5">

                {isFreeDelivery
                  ? "Free delivery applied"
                  : "Including delivery charges"}

              </p>
            )}

          </div>

          <p className="text-xl font-black text-amber-700">
            {currency}
            {totalAmount.toFixed(2)}
          </p>

        </div>

      </div>

    </div>
  );
};

export default CartTotal;