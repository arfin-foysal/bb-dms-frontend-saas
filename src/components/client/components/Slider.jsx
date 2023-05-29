import Carousel from "react-bootstrap/Carousel";
import React from "react";
import image_1 from "./../../../assets/images/doc.png";

function Slider() {
  return (
    <Carousel>
      <Carousel.Item className=" ">
        <img className="d-block w-25 m-5" src={image_1} alt="First slide" />
        <Carousel.Caption >
          <h3>First slide label</h3>
          <h3>First slide label</h3>
          <h3>First slide label</h3>
          <h3>First slide label</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
