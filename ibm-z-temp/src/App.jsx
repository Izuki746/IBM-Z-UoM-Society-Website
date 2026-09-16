import { useState } from 'react'
import Cursor from './components/Cursor'

import './App.css'

function App() {
  const customCursor = document.querySelector('.glow-cursor');

  window.addEventListener('mousemove', (e) => {
    // Directly links the div's position to the mouse coordinates
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
  });

  return (
    <>
    <main>

      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#knowledge">Knowledge</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#society">Society</a></li>
        </ul>
      </nav>


      <section className="hero">
        <div className='initial-text' data-depth="1"><p>Enterprise Computing redefined</p></div>
        <div className="hero-content" data-depth="2">
          <h1>IBM Z Society</h1>
          <h2>University of Manchester</h2>
          <p>Explore the world of mainframe computing and join our community of enthusiasts.</p>
        </div>
        <div className="text-overlay" data-depth="3">
          <h4>Explore.Build.Connect</h4>
        </div>
        <div className="status" data-depth="1">
          <p>Status</p>
        </div>
        <a href="#about" className="cta-button" data-depth="2">Learn More</a>
      </section>
    </main>
      <Cursor />
    </>
  )
}

export default App
