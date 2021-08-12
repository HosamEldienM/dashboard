import { useContext, useEffect, useState } from "react";
import { db } from "../config/config";
import { LangContext } from "../contexts/cartContext";
import { ProductsContext } from "../contexts/productscontext";
import ProductCard from "./productcard";

const CartItem = ({ item, getCart }) => {
  const { Lang } = useContext(LangContext);
  const { getProducts } = useContext(ProductsContext);
  const [Product, setProduct] = useState({});

  useEffect(() => {
    db.collection("products")
      .doc(item.ID)
      .get()
      .then((res) => {
        setProduct({ ...res.data(), ID: res.id });
      });
  }, [getCart]);
  return (
    <>
      {Product.Price && (
        <div className="m-3 card  col-11 col-sm-8  col-md-5 col-lg-4 col-xl-3 p-0 border-0 shadow rounded">
          <ProductCard
            product={Product}
            getProducts={getProducts}
            Lang={Lang}
            getCart={getCart}
          />
        </div>
      )}
    </>
  );
};

export default CartItem;
