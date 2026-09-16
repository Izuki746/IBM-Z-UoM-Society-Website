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
      <Cursor />
    </>
  )
}

export default App
