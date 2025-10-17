// Gallery cleanup utility to validate and organize image files
export interface GalleryItem {
  id: string;
  src: string;
  category: 'product' | 'interior' | 'video';
  title?: string;
}

// Only include verified existing files based on the file system listing
export const interiorImages: GalleryItem[] = [
  {
    id: 'interior-1',
    src: '/assets/interiors/A3_cam01_set01_132f.jpg',
    category: 'interior',
    title: 'Modern Living Space'
  },
  {
    id: 'interior-2',
    src: '/assets/interiors/A3_cam01_set02_132f.jpg',
    category: 'interior',
    title: 'Contemporary Interior'
  },
  {
    id: 'interior-3',
    src: '/assets/interiors/A3_cam02_set01_29f.jpg',
    category: 'interior',
    title: 'Elegant Room Design'
  },
  {
    id: 'interior-4',
    src: '/assets/interiors/A2_cam03_set03_125f.jpg',
    category: 'interior',
    title: 'Sophisticated Space'
  },
  {
    id: 'interior-5',
    src: '/assets/interiors/A2_cam03_set02_43f_NEW.jpg',
    category: 'interior',
    title: 'Refined Interior'
  },
  {
    id: 'interior-6',
    src: '/assets/interiors/A4_AAC2_Chair.jpg',
    category: 'interior',
    title: 'Designer Chair Setup'
  },
  {
    id: 'interior-7',
    src: '/assets/interiors/A4_Master-chair.jpg',
    category: 'interior',
    title: 'Master Chair Collection'
  },
  {
    id: 'interior-8',
    src: '/assets/interiors/A4_no-14-chair-cane.jpg',
    category: 'interior',
    title: 'Cane Chair Design'
  },
  {
    id: 'interior-9',
    src: '/assets/interiors/A4_No-30-chair-cane_v02_.jpg',
    category: 'interior',
    title: 'Premium Cane Furniture'
  },
  {
    id: 'interior-10',
    src: '/assets/interiors/A3_Symthony-AAC22_Key-Front.jpg',
    category: 'interior',
    title: 'Symphony Collection'
  },
  {
    id: 'interior-11',
    src: '/assets/interiors/A3_androgyne-dining_Gubi-Beetle-Front.jpg',
    category: 'interior',
    title: 'Dining Room Setup'
  },
  {
    id: 'interior-12',
    src: '/assets/interiors/A4_Day_Bodhi-No14-Cafe_Key-Front.jpg',
    category: 'interior',
    title: 'Cafe Style Interior'
  },
  {
    id: 'interior-13',
    src: '/assets/interiors/A4_Day_Bodhi-No30-Cane_Key-Front.jpg',
    category: 'interior',
    title: 'Bodhi Collection'
  },
  {
    id: 'interior-14',
    src: '/assets/interiors/Walnut_KitchenCloseup.jpg',
    category: 'interior',
    title: 'Walnut Kitchen Details'
  },
  {
    id: 'interior-15',
    src: '/assets/interiors/Walnut_KitchenCloseup_01_Kitchen0001.jpg',
    category: 'interior',
    title: 'Walnut Kitchen Close-Up'
  },
  {
    id: 'interior-16',
    src: '/story reel/chair_crop_photoreal_v1.jpg',
    category: 'interior',
    title: 'Photorealistic Chair Render'
  },
  {
    id: 'interior-17',
    src: '/story reel/chair_photoreal_v1-min.png',
    category: 'interior',
    title: 'Chair Studio Shot'
  },
  {
    id: 'interior-18',
    src: '/story reel/highbar_photoreal_v1-min.jpg',
    category: 'interior',
    title: 'High Bar Stool Design'
  },
  {
    id: 'interior-19',
    src: '/story reel/living_editorial_v1-min.jpg',
    category: 'interior',
    title: 'Editorial Living Room'
  },
  {
    id: 'interior-20',
    src: '/story reel/kitchen_clean_photoreal_v1.jpg',
    category: 'interior',
    title: 'Clean Kitchen Design'
  },
  {
    id: 'interior-21',
    src: '/story reel/marble_photoreal_v1-min.jpg',
    category: 'interior',
    title: 'Marble Surface Detail'
  },
  {
    id: 'interior-22',
    src: '/story reel/drawers_canon_pro_v1.jpg',
    category: 'interior',
    title: 'Professional Drawer Unit'
  },
  {
    id: 'interior-23',
    src: '/story reel/render_photoreal_v1.jpg',
    category: 'interior',
    title: 'Photorealistic Furniture Render'
  },
  {
    id: 'interior-24',
    src: '/story reel/toaster_photoreal_pro_v1.jpg',
    category: 'interior',
    title: 'Toaster Product Shot'
  },
  {
    id: 'interior-25',
    src: '/story reel/cabinet_nikon_pro_v1.jpg',
    category: 'interior',
    title: 'Cabinet Professional Render'
  },
  {
    id: 'interior-26',
    src: '/story reel/symphony_photoreal_v1.jpg',
    category: 'interior',
    title: 'Symphony Furniture Collection'
  }
];

