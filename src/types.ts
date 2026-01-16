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
}

export type AppView = 'hero' | 'exhibition' | 'about' | 'consultation';

export interface ConsultationState {
    step: number;
    projectType: string;
    budget: string;
    vision: string;
    aiRefinement?: string;
}