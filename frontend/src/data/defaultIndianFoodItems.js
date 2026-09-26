export const defaultIndianFoodItems = [
  {
    _id: "1",
    name: "Paneer Butter Masala",
    price: 260,
    category: "Curries",
    subCategory: "Veg",
    rating: 4.8,
    featuredTag: "Bestseller",
    description: "Paneer simmered in a velvety tomato, butter, and gently spiced gravy.",
    image: [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop",
    ],
  },
  {
    _id: "2",
    name: "Hyderabadi Chicken Dum Biryani",
    price: 320,
    category: "Biryani",
    subCategory: "Non-Veg",
    rating: 4.9,
    featuredTag: "Chef Special",
    description: "Fragrant basmati rice layered with tender chicken and slow-cooked Hyderabadi spices.",
    image: [
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop",
    ],
  },
  {
    _id: "3",
    name: "Dal Makhani",
    price: 220,
    category: "Curries",
    subCategory: "Veg",
    rating: 4.7,
    description: "Black lentils slow-cooked until creamy with butter, tomato, and warming spices.",
    image: [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop",
    ],
  },
  {
    _id: "4",
    name: "Butter Chicken",
    price: 350,
    category: "Curries",
    subCategory: "Non-Veg",
    rating: 4.9,
    description: "Juicy chicken in a rich tomato and cream sauce finished with aromatic spices.",
    image: [
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop",
    ],
  },
  {
    _id: "5",
    name: "Veg Dum Biryani",
    price: 240,
    category: "Biryani",
    subCategory: "Veg",
    rating: 4.5,
    description: "Basmati rice cooked with vegetables, herbs, and fragrant biryani masala.",
    image: [
      "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=500&auto=format&fit=crop",
    ],
  },
  {
    _id: "6",
    name: "Chicken Tikka (6 Pcs)",
    price: 290,
    category: "Starters",
    subCategory: "Non-Veg",
    rating: 4.8,
    description: "Six pieces of marinated chicken chargrilled with a smoky tandoori spice blend.",
    image: [
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop",
    ],
  },
  {
    _id: "7",
    name: "Gulab Jamun (2 Pcs)",
    price: 90,
    category: "Desserts",
    subCategory: "Veg",
    rating: 4.6,
    description: "Soft milk-solid dumplings soaked in a delicate cardamom sugar syrup.",
    image: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop",
    ],
  },
  {
    _id: "8",
    name: "Mango Lassi",
    price: 80,
    category: "Drinks",
    subCategory: "Veg",
    rating: 4.4,
    featuredTag: "Trending",
    description: "A chilled, creamy mango yogurt drink with a naturally sweet finish.",
    image: [
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop",
    ],
  },
  {
    _id: "9",
    name: "Garlic Butter Naan",
    price: 50,
    category: "Breads",
    subCategory: "Veg",
    rating: 4.7,
    description: "Warm naan brushed with garlic and butter, baked until soft with a light char.",
    image: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop",
    ],
  },
  {
    _id: "10",
    name: "Tandoori Chicken (Half)",
    price: 310,
    category: "Starters",
    subCategory: "Non-Veg",
    rating: 4.8,
    description: "Half a chicken marinated in yogurt and spices, then roasted in the tandoor.",
    image: [
      "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop",
    ],
  },
];

export const foodItemsByCategory = defaultIndianFoodItems.reduce(
  (groupedItems, item) => {
    const category = item.category || "Other";
    groupedItems[category] ??= [];
    groupedItems[category].push(item);
    return groupedItems;
  },
  {}
);

export const foodCategories = Object.keys(foodItemsByCategory);

export const featuredFoodItems = defaultIndianFoodItems.filter(
  (item) => item.featuredTag
);

export const popularFoodItems = [...defaultIndianFoodItems]
  .sort((firstItem, secondItem) => secondItem.rating - firstItem.rating)
  .slice(0, 6);
