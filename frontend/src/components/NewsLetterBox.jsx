import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="my-16 rounded-[2rem] bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center text-white shadow-xl sm:p-12">
      <p className="text-2xl font-semibold">
        Get 50% off your first order
      </p>
      <p className="mt-3 text-sm text-orange-50 sm:text-base">
        Join our newsletter for offers, new dishes, and exclusive deals.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="mx-auto my-6 flex w-full max-w-xl flex-col gap-3 rounded-full bg-white p-2 sm:flex-row"
      >
        <input
          className="w-full rounded-full px-4 py-3 text-gray-700 outline-none"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
