import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.38.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
  'Content-Type': 'application/json',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders 
    });
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    // Parse and validate request body
    const body = await req.json().catch(() => null);
    if (!body) {
      throw new Error('Invalid request body');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Format location as PostgreSQL point type
    const location = `(${body.location.lng},${body.location.lat})`;

    // Prepare business data
    const businessData = {
      name: body.name,
      category: body.category,
      municipality: body.municipality,
      address: body.address,
      description: body.description,
      phone: body.phone,
      email: body.email,
      website: body.website,
      payment_methods: body.paymentMethods,
      operating_hours: body.operatingHours,
      social_networks: body.socialNetworks,
      photos: body.photos,
      location: location,
      status: 'pending'
    };

    // Insert business data into Supabase
    const { data, error } = await supabase
      .from('businesses')
      .insert(businessData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to insert business: ${error.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        data: data
      }),
      { 
        status: 200,
        headers: {
          ...corsHeaders,
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        success: false 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    );
  }
});