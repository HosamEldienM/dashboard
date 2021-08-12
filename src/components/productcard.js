import { useHistory } from "react-router-dom";
import { db } from "../config/config";

const ProductCard = ({ product, getProducts, Lang, getCart }) => {
  const history = useHistory();
  //delete a product
  function deleteProdcut(id) {
    var sure = window.confirm(
      Lang === "en"
        ? "Are you sure you want to delete this product?"
        : "هل ترغب بتأكيد حذف هذا المنتج؟"
    );
    if (sure) {
      db.collection("products")
        .doc(id)
        .delete()
        .then(() => {
          getProducts();
          getCart && getCart();
        });
    }
  }

  return (
    <>
      <img
        style={{ height: 250 }}
        src={product.Image}
        className="link"
        onClick={() => history.push("/edit", product)}
      />
      <div className="p-3 ">
        <h5
          className=" h-25 mb-0  link"
          onClick={() => history.push("/edit", product)}
        >
          {Lang === "en" ? product.EnName : product.ArName}
        </h5>
        <p>
          <small>
            {Lang === "en" ? "SN: " : "مسلسل: "} {product.ID}
          </small>
        </p>
        <p>
          {Lang === "en" ? "Price: " : "السعر: "}
          <span>{product.Price} </span>
          {Lang === "en" ? " EGP" : " جنيه"}
        </p>
        <p>
          {Lang === "en" ? "Added to cart: " : "أضيف لعربة التسوق: "}
          {product.AddedToCart}
        </p>
        <p>
          {Lang === "en" ? "Orders: " : "عدد الطلبات: "}
          {product.Purchses}
        </p>
      </div>
      {!getCart && (
        <div className="mb-2  m-auto text-center">
          <button
            className="btn btn-one mb-3 px-4"
            onClick={() => history.push("/edit", product)}
          >
            {Lang === "en" ? "Details/Edit" : "التفاصيل/تعديل"}
          </button>
          <br />

          <button
            className="btn btn-outline-danger border-0"
            onClick={() => {
              deleteProdcut(product.ID);
            }}
          >
            {Lang === "en" ? "Delete" : "حذف"}
          </button>
        </div>
      )}{" "}
    </>
  );
};

export default ProductCard;
