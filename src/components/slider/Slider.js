import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineFullscreen } from "react-icons/ai";
import { sliderData } from "../../slider-data";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;
  const handle = useFullScreenHandle();

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 8000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="slider">
      {/* <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} /> */}
      <FullScreen handle={handle}>
      <AiOutlineFullscreen className="arrow next" onClick={handle.enter} />
      
      <div>
      <button onClick={handle.enter}>
          Enter fullscreen
        </button>

        
        {sliderData.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            <div>
                <img src={slide.image} alt="slide" className="image" />
            </div>
            {/* {index === currentSlide && (
              <div>
                <img src={slide.image} alt="slide" className="image" />
                <div className="content">
                  <h2>{slide.heading}</h2>
                  <p>{slide.desc}</p>
                  <hr />
                  <button className="--btn --btn-primary">Get Started</button>
                </div>
              </div>
            )} */}
          </div>
        );
      })}
      </div>
        </FullScreen>

    </div>
  );
};

export default Slider;
