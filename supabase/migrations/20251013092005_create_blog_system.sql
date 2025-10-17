/*
  # Create Blog System

  ## New Tables
  
  ### 1. blog_categories
    - `id` (uuid, primary key)
    - `name` (text, unique) - Category display name
    - `slug` (text, unique) - URL-friendly identifier
    - `description` (text, nullable) - Optional category description
    - `created_at` (timestamptz) - Creation timestamp
  
  ### 2. blog_tags
    - `id` (uuid, primary key)
    - `name` (text, unique) - Tag display name
    - `slug` (text, unique) - URL-friendly identifier
    - `created_at` (timestamptz) - Creation timestamp
  
  ### 3. blog_posts
    - `id` (uuid, primary key)
    - `title` (text) - Post title
    - `slug` (text, unique) - URL-friendly identifier
    - `content` (text) - Full post content (supports markdown)
    - `excerpt` (text) - Short post summary
    - `featured_image` (text, nullable) - URL to featured image
    - `author` (text) - Author name
    - `publish_date` (timestamptz) - When post should be published
    - `status` (text) - Post status: 'draft' or 'published'
    - `category_id` (uuid, nullable, foreign key) - Reference to blog_categories
    - `created_at` (timestamptz) - Creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp
  
  ### 4. blog_post_tags
    - `post_id` (uuid, foreign key) - Reference to blog_posts
    - `tag_id` (uuid, foreign key) - Reference to blog_tags
    - `created_at` (timestamptz) - Creation timestamp
    - Primary key: (post_id, tag_id)
  
  ## Security
  
  ### Row Level Security (RLS)
  - Enable RLS on all tables
  - Public read access for published posts and related data
  - Write access restricted (for future admin implementation)
  
  ## Indexes
  - Index on blog_posts.slug for fast lookups
  - Index on blog_posts.status and publish_date for filtering
  - Index on blog_post_tags for efficient tag queries
*/

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create blog_tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  featured_image text,
  author text NOT NULL DEFAULT 'Debutiques Team',
  publish_date timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_post_tags junction table
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES blog_tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, tag_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status_publish_date ON blog_posts(status, publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_post_tags_post_id ON blog_post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_post_tags_tag_id ON blog_post_tags(tag_id);

-- Enable Row Level Security
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_categories
CREATE POLICY "Anyone can view categories"
  ON blog_categories FOR SELECT
  TO public
  USING (true);

-- RLS Policies for blog_tags
CREATE POLICY "Anyone can view tags"
  ON blog_tags FOR SELECT
  TO public
  USING (true);

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  TO public
  USING (status = 'published' AND publish_date <= now());

-- RLS Policies for blog_post_tags
CREATE POLICY "Anyone can view post tags"
  ON blog_post_tags FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.id = blog_post_tags.post_id
      AND blog_posts.status = 'published'
      AND blog_posts.publish_date <= now()
    )
  );

-- Insert sample categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Industry Insights', 'industry-insights', 'Latest trends and insights in furniture visualization and CGI'),
  ('Project Showcase', 'project-showcase', 'Featured projects and client success stories'),
  ('Tutorial', 'tutorial', 'Guides and tutorials for 3D visualization'),
  ('Company News', 'company-news', 'Updates and announcements from Debutiques')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample tags
INSERT INTO blog_tags (name, slug) VALUES
  ('3D Rendering', '3d-rendering'),
  ('Product Visualization', 'product-visualization'),
  ('Interior Design', 'interior-design'),
  ('E-commerce', 'e-commerce'),
  ('Furniture', 'furniture'),
  ('CGI', 'cgi'),
  ('Marketing', 'marketing'),
  ('Best Practices', 'best-practices')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts
DO $$
DECLARE
  cat_insights_id uuid;
  cat_showcase_id uuid;
  tag_rendering_id uuid;
  tag_visualization_id uuid;
  tag_ecommerce_id uuid;
  post1_id uuid;
  post2_id uuid;
