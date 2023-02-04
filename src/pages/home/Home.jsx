import React from "react";
import Slider from "../../components/slider/Slider";
import Products from "../../components/products/Products";
const Home = () => {
  return (
    <div className="home">
      <Slider />
      <Products />
    </div>
  );
};

export default Home;
