import { useState } from "react";
import { db } from "../config/config";
import React from "react";
export const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [Products, setProducts] = useState([]);
  function getProducts() {
    let Store = [];
    db.collection("products")

      .get()
      .then((res) => {
        res.forEach((product) => {
          Store.push({ ...product.data(), ID: product.id });
        });
        setProducts(Store);
      });
  }

  const value = { Products, setProducts, getProducts };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
