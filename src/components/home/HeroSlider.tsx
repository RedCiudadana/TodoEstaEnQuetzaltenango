import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from '../../assets/images/slider/TEQ-04.png';
import TopSlider1 from '../../assets/images/slider/TEQ-05.png';
import TopSlider2 from '../../assets/images/slider/TEQ-03.png';

interface Slide {
  image: string;
  title: string;
  alternativetitle: string;
  subtitle: string;
  cta?: {
    text: string;
    link: string;
  };
  cta2?: {
    text: string;
    link: string;
  };
}

const slides: Slide[] = [
  {
    image: Slider,
    title: 'Todo Está',
    alternativetitle: 'En Quetzaltenango',
    subtitle: 'descubre, conecta y apoya los negocios y emprendimientos locales de todos los municipios del departamento',
    cta: {
      text: 'Explorar Negocios',
      link: '/negocios'
    },
    cta2: {
      text: 'Ver más',
      link: '/acerca'
    }
  },
  {
    image: Slider,
    title: 'Todo Está',
    alternativetitle: 'En Quetzaltenango',
    subtitle: 'descubre, conecta y apoya los negocios y emprendimientos locales de todos los municipios del departamento',
    cta: {
      text: 'Explorar Negocios',
      link: '/negocios'
    },
    cta2: {
      text: 'Ver más',
      link: '/acerca'
    }
  }
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[80vh] overflow-hidden flex flex-row">
      {/* Columna Izquierda: Contenido */}
      <div className="w-full md:w-1/2 flex items-center z-10 relative bg-black/40 md:bg-transparent">
        <div className="container mx-auto px-4 ml-8 md:ml-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-800 mb-6 animate-fade-in">
              {slides[currentSlide].title}
              <span className="ml-2" style={{ color: '#e76624' }}>{slides[currentSlide].alternativetitle}</span>
            </h1>
            <p className="text-xl md:text-2xl  mb-8 animate-fade-in-delay">
              {slides[currentSlide].subtitle}
            </p>
            {slides[currentSlide].cta && (
              <a
                href={slides[currentSlide].cta.link}
                className="btn btn-accent text-lg py-3 px-8 animate-fade-in-delay-2 mr-4"
              >
                {slides[currentSlide].cta.text}
              </a>
            )}
            {/* Segundo CTA (cta2) */}
            {slides[currentSlide].cta2 && (
              <a
                href={slides[currentSlide].cta2.link}
                className="inline-block mt-4 bg-white text-[rgb(31,41,55)] text-lg py-3 px-8 rounded animate-fade-in-delay-2 transition-colors duration-200 font-semibold hover:bg-[#e76624] hover:text-white"
              >
                {slides[currentSlide].cta2.text}
              </a>
            )}
          </div>
        </div>
      </div>
      {/* Columna Derecha: Imágenes superpuestas */}
      <div className="hidden md:flex w-1/2 items-center justify-center relative h-full">
        {/* Imagen base: altura completa */}
        <img
          src={TopSlider1}
          alt="TopSlider1"
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          style={{ zIndex: 1 }}
        />
        {/* Imagen superpuesta */}
        <img
          src={TopSlider2}
          alt="TopSlider2"
          className="absolute top-[2.5%] left-1/2 transform -translate-x-1/2 w-full h-[95%] rounded-xl object-cover"
          style={{ zIndex: 2 }}
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-4'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;