import fm from 'front-matter';

// @ts-ignore: Vite import.meta.glob for markdown
const businessFiles = import.meta.glob('../content/negocios/*.md', { as: 'raw', eager: true });

export interface BusinessMarkdown {
  nombre: string;
  categorias: string[];
  municipio: string;
  direccion: string;
  ubicacion?: string;
  descripcion?: string;
  telefono?: string;
  correo_electronico?: string;
  sitio_web?: string;
  pago_efectivo?: boolean;
  pago_tarjeta?: boolean;
  pago_transferencia?: boolean;
  horario_lunes_viernes?: string;
  horario_sabado?: string;
  horario_domingo?: string;
  facebook?: string;
  instagram?: string;
  fotos?: string[];
}

export async function getBusinessesFromMarkdown(): Promise<BusinessMarkdown[]> {
  try {
    const businesses: BusinessMarkdown[] = [];
    for (const path in businessFiles) {
      const raw = businessFiles[path] as string;
      const { attributes } = fm(raw);
      const data = attributes as any;
      // Normalizar campos
      const negocio: BusinessMarkdown = {
        nombre: data.title || '',
        categorias: Array.isArray(data.categorias) ? data.categorias : (typeof data.categorias === 'string' ? [data.categorias] : []),
        municipio: data.municipio || '',
        direccion: data.direccion || '',
        ubicacion: data.ubicacion,
        descripcion: data.descripcion,
        telefono: data.telefono,
        correo_electronico: data.correo_electronico,
        sitio_web: data.sitio_web,
        pago_efectivo: Boolean(data.pago_efectivo),
        pago_tarjeta: Boolean(data.pago_tarjeta),
        pago_transferencia: Boolean(data.pago_transferencia),
        horario_lunes_viernes: data.horario_lunes_viernes,
        horario_sabado: data.horario_sabado,
        horario_domingo: data.horario_domingo,
        facebook: data.facebook,
        instagram: data.instagram,
        fotos: Array.isArray(data.fotos) ? data.fotos : (data.fotos ? [data.fotos] : (data.foto_negocio ? [data.foto_negocio] : [])),
      };
      businesses.push(negocio);
    }
    console.log('Negocios cargados desde markdown:', businesses);
    return businesses;
  } catch (e) {
    console.error('Error loading businesses from markdown:', e);
    return [];
  }
}

// Función para obtener las categorías únicas de los negocios existentes
export async function getAvailableCategories(): Promise<string[]> {
  try {
    const businesses = await getBusinessesFromMarkdown();
    const allCategories = businesses.flatMap(business => business.categorias);
    const uniqueCategories = [...new Set(allCategories)].sort();
    console.log('Categorías disponibles:', uniqueCategories);
    return uniqueCategories;
  } catch (e) {
    console.error('Error getting available categories:', e);
    return [];
  }
} 