import { createClient } from '@supabase/supabase-js';
import { interiorImages, productImages, videoItems } from '../src/utils/galleryCleanup';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrateGalleryData() {
  console.log('Starting gallery data migration...');

  const allItems = [
    ...productImages.map((item, index) => ({
      title: item.title || `Product ${index + 1}`,
      src: item.src,
      category: 'product' as const,
      display_order: index,
    })),
    ...interiorImages.map((item, index) => ({
      title: item.title || `Interior ${index + 1}`,
      src: item.src,
      category: 'interior' as const,
      display_order: index,
    })),
    ...videoItems.map((item, index) => ({
      title: item.title || `Video ${index + 1}`,
      src: item.src,
      category: 'video' as const,
      display_order: index,
    })),
  ];

  console.log(`Migrating ${allItems.length} items...`);

  try {
    const { data: existingItems } = await supabase
      .from('gallery_items')
      .select('id');

    if (existingItems && existingItems.length > 0) {
      console.log(`Found ${existingItems.length} existing items. Clearing...`);
      await supabase.from('gallery_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    }

    const batchSize = 50;
    for (let i = 0; i < allItems.length; i += batchSize) {
      const batch = allItems.slice(i, i + batchSize);
      const { error } = await supabase.from('gallery_items').insert(batch);

      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
        throw error;
      }

      console.log(`Inserted batch ${i / batchSize + 1} of ${Math.ceil(allItems.length / batchSize)}`);
    }

    console.log('Migration completed successfully!');
    console.log(`Total items migrated: ${allItems.length}`);
    console.log(`- Products: ${productImages.length}`);
    console.log(`- Interiors: ${interiorImages.length}`);
    console.log(`- Videos: ${videoItems.length}`);

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateGalleryData();
