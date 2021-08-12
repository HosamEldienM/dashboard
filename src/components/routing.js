import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
} from "react-router-dom";

import EditProduct from "../pages/editproduct";
import Home from "../pages/home";
import Login from "../pages/login";
import AddProduct from "../pages/addproduct";
import ProductsManagement from "../pages/manageproducts";

import Users from "../pages/users";
import OrdersPage from "../pages/oeders";
import { UserContext } from "../contexts/cartContext";
import { useContext, useState } from "react";
import LeftMenue from "./leftmenue";
import UsersMessages from "../pages/usersmessages";

const Routing = () => {
  const [MenueToggle, setMenueToggle] = useState(true);
  const { User } = useContext(UserContext);

  return (
    <div className="flex flex-column">
      <Router>
        {User && (
          <div className="row  p-0 m-0 min-vh-100 bg-light ">
            <div
              className="btn btn-two d-sm-none border border "
              onClick={() => setMenueToggle(!MenueToggle)}
            >
              <i class="fa fa-bars"></i>
            </div>
            <div
              hidden={MenueToggle}
              className="px-5 d-sm-none "
              // onClick={() => setMenueToggle(true)}
            >
              <LeftMenue setMenueToggle={setMenueToggle} />
            </div>
            <div
              className="col-sm-2  d-none d-sm-block  myshadow bgtwo border  "
              style={{ zIndex: 1 }}
            >
              <div className="col-sm-2  p-0  fixed-top bgtwo ">
                <LeftMenue />
              </div>
            </div>

            <div className="col-sm-10   justify-content-center min-vh-100 ">
              <Switch>
                <Route path="/add" exact component={AddProduct} />
                <Route path="/products" exact component={ProductsManagement} />

                <Route path="/edit" exact component={EditProduct} />

                <Route path="/home" exact component={Home} />
                <Route path="/users" exact component={Users} />
                <Route path="/orders" exact component={OrdersPage} />
                <Route path="/messages" exact component={UsersMessages} />
                <Route path="**" exact component={Home} />
              </Switch>
            </div>
          </div>
        )}

        {!User && (
          <div className="  p-0 min-vh-100 bg-light">
            <Route path="**" exact component={Login} />
          </div>
        )}
      </Router>
    </div>
  );
};

export default Routing;
