CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),                  -- Unique identifier for each quote
    sentence TEXT NOT NULL,                                         -- The quote text itself
    explanation TEXT,                                               -- Explanation or interpretation of the quote
    author VARCHAR(255),                                            -- The author of the quote (optional)
    origin VARCHAR(255),                                            -- Origin of the quote (e.g., book, speech)
    date VARCHAR(255),                                                      -- The date the quote was created or recorded
    schoolOfThought VARCHAR(255),                                   -- The school of thought associated with the quote
    category VARCHAR(255),                                          -- Category of the quote (e.g., Wisdom, Mindfulness)
    referenceurl VARCHAR(255),                                      -- URL to the reference source
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- Automatically set the creation time
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP   -- Automatically set the last updated time
);

-- Add index on the sentence field for fast searching
CREATE INDEX idx_quotes_sentence ON quotes (sentence);
