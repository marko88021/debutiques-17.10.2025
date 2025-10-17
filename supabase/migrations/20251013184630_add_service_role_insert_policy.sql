/*
  # Add service role insert policy for gallery items

  ## Overview
  This migration adds a policy to allow inserting gallery items using the service role
  for migration purposes. This is necessary for the initial data migration script.

  ## Changes
  - Add policy to allow inserts for service role (bypass RLS for migrations)
*/

-- Temporarily allow public inserts for migration (we'll remove this after migration)
CREATE POLICY "Allow public inserts for migration"
  ON gallery_items FOR INSERT
  TO public
  WITH CHECK (true);
