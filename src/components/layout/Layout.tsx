import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Navbar from './Navbar';
import Footer from './Footer';
import Loader from '../loader'

const Layout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'visible';
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
          <Loader />
        </div>
      )}
      <Topbar />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;