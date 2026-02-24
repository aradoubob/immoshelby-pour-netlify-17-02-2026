/*
  # Fix query performance with composite index

  1. Performance Optimization
    - Add composite index on (status, created_at DESC) to optimize the main query
    - This will dramatically speed up the query that filters by status and orders by created_at
    - Drop the old separate indexes as they are now redundant

  2. Changes
    - Create composite index idx_properties_status_created_at
    - This replaces the need for separate indexes on status and created_at
*/

DROP INDEX IF EXISTS idx_properties_status;
DROP INDEX IF EXISTS idx_properties_created_at;

CREATE INDEX IF NOT EXISTS idx_properties_status_created_at 
ON properties(status, created_at DESC);

ANALYZE properties;
