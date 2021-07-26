/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useContext } from "react";
import { Grid, Link, Typography } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Layout from "../components/Layout";
import db from "../utils/db";
import Product from "../models/Product";
import { Store } from "../utils/Store";
import ProductItem from "../components/ProductItem";
import UseStyles from "../utils/styles";

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { topRatedProducts, featuredProducts } = props;
  const classes = UseStyles();

  const addToCartHandler = async (product) => {
    // If product already exist in the cart, then increase it's quantity if added again
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    // Check if the product is Out of Stock
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is Out of Stock");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    router.push("/cart");
  };

  return (
    <Layout>
      <Carousel className={classes.mt1} animation="slide">
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
          >
            <Link>
              <img
                src={product.featuredImage}
                alt={product.name}
                className={classes.featuredImage}
              ></img>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      <Typography variant="h2">Popular Products</Typography>
      <Grid container spacing={3}>
        {topRatedProducts.map((product) => (
          <Grid item md={4} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const topRatedProductsDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()
    .limit(4);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObject),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObject),
    },
  };
}
