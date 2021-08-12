import React, { useState, useEffect, useContext } from "react";
import CartItem from "./cartitem";
import { db } from "../config/config";
import OrderCartItem from "./ordercartitem";
import OrderElement from "./orderelement";
import { LangContext } from "../contexts/cartContext";
const UserCard = ({ user, SearchText }) => {
  const [Cart, setCart] = useState([]);
  const [Orders, setOrders] = useState([]);
  const { Lang } = useContext(LangContext);
  const [CartToggle, setCartToggle] = useState(true);
  const [OrdersToggle, setOrdersToggle] = useState(true);
  function getCart() {
    let Store = [];

    db.collection("Users")
      .doc(user.ID)
      .collection("Cart")
      .get()
      .then((res) => {
        res.forEach((item) => {
          Store.push({ ID: item.id });
        });
        setCart(Store);
      });
    let Store2 = [];
    db.collection("Users")
      .doc(user.ID)
      .collection("Orders")
      .get()
      .then((res) => {
        res.forEach((item) => {
          Store2.push({ ...item.data(), ID: item.id });
        });
        setOrders(Store2);
      });
  }

  useEffect(() => {
    getCart();
  }, [SearchText]);

  return (
    <div className=" mx-5 ">
      <hr />
      <div className=" m-auto    row text-break text-wrap ">
        <div className="col-md-4 col-lg-3   my-auto p-2 ">{user.Name}</div>
        <div className="col-md-4  col-lg-4 p-2 my-auto">{user.Email}</div>
        <div className="col-md-4   col-lg-3 my-auto p-2">
          <div className="h6">
            {Lang === "en" ? "Last active:" : "آخر نشاط:"}
          </div>
          {String(new Date(user.LastSeen || user.CreatedAt)).substring(4, 21)}
        </div>
        <div className="col-lg-2   p-2 text-center">
          <div>
            <button
              className="btn btn-outline-one my-1 border-0"
              onClick={() => {
                setCartToggle(true);
                setOrdersToggle(!OrdersToggle);
              }}
            >
              {Lang === "en" ? "Orders" : "الطلبات"}
            </button>
            <span className="badge bgone">{Orders.length}</span>
          </div>
          <div>
            <button
              className="btn btn-outline-one my-1 border-0"
              onClick={() => {
                setOrdersToggle(true);
                setCartToggle(!CartToggle);
              }}
            >
              {Lang === "en" ? "Cart" : "العربة"}
            </button>
            <span className="badge bgone">{Cart.length}</span>
          </div>
        </div>
      </div>
      <div
        hidden={CartToggle}
        className="row justify-content-center  bg-light "
        style={{ marginLeft: -80, marginRight: -80 }}
      >
        {Cart.length === 0 && (
          <div className="h2 p-5 text-center">
            {Lang === "en" ? "Cart is currently empty" : "العربة فارغة حالياً"}{" "}
          </div>
        )}
        {Cart.map((item, index) => (
          <CartItem item={item} key={index} getCart={getCart} />
        ))}
      </div>
      <div
        hidden={OrdersToggle}
        className="row justify-content-center  bg-light px-5"
        style={{ marginLeft: -80, marginRight: -80 }}
      >
        {Orders.length === 0 && (
          <div className="h2 p-5 text-center">
            {Lang === "en" ? "No orders so far" : "لا توجد أي طلبات إلى الآن"}
          </div>
        )}
        {Orders.map((order, index) => (
          <OrderElement order={order} key={index} />
        ))}
      </div>
    </div>
  );
};

export default UserCard;
