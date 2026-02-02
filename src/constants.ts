
import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'The Obsidian Residence',
    location: 'Worli, Mumbai',
    description: 'A study in tactile minimalism. Basalt stone meets charred cedar.',
    imageUrl: '/Images/Obsidian/main.png',
    year: '2024',
    category: 'Residential',
    coordinates: [19.0176, 72.8562], // Worli, Mumbai
    gallery: [
      '/Images/Obsidian/1.png',
      '/Images/Obsidian/2.png',
      '/Images/Obsidian/3.png',
      '/Images/Obsidian/4.png',
      '/Images/Obsidian/5.png'
    ],
    materials: [
      { name: 'Basalt Stone', imageUrl: 'https://images.unsplash.com/photo-1517524001193-84090264102d?auto=format&fit=crop&q=80&w=800' },
      { name: 'Charred Cedar', imageUrl: 'https://images.unsplash.com/photo-1549114170-65905d6e902b?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: '02',
    title: 'Atellier Noir',
    location: 'Lutyens, New Delhi',
    description: 'A private gallery residence emphasizing shadow, scale, and silence.',
    imageUrl: '/Images/Atellier Noir/main.png',
    year: '2024',
    category: 'Residential',
    coordinates: [28.6139, 77.2090], // Lutyens, New Delhi
    gallery: [
      '/Images/Atellier Noir/1.png',
      '/Images/Atellier Noir/2.png',
      '/Images/Atellier Noir/3.png'
    ],
    materials: [
      { name: 'Obsidian Glass', imageUrl: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=800' },
      { name: 'Patinated Bronze', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: '03',
    title: 'Project Three',
    location: 'Coming Soon',
    description: 'Details will be available soon.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000',
    year: '2024',
    category: 'Residential',
    coordinates: [19.0176, 72.8562], // Default coordinates
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=2000'
    ],
    materials: [
      { name: 'Material One', imageUrl: 'https://images.unsplash.com/photo-1517524001193-84090264102d?auto=format&fit=crop&q=80&w=800' },
      { name: 'Material Two', imageUrl: 'https://images.unsplash.com/photo-1549114170-65905d6e902b?auto=format&fit=crop&q=80&w=800' }
    ]
  }
];
