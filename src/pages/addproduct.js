import React, { useContext, useEffect, useState } from "react";
import { storage, db } from "../config/config";
import { useHistory } from "react-router-dom";
import { LangContext, UserContext } from "../contexts/cartContext";
import { toast } from "react-toastify";
const AddProduct = () => {
  const [EnName, setEnName] = useState("");
  const [ArName, setArName] = useState("");
  const [EnDescription, setEnDescription] = useState("");
  const [ArDescription, setArDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Error, setError] = useState("");
  const [Image, setImage] = useState("");
  const [Category, setCategory] = useState("");
  const [Gender, setGender] = useState("");
  const [Progress, setProgress] = useState("");

  const { User } = useContext(UserContext);
  const { Lang } = useContext(LangContext);
  var history = useHistory();
  const imageHandler = (e) => {
    let file = e.target.files[0];
    if (file && (file.type == "image/jpeg" || file.type == "image/png")) {
      setError("");
      setImage(file);
    } else {
      setError(
        Lang === "en"
          ? "please choose a valid image file"
          : "برجاء اختيار صورة صالحة"
      );
      setImage(null);
      document.getElementById("file").value = null;
    }
  };

  return (
    <div className=" py-5 mt-4">
      <form className="form-group container   p-4  col-12 col-md-8  myshadow bgtwo">
        <h2 className="text-center txtone">
          {Lang === "en" ? "ADD PRODUCT" : "إضافة منتج"}
        </h2>
        <hr />

        {/* -------------start of top row---------------- */}
        <div className="row ">
          {/* -------------left col---------------- */}
          <div className="col-md-6 text-start">
            <label>Product Name</label>
            <input
              value={EnName}
              className="form-control text-start "
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
              <option value="" disabled></option>
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
              <option value="" disabled></option>
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
        {/************** select Image ***************/}
        <div className="col-md-5 m-auto mt-2">
          <label className="mb-2">{Lang === "en" ? "Image" : "الصورة"}</label>
          <input
            className=" col-md-6 d-block mx-auto form-control "
            type="file"
            onChange={imageHandler}
            id="file"
          />
          <span className="text-info">{Progress}</span>
        </div>

        <div className="text-center mt-2">
          <p className="text-danger ">{Error}</p>

          <button
            className="btn btn-outline-one  col-4 btn-md"
            onClick={(e) => {
              e.preventDefault();

              if (
                !Price ||
                !EnDescription ||
                !ArDescription ||
                !EnName ||
                !ArName ||
                !Image ||
                Price <= 0 ||
                !Category ||
                !Gender
              ) {
                setError(
                  Lang === "en"
                    ? "please enter valid inputs and choose valid image"
                    : "برجاء إدخال بيانات صحيحة واختيار صورة صالحة"
                );
                return;
              }
              setError("");
              const uploadTask = storage
                .ref("prodcts-images/" + Image.name)
                .put(Image);
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  setProgress(
                    `${Lang === "en" ? "uploading " : "جار الرفع "}` +
                      Math.floor(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                      ) +
                      " %"
                  );
                },
                (err) => alert(Lang === "en" ? "error happened" : "حدث خطأ"),
                () => {
                  storage
                    .ref("prodcts-images")
                    .child(Image.name)
                    .getDownloadURL()
                    .then((Image) => {
                      db.collection("products").add({
                        ArName,
                        EnName,
                        ArDescription,
                        EnDescription,
                        Price,
                        Image,
                        Category,
                        Gender,
                        timestamp: new Date().getTime(),
                        Purchses: 0,
                        AddedToCart: 0,
                      });
                    })
                    .then(() => {
                      setPrice("");
                      setEnDescription("");
                      setArDescription("");
                      setEnName("");
                      setArName("");
                      setProgress("");
                      setGender("");
                      setCategory("");
                      setImage(null);
                      document.getElementById("file").value = null;
                      toast(
                        Lang === "en"
                          ? "product added successfully"
                          : "تم إضافة المنتج بنجاح",
                        {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: true,
                          closeButton: false,
                          bodyClassName:
                            "alert alert-success  p-3 m-0 text-center",
                          className: "m-0 p-0 ",
                        }
                      );
                    })
                    .catch((err) => {
                      setError(
                        Lang === "en"
                          ? "error while adding the product, please retry"
                          : "حدث خطأ إثناء إضافة المنتج، برجاء إعادة المحاولة"
                      );
                    });
                }
              );
            }}
          >
            {Lang === "en" ? "Add" : "إضافة"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
