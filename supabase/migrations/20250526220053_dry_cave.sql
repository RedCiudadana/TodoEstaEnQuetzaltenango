/*
  # Business Registration Schema

  1. New Tables
    - `businesses`
      - `id` (uuid, primary key)
      - `name` (text, business name)
      - `category` (text, business category)
      - `municipality` (text, location)
      - `address` (text, physical address)
      - `description` (text, business description)
      - `phone` (text, contact number)
      - `email` (text, contact email)
      - `website` (text, optional)
      - `payment_methods` (text[], accepted payment methods)
      - `operating_hours` (jsonb, business hours)
      - `social_networks` (jsonb, social media links)
      - `photos` (text[], photo URLs)
      - `location` (point, geographical coordinates)
      - `status` (text, registration status)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on businesses table
    - Add policies for:
      - Public read access to approved businesses
      - Admin full access
*/

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  municipality text NOT NULL,
  address text NOT NULL,
  description text NOT NULL,
  phone text,
  email text,
  website text,
  payment_methods text[] DEFAULT '{}',
  operating_hours jsonb NOT NULL DEFAULT '{}'::jsonb,
  social_networks jsonb NOT NULL DEFAULT '{}'::jsonb,
  photos text[] DEFAULT '{}',
  location point,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view approved businesses" 
  ON businesses 
  FOR SELECT 
  USING (status = 'approved');

CREATE POLICY "Admins have full access" 
  ON businesses 
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();