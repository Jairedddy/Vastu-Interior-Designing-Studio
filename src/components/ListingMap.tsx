import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Project } from '../types';
import { colors } from '../lib/design-tokens';

export interface ListingMapProps {
  /** Projects to display on the map */
  projects?: Project[];
  /** Single project for detail view (centers map) */
  focusedProject?: Project;
  /** Show cluster markers for multiple properties */
  showClusters?: boolean;
  /** Initial zoom level */
  zoom?: number;
  /** Callback when a project is clicked */
  onProjectClick?: (project: Project) => void;
}

/**
 * ListingMap Component
 * Interactive map with custom pins, context layers, and branded styling
 */
const ListingMap: React.FC<ListingMapProps> = ({
  projects = [],
  focusedProject,
  showClusters: _showClusters = false,
  zoom = 13,
  onProjectClick,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Create custom icon for properties
  const createPropertyIcon = (color: string = colors.brass[50]) => {
    return L.divIcon({
      className: 'custom-property-marker',
      html: `
        <div style="
          width: 24px;
          height: 24px;
          background-color: ${color};
          border: 2px solid ${colors.background.primary};
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };


  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Default center (Mumbai)
    const defaultCenter: [number, number] = [19.0176, 72.8562];
    
    // Use focused project coordinates if available, otherwise default
    const center = focusedProject?.coordinates || defaultCenter;
    const initialZoom = focusedProject ? 15 : zoom;

    // Create map with dark theme
    const map = L.map(mapContainerRef.current, {
      center,
      zoom: initialZoom,
      zoomControl: true,
      attributionControl: true,
    });

    // Add dark tile layer (using CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update map center when focused project changes
  useEffect(() => {
    if (!mapRef.current || !focusedProject?.coordinates) return;
    
    mapRef.current.setView(focusedProject.coordinates, 15, {
      animate: true,
      duration: 0.8,
    });
  }, [focusedProject]);

  // Add project markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => mapRef.current?.removeLayer(marker));
    markersRef.current = [];

    const projectsToShow = focusedProject ? [focusedProject] : projects;

    projectsToShow.forEach((project) => {
      if (!project.coordinates) return;

      const marker = L.marker(project.coordinates, {
        icon: createPropertyIcon(),
      }).addTo(mapRef.current!);

      // Create popup content
      const popupContent = `
        <div style="
          background-color: ${colors.surface.primary};
          color: ${colors.text.primary};
          padding: 12px;
          min-width: 200px;
          font-family: 'Inter', sans-serif;
        ">
          <h3 style="
            margin: 0 0 8px 0;
            font-size: 14px;
            font-weight: 500;
            color: ${colors.text.primary};
          ">${project.title}</h3>
          <p style="
            margin: 0 0 8px 0;
            font-size: 12px;
            color: ${colors.text.tertiary};
          ">${project.location}</p>
          <p style="
            margin: 0 0 12px 0;
            font-size: 11px;
            color: ${colors.text.muted};
          ">${project.category} • ${project.year}</p>
          <a href="#" 
             onclick="window.dispatchEvent(new CustomEvent('map-project-click', { detail: '${project.id}' })); return false;"
             style="
               display: inline-block;
               padding: 6px 12px;
               background-color: ${colors.brass[50]};
               color: ${colors.background.primary};
               text-decoration: none;
               font-size: 11px;
               text-transform: uppercase;
               letter-spacing: 0.05em;
               border-radius: 2px;
             "
          >View Details</a>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${project.coordinates[0]},${project.coordinates[1]}" 
             target="_blank"
             style="
               display: inline-block;
               margin-left: 8px;
               padding: 6px 12px;
               background-color: transparent;
               color: ${colors.brass[50]};
               text-decoration: none;
               font-size: 11px;
               text-transform: uppercase;
               letter-spacing: 0.05em;
               border: 1px solid ${colors.border.accent};
               border-radius: 2px;
             "
          >Directions</a>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'custom-popup',
      });

      marker.on('click', () => {
        if (onProjectClick) {
          onProjectClick(project);
        }
      });

      markersRef.current.push(marker);
    });

    // Listen for custom events from popup links
    const handleProjectClick = (e: CustomEvent) => {
      const projectId = e.detail;
      const project = projectsToShow.find(p => p.id === projectId);
      if (project && onProjectClick) {
        onProjectClick(project);
      }
    };

    window.addEventListener('map-project-click', handleProjectClick as EventListener);
    return () => {
      window.removeEventListener('map-project-click', handleProjectClick as EventListener);
    };
  }, [projects, focusedProject, onProjectClick]);

  // Context layers disabled - no markers added


  return (
    <div className="relative w-full h-full" style={{ backgroundColor: colors.background.primary }}>
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-full"
        style={{ minHeight: '400px', zIndex: 1 }}
      />


      {/* Custom Styles */}
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background-color: ${colors.surface.primary};
          border: 1px solid ${colors.border.primary};
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        
        .custom-popup .leaflet-popup-tip {
          background-color: ${colors.surface.primary};
          border: 1px solid ${colors.border.primary};
        }
        
        .leaflet-control-zoom a {
          background-color: ${colors.surface.primary} !important;
          color: ${colors.text.primary} !important;
          border: 1px solid ${colors.border.primary} !important;
        }
        
        .leaflet-control-zoom a:hover {
          background-color: ${colors.surface.elevated} !important;
          border-color: ${colors.border.accent} !important;
        }
        
        .leaflet-control-attribution {
          background-color: ${colors.surface.primary} !important;
          color: ${colors.text.tertiary} !important;
          font-size: 10px !important;
        }
        
        .leaflet-control-attribution a {
          color: ${colors.brass[50]} !important;
        }
      `}</style>
    </div>
  );
};

export default ListingMap;
