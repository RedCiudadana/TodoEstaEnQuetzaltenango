import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Paintbrush, Bed, Shirt, Briefcase, ShoppingBasket, Leaf, Mountain, FolderKanban } from 'lucide-react';

// Import all markdown files in src/content/categorias
// @ts-ignore
const categoryFiles = import.meta.glob('../../content/categorias/*.md', { as: 'raw', eager: true });
import fm from 'front-matter';

type Category = {
  id: string;
  title: string;
  descripcion?: string;
  icono?: string;
};

function parseCategories(): Category[] {
  const categories: Category[] = [];
  for (const path in categoryFiles) {
    const raw = categoryFiles[path] as string;
    const { attributes } = fm(raw);
    const id = path.split('/').pop()?.replace('.md', '') || '';
    const attrs = attributes as { title: string; descripcion?: string; icono?: string };
    categories.push({
      id,
      title: attrs.title,
      descripcion: attrs.descripcion,
      icono: attrs.icono,
    });
  }
  return categories;
}

const categories = parseCategories();

// Map icon name (string) to Lucide React component
const getCategoryIcon = (iconName?: string, size = 24) => {
  switch (iconName) {
    case 'utensils':
      return <Utensils size={size} />;
    case 'paint-brush':
    case 'paintbrush':
      return <Paintbrush size={size} />;
    case 'bed':
      return <Bed size={size} />;
    case 'tshirt':
    case 'shirt':
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
      // Default icon for "categorías"
      return <FolderKanban size={size} />;
  }
};

const CategoryList: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/negocios?categoria=${category.id}`}
          className="card card-hover bg-white p-6 flex flex-col items-center text-center group"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent-700 text-accent-500 mb-4 group-hover:bg-accent-700 transition-colors">
            {getCategoryIcon(category.icono)}
          </div>
          <h3 className="font-heading font-medium text-lg mb-1 group-hover:text-accent-600 transition-colors">
            {category.title}
          </h3>
          <p className="text-sm text-gray-500">
            Explora {category.title.toLowerCase()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;