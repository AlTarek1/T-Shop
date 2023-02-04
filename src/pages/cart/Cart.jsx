import React, { useEffect } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  AddElement,
  RemoveElement,
  SaveCart,
  selectCart,
  selectTotal,
  Total,
} from "../../redux/reducers/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa";
const Cart = () => {
  const cart = useSelector(selectCart);
  const total = useSelector(selectTotal);

  const dispatch = useDispatch();
  const minus = (e) => {
    dispatch(RemoveElement(e));
    dispatch(SaveCart());
  };
  const plus = (e) => {
    dispatch(AddElement(e));
    dispatch(SaveCart());
  };
  useEffect(() => {
    dispatch(Total());
  }, [dispatch, cart]);

  return (
    <div>
      <h1 className="total">Your Total is :- {total}</h1>
      <div className="cart-products">
        {cart?.map((e, i) => (
          <div key={i} className="cart-product">
            <img src={e.imgUrl} alt="" />
            <p>{e.name}</p>
            <p>{e.price}</p>
            <div className="amount">
              <FaMinus onClick={() => minus(e)} />
              <p>{e.amount}</p>
              <FaPlus onClick={() => plus(e)} />
            </div>
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default Cart;
