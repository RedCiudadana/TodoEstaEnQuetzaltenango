import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import { BusinessMarkdown } from '../../types';

// Set Mapbox token from environment variable
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface BusinessMapProps {
  businesses: BusinessMarkdown[];
}

const BusinessMap: React.FC<BusinessMapProps> = ({ businesses }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Initialize map
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-91.518, 14.835], // Default to Quetzaltenango center
        zoom: 12
      });
      
      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
    
    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    // Add markers for businesses
    if (businesses.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      
      businesses.forEach(business => {
        // Create popup content
        const popupHTML = `
          <div class="p-3">
            <div class="font-bold mb-1">${business.nombre}</div>
            <div class="text-sm text-gray-600 mb-2">${business.categorias[0]}</div>
            <div class="text-sm mb-2">${business.direccion}</div>
            <a 
              href="/negocios/${business.id}" 
              class="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Ver detalles
            </a>
          </div>
        `;
        
        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25, maxWidth: '300px' })
          .setHTML(popupHTML);
        
        // Create marker element
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23E63946" width="36px" height="36px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>')`;
        el.style.width = '36px';
        el.style.height = '36px';
        el.style.backgroundSize = '100%';
        el.style.cursor = 'pointer';
        
        // Add marker to map
        const marker = new mapboxgl.Marker(el)
          .setLngLat([business.ubicacion.lng, business.ubicacion.lat])
          .setPopup(popup)
          .addTo(map.current!);
        
        markers.current.push(marker);
        
        // Extend bounds to include this location
        bounds.extend([business.ubicacion.lng, business.ubicacion.lat]);
      });
      
      // Fit map to bounds with padding
      if (businesses.length > 1) {
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
      } else if (businesses.length === 1) {
        map.current.flyTo({
          center: [businesses[0].ubicacion.lng, businesses[0].ubicacion.lat],
          zoom: 15
        });
      }
    }
    
    return () => {
      // Cleanup if component unmounts
      if (map.current) {
        // We don't destroy the map, just clean markers
        markers.current.forEach(marker => marker.remove());
        markers.current = [];
      }
    };
  }, [businesses]);

  return (
    <div ref={mapContainer} className="h-full w-full" />
  );
};

export default BusinessMap;