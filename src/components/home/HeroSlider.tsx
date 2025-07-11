import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta?: {
    text: string;
    link: string;
  };
}

const slides: Slide[] = [
  {
    image: 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png',
    title: 'Descubre Quetzaltenango',
    subtitle: 'Explora los mejores negocios y servicios de la región',
    cta: {
      text: 'Explorar Negocios',
      link: '/negocios'
    }
  },
  {
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
    title: 'Eventos y Ferias',
    subtitle: 'Mantente al día con las actividades locales',
    cta: {
      text: 'Ver Eventos',
      link: '/eventos'
    }
  },
  {
    image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg',
    title: 'Registra tu Negocio',
    subtitle: 'Forma parte de nuestra comunidad empresarial',
    cta: {
      text: 'Registrarse',
      link: '/registrar'
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
    <div className="relative h-[80vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-delay">
                  {slide.subtitle}
                </p>
                {slide.cta && (
                  <a
                    href={slide.cta.link}
                    className="btn btn-accent text-lg py-3 px-8 animate-fade-in-delay-2"
                  >
                    {slide.cta.text}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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