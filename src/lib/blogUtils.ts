import { supabase } from './supabase';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  author: string;
  publish_date: string;
  status: 'draft' | 'published';
  category_id: string | null;
  created_at: string;
  updated_at: string;
  category?: BlogCategory;
  tags?: BlogTag[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export async function getAllPosts(limit?: number) {
  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(id, name, slug, description),
      blog_post_tags(tag:blog_tags(id, name, slug))
    `)
    .eq('status', 'published')
    .lte('publish_date', new Date().toISOString())
    .order('publish_date', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return (data || []).map((post: any) => ({
    ...post,
    category: post.category || null,
    tags: post.blog_post_tags?.map((pt: any) => pt.tag).filter(Boolean) || [],
  })) as BlogPost[];
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(id, name, slug, description),
      blog_post_tags(tag:blog_tags(id, name, slug))
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('publish_date', new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  if (!data) return null;

  return {
    ...data,
    category: data.category || null,
    tags: data.blog_post_tags?.map((pt: any) => pt.tag).filter(Boolean) || [],
  } as BlogPost;
}

export async function getPostsByCategory(categorySlug: string, limit?: number) {
  const { data: category } = await supabase
    .from('blog_categories')
    .select('id')
    .eq('slug', categorySlug)
    .maybeSingle();

  if (!category) return [];

  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(id, name, slug, description),
      blog_post_tags(tag:blog_tags(id, name, slug))
    `)
    .eq('status', 'published')
    .eq('category_id', category.id)
    .lte('publish_date', new Date().toISOString())
    .order('publish_date', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }

  return (data || []).map((post: any) => ({
    ...post,
    category: post.category || null,
    tags: post.blog_post_tags?.map((pt: any) => pt.tag).filter(Boolean) || [],
  })) as BlogPost[];
}

export async function getPostsByTag(tagSlug: string, limit?: number) {
  const { data: tag } = await supabase
    .from('blog_tags')
    .select('id')
    .eq('slug', tagSlug)
    .maybeSingle();

  if (!tag) return [];

  const { data: postTags } = await supabase
    .from('blog_post_tags')
    .select('post_id')
    .eq('tag_id', tag.id);

  if (!postTags || postTags.length === 0) return [];

  const postIds = postTags.map(pt => pt.post_id);

  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(id, name, slug, description),
      blog_post_tags(tag:blog_tags(id, name, slug))
    `)
    .eq('status', 'published')
    .in('id', postIds)
    .lte('publish_date', new Date().toISOString())
    .order('publish_date', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }

  return (data || []).map((post: any) => ({
    ...post,
    category: post.category || null,
    tags: post.blog_post_tags?.map((pt: any) => pt.tag).filter(Boolean) || [],
  })) as BlogPost[];
}

export async function searchPosts(searchTerm: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(id, name, slug, description),
      blog_post_tags(tag:blog_tags(id, name, slug))
    `)
    .eq('status', 'published')
    .lte('publish_date', new Date().toISOString())
    .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`)
    .order('publish_date', { ascending: false });

  if (error) {
    console.error('Error searching posts:', error);
    return [];
  }

  return (data || []).map((post: any) => ({
    ...post,
    category: post.category || null,
    tags: post.blog_post_tags?.map((pt: any) => pt.tag).filter(Boolean) || [],
  })) as BlogPost[];
}

export async function getAllCategories() {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return (data || []) as BlogCategory[];
}

export async function getAllTags() {
  const { data, error } = await supabase
    .from('blog_tags')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  return (data || []) as BlogTag[];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
