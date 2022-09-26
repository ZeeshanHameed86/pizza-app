import React from "react";
import { Hero, Featured, Footer } from "../components";
import HeaderCarousel from "../components/HeaderCarousel";
import Featured1 from "../assets/featured3.jpg";
import Featured2 from "../assets/featured.jpg";

const HomePage = () => {
  return (
    <main>
      <HeaderCarousel />
      {/* <Hero /> */}
      <Featured image={Featured1} />
      <Featured image={Featured2} />

      <Footer />
    </main>
  );
};

export default HomePage;
