import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "John Doe",
      email: "admin@admin.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Jane",
      email: "jane@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Free Shirt",
      slug: "free-shirt",
      category: "Shirts",
      image: "/images/shirt1.jpg",
      price: 70,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "A Popular Shirt",
    },
    {
      name: "Fit Shirt",
      slug: "fit-shirt",
      category: "Shirts",
      image: "/images/shirt2.jpg",
      price: 80,
      brand: "Adidas",
      rating: 4.2,
      numReviews: 10,
      countInStock: 20,
      description: "A Popular Shirt",
    },
    {
      name: "Slim Shirt",
      slug: "slim-shirt",
      category: "Shirts",
      image: "/images/shirt3.jpg",
      price: 90,
      brand: "Raymond",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "A Popular Shirt",
    },
    {
      name: "Golf Pants",
      slug: "golf-pant",
      category: "Pants",
      image: "/images/pants1.jpg",
      price: 100,
      brand: "Oliver",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "Smart Looking Pants",
    },
    {
      name: "Fit Pants",
      slug: "fit-pant",
      category: "Pants",
      image: "/images/pants2.jpg",
      price: 95,
      brand: "Zara",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "A Popular Pants",
    },
    {
      name: "Classic Pants",
      slug: "classic-pant",
      category: "Pants",
      image: "/images/pants3.jpg",
      price: 75,
      brand: "Casely",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "A Popular Pants",
    },
  ],
};

export default data;
