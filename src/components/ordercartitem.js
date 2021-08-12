import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LangContext } from "../contexts/cartContext";

const OrderCartItem = ({ product }) => {
  const { Lang } = useContext(LangContext);

  const history = useHistory();

  return (
    <div className="m-1 my-3 row   shadow bg-white p-1 py-2 rounded ">
      <div className="col-10 col-sm-4 mx-auto  ">
        <img
          className=" my-1 border  rounded link"
          src={product.Image}
          style={{ height: 120, width: "100%" }}
          onClick={() => history.push(`../edit`, product)}
        />
      </div>
      <div className=" col-sm-8  ">
        <div>
          <h6
            className="link "
            onClick={() => history.push(`../edit`, product)}
          >
            {Lang == "en" ? product.EnName : product.ArName}
          </h6>
          <h6 className="txtone ">
            {product.Price * product.Quantity}
            <small>{Lang == "en" ? " EGP" : " جنيه"}</small>
          </h6>
        </div>
        <div className="row mt-4 m-auto  ">
          <div className="col-7 p-0 ">
            {Lang === "en" ? "quantity:" : "الكمية: "}
            <span className="border border-one p-2 rounded mx-2">
              {product.Quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCartItem;
