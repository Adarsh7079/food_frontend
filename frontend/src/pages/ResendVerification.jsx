import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContextContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResendVerification = () => {
  const { backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResend = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + "/api/user/resend-verification", { email });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleResend} className="max-w-md mx-auto mt-14 p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Resend Verification</h2>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-4 py-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        {loading ? "Sending..." : "Resend Verification Email"}
      </button>
    </form>
  );
};

export default ResendVerification;
