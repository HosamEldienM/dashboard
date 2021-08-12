import { useState } from "react";
import { db } from "../config/config";
import React from "react";
export const OrdersContext = React.createContext();

export const OrdersProvider = ({ children }) => {
  const [Orders, setOrders] = useState([]);
  function getOrders() {
    let Store = [];
    db.collection("Orders")
      .orderBy("timestamp", "desc")
      .get()
      .then((res) => {
        res.forEach((order) => {
          Store.push({ ...order.data(), ID: order.id });
        });
        setOrders(Store);
      });
  }
  function accepetOrder(orderID, userID) {
    db.collection("Orders")
      .doc(orderID)
      .update({ status: "accepted" })
      .then(() => getOrders());

    db.collection("Users")
      .doc(userID)
      .collection("Orders")
      .doc(orderID)
      .update({ status: "accepted" });
  }
  function cancelOrder(orderID, userID) {
    db.collection("Orders")
      .doc(orderID)
      .update({ status: "cancelled" })
      .then(() => getOrders());

    db.collection("Users")
      .doc(userID)
      .collection("Orders")
      .doc(orderID)
      .update({ status: "cancelled" });
  }

  const value = { Orders, setOrders, getOrders, cancelOrder, accepetOrder };
  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};
