import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Topbar: React.FC = () => {
  return (
    <div className="bg-accent-500">
      <div className="container mx-auto px-4">
        <div className="w-full py-4 px-4 flex justify-end items-center gap-4">
          <a
            href="https://www.instagram.com/mancomunidad_metropoli"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white hover:text-white/80 transition"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.facebook.com/metropolidelosaltos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white hover:text-white/80 transition"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://x.com/GaMetropoli"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="text-white hover:text-white/80 transition"
          >
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;