import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Event } from '../../types';

interface EventsPreviewProps {
  events: Event[];
}

const EventsPreview: React.FC<EventsPreviewProps> = ({ events }) => {
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event) => (
        <div key={event.id} className="card card-hover h-full flex flex-col md:flex-row">
          <div className="relative h-48 md:h-auto md:w-2/5 rounded-t-lg md:rounded-t-none md:rounded-l-lg overflow-hidden">
            <img 
              src={event.photo} 
              alt={event.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
              {event.category}
            </div>
          </div>
          
          <div className="p-4 md:w-3/5 flex flex-col">
            <h3 className="font-heading text-xl font-semibold mb-3 text-gray-800">
              {event.name}
            </h3>
            
            <div className="flex items-center mb-2">
              <Calendar className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
              <p className="text-gray-600 text-sm">{formatDate(event.date)}</p>
            </div>
            
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
              <p className="text-gray-600 text-sm">
                {event.startTime} {event.endTime ? `- ${event.endTime}` : ''}
              </p>
            </div>
            
            <div className="flex items-start mb-3">
              <MapPin className="h-4 w-4 text-accent-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-gray-600 text-sm">{event.location}</p>
                <p className="text-gray-500 text-sm">{event.municipality}</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm line-clamp-2">
              {event.description}
            </p>
            
            <div className="mt-auto">
              <Link
                to={`/eventos`}
                className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium"
              >
                <span>Ver más detalles</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsPreview;