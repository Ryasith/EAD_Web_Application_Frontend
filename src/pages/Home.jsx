import React, { useState, useEffect } from 'react';
import './HomeComponents/Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: 'Slide One',
      content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero!',
    },
    {
      title: 'Slide Two',
      content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero!',
    },
    {
      title: 'Slide Three',
      content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero!',
    },
    {
      title: 'Slide Four',
      content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero!',
    },
    {
      title: 'Slide Five',
      content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero!',
    },
    {
      title: 'Slide Six',
      content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero!',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const intervalTime = 5000;
    let slideInterval;

    // if (auto) {
    //   slideInterval = setInterval(nextSlide, intervalTime);
    // }

    return () => {
      // if (auto) {
      //   clearInterval(slideInterval);
      // }
    };
  }, [currentSlide]);

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div key={index} className={`slide ${index === currentSlide ? 'current' : ''}`}>
          <div className="content">
          <button>LOGIN</button>
          </div>
        </div>
      ))}
      <div className="buttons">
        <button id="prev" onClick={prevSlide}><i className="fas fa-arrow-left"></i></button>
        <button id="next" onClick={nextSlide}><i className="fas fa-arrow-right"></i></button>
      </div>
    </div>
  );
};

export default Home;