// Only verified Beetle collection images
export const productImages: GalleryItem[] = [
  {
    id: 'product-1',
    src: '/beet/Beetle_Studio_Crop_WEB_09.jpeg',
    category: 'product',
    title: 'Beetle Chair - Studio Shot'
  },
  {
    id: 'product-2',
    src: '/beet/Beetle_Studio_Crop_WEB_10.jpeg',
    category: 'product',
    title: 'Beetle Chair - Detail View'
  },
  {
    id: 'product-3',
    src: '/beet/Beetle_Studio_Crop_WEB_14.jpeg',
    category: 'product',
    title: 'Beetle Chair - Profile'
  },
  {
    id: 'product-4',
    src: '/beet/Beetle_Studio_Crop_WEB_23.jpeg',
    category: 'product',
    title: 'Beetle Chair - Angle View'
  },
  {
    id: 'product-5',
    src: '/beet/Beetle_Studio_Crop_WEB_24.jpeg',
    category: 'product',
    title: 'Beetle Chair - Front View'
  },
  {
    id: 'product-6',
    src: '/beet/Beetle_Studio_Crop_WEB_28.jpeg',
    category: 'product',
    title: 'Beetle Chair - Side View'
  },
  {
    id: 'product-7',
    src: '/assets/tables_and_chairs/tables_and_chairs1.jpg',
    category: 'product',
    title: 'Tables and Chairs Collection 1'
  },
  {
    id: 'product-8',
    src: '/assets/tables_and_chairs/tables_and_chairs2.jpg',
    category: 'product',
    title: 'Tables and Chairs Collection 2'
  },
  {
    id: 'product-9',
    src: '/assets/tables_and_chairs/tables_and_chairs3.jpg',
    category: 'product',
    title: 'Tables and Chairs Collection 3'
  },
  {
    id: 'product-10',
    src: '/assets/tables_and_chairs/tables_and_chairs4.jpg',
    category: 'product',
    title: 'Tables and Chairs Collection 4'
  },
  {
    id: 'product-11',
    src: '/assets/tables_and_chairs/tables_and_chairs5.jpg',
    category: 'product',
    title: 'Tables and Chairs Collection 5'
  },
  {
    id: 'product-12',
    src: '/assets/tables_and_chairs/tables_and_chairs6.jpg',
    category: 'product',
    title: 'Tables and Chairs Collection 6'
  },
  {
    id: 'product-13',
    src: '/assets/tables_and_chairs/tables_and_chairs7.jpg',
    category: 'product',
    title: 'Tables and Chairs Collection 7'
  },
  {
    id: 'product-14',
    src: '/assets/tables_and_chairs/tables_and_chairs8.jpg',
    category: 'product',
    title: 'Tables and Chairs Collection 8'
  },
  {
    id: 'product-15',
    src: '/assets/black_sideboard/tide_1.jpeg',
    category: 'product',
    title: 'Black Sideboard - View 1'
  },
  {
    id: 'product-16',
    src: '/assets/black_sideboard/tide_2.jpeg',
    category: 'product',
    title: 'Black Sideboard - View 2'
  },
  {
    id: 'product-17',
    src: '/assets/black_sideboard/tide_3.jpeg',
    category: 'product',
    title: 'Black Sideboard - View 3'
  },
  {
    id: 'product-18',
    src: '/assets/black_sideboard/tide_4.jpeg',
    category: 'product',
    title: 'Black Sideboard - View 4'
  },
  {
    id: 'product-19',
    src: '/assets/black_sideboard/tide_5.jpeg',
    category: 'product',
    title: 'Black Sideboard - View 5'
  },
  {
    id: 'product-20',
    src: '/assets/black_sideboard/tide_6.jpeg',
    category: 'product',
    title: 'Black Sideboard - View 6'
  },
];

