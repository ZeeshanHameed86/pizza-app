import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Navbar, Sidebar } from ".";
import styled from "styled-components";
import { Link } from "react-router-dom";

// import "../custom_styles.scss";

import { IMAGES } from "../data";

const sliderVariants = {
  incoming: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};

const HeaderCarousel = () => {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const activeImageIndex = wrap(0, IMAGES.length, imageCount);

  const swipeToImage = (swipeDirection) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  return (
    <main>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      {activeImageIndex === 0 && (
        <div className="header-detail">
          <HeroItems>
            <HeroH1>Greatest Pizza Ever</HeroH1>
            <HeroP>Ready in 60 seconds</HeroP>
            <HeroBtn to="/products">Place Order</HeroBtn>
          </HeroItems>
        </div>
      )}
      <button
        type="btn"
        className="header-btn prev"
        onClick={() => swipeToImage(-1)}
      >
        <MdNavigateBefore className="header-icon" />
      </button>
      <button
        type="btn"
        className="header-btn next"
        onClick={() => swipeToImage(1)}
      >
        <MdNavigateNext className="header-icon" />
      </button>
      <div className="slider-container">
        <div className="slider">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={imageCount}
              style={{
                backgroundImage: `url(${IMAGES[activeImageIndex].imageSrc})`,
              }}
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="exit"
              transition={sliderTransition}
              className="image"
            />
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};
const HeroItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  max-height: 100%;
  padding: 0 2rem;
  width: 650px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1;
  font-weight: bold;

  @media screen and (max-width: 650px) {
    width: 100%;
  }
`;
const HeroH1 = styled.h1`
  font-size: clamp(2.5rem, 10vw, 5rem);
  margin-bottom: 1rem;
  box-shadow: 4px 5px #e9ba23;
  letter-spacing: 3px;
`;
const HeroP = styled.p`
  font-size: clamp(2rem, 2.5vw, 3rem);
  margin-bottom: 2rem;
`;
const HeroBtn = styled(Link)`
  text-decoration: none;
  font-size: 1.4rem;
  padding: 1rem 4rem;
  border: none;
  background: #e31837;
  color: #fff;
  transition: 0.2s ease-out;

  &:hover {
    background: #ffc500;
    transition: 0.2s ease-out;
    cursor: pointer;
    color: #000;
  }
`;

export default HeaderCarousel;
