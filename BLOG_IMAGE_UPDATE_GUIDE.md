# How to Manually Replace Images in Blog Posts

## Method 1: Using Supabase Dashboard (Recommended)

### Step 1: Access Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project: `spcjuoswvwsjlubjgbzr`
3. Navigate to "Table Editor" in the left sidebar

### Step 2: Find Your Blog Post
1. Select the `blog_posts` table
2. Find the post you want to update by title or slug
3. Click on the row to open the edit view

### Step 3: Update the Featured Image
1. Locate the `featured_image` column
2. Replace the URL with your new image URL
3. Options for image URLs:
   - Use Unsplash URLs (e.g., `https://images.unsplash.com/photo-xxxxx?w=1200&h=675&fit=crop`)
   - Upload to Supabase Storage first (see Method 2)
   - Use any publicly accessible image URL

### Step 4: Save Changes
1. Click "Save" or press Ctrl+S
2. Your changes are live immediately!

---

## Method 2: Using Supabase Storage

### Step 1: Upload New Image to Storage
1. In Supabase Dashboard, go to "Storage" in left sidebar
2. Create a bucket called `blog-images` (if not exists)
3. Make bucket public: Settings → Public bucket → ON
4. Upload your image file to the bucket
5. Copy the public URL of the uploaded image

### Step 2: Update Blog Post
1. Go back to Table Editor → `blog_posts`
2. Find your post and update `featured_image` with the new URL
3. Save changes

---

## Method 3: Using SQL Query

### Quick Update via SQL Editor
1. In Supabase Dashboard, go to "SQL Editor"
2. Run this query (replace values):

```sql
UPDATE blog_posts 
SET featured_image = 'YOUR_NEW_IMAGE_URL',
    updated_at = now()
WHERE slug = 'your-post-slug';
```

Example:
```sql
UPDATE blog_posts 
SET featured_image = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=675&fit=crop',
    updated_at = now()
WHERE slug = 'behind-scenes-photorealistic-furniture-renders';
```

---

## Method 4: Using Browser Console (Quick Test)

### For Testing/Development
1. Open your website
2. Open browser console (F12)
3. Run this code:

```javascript
const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
const supabase = createClient(
  'https://spcjuoswvwsjlubjgbzr.supabase.co',
  'YOUR_ANON_KEY'
);

const { data, error } = await supabase
  .from('blog_posts')
  .update({ 
    featured_image: 'NEW_IMAGE_URL',
    updated_at: new Date().toISOString()
  })
  .eq('slug', 'your-post-slug')
  .select();

console.log('Updated:', data, 'Error:', error);
```

---

## Recommended Image Specifications

- **Dimensions**: 1200x675px (16:9 aspect ratio)
- **Format**: JPG or WebP
- **File Size**: Under 500KB (optimized)
- **Quality**: High quality but web-optimized

## Free Image Sources

- **Unsplash**: https://unsplash.com (free, high-quality)
- **Pexels**: https://pexels.com (free stock photos)
- **Pixabay**: https://pixabay.com (free images)

## Unsplash URL Format

When using Unsplash, use this URL format for optimized images:
```
https://images.unsplash.com/photo-[PHOTO_ID]?w=1200&h=675&fit=crop&q=80
```

Parameters:
- `w=1200` - width in pixels
- `h=675` - height in pixels  
- `fit=crop` - crop to exact dimensions
- `q=80` - quality (1-100)

---

## Current Blog Posts in Database

Run this query to see all your posts:

```sql
SELECT 
  title, 
  slug, 
  featured_image, 
  status,
  publish_date
FROM blog_posts 
ORDER BY publish_date DESC;
```

---

## Troubleshooting

**Image not showing?**
- Check if URL is publicly accessible
- Verify URL doesn't have typos
- Try opening the image URL directly in browser
- Check browser console for CORS errors

**Changes not appearing?**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check if post is published (`status = 'published'`)
- Verify `publish_date` is in the past

---

## Need Help?

The blog system uses:
- Database: Supabase PostgreSQL
- Table: `blog_posts`
- Column: `featured_image` (text/URL field)
