-- migrations/20231113094523_create_subscribers_table.sql

-- Create the 'subscribers' table
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Use UUID for a more scalable and secure ID
  email VARCHAR(255) UNIQUE NOT NULL,            -- Ensure unique email for each subscriber
  is_active BOOLEAN DEFAULT TRUE,                -- Status to indicate if the user is still subscribed
  unsubscribe_token UUID DEFAULT gen_random_uuid(), -- Token for secure unsubscription handling
  created_at TIMESTAMP DEFAULT NOW(),            -- Automatically set when the record is created
  updated_at TIMESTAMP DEFAULT NOW()             -- Automatically updated on record change
);
