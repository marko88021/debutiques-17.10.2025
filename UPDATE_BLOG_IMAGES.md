# Update Blog Images with Local Files

## Your Local Images

You have 2 images in `/public/assets/blog_images/`:

1. `D80_brassdetails0000.png.webp`
2. `Oval_Mirror_Apartment_scene_Brass_1.5k (2).webp`

## How to Update Blog Post Images

### Method 1: Using Supabase Dashboard SQL Editor

Go to your Supabase Dashboard > SQL Editor and run these queries:

#### Update First Blog Post
```sql
UPDATE blog_posts 
SET featured_image = '/assets/blog_images/D80_brassdetails0000.png.webp',
    updated_at = now()
WHERE slug = 'future-of-furniture-ecommerce-3d-visualization';
```

#### Update Second Blog Post
```sql
UPDATE blog_posts 
SET featured_image = '/assets/blog_images/Oval_Mirror_Apartment_scene_Brass_1.5k (2).webp',
    updated_at = now()
WHERE slug = 'behind-scenes-photorealistic-furniture-renders';
```

### Method 2: Update All Posts at Once
```sql
-- See current posts
SELECT id, title, slug, featured_image FROM blog_posts ORDER BY created_at;

-- Update based on post order
WITH ordered_posts AS (
  SELECT 
    id,
    title,
    ROW_NUMBER() OVER (ORDER BY created_at) as rn
  FROM blog_posts
)
UPDATE blog_posts
SET featured_image = CASE
  WHEN id = (SELECT id FROM ordered_posts WHERE rn = 1) 
    THEN '/assets/blog_images/D80_brassdetails0000.png.webp'
  WHEN id = (SELECT id FROM ordered_posts WHERE rn = 2) 
    THEN '/assets/blog_images/Oval_Mirror_Apartment_scene_Brass_1.5k (2).webp'
  ELSE featured_image
END,
updated_at = now()
WHERE id IN (SELECT id FROM ordered_posts WHERE rn <= 2);
```

### Method 3: Update by Post ID

First, get the post IDs:
```sql
SELECT id, title, slug FROM blog_posts ORDER BY created_at;
```

Then update using the IDs you get:
```sql
-- Replace YOUR_POST_ID_1 with actual ID from above query
UPDATE blog_posts 
SET featured_image = '/assets/blog_images/D80_brassdetails0000.png.webp',
    updated_at = now()
WHERE id = 'YOUR_POST_ID_1';

-- Replace YOUR_POST_ID_2 with actual ID from above query
UPDATE blog_posts 
SET featured_image = '/assets/blog_images/Oval_Mirror_Apartment_scene_Brass_1.5k (2).webp',
    updated_at = now()
WHERE id = 'YOUR_POST_ID_2';
```

## Quick Copy-Paste Commands

### For Supabase Dashboard:

**Step 1: Check current posts**
```sql
SELECT id, title, slug, featured_image FROM blog_posts ORDER BY created_at;
```

**Step 2: Update with local images**
```sql
UPDATE blog_posts 
SET featured_image = '/assets/blog_images/D80_brassdetails0000.png.webp',
    updated_at = now()
WHERE slug = 'future-of-furniture-ecommerce-3d-visualization';

UPDATE blog_posts 
SET featured_image = '/assets/blog_images/Oval_Mirror_Apartment_scene_Brass_1.5k (2).webp',
    updated_at = now()
WHERE slug = 'behind-scenes-photorealistic-furniture-renders';
```

**Step 3: Verify changes**
```sql
SELECT title, featured_image FROM blog_posts ORDER BY created_at;
```

## Important Notes

1. The paths start with `/assets/` (not `/public/assets/`)
2. Your web server serves files from `/public/` as root `/`
3. The images will be accessible at:
   - `http://your-site.com/assets/blog_images/D80_brassdetails0000.png.webp`
   - `http://your-site.com/assets/blog_images/Oval_Mirror_Apartment_scene_Brass_1.5k (2).webp`

4. After updating, refresh your blog page with Ctrl+Shift+R

## Need More Images?

If you add more images to `/public/assets/blog_images/`, follow the same pattern:

```sql
UPDATE blog_posts 
SET featured_image = '/assets/blog_images/YOUR_NEW_IMAGE.jpg',
    updated_at = now()
WHERE slug = 'your-post-slug';
```
