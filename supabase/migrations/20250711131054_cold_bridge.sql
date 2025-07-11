/*
  # Complete Business Database Schema

  1. New Tables
    - `businesses`
      - `id` (uuid, primary key)
      - `name` (text, business name)
      - `category` (text, business category)
      - `subcategory` (text, optional subcategory)
      - `municipality` (text, location municipality)
      - `address` (text, physical address)
      - `description` (text, business description)
      - `phone` (text, contact number)
      - `email` (text, contact email)
      - `website` (text, optional website)
      - `payment_methods` (text[], accepted payment methods)
      - `operating_hours` (jsonb, business hours by day)
      - `social_networks` (jsonb, social media links)
      - `featured_products` (text[], main products/services)
      - `photos` (text[], photo URLs)
      - `location` (point, geographical coordinates)
      - `status` (text, registration status: pending, approved, rejected)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `categories`
      - `id` (text, primary key)
      - `name` (text, category name)
      - `icon` (text, icon identifier)
      - `description` (text, optional description)

    - `municipalities`
      - `id` (text, primary key)
      - `name` (text, municipality name)
      - `department` (text, department name)
      - `coordinates` (point, center coordinates)

    - `events`
      - `id` (uuid, primary key)
      - `name` (text, event name)
      - `description` (text, event description)
      - `date` (date, event date)
      - `start_time` (time, start time)
      - `end_time` (time, optional end time)
      - `location` (text, event location)
      - `municipality` (text, municipality)
      - `address` (text, physical address)
      - `organizer` (text, organizer name)
      - `category` (text, event category)
      - `photo` (text, photo URL)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to approved content
    - Add policies for admin management
    - Add policies for business owners to manage their own content

  3. Indexes
    - Add indexes for common queries (location, category, municipality, status)
    - Add full-text search indexes for name and description
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create municipalities table
CREATE TABLE IF NOT EXISTS municipalities (
  id text PRIMARY KEY,
  name text NOT NULL,
  department text DEFAULT 'Quetzaltenango',
  coordinates point,
  created_at timestamptz DEFAULT now()
);

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL REFERENCES categories(id),
  subcategory text,
  municipality text NOT NULL REFERENCES municipalities(id),
  address text NOT NULL,
  description text NOT NULL,
  phone text,
  email text,
  website text,
  payment_methods text[] DEFAULT '{}',
  operating_hours jsonb NOT NULL DEFAULT '{}'::jsonb,
  social_networks jsonb NOT NULL DEFAULT '{}'::jsonb,
  featured_products text[] DEFAULT '{}',
  photos text[] DEFAULT '{}',
  location point,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time,
  location text NOT NULL,
  municipality text NOT NULL REFERENCES municipalities(id),
  address text NOT NULL,
  organizer text NOT NULL,
  category text NOT NULL,
  photo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE municipalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "Categories are publicly readable"
  ON categories
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Municipalities policies (public read)
CREATE POLICY "Municipalities are publicly readable"
  ON municipalities
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage municipalities"
  ON municipalities
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Businesses policies
CREATE POLICY "Approved businesses are publicly readable"
  ON businesses
  FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Anyone can insert business applications"
  ON businesses
  FOR INSERT
  WITH CHECK (status = 'pending');

CREATE POLICY "Admins can manage all businesses"
  ON businesses
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Business owners can view and update their own businesses"
  ON businesses
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = email)
  WITH CHECK (auth.jwt() ->> 'email' = email);

-- Events policies
CREATE POLICY "Events are publicly readable"
  ON events
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage events"
  ON events
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_municipality ON businesses(municipality);
CREATE INDEX IF NOT EXISTS idx_businesses_location ON businesses USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_businesses_created_at ON businesses(created_at);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_businesses_search ON businesses USING GIN(to_tsvector('spanish', name || ' ' || description));
CREATE INDEX IF NOT EXISTS idx_events_search ON events USING GIN(to_tsvector('spanish', name || ' ' || description));

-- Event indexes
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_municipality ON events(municipality);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories
INSERT INTO categories (id, name, icon, description) VALUES
  ('restaurantes', 'Restaurantes', 'utensils', 'Restaurantes, cafeterías y servicios de comida'),
  ('artesanias', 'Artesanías', 'paint-brush', 'Productos artesanales y tradicionales'),
  ('hospedaje', 'Hospedaje', 'bed', 'Hoteles, hostales y servicios de alojamiento'),
  ('moda', 'Moda y Textiles', 'tshirt', 'Ropa, calzado y productos textiles'),
  ('servicios', 'Servicios', 'briefcase', 'Servicios profesionales y técnicos'),
  ('mercados', 'Mercados', 'shopping-basket', 'Mercados y centros comerciales'),
  ('agricultura', 'Agricultura', 'leaf', 'Productos agrícolas y ganaderos'),
  ('turismo', 'Turismo', 'mountain', 'Servicios turísticos y recreativos')
ON CONFLICT (id) DO NOTHING;

-- Insert municipalities
INSERT INTO municipalities (id, name, coordinates) VALUES
  ('quetzaltenango', 'Quetzaltenango', '(-91.518, 14.835)'),
  ('coatepeque', 'Coatepeque', '(-91.863, 14.704)'),
  ('cantel', 'Cantel', '(-91.456, 14.816)'),
  ('salcaja', 'Salcajá', '(-91.456, 14.884)'),
  ('zunil', 'Zunil', '(-91.481, 14.781)'),
  ('almolonga', 'Almolonga', '(-91.498, 14.816)'),
  ('olintepeque', 'Olintepeque', '(-91.498, 14.884)'),
  ('san-carlos-sija', 'San Carlos Sija', '(-91.581, 15.134)')
ON CONFLICT (id) DO NOTHING;