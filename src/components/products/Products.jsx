import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Products.css";
import useFetchDoc from "../../customeHooks/useFetchDoc";
import { AddElement, SaveCart } from "../../redux/reducers/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectIsLoggedIn } from "../../redux/reducers/isLoggedIn";
import { Link } from "react-router-dom";
import {
  selectFilteredProducts,
  SetItemsTOFilter,
  SORT,
} from "../../redux/reducers/filterSlice";

const Products = () => {
  const { products } = useFetchDoc();
  const [NewProducts, setNewProducts] = useState([]);
  const FilterProducts = useSelector(selectFilteredProducts);
  const isLogedIn = useSelector(selectIsLoggedIn);
  const [CurrentBrand, setCurrentBrand] = useState("All");
  const [pricerange, setPricerange] = useState(50000);
  const dispatch = useDispatch();
  const [Options, setOptions] = useState("Latest");
  let brands = [];
  brands = ["All", ...new Set(products?.map((e, i) => e.brand))];

  useEffect(() => {
    dispatch(SetItemsTOFilter(products));
  }, [products]);

  const addToCart = (e) => {
    dispatch(AddElement(e));
  };
  useEffect(() => {
    if (products) {
      dispatch(
        SORT({
          products: products,
          sort: Options,
          price: pricerange,
          brand: CurrentBrand,
        })
      );
    }
  }, [dispatch, Options, CurrentBrand, pricerange]);

  return (
    <>
      <section className="products-section">
        <div className="products-left">
          <h1>Brands</h1>
          {brands.map((e, i) => (
            <p
              key={i}
              className={`brands ${CurrentBrand === e && "active"}`}
              onClick={() => setCurrentBrand(e)}
            >
              {e}
            </p>
          ))}

          <h3>Price</h3>
          <p>$ {pricerange}</p>
          <input
            type="range"
            max={50000}
            value={pricerange}
            onChange={(e) => {
              setPricerange(e.target.value);
            }}
          />
          <button>Clear All Filters</button>
        </div>
        <div className="products-right">
          <div className="products-top">
            <p>Sort by</p>
            <select
              value={Options}
              onChange={(e) => {
                // console.log(e.target.value);
                setOptions(e.target.value);
              }}
              id="sort"
              name="sort"
            >
              <option value="Latest">Latest</option>
              <option value="Lowest">Lowest Price</option>
              <option value="Highest">Highest Price</option>
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
            </select>
          </div>
          <div className="products">
            {isLogedIn ? (
              FilterProducts?.map((e, i) => {
                if (e.imgUrl)
                  return (
                    <div key={i} className="product">
                      <div className="image">
                        <img src={e.imgUrl} alt="" />
                      </div>
                      <p>$ {e.price}</p>
                      <p>{e.name}</p>
                      <button
                        onClick={() => {
                          toast.success("Item Added!");
                          addToCart(e);
                          dispatch(SaveCart());
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  );
              })
            ) : (
              <h1>
                You Have To{" "}
                <Link to="/login" className="have-to-log">
                  LogIn
                </Link>
              </h1>
            )}
          </div>
        </div>
      </section>
      <ToastContainer theme="dark" />
    </>
  );
};

export default Products;
