import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Paintbrush, Bed, Shirt, Briefcase, ShoppingBasket, Leaf, Mountain } from 'lucide-react';
import { categories } from '../../data/mockData';

const CategoryList: React.FC = () => {
  // Map category icons to Lucide React components
  const getCategoryIcon = (iconName: string, size = 24) => {
    switch (iconName) {
      case 'utensils':
        return <Utensils size={size} />;
      case 'paint-brush':
        return <Paintbrush size={size} />;
      case 'bed':
        return <Bed size={size} />;
      case 'tshirt':
        return <Shirt size={size} />;
      case 'briefcase':
        return <Briefcase size={size} />;
      case 'shopping-basket':
        return <ShoppingBasket size={size} />;
      case 'leaf':
        return <Leaf size={size} />;
      case 'mountain':
        return <Mountain size={size} />;
      default:
        return <Briefcase size={size} />;
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/negocios?categoria=${category.id}`}
          className="card card-hover bg-white p-6 flex flex-col items-center text-center group"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-50 text-primary-500 mb-4 group-hover:bg-primary-100 transition-colors">
            {getCategoryIcon(category.icon)}
          </div>
          <h3 className="font-heading font-medium text-lg mb-1 group-hover:text-primary-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500">
            Explora {category.name.toLowerCase()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;