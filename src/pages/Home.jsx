import React, { useState, useEffect } from 'react';
import './HomeComponents/Home.css';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: 'Login',
      content: 'Login to the application to use application.',
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
          <button onClick={()=> navigate('/dashboard')}>LOGIN</button>
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
