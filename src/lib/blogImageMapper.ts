// Create this new file: src/lib/blogImageMapper.ts

/**
 * Maps blog post titles/slugs to their new featured images
 * This allows us to replace images without accessing the database
 */
const IMAGE_MAP: Record<string, string> = {
  'behind-the-scenes-creating-photorealistic-furniture-renders': '/assets/blog_images/D80_brassdetails0000.png.webp',
  'the-future-of-furniture-e-commerce-why-3d-visualization-is-essential': '/assets/blog_images/Oval_Mirror_Apartment_scene_Brass_1.5k (2).webp',
};

/**
 * Get the new image path for a blog post
 * @param slug - The blog post slug or title
 * @param currentImage - The current featured image (fallback)
 * @returns The new image path if mapped, otherwise the current image
 */
export function getUpdatedBlogImage(slug: string, currentImage: string | null): string | null {
  // Try to find the image in the map using the slug
  const normalizedSlug = slug.toLowerCase().replace(/\s+/g, '-');
  
  if (IMAGE_MAP[normalizedSlug]) {
    return IMAGE_MAP[normalizedSlug];
  }
  
  // If not found, return the current image (fallback)
  return currentImage;
}

/**
 * Update a blog post with the new featured image
 * This is a client-side replacement that doesn't modify the database
 */
export function mapBlogPostImages<T extends { slug: string; featured_image: string | null }>(posts: T[]): T[] {
  return posts.map(post => ({
    ...post,
    featured_image: getUpdatedBlogImage(post.slug, post.featured_image),
  }));
}