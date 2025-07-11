import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, image }) => {
  return (
    <div className="relative bg-secondary-800 py-16 mb-8">
      {/* Background image */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary-800 bg-opacity-75"></div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-white/90 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;