import React from 'react';
import { Navbar, Carousel, Testimonials, Footer } from './components'; // Import necessary components from the components folder

function Home() {
  return (
    <div className="home">
      {/* Home page content and components */}
      <Navbar /> {/* Render the navigation bar component */}
      <h1>Welcome to the Home Page!</h1>
      <p>This is the main content of your home page.</p>
      <p>This website is designed to help you reserve items with specific locations.</p>
      <p>You can browse the available items, make reservations, and manage your profile.</p>
      <Carousel /> {/* Render the carousel component with images of your products or services */}
      <Testimonials /> {/* Render the testimonials component with reviews from your customers or clients */}
      <Footer /> {/* Render the footer component with contact information and social media icons */}
    </div>
  );
}

export default Home;
