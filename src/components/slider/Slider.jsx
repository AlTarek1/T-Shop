import React, { useEffect, useState } from "react";
import "./Slider.css";
import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider2.jpg";
import slider3 from "../../assets/slider3.jpg";
import slider4 from "../../assets/slider4.jpg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Wrapper = ({ children, currentSlide }) => {
  return (
    <div className="slider-wrapper">
      {children.map((slide, indx) => {
        const isActive = indx === currentSlide;
        return (
          <img
            key={indx}
            src={slide.props.src}
            alt=""
            className={isActive ? "active" : ""}
          />
        );
      })}
    </div>
  );
};

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const Next = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : currentSlide + 1);
  };
  const Prev = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : currentSlide - 1);
  };
  let auto;
  const autoSlider = () => {
    auto = setInterval(Next, 4000);
  };
  useEffect(() => {
    autoSlider();

    return () => {
      clearInterval(auto);
    };
  }, [currentSlide]);

  return (
    <div className="slider">
      <Wrapper currentSlide={currentSlide}>
        <img src={slider1} alt="" />
        <img src={slider2} alt="" />
        <img src={slider3} alt="" />
        <img src={slider4} alt="" />
      </Wrapper>
      <FaArrowRight size={35} className="right-arrow" onClick={Next} />
      <FaArrowLeft size={35} className="left-arrow" onClick={Prev} />
      <div className="slider-header">
        <h1>Laptops</h1>
        <button>Shop Now</button>
      </div>
    </div>
  );
};

export default Slider;
