import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/reducers/productsReducer";

const useFetchDoc = () => {
  const [products, setProducts] = useState();
  const dispatch = useDispatch();
  const prepareProducts = (docs) => {
    const data = docs.map((doc, i) => ({ id: doc.id, ...doc.data() }));
    setProducts(data);
    dispatch(getProducts(data));
  };

  const getDoc = () => {
    getDocs(collection(db, "products")).then(({docs}) => prepareProducts(docs));
  };

  useEffect(() => {
    getDoc();
  }, []);

  return { products };
};

export default useFetchDoc;
