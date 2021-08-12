import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LangContext, UserContext } from "../contexts/cartContext";
import { MessagesContext } from "../contexts/messagescontext";
import { OrdersContext } from "../contexts/orderscontext";
import LangauageButton from "./langauagebutton";
import SignOutButton from "./signoutbutton";

const LeftMenue = ({ setMenueToggle }) => {
  const { Lang } = useContext(LangContext);
  const { User } = useContext(UserContext);
  const [Toggle, setToggle] = useState("home");
  const [UserToggle, setUserToggle] = useState(true);
  const { Messages, getMessages, markRead } = useContext(MessagesContext);
  const { Orders, getOrders } = useContext(OrdersContext);
  const history = useHistory();

  useEffect(() => {
    getOrders();
    getMessages();
  }, []);
  return (
    <div className="p-0 bgtwo rounded">
      <div className="row text-center ">
        <div className="col-2 "></div>
        <div
          className="col-3 p-0 btn"
          onClick={() => setUserToggle(!UserToggle)}
        >
          <i className=" h1   fa  fa-user-circle  "></i>
        </div>
        <div className="col-6 pt-2">
          <LangauageButton setMenueToggle={setMenueToggle} />
        </div>
        <div className=" px-4 ms-2 ">
          <div
            hidden={UserToggle}
            className=" text-center bg-white rounded border-0 shadow "
          >
            <span>{User}</span>

            <SignOutButton />
          </div>
        </div>
      </div>

      <button
        className={`col-12 btn  border-0 border-bottom mt-3 btn-${
          Toggle === "home" ? "one" : "outline-one"
        }`}
        onClick={() => {
          history.push("./home");
          setToggle("home");
          setMenueToggle && setMenueToggle(true);
        }}
      >
        {Lang === "en" ? "Homepage" : "الصفحة الرئيسية"}
      </button>
      <button
        className={`col-12 btn  border-0 border-bottom mt-1 btn-${
          Toggle === "add" ? "one" : "outline-one"
        }`}
        onClick={() => {
          history.push("./add");
          setToggle("add");
          setMenueToggle && setMenueToggle(true);
        }}
      >
        {Lang === "en" ? "Add product" : "إضافة منتج"}
      </button>
      <button
        className={`col-12 btn  border-0 border-bottom mt-1 btn-${
          Toggle === "products" ? "one" : "outline-one"
        }`}
        onClick={() => {
          history.push("./products");
          setToggle("products");
          setMenueToggle && setMenueToggle(true);
        }}
      >
        {Lang === "en" ? "Manage Products" : "إدارة المنتجات"}
      </button>
      <button
        className={`col-12 btn  border-0 border-bottom mt-1 btn-${
          Toggle === "users" ? "one" : "outline-one"
        }`}
        onClick={() => {
          history.push("./users");
          setToggle("users");
          setMenueToggle && setMenueToggle(true);
        }}
      >
        {Lang === "en" ? "Manage Users" : "إدارة المستخدمين"}
      </button>
      <button
        className={`col-12 btn  border-0 border-bottom mt-1 btn-${
          Toggle === "orders" ? "one" : "outline-one"
        }`}
        onClick={() => {
          history.push("./orders");
          setToggle("orders");
          setMenueToggle && setMenueToggle(true);
        }}
      >
        {Lang === "en" ? "Manage Orders" : "إدارة الطلبات"}

        <span className="badge bg-danger mx-1">
          {Orders.filter((order) => order.status === "new").length}{" "}
          {Lang === "en" ? "new" : " جديدة"}
        </span>
      </button>
      <button
        className={`col-12 btn  border-0 border-bottom mt-1 btn-${
          Toggle === "messages" ? "one" : "outline-one"
        }`}
        onClick={() => {
          history.push("./messages");
          setToggle("messages");
          setMenueToggle && setMenueToggle(true);
        }}
      >
        {Lang === "en" ? "Users Messages" : "رسائل المستخدمين"}

        <span className="badge bg-danger mx-1">
          {Messages.filter((message) => message.status === "new").length}{" "}
          {Lang === "en" ? "new" : " جديدة"}
        </span>
      </button>
    </div>
  );
};

export default LeftMenue;
