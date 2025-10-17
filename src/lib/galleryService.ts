import { supabase } from './supabase';

export interface GalleryItem {
  id: string;
  title: string;
  src: string;
  category: 'product' | 'interior' | 'video';
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const galleryService = {
  async getAllItems(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getItemsByCategory(category: 'product' | 'interior' | 'video' | 'all'): Promise<GalleryItem[]> {
    let query = supabase
      .from('gallery_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async createItem(item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryItem> {
    const { data, error } = await supabase
      .from('gallery_items')
      .insert([item])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateItem(id: string, updates: Partial<Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>>): Promise<GalleryItem> {
    const { data, error } = await supabase
      .from('gallery_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async updateDisplayOrder(items: { id: string; display_order: number }[]): Promise<void> {
    const updates = items.map(item =>
      supabase
        .from('gallery_items')
        .update({ display_order: item.display_order })
        .eq('id', item.id)
    );

    await Promise.all(updates);
  },

  async bulkDelete(ids: string[]): Promise<void> {
    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .in('id', ids);

    if (error) throw error;
  }
};
