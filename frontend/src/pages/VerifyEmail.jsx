import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContextContext";

const VerifyEmail = () => {
  const { backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      if (!token) {
        toast.error("Verification token missing.");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.post(backendUrl + "/api/user/verify-email", { token });
        if (response.data.success) {
          toast.success("Email verified successfully. You can now login.");
          navigate("/login");
        } else {
          toast.error(response.data.message);
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [backendUrl, navigate, searchParams]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      {loading ? <p>Verifying your account...</p> : <p>Redirecting...</p>}
    </div>
  );
};

export default VerifyEmail;