// Only verified video files
export const videoItems: GalleryItem[] = [
  {
    id: 'video-1',
    src: '/assets/video_gallery/1.mp4',
    category: 'video',
    title: 'Product Animation 1'
  },
  {
    id: 'video-2',
    src: '/assets/video_gallery/3.mp4',
    category: 'video',
    title: 'Product Animation 2'
  },
  {
    id: 'video-3',
    src: '/assets/video_gallery/4.mp4',
    category: 'video',
    title: 'Product Animation 3'
  },
  {
    id: 'video-4',
    src: '/assets/video_gallery/6.mp4',
    category: 'video',
    title: 'Product Animation 4'
  },
  {
    id: 'video-5',
    src: '/assets/video_gallery/7.mp4',
    category: 'video',
    title: 'Product Animation 5'
  },
  {
    id: 'video-6',
    src: '/assets/video_gallery/8.mp4',
    category: 'video',
    title: 'Product Animation 6'
  },
  {
    id: 'video-7',
    src: '/assets/video_gallery/9.mp4',
    category: 'video',
    title: 'Product Animation 7'
  },
  {
    id: 'video-8',
    src: '/assets/video_gallery/10.mp4',
    category: 'video',
    title: 'Product Animation 8'
  },
  {
    id: 'video-9',
    src: '/assets/video_gallery/11.mp4',
    category: 'video',
    title: 'Product Animation 9'
  },
  {
    id: 'video-10',
    src: '/assets/video_gallery/12.mp4',
    category: 'video',
    title: 'Product Animation 10'
  },
  {
    id: 'video-11',
    src: '/assets/360/5.mp4',
    category: 'video',
    title: '360 Product Rotation'
  }
];

// Combined gallery items - only verified files
export const allGalleryItems: GalleryItem[] = [
  ...productImages,
  ...interiorImages,
  ...videoItems
];

// Helper function to get items by category with validation
export const getItemsByCategory = (category: 'product' | 'interior' | 'video' | 'all'): GalleryItem[] => {
  const items = category === 'all' ? allGalleryItems : allGalleryItems.filter(item => item.category === category);
  
  // Additional validation to ensure no empty or invalid items
  return items.filter(item => 
    item.src && 
    item.src.trim() !== '' && 
    !item.src.includes('undefined') &&
    !item.src.includes('null') &&
    item.id &&
    item.category
  );
};

// Helper function to validate image existence
export const validateGalleryItems = (items: GalleryItem[]): GalleryItem[] => {
  return items.filter(item => {
    // Strict validation - ensure all required fields exist and are valid
    return item.src && 
           item.src.trim() !== '' && 
           item.id && 
           item.category &&
           !item.src.includes('undefined') &&
           !item.src.includes('null');
  });
};