
import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'The Obsidian Residence',
    location: 'Worli, Mumbai',
    description: 'A study in tactile minimalism. Basalt stone meets charred cedar.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000',
    year: '2024',
    category: 'Residential',
    coordinates: [19.0176, 72.8562], // Worli, Mumbai
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=2000'
    ],
    materials: [
      { name: 'Basalt Stone', imageUrl: 'https://images.unsplash.com/photo-1517524001193-84090264102d?auto=format&fit=crop&q=80&w=800' },
      { name: 'Charred Cedar', imageUrl: 'https://images.unsplash.com/photo-1549114170-65905d6e902b?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: '02',
    title: 'Veridian Pavilion',
    location: 'Assagao, Goa',
    description: 'Blurring the threshold between monsoon lushness and cast concrete.',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000',
    year: '2023',
    category: 'Hospitality',
    coordinates: [15.5953, 73.7558], // Assagao, Goa
    gallery: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6f3ea?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1600121848594-d86cc4f595e5?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000'
    ],
    materials: [
      { name: 'Raw Concrete', imageUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=800' },
      { name: 'Lush Moss', imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: '03',
    title: 'Atelier Noir',
    location: 'Lutyens, New Delhi',
    description: 'A private gallery residence emphasizing shadow, scale, and silence.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000',
    year: '2024',
    category: 'Residential',
    coordinates: [28.6139, 77.2090], // Lutyens, New Delhi
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1600210492493-124a0d50b28a?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000'
    ],
    materials: [
      { name: 'Obsidian Glass', imageUrl: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=800' },
      { name: 'Patinated Bronze', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: '04',
    title: 'Linen & Limestone',
    location: 'Jubilee Hills, Hyderabad',
    description: 'Monochromatic warmth through natural textures and indirect sunlight.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000',
    year: '2023',
    category: 'Commercial',
    coordinates: [17.4239, 78.4078], // Jubilee Hills, Hyderabad
    gallery: [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1618219944342-824e40a13285?auto=format&fit=crop&q=80&w=2000'
    ],
    materials: [
      { name: 'Belgian Linen', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800' },
      { name: 'Trawertine Limestone', imageUrl: 'https://images.unsplash.com/photo-1525462813273-2dc3ae85b341?auto=format&fit=crop&q=80&w=800' }
    ]
  }
];
