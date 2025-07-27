import axios from 'axios';

// Mock API base URL
const API_BASE_URL = 'https://api.example.com';

// Mock data for town listings
const MOCK_TOWNS = [
  {
    id: '1',
    name: 'Green Valley Township',
    area: '450 acres',
    address: '123 Valley Road',
    city: 'Greenfield',
    totalPlots: 350,
    phases: [
      {
        id: 'p1',
        name: 'Phase 1 - Residential',
        plots: 150,
        shops: 15,
        images: [
          'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
          'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
          'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg'
        ],
        video: 'https://example.com/videos/phase1.mp4'
      },
      {
        id: 'p2',
        name: 'Phase 2 - Commercial',
        plots: 75,
        shops: 45,
        images: [
          'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
          'https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg'
        ]
      }
    ],
    locationMap: 'https://images.pexels.com/photos/4429281/pexels-photo-4429281.jpeg',
    nocRegistry: 'https://example.com/docs/noc-registry1.pdf',
    documents: [
      'https://example.com/docs/green-valley-doc1.pdf',
      'https://example.com/docs/green-valley-doc2.pdf'
    ],
    mainImage: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg'
  },
  {
    id: '2',
    name: 'Riverside Gardens',
    area: '320 acres',
    address: '456 Riverside Avenue',
    city: 'Riverdale',
    totalPlots: 280,
    phases: [
      {
        id: 'p3',
        name: 'Phase 1 - Premium Villas',
        plots: 85,
        shops: 0,
        images: [
          'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
          'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg'
        ],
        video: 'https://example.com/videos/riverside-p1.mp4'
      },
      {
        id: 'p4',
        name: 'Phase 2 - Apartments',
        plots: 120,
        shops: 25,
        images: [
          'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
          'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
        ]
      }
    ],
    locationMap: 'https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg',
    nocRegistry: 'https://example.com/docs/noc-registry2.pdf',
    documents: [
      'https://example.com/docs/riverside-doc1.pdf',
      'https://example.com/docs/riverside-doc2.pdf'
    ],
    mainImage: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
  },
  {
    id: '3',
    name: 'Summit Heights',
    area: '280 acres',
    address: '789 Mountain View Road',
    city: 'Highland',
    totalPlots: 210,
    phases: [
      {
        id: 'p5',
        name: 'Phase 1 - Mountain Homes',
        plots: 95,
        shops: 10,
        images: [
          'https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg',
          'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg'
        ],
        video: 'https://example.com/videos/summit-p1.mp4'
      }
    ],
    locationMap: 'https://images.pexels.com/photos/2850347/pexels-photo-2850347.jpeg',
    nocRegistry: 'https://example.com/docs/noc-registry3.pdf',
    documents: [
      'https://example.com/docs/summit-doc1.pdf'
    ],
    mainImage: 'https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg'
  }
];

// Simulated API calls with delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Fetch all towns
  getTowns: async () => {
    try {
      // In a real app, this would be an actual API call
      // const response = await axios.get(`${API_BASE_URL}/api/town`);
      // return response.data;
      
      // Simulate API delay
      await delay(800);
      return MOCK_TOWNS;
    } catch (error) {
      console.error('Error fetching towns:', error);
      throw error;
    }
  },

  // Add a new town
  addTown: async (townData) => {
    try {
      console.log('Adding town with data:', townData);
      
      // In a real app, this would be an actual API call
      // const formData = new FormData();
      // Object.entries(townData).forEach(([key, value]) => {
      //   if (key === 'phases') {
      //     formData.append(key, JSON.stringify(value));
      //   } else if (key === 'documents') {
      //     Array.from(value).forEach((file) => {
      //       formData.append('documents', file);
      //     });
      //   } else if (value instanceof File) {
      //     formData.append(key, value);
      //   } else {
      //     formData.append(key, String(value));
      //   }
      // });
      // const response = await axios.post(`${API_BASE_URL}/api/town`, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      // return response.data;
      
      // Simulate API delay
      await delay(1500);
      
      // Generate a mock response
      const newTown = {
        id: `town-${Date.now()}`,
        name: townData.name,
        area: townData.area,
        address: townData.address,
        city: townData.city,
        totalPlots: townData.totalPlots,
        phases: townData.phases.map((phase, index) => ({
          id: `phase-${Date.now()}-${index}`,
          name: phase.name,
          plots: phase.plots,
          shops: phase.shops,
          images: phase.images.map(() => 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg'),
          video: phase.video ? 'https://example.com/videos/sample.mp4' : undefined
        })),
        locationMap: 'https://images.pexels.com/photos/4429281/pexels-photo-4429281.jpeg',
        nocRegistry: 'https://example.com/docs/noc-registry.pdf',
        documents: Array(townData.documents.length).fill('https://example.com/docs/document.pdf'),
        mainImage: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg'
      };
      
      return newTown;
    } catch (error) {
      console.error('Error adding town:', error);
      throw error;
    }
  }
};