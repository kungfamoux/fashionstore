const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Test the database connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('test_table') // Replace with an actual table name
      .select('*')
      .limit(1);
      
    if (error) {
      console.error('Error connecting to Supabase:', error);
      return false;
    }
    
    console.log('Successfully connected to Supabase');
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
};

module.exports = {
  supabase,
  testConnection
};
