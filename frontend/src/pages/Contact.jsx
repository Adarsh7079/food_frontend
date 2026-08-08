import React, { useState } from "react";
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Page Title */}
      <div className="text-2xl text-center pb-4">
        <Title text1={"CONTACT"} text2={"US"} />
        <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
          Have a question about your order or want to partner with us? We'd love to hear from you!
        </p>
      </div>

      {/* Main Contact Section */}
      <div className="flex flex-col lg:flex-row gap-12 my-12 items-stretch">
        
        {/* Left Side: Cloud Kitchen Image & Location Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop"
              alt="Cloud Kitchen Operations"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
              Cloud Kitchen Hub
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-4 text-gray-600 text-sm">
            <div>
              <p className="font-bold text-gray-900 text-base mb-1">Our Kitchen Location</p>
              <p className="text-gray-600 leading-relaxed">
                U-59 Bali Apartment, DLF Phase-3,
                <br />
                Gurugram, Haryana 122002
              </p>
            </div>

            <hr className="border-gray-100 my-1" />

            <div className="flex flex-col gap-2">
              <p className="text-gray-800 font-semibold flex items-center gap-2">
                <span>📞 Tel:</span>
                <a href="tel:+919709628329" className="text-gray-600 hover:text-orange-600 transition-colors">
                  +91 9709628329
                </a>
              </p>
              <p className="text-gray-800 font-semibold flex items-center gap-2">
                <span>✉️ Email:</span>
                <a href="mailto:hello@foodiehub.com" className="text-gray-600 hover:text-orange-600 transition-colors">
                  hello@foodiehub.com
                </a>
              </p>
              <p className="text-gray-800 font-semibold flex items-center gap-2">
                <span>🕒 Hours:</span>
                <span className="text-gray-600">Mon - Sun (10:00 AM - 11:30 PM)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Contact Form */}
        <div className="w-full lg:w-1/2 bg-gray-50 border border-gray-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Send Us a Message</h3>
          <p className="text-xs text-gray-500 mb-6">
            For catering inquiries, feedback, or bulk orders, drop us a line below.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you today?"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-sm active:scale-95 text-sm mt-2"
            >
              Submit Inquiry
            </button>
          </form>
        </div>

      </div>

      <NewsLetterBox />
    </div>
  );
};

export default Contact;