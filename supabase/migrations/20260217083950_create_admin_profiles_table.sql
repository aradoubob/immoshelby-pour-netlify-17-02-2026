/*
  # Create Admin Profiles Table

  1. New Tables
    - `admin_profiles`
      - `id` (uuid, primary key) - Links to auth.users
      - `email` (text) - Admin email
      - `full_name` (text) - Admin full name
      - `role` (text) - Admin role
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `admin_profiles` table
    - Add policy for admins to view their own profile
    - Add policy for admins to update their own profile
*/

CREATE TABLE IF NOT EXISTS admin_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view their own profile"
  ON admin_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update their own profile"
  ON admin_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE INDEX IF NOT EXISTS idx_admin_profiles_email ON admin_profiles(email);