/*
  # Remove public insert policy

  ## Overview
  Now that the migration is complete, we remove the temporary public insert policy
  to restore proper security. Only authenticated admins should be able to insert items.

  ## Changes
  - Drop the temporary public insert policy
*/

-- Remove the temporary migration policy
DROP POLICY IF EXISTS "Allow public inserts for migration" ON gallery_items;
