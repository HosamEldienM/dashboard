import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db, auth } from "../config/config";

import MainBlock from "../components/mainblock";
import LinearChart from "../components/lineChart";
import { LangContext, UserContext } from "../contexts/cartContext";

import { ProductsContext } from "../contexts/productscontext";
import { UsersContext } from "../contexts/userscontext";
import { OrdersContext } from "../contexts/orderscontext";

const Home = () => {
  const history = useHistory();
  const { Products, setProducts, getProducts } = useContext(ProductsContext);
  const { Lang } = useContext(LangContext);
  const { Users, setUsers, getUsers } = useContext(UsersContext);
  const { Orders, setOrders, getOrders } = useContext(OrdersContext);
  const { User } = useContext(UserContext);
  useEffect(() => {
    history.push("./home");
    if (User) {
      getOrders();
      getProducts();
      getUsers();
    }
  }, []);
  return (
    <div className="mt-5 p-2 text-center   ">
      <div className="  justify-content-around row">
        <MainBlock
          name={Lang === "en" ? "Users" : "المستخدمين"}
          color="success"
          number={Users.length}
          icon="user"
          location="users"
        />
        <MainBlock
          name={Lang === "en" ? "Products" : "المنتجات"}
          color="danger"
          number={Products.length}
          icon="gift"
          location="products"
        />
        <MainBlock
          name={Lang === "en" ? "Orders" : "الطلبات"}
          color="primary"
          number={Orders.length}
          icon="truck"
          location="orders"
        />

        <div className="text-center justify-content-center d-flex mt-5 col-lg-6 small ">
          <LinearChart
            elements={Orders}
            filterField={"timestamp"}
            fieldName={Lang === "en" ? "Users" : "الطلبات"}
            description={
              Lang === "en"
                ? "Orders count in the last 7 days"
                : "عدد الطلبات في آخر 7 أيام"
            }
          />
        </div>
        <div className="text-center justify-content-center d-flex mt-5 col-lg-6 small">
          <LinearChart
            elements={Users}
            filterField={"CreatedAt"}
            fieldName={Lang === "en" ? "Users" : "المستخدمين"}
            description={
              Lang === "en"
                ? "Users rigestered in the last 7 days"
                : "عدد الأعضاء المسجلين في آخر 7 أيام"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
