import { useContext, useEffect, useMemo, useState } from "react";
import OrderElement from "../components/orderelement";
import { auth, db } from "../config/config";
import Search from "../components/search";
import { OrdersContext } from "../contexts/orderscontext";
import { LangContext } from "../contexts/cartContext";
const OrdersPage = () => {
  const { Orders, setOrders, getOrders } = useContext(OrdersContext);
  const [Filter, setFilter] = useState(false);
  const [SearchText, setSearchText] = useState("");
  const { Lang } = useContext(LangContext);
  useEffect(() => {
    getOrders();
  }, []);
  const newOrders = useMemo(() => {
    if (!Filter) return Orders;
    else return Orders.filter((order) => order.status === "new");
  }, [Orders, SearchText, Filter]);

  const displayOrders = useMemo(() => {
    return newOrders.filter((order) =>
      order.ID.toLowerCase().startsWith(SearchText.toLowerCase())
    );
  }, [Orders, SearchText, Filter]);

  return (
    <div>
      {/* search */}
      <div className=" bgone row p-3 justify-content-center ">
        <div className=" col-sm-4 ">
          <div className="input-group  col-3 ">
            <input
              placeholder={
                Lang === "en"
                  ? "search orders by email"
                  : "البحث في الطلبات برقم الطلب"
              }
              className="form-control"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />

            <i className="fa fa-search bgone p-2 text-white rounded"></i>
          </div>
        </div>
      </div>
      <div className="col-12  row m-0 my-3 m-auto">
        <div className="col-3 col-md-7"></div>
        <div class=" col-9 col-md-5  ">
          <input
            class="form-check-input  "
            type="checkbox"
            checked={Filter}
            onChange={(e) => {
              setFilter(e.target.checked);
            }}
          />

          <label class="form-check-label mx-2">
            {Lang === "en" ? "Show new orders only" : "عرض الطلبات الجديدة فقط"}
          </label>
        </div>
      </div>
      {!displayOrders[0] && (
        <div className="h1 txtone p-3 pt-5 mt-5  text-center">
          {Lang === "en" ? "No orders found" : "لا توجد طلبات"}
        </div>
      )}

      <div className="px-5 mx-lg-5">
        {displayOrders.map((order) => (
          <OrderElement order={order} control />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
