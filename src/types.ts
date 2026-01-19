export interface Material {
    name: string;
    imageUrl: string;
}

export interface Project {
    id: string;
    title: string;
    location: string;
    description: string;
    imageUrl: string;
    year: string;
    category: 'Residential' | 'Commercial' | 'Hospitality';
    gallery: string[];
    materials: Material[];
    squareFootage?: number; // Optional square footage for gallery captions
    coordinates?: [number, number]; // [latitude, longitude]
}

export interface MapContextPoint {
    id: string;
    name: string;
    coordinates: [number, number];
    type: 'school' | 'transit' | 'dining' | 'safety';
    description?: string;
}

export interface GalleryImage {
    src: string;
    alt: string;
    neighborhood: string;
    squareFootage: number;
    yearBuilt: string;
    projectId?: string;
}

export type AppView = 'hero' | 'exhibition' | 'about' | 'consultation';

export interface ConsultationState {
    step: number;
    projectType: string;
    budget: string;
    vision: string;
    aiRefinement?: string;
}