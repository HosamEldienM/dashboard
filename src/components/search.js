import { useContext, useEffect, useState } from "react";
import { LangContext } from "../contexts/cartContext";

const Search = ({ Products, setProducts, getProducts }) => {
  const [Storage, setStorage] = useState([]);
  const { Lang } = useContext(LangContext);
  useEffect(() => {
    setStorage(Products);
  }, []);
  const search = (e) => {
    if (!e.target.value) getProducts();
    else
      setProducts(
        Storage.filter(
          (product) =>
            product.ID.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
            product.ArName.startsWith(e.target.value) ||
            product.EnName.toLowerCase().startsWith(
              e.target.value.toLowerCase()
            )
        )
      );
  };
  return (
    <div className=" bgone row p-3 justify-content-center">
      <div className=" col-sm-4 ">
        <div className="input-group  col-3">
          <input
            className="form-control "
            placeholder={
              Lang === "en"
                ? "search by serial number or name"
                : "البحث بالرقم المتسلسل أو الاسم"
            }
            onChange={(e) => {
              search(e);
            }}
          />

          <i className="fa fa-search bgone p-2 text-white rounded"></i>
        </div>
      </div>
    </div>
  );
};

export default Search;
