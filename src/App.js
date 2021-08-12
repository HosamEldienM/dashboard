import "./App.css";

import React, { useContext, useEffect, useState } from "react";
import "../node_modules/font-awesome/css/font-awesome.css";
import { auth } from "./config/config";
import "./bootstrap.css";
import { LangContext, UserContext } from "./contexts/cartContext";
import Routing from "./components/routing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Orders from "./pages/oeders";
import { ProductsProvider } from "./contexts/productscontext";
import { UsersProvider } from "./contexts/userscontext";
import { OrdersProvider } from "./contexts/orderscontext";
import { MessagesProvider } from "./contexts/messagescontext";

const App = function () {
  const [Lang, setLang] = useState("en");
  const [User, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        if (user.email === "abdo2009egy@gmail.com") setUser(user.email);
        else {
          auth.signOut();
          setUser(null);

          toast("access not allowed", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            bodyClassName: "alert alert-danger  p-3 m-0 text-center",
            className: "m-0 p-0 ",
          });
        }
      }
    });
  }, []);

  return (
    <div className="h-100 ">
      <LangContext.Provider value={{ Lang, setLang }}>
        <UsersProvider>
          <UserContext.Provider value={{ User, setUser }}>
            <ProductsProvider>
              <OrdersProvider>
                <MessagesProvider>
                  <Routing />
                </MessagesProvider>
              </OrdersProvider>
            </ProductsProvider>
          </UserContext.Provider>
        </UsersProvider>
      </LangContext.Provider>
      <ToastContainer />
    </div>
  );
};
export default App;
