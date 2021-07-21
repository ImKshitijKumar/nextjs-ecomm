import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Store } from "../utils/Store";

export default function Shipping() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  // if user is Logged In redirect him to the Index page
  if (!userInfo) {
    router.push("/login?redirect=/shipping");
  }

  return <div>Shipping</div>;
}
