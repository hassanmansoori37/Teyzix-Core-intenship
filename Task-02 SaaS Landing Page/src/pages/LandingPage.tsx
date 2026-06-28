import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import Testimonials from "../components/Testimonials/Testimonials";
import Pricing from "../components/Pricing/Pricing";
import FAQ from "../components/FAQ/FAQ";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

const LandingPage: React.FC = () => (
  <>
    <Navbar />
    <Hero />
    <Features />
    <Testimonials />
    <Pricing />
    <FAQ />
    <Contact />
    <Footer />
  </>
);

export default LandingPage;
