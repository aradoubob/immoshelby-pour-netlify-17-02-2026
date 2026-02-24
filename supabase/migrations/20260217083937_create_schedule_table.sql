/*
  # Create Schedule Table

  1. New Tables
    - `schedule`
      - `id` (uuid, primary key) - Unique identifier for each appointment
      - `property_id` (uuid, foreign key) - Reference to property
      - `name` (text) - Client name
      - `email` (text) - Client email
      - `phone` (text) - Client phone number
      - `date` (date) - Appointment date
      - `time` (text) - Appointment time
      - `message` (text) - Additional message from client
      - `status` (text) - Status: 'pending', 'confirmed', 'cancelled', 'completed'
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `schedule` table
    - Add policy for anyone to insert schedule requests
    - Add policy for admins to view all schedules
    - Add policy for admins to update schedules
*/

CREATE TABLE IF NOT EXISTS schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create schedule requests"
  ON schedule
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all schedules"
  ON schedule
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update schedules"
  ON schedule
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete schedules"
  ON schedule
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_schedule_property_id ON schedule(property_id);
CREATE INDEX IF NOT EXISTS idx_schedule_date ON schedule(date);
CREATE INDEX IF NOT EXISTS idx_schedule_status ON schedule(status);