-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view approved businesses" ON businesses;
DROP POLICY IF EXISTS "Admins have full access" ON businesses;

-- Create businesses table if it doesn't exist
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

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_businesses_updated_at ON businesses;

-- Create trigger
CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();