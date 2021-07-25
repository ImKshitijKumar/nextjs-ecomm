import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../utils/auth";
import Product from "../../../../models/Product";
import db from "../../../../utils/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: "sample name",
    slug: "sample-slug-" + Math.random(), // for making slug unique
    image: "/images/shirt1.jpeg",
    price: 0,
    category: "sample category",
    brand: "sample brand",
    countInStock: 0,
    description: "Sample description",
    rating: 0,
    newReviews: 0,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: "Product Created", product });
});

export default handler;
