/*
  # Create opening hours table

  1. New Tables
    - `opening_hours`
      - `id` (uuid, primary key) - Unique identifier for each period
      - `period_type` (text) - Type of period: 'weekdays', 'saturday', or 'sunday'
      - `opening_time` (time) - Opening time for the period
      - `closing_time` (time) - Closing time for the period
      - `is_open` (boolean) - Whether the business is open during this period
      - `created_at` (timestamptz) - Timestamp when the record was created
      - `updated_at` (timestamptz) - Timestamp when the record was last updated

  2. Security
    - Enable RLS on `opening_hours` table
    - Add policy for authenticated admins to read opening hours
    - Add policy for authenticated admins to update opening hours
    - Add policy for public users to read opening hours (needed for Contact page)

  3. Sample Data
    - Insert default opening hours:
      - Weekdays (Monday-Friday): 09:00-18:00, open
      - Saturday: 10:00-14:00, open
      - Sunday: closed
*/

CREATE TABLE IF NOT EXISTS opening_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period_type text NOT NULL UNIQUE CHECK (period_type IN ('weekdays', 'saturday', 'sunday')),
  opening_time time,
  closing_time time,
  is_open boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;

-- Policy for public users to read opening hours
CREATE POLICY "Anyone can view opening hours"
  ON opening_hours
  FOR SELECT
  TO public
  USING (true);

-- Policy for admins to update opening hours
CREATE POLICY "Admins can update opening hours"
  ON opening_hours
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.id = auth.uid()
    )
  );

-- Insert default opening hours data
INSERT INTO opening_hours (period_type, opening_time, closing_time, is_open)
VALUES 
  ('weekdays', '09:00', '18:00', true),
  ('saturday', '10:00', '14:00', true),
  ('sunday', NULL, NULL, false)
ON CONFLICT (period_type) DO NOTHING;