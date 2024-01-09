import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MomentumSlider = () => {
  const [svgPaths, setSvgPaths] = useState([]);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const loadSVGs = async () => {
      const paths = [];
      for (let i = 1; i <= 69; i++) {
        const path = await import(`./assets/genesis-home/${i}.svg`);
        paths.push(path.default);
      }
      setSvgPaths(paths);
    };

    loadSVGs();
  }, []);

  return (
    <Slider {...settings}>
      {svgPaths.map((path, index) => (
        <div key={index}>
          <img src={path} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

export default MomentumSlider;
