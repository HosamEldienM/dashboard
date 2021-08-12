import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db, storage } from "../config/config";
import { LangContext, UserContext } from "../contexts/cartContext";
import ImageModal from "../components/imagemodal";
import { toast } from "react-toastify";

const EditProduct = () => {
  var history = useHistory();
  var product = history.location.state || {};

  const [EnName, setEnName] = useState(product.EnName);
  const [ArName, setArName] = useState(product.ArName);
  const [EnDescription, setEnDescription] = useState(product.EnDescription);
  const [ArDescription, setArDescription] = useState(product.ArDescription);
  const [Price, setPrice] = useState(product.Price);
  const [Category, setCategory] = useState(product.Category);
  const [Gender, setGender] = useState(product.Gender);
  const [Error, setError] = useState("");
  const [Toggle, setToggle] = useState(false);
  const [ImageToggle, setImageToggle] = useState(true);

  const [Image, setImage] = useState(null);
  const { User } = useContext(UserContext);
  const { Lang } = useContext(LangContext);

  useEffect(() => {
    if (!User) history.push("./");
  }, [User]);
  //update product image
  const imageHandler = (e) => {
    let file = e.target.files[0];
    if (file && (file.type == "image/jpeg" || file.type == "image/png")) {
      setImage(file);
    } else {
      alert(
        Lang === "en"
          ? "please choose a valid image file"
          : "برجاء اختيار صورة صالحة"
      );
      setImage(null);
      document.getElementById("file").value = null;
    }
  };

  //update product data
  function update(id) {
    if (
      !Price ||
      Price <= 0 ||
      !EnDescription ||
      !ArDescription ||
      !EnName ||
      !ArName
    ) {
      setError(
        Lang === "en"
          ? "please enter valid inputs "
          : "برجاء إدخال بيانات صحيحة"
      );
      return;
    }
    setError("");
    db.collection("products")
      .doc(id)
      .update({
        ArName,
        EnName,
        ArDescription,
        EnDescription,
        Price,
        Category,
        Gender,
      })
      .then(() => {
        toast(
          Lang === "en"
            ? "product updates successfuly"
            : "تم تحديث المنتج بنجاح",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            bodyClassName: "alert alert-success  p-3 m-0 text-center",
            className: "m-0 p-0 ",
          }
        );

        history.push("./manage");
      });
  }
  return (
    <div className=" py-5 mt-4">
      <form className="form-group container   p-4  col-12 col-md-8  myshadow bgtwo ">
        <h2 className="text-center txtone">
          {Lang === "en" ? "PRODUCT DETAILS/EDIT" : "تفاصيل/تعديل المنتج"}
        </h2>
        <hr />

        <div className="  text-center pb-3">
          <button
            className={`btn m-2 ${
              Toggle === true ? "btn-one" : "btn-two"
            } px-4`}
            onClick={(e) => {
              e.preventDefault();
              setToggle(false);
            }}
          >
            {Lang === "en" ? "Data" : "البيانات"}
          </button>
          <button
            className={`btn m-2 ${
              Toggle === false ? "btn-one" : "btn-two"
            } px-4`}
            onClick={(e) => {
              e.preventDefault();
              setToggle(true);
            }}
          >
            {Lang === "en" ? "Image" : "الصورة"}
          </button>
        </div>
        <div hidden={Toggle}>
          <div className="row pb-2">
            {/* -------------left col---------------- */}
            <div className="col-md-6 text-start">
              <label>Product Name</label>
              <input
                value={EnName}
                className="form-control text-start"
                placeholder="enter product name"
                onChange={(e) => {
                  setEnName(e.target.value);
                }}
              />
              <label className="mt-3 ">Description</label>
              <textarea
                value={EnDescription}
                className="form-control text-start"
                placeholder="enter product description"
                onChange={(e) => {
                  setEnDescription(e.target.value);
                }}
              />
            </div>
            {/* ----------------right col--------------- */}
            <div className="col-md-6">
              <label className="col-12 text-end">اسم المنتج</label>
              <input
                value={ArName}
                className="form-control text-end"
                placeholder="ادخل اسم المنتج"
                onChange={(e) => {
                  setArName(e.target.value);
                }}
              />
              <label className="mt-3 col-12 text-end">الوصف</label>
              <textarea
                value={ArDescription}
                className="form-control text-end "
                placeholder="ادخل وصف المنتج"
                onChange={(e) => {
                  setArDescription(e.target.value);
                }}
              />
            </div>
          </div>
          {/* end of top row */}
          {/* -------------start of bottom row---------------- */}
          <div className="row mt-3">
            <div className=" col-md-4">
              <label>{Lang === "en" ? "Price" : "السعر"}</label>
              <input
                type="number"
                value={Price}
                className="form-control "
                placeholder={
                  Lang === "en" ? "enter product price" : "ادخل سعر المنتج"
                }
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                }}
              />
            </div>
            {/************* select category **************/}
            <div className=" col-md-4">
              <label className="  d-block ">
                {Lang === "en" ? "Category" : "الفئة"}
              </label>
              <select
                className="form-select"
                onChange={(e) => setCategory(e.target.value)}
                value={Category}
              >
                <option value="category1">
                  {Lang === "en" ? "Accessories" : "إكسسوارات"}
                </option>
                <option value="category2">
                  {Lang === "en" ? "Clothes" : "ملابس"}
                </option>
                <option value="category3">
                  {Lang === "en" ? "Home & Living" : "المنزل والمعيشة"}
                </option>
              </select>
            </div>
            {/************* select Gender **************/}
            <div className=" col-md-4">
              <label className="  d-block ">
                {Lang === "en" ? "Gender" : "النوع"}
              </label>
              <select
                className="form-select"
                onChange={(e) => setGender(e.target.value)}
                value={Gender}
              >
                <option value="male">{Lang === "en" ? "men" : "رجالي"}</option>
                <option value="female">
                  {Lang === "en" ? "women" : "حريمي"}
                </option>
                <option value="unisex">
                  {Lang === "en" ? "both" : "كلاهما"}
                </option>
              </select>
            </div>
          </div>

          <div className="text-center ">
            <p className="text-danger ">{Error}</p>

            <button
              className="btn btn-outline-one col-8 col-md-4 mt-3"
              onClick={(e) => {
                e.preventDefault();
                update(product.ID);
              }}
            >
              {Lang === "en" ? "Update" : "تحديث"}
            </button>
          </div>
        </div>
        <div hidden={!Toggle} className="text-center">
          <div className="col-md-4 m-auto">
            <img
              src={product.Image}
              style={{ width: "100%" }}
              className="border btn p-0"
              onClick={() => setImageToggle(false)}
            />
            <ImageModal
              Image={product.Image}
              Toggle={ImageToggle}
              setToggle={setImageToggle}
            />
          </div>
          <div className="col-md-4 mx-auto my-3">
            <input
              className="  form-control"
              type="file"
              onChange={imageHandler}
              id="file"
            />
          </div>
          <button
            className="btn btn-outline-one  col-8 col-md-4 "
            onClick={(e) => {
              e.preventDefault();
              if (!Image) {
                alert(
                  Lang === "en" ? "choose image first " : "اختر صورة أولاً"
                );
                return;
              }
              storage
                .ref("prodcts-images/" + Image.name)
                .put(Image)
                .then(() => {
                  storage
                    .ref("prodcts-images")
                    .child(Image.name)
                    .getDownloadURL()
                    .then((Image) => {
                      db.collection("products")
                        .doc(product.ID)
                        .update({ Image })
                        .then(() => {
                          alert(
                            Lang === "en"
                              ? "image updated successfully"
                              : "تم تحديث الصورة بنجاح"
                          );
                          history.push("./manage");
                        });
                    });
                });
            }}
          >
            {Lang === "en" ? "Update" : "تحديث"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
