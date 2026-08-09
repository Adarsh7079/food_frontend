import React from "react";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const About = () => {
  const teamMembers = [
    {
      name: "Adarsh Paritosh",
      role: "Founder",
      gender: "male",
      bio: "Driving the strategy, vision, and growth behind bringing great authentic food to your doorstep.",
    },
    {
      name: "Prakash Kumar",
      role: "Operations Head",
      gender: "male",
      bio: "Managing seamless kitchen operations, delivery logistics, and customer satisfaction.",
    },
    {
      name: "Chef Arushi",
      role: "Executive Head Chef + Co-Founde",
      gender: "female",
      bio: "Crafting signature recipes, perfecting spice blends, and ensuring every dish meets top culinary standards.",
    },
        {
      name: "Chef Misti",
      role: "Chef + Marketing Head",
      gender: "female",
      bio: "Crafting signature recipes, perfecting spice blends, and ensuring every dish meets top culinary standards.",
    },
  
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Page Title */}
      <div className="text-2xl text-center pb-4">
        <Title text1={"ABOUT"} text2={"US"} />
        <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
          Passionate about serving fresh, authentic, and unforgettable Indian meals directly to your doorstep.
        </p>
      </div>

      {/* Main Story Section */}
      <div className="flex flex-col md:flex-row gap-12 my-12 items-center">
        <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={assets.about_img || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop"}
            alt="Our Kitchen"
            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-600 text-sm sm:text-base leading-relaxed">
          <p>
            Born out of a deep passion for authentic Indian flavors and culinary innovation, our journey began with a clear vision: to make restaurant-quality meals accessible from the comfort of home.
          </p>
          <p>
            We carefully handpick fresh, locally sourced ingredients and combine traditional cooking styles with modern quality standards. From rich biryanis and authentic curries to refreshing drinks and handcrafted desserts, every dish is prepared with hygiene and care.
          </p>
          <div className="border-l-4 border-orange-500 pl-4 py-1 bg-orange-50/50 rounded-r-lg">
            <h3 className="font-bold text-gray-800 text-lg">Our Mission</h3>
            <p className="text-gray-600 text-sm mt-1">
              To provide choice, convenience, and absolute confidence in quality—delivering happiness in every meal.
            </p>
          </div>
        </div>
      </div>

      {/* Founders & Chefs Section */}
      <div className="my-16">
        <div className="text-2xl text-center mb-10">
          <Title text1={"MEET OUR"} text2={"FOUNDERS & CHEFS"} />
          <p className="text-gray-500 text-sm mt-2">
            The dedicated team behind your favorite dining experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col text-center group hover:-translate-y-1"
            >
              {/* Profile Avatar / Avatar Badge */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-orange-100 border-4 border-orange-200 group-hover:border-orange-500 transition-colors flex items-center justify-center text-3xl font-bold text-orange-600">
                {member.name.charAt(0)}
              </div>

              <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-3">
                {member.role}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="my-16">
        <div className="text-2xl text-center mb-8">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center gap-3 bg-white hover:border-orange-400 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mb-2">
              🥗
            </div>
            <h4 className="font-bold text-gray-800">Fresh Ingredients</h4>
            <p className="text-gray-600 text-sm">
              Prepared daily with premium, locally sourced ingredients and packed with authentic flavors.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center gap-3 bg-white hover:border-orange-400 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mb-2">
              ⚡
            </div>
            <h4 className="font-bold text-gray-800">Fast & Convenient</h4>
            <p className="text-gray-600 text-sm">
              Easy online ordering allows you to browse the menu and get fresh meals delivered fast.
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center gap-3 bg-white hover:border-orange-400 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mb-2">
              🤝
            </div>
            <h4 className="font-bold text-gray-800">Reliable Support</h4>
            <p className="text-gray-600 text-sm">
              Our support team is ready to assist with your orders, requests, and delivery updates.
            </p>
          </div>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;