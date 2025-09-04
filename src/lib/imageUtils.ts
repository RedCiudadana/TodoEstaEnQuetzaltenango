/**
 * Utility functions for handling business images
 * Supports both URLs and local file paths
 */

/**
 * Checks if a string is a valid URL
 */
export function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a path is a local image path (starts with /)
 */
export function isLocalImagePath(path: string): boolean {
  return path.startsWith('/') && !isValidUrl(path);
}

/**
 * Resolves an image source to the correct URL
 * Handles both external URLs and local paths
 */
export function resolveImageSrc(imageSrc: string): string {
  if (!imageSrc) return '';
  
  // If it's already a valid URL, return as is
  if (isValidUrl(imageSrc)) {
    return imageSrc;
  }
  
  // If it's a local path, ensure it's properly formatted
  if (isLocalImagePath(imageSrc)) {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = imageSrc.startsWith('/') ? imageSrc.substring(1) : imageSrc;
    
    // In development, Vite serves static files from the public directory
    // In production, files are served from the root
    return import.meta.env.DEV 
      ? `/${cleanPath}` 
      : `/${cleanPath}`;
  }
  
  // If it doesn't start with /, treat it as a relative path
  return `/${imageSrc}`;
}

/**
 * Gets the first available image from a business
 * Returns a placeholder if no images are available
 * For external URLs, adds resize parameters when possible
 */
export function getBusinessMainImage(fotos?: string[], width: number = 400, height: number = 250): string {
  const placeholderImg = `https://placehold.co/${width}x${height}?text=Negocio`;
  
  if (!fotos || fotos.length === 0) {
    return placeholderImg;
  }
  
  const firstImage = fotos[0];
  if (!firstImage) {
    return placeholderImg;
  }
  
  const resolvedSrc = resolveImageSrc(firstImage);
  
  // If it's an external URL, try to add resize parameters for common services
  if (isValidUrl(resolvedSrc)) {
    return addResizeParameters(resolvedSrc, width, height);
  }
  
  return resolvedSrc;
}

/**
 * Adds resize parameters to supported image services
 */
function addResizeParameters(url: string, width: number, height: number): string {
  try {
    const urlObj = new URL(url);
    
    // Unsplash
    if (urlObj.hostname.includes('unsplash.com')) {
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('h', height.toString());
      urlObj.searchParams.set('fit', 'crop');
      return urlObj.toString();
    }
    
    // Cloudinary
    if (urlObj.hostname.includes('cloudinary.com')) {
      // For Cloudinary, we'd need to modify the path, which is more complex
      // For now, return the original URL
      return url;
    }
    
    // Placeholder.co
    if (urlObj.hostname.includes('placehold.co')) {
      return `https://placehold.co/${width}x${height}?text=Negocio`;
    }
    
    // Images.pexels.com
    if (urlObj.hostname.includes('images.pexels.com')) {
      // Pexels already has good URLs, but we can add size parameters
      urlObj.searchParams.set('auto', 'compress');
      urlObj.searchParams.set('cs', 'tinysrgb');
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('h', height.toString());
      urlObj.searchParams.set('fit', 'crop');
      return urlObj.toString();
    }
    
    // For other services, return original URL
    return url;
  } catch {
    return url;
  }
}

/**
 * Resolves all images in a fotos array
 * Optionally applies resize parameters for external URLs
 */
export function resolveBusinessImages(fotos?: string[], width?: number, height?: number): string[] {
  if (!fotos || fotos.length === 0) {
    return [];
  }
  
  return fotos.map(foto => {
    const resolvedSrc = resolveImageSrc(foto);
    
    // If resize parameters are provided and it's an external URL, apply them
    if (width && height && isValidUrl(resolvedSrc)) {
      return addResizeParameters(resolvedSrc, width, height);
    }
    
    return resolvedSrc;
  });
}

/**
 * Validates if an image source is accessible
 * Useful for error handling in image components
 */
export async function validateImageSrc(src: string): Promise<boolean> {
  if (!src) return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}
