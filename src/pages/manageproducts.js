import { useContext, useEffect, useMemo, useState } from "react";

import ProductCard from "../components/productcard";
import Search from "../components/search";

import { LangContext, UserContext } from "../contexts/cartContext";
import { ProductsContext } from "../contexts/productscontext";

const ProductsManagement = () => {
  const { Products, setProducts, getProducts } = useContext(ProductsContext);
  const { Lang } = useContext(LangContext);
  const { User } = useContext(UserContext);
  const [CategoryFilter, setCategoryFilter] = useState("all");
  const [GenderFilter, setGenderFilter] = useState("all");
  const [Sort, setSort] = useState("newest");

  useEffect(() => {
    if (User) getProducts();
    return setProducts([]);
  }, []);

  ///////category filter///////////
  const FilteredByCategory = useMemo(() => {
    switch (CategoryFilter) {
      case "all":
        return Products;
      case "category1":
        return Products.filter((product) => product.Category === "category1");
      case "category2":
        return Products.filter((product) => product.Category === "category2");
      case "category3":
        return Products.filter((product) => product.Category === "category3");
    }
  }, [CategoryFilter, GenderFilter, Sort, Products]);
  /////////gender filter///////////
  const FilteredByGender = useMemo(() => {
    switch (GenderFilter) {
      case "all":
        return FilteredByCategory;
      case "male":
        return FilteredByCategory.filter(
          (product) => product.Gender === "male" || product.Gender === "unisex"
        );
      case "female":
        return FilteredByCategory.filter(
          (product) =>
            product.Gender === "female" || product.Gender === "unisex"
        );
    }
  }, [CategoryFilter, GenderFilter, Sort, Products]);
  ///////sorting///////////
  const SortedList = useMemo(() => {
    switch (Sort) {
      case "":
        return FilteredByGender;
      case "lowest price":
        return FilteredByGender.sort((a, b) => a.Price - b.Price);
      case "highest price":
        return FilteredByGender.sort((a, b) => b.Price - a.Price);
      case "newest":
        return FilteredByGender.sort((a, b) => b.timestamp - a.timestamp);
      case "most purchased":
        return FilteredByGender.sort((a, b) => b.Purchses - a.Purchses);
      case "most added to cart":
        return FilteredByGender.sort((a, b) => b.AddedToCart - a.AddedToCart);
    }
  }, [CategoryFilter, GenderFilter, Sort, Products]);

  return (
    <div>
      {/* search */}

      <Search
        setProducts={setProducts}
        getProducts={getProducts}
        Products={Products}
      />

      {/* sort & search & Category   */}
      <div className=" row mt-3 justify-content-around">
        {/* Category  menu */}
        <div className="col-6 col-sm-3 my-2 p-0 ">
          <div className=" input-group">
            <label className="m-2 ps-0">
              {Lang === "en" ? "Category" : "الفئة "}
            </label>
            <select
              className="form-select"
              onChange={(e) => setCategoryFilter(e.target.value)}
              value={CategoryFilter}
            >
              <option value="all">{Lang === "en" ? "all" : "الكل"}</option>
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
        </div>

        {/* Gender  menu */}
        <div className=" col-6 col-sm-2 my-2 p-0">
          <div className=" input-group ">
            <label className="p-2">{Lang === "en" ? "Gender" : "النوع"}</label>
            <select
              className="form-select"
              onChange={(e) => setGenderFilter(e.target.value)}
              value={GenderFilter}
            >
              <option value="male">{Lang === "en" ? "men" : "رجالي"}</option>
              <option value="female">
                {Lang === "en" ? "women" : "حريمي"}
              </option>
              <option value="all">{Lang === "en" ? "both" : "كلاهما"}</option>
            </select>
          </div>
        </div>

        {/* sort menue */}
        <div className=" col-9 col-sm-3 my-2">
          <div className=" input-group">
            <label className="p-2">
              {Lang === "en" ? "sort by" : "الترتيب حسب"}
            </label>
            <select
              className="form-select"
              onChange={(e) => setSort(e.target.value)}
              value={Sort}
            >
              <option value="newest">
                {Lang === "en" ? "newest" : "الأحدث"}
              </option>
              <option value="lowest price">
                {Lang === "en" ? "lowest price" : "الأقل سعراً"}
              </option>
              <option value="highest price">
                {Lang === "en" ? "highest price" : "الأكثر سعراً"}
              </option>
              <option value="most purchased">
                {Lang === "en" ? "most purchased" : "الأكثر شراءً"}
              </option>
              <option value="most added to cart">
                {Lang === "en" ? "most added to cart" : "الأكثر إضافة للعربة"}
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* products view */}
      <div className="row  justify-content-center">
        {!SortedList[0] && (
          <div className="h1 txtone p-3 pt-5 mt-5  text-center">
            {Lang === "en" ? "No products found" : "لا توجد منتجات"}
          </div>
        )}
        {SortedList.map((product, index) => (
          <div
            key={index}
            className="m-3 card  col-11 col-sm-8  col-md-5 col-lg-4 col-xl-3 p-0 border-0 shadow rounded"
          >
            <ProductCard
              product={product}
              getProducts={getProducts}
              Lang={Lang}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsManagement;
