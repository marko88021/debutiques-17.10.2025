/*
  # Create Gallery Management System

  ## Overview
  This migration creates a comprehensive gallery management system with authentication,
  allowing an admin to manage (upload, replace, reorder, delete) gallery images.

  ## 1. New Tables
  
  ### `gallery_items`
  - `id` (uuid, primary key) - Unique identifier for each gallery item
  - `title` (text) - Display title for the item
  - `src` (text) - File path or URL to the image/video
  - `category` (text) - Category: 'product', 'interior', or 'video'
  - `display_order` (integer) - Order position within category for sorting
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `admin_users`
  - `id` (uuid, primary key, references auth.users) - Links to Supabase auth user
  - `email` (text) - Admin email address
  - `created_at` (timestamptz) - Account creation timestamp
  - `last_login` (timestamptz) - Last login timestamp

  ## 2. Security
  - Enable RLS on all tables
  - `gallery_items`: Public read access, admin-only write access
  - `admin_users`: Admin-only access for all operations
  
  ## 3. Indexes
  - Index on `gallery_items.category` for fast category filtering
  - Index on `gallery_items.display_order` for efficient sorting
  
  ## 4. Important Notes
  - Admin authentication is handled through Supabase Auth
  - Gallery items are publicly viewable but only admins can modify
  - Display order allows flexible positioning within each category
*/

-- Create gallery_items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  src text NOT NULL,
  category text NOT NULL CHECK (category IN ('product', 'interior', 'video')),
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_gallery_items_display_order ON gallery_items(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_items_category_order ON gallery_items(category, display_order);

-- Enable Row Level Security
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gallery_items

-- Public can view all gallery items
CREATE POLICY "Anyone can view gallery items"
  ON gallery_items FOR SELECT
  TO public
  USING (true);

-- Only authenticated admin users can insert gallery items
CREATE POLICY "Admins can insert gallery items"
  ON gallery_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Only authenticated admin users can update gallery items
CREATE POLICY "Admins can update gallery items"
  ON gallery_items FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Only authenticated admin users can delete gallery items
CREATE POLICY "Admins can delete gallery items"
  ON gallery_items FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- RLS Policies for admin_users

-- Admins can view their own record
CREATE POLICY "Admins can view own record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Admins can update their own record
CREATE POLICY "Admins can update own record"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on gallery_items
DROP TRIGGER IF EXISTS update_gallery_items_updated_at ON gallery_items;
CREATE TRIGGER update_gallery_items_updated_at
  BEFORE UPDATE ON gallery_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();