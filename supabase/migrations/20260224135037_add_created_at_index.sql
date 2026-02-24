/*
  # Add index on created_at column
  
  1. Performance
    - Add index on `created_at` column to improve query performance
    - This will speed up the ORDER BY created_at queries
*/

CREATE INDEX IF NOT EXISTS idx_properties_created_at 
ON properties(created_at DESC);