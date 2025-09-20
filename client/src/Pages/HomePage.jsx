
import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import ChatBox from '../Components/ChatBox';
import { assets } from '../assets/assets';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white h-screen w-screen relative'>
      {/* Mobile menu icon */}
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert z-50'
          onClick={() => setIsMenuOpen(true)}
          alt="Open menu"
        />
      )}
      <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <ChatBox />
      </div>
    </div>
  );
};

export default HomePage;
