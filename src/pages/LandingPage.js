import React from 'react';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import Features from '../components/landing/Features';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Header />
            <HeroSection />
            <Features />
            <Footer />
        </div>
    );
};

export default LandingPage;