BEGIN
  -- Get category IDs
  SELECT id INTO cat_insights_id FROM blog_categories WHERE slug = 'industry-insights';
  SELECT id INTO cat_showcase_id FROM blog_categories WHERE slug = 'project-showcase';
  
  -- Get tag IDs
  SELECT id INTO tag_rendering_id FROM blog_tags WHERE slug = '3d-rendering';
  SELECT id INTO tag_visualization_id FROM blog_tags WHERE slug = 'product-visualization';
  SELECT id INTO tag_ecommerce_id FROM blog_tags WHERE slug = 'e-commerce';
  
  -- Insert first sample post
  INSERT INTO blog_posts (
    title,
    slug,
    content,
    excerpt,
    featured_image,
    author,
    status,
    category_id,
    publish_date
  ) VALUES (
    'The Future of Furniture E-commerce: Why 3D Visualization is Essential',
    'future-of-furniture-ecommerce-3d-visualization',
    E'# The Future of Furniture E-commerce\n\nIn today\'s digital marketplace, furniture retailers face a unique challenge: how do you help customers confidently purchase large, expensive items they can\'t physically touch or see in person?\n\n## The Challenge\n\nTraditional product photography has served e-commerce well, but it comes with significant limitations:\n\n- **High costs** for multiple photoshoots\n- **Long production times** delaying product launches\n- **Limited variations** showing only a few material options\n- **Static presentation** that doesn\'t engage customers\n\n## The Solution: 3D Visualization\n\n3D rendering technology has revolutionized how furniture brands present their products online. With photorealistic CGI, you can:\n\n### 1. Showcase Every Variation\n\nCreate unlimited material and color combinations without additional photoshoots. Show your customers exactly what they\'re getting.\n\n### 2. Engage with Interactive Experiences\n\n360° product views and interactive animations help customers understand your products better than static images ever could.\n\n### 3. Reduce Returns\n\nWhen customers can see accurate representations of products in realistic settings, they make more confident purchases and are less likely to return items.\n\n### 4. Accelerate Time to Market\n\nLaunch new products faster by creating visuals before physical prototypes are ready.\n\n## Real Results\n\nOur clients report:\n\n- **72%** lower visual content costs\n- **38%** increase in conversion rates\n- **21%** higher average order value\n\n## Getting Started\n\nTransitioning to 3D visualization doesn\'t have to be overwhelming. Start with your bestsellers or new product launches, and expand from there.\n\nReady to transform your furniture e-commerce experience? Let\'s talk about how we can help.',
    'Discover how 3D visualization is transforming furniture e-commerce and why traditional photography can no longer compete in today''s digital marketplace.',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=675&fit=crop',
    'Debutiques Team',
    'published',
    cat_insights_id,
    now() - INTERVAL '7 days'
  )
  RETURNING id INTO post1_id;
  
  -- Add tags to first post
  IF post1_id IS NOT NULL THEN
    INSERT INTO blog_post_tags (post_id, tag_id) VALUES
      (post1_id, tag_rendering_id),
      (post1_id, tag_visualization_id),
      (post1_id, tag_ecommerce_id)
    ON CONFLICT DO NOTHING;
  END IF;
  
  -- Insert second sample post
  INSERT INTO blog_posts (
    title,
    slug,
    content,
    excerpt,
    featured_image,
    author,
    status,
    category_id,
    publish_date
  ) VALUES (
    'Behind the Scenes: Creating Photorealistic Furniture Renders',
    'behind-scenes-photorealistic-furniture-renders',
    E'# Behind the Scenes: Creating Photorealistic Renders\n\nEver wondered how we create those stunning, photorealistic furniture images that are indistinguishable from professional photography?\n\n## The Process\n\n### Step 1: 3D Modeling\n\nEverything starts with precise 3D modeling. We work from:\n\n- CAD files from manufacturers\n- Technical drawings\n- Physical product samples\n- Reference photographs\n\nOur team meticulously recreates every curve, joint, and detail to ensure accuracy.\n\n### Step 2: Material Creation\n\nThis is where the magic happens. We create realistic materials by:\n\n- Scanning real fabric and wood samples\n- Building procedural material systems\n- Fine-tuning reflections and surface properties\n- Testing under various lighting conditions\n\n### Step 3: Lighting Design\n\nLighting makes or breaks photorealism. We use:\n\n- HDR environment maps for realistic reflections\n- Studio lighting setups mimicking professional photography\n- Natural lighting scenarios for lifestyle shots\n\n### Step 4: Rendering\n\nUsing industry-leading rendering engines, we calculate:\n\n- Global illumination\n- Accurate shadows and reflections\n- Subsurface scattering for fabrics\n- Depth of field for photographic realism\n\n### Step 5: Post-Processing\n\nFinal touches include:\n\n- Color grading for brand consistency\n- Minor adjustments for perfect composition\n- Output optimization for web and print\n\n## Why It Matters\n\nThe attention to detail in our process ensures that your customers see exactly what they\'ll receive, building trust and reducing returns.\n\n## The Result\n\nPhotorealistic images that:\n\n- Match your brand aesthetic perfectly\n- Show products in their best light\n- Work across all marketing channels\n- Cost a fraction of traditional photography\n\nInterested in seeing how we can transform your product imagery? Get in touch.',
    'Take a deep dive into our production process and learn how we create photorealistic furniture renders that rival traditional photography.',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=675&fit=crop',
    'Debutiques Team',
    'published',
    cat_insights_id,
    now() - INTERVAL '3 days'
  )
  RETURNING id INTO post2_id;
  
  -- Add tags to second post
  IF post2_id IS NOT NULL THEN
    INSERT INTO blog_post_tags (post_id, tag_id) VALUES
      (post2_id, tag_rendering_id),
      (post2_id, tag_visualization_id)
    ON CONFLICT DO NOTHING;
  END IF;
  
END $$;
