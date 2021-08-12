import { useContext, useState } from "react";
import { LangContext } from "../contexts/cartContext";
import { OrdersContext } from "../contexts/orderscontext";

import OrderCartItem from "./ordercartitem";
const OrderElement = ({ order, user, control }) => {
  const { accepetOrder, cancelOrder } = useContext(OrdersContext);
  const { Lang } = useContext(LangContext);
  const status = {};
  return (
    <div className="border  p-3 bgtwo rounded myshadow my-4 ">
      <div className="row m-0">
        <div className=" h6 txtone ">
          {Lang === "en" ? "Order ID: " : "رقم الطلب: "} {order.ID}
        </div>

        <div className="col-md-6 mt-3 ps-4 ">
          <div>
            {Lang === "en" ? "Status: " : "الحالة: "}
            {Lang === "en"
              ? order.status
              : order.status === "new"
              ? "جديد"
              : order.status === "accepted"
              ? "مقبول"
              : "ملغي"}
          </div>
          <div>
            {Lang === "en" ? "Placed on: " : "تاريخ الطلب: "}{" "}
            {String(new Date(order.timestamp)).substring(4, 21)}
          </div>
          <div>
            {Lang === "en" ? "Total price: " : "السعر الإجمالي: "} {order.price}
          </div>
          <hr />
          <div> {order.userName}</div>
          <div> {order.address}</div>
          <div> {order.phone}</div>
          <div> {order.userEmail}</div>
          <div className="text-center pt-5">
            <button
              hidden={!control}
              className="btn btn-success m-2"
              disabled={order.status === "accepted"}
              onClick={() => accepetOrder(order.ID, order.userID)}
            >
              {Lang === "en" ? "Accept" : "قبول"}
            </button>
            <button
              hidden={!control}
              className="btn btn-danger m-2"
              disabled={order.status === "cancelled"}
              onClick={() => cancelOrder(order.ID, order.userID)}
            >
              {Lang === "en" ? "Cancel" : "إلغاء"}
            </button>
          </div>
        </div>
        <div className="col-md-6 ">
          <div>
            {order.products.map((product) => (
              <OrderCartItem product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderElement;
