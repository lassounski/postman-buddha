'use server'

import createClient from '@/app/lib/db/supabaseServer'
import { QuotesResponse } from '../ai/openai'
import { Database } from './supabase-types'

export async function addSubscriber(email: string) {
  const supabaseServer = await createClient()

  try {
    const { data, error } = await supabaseServer
      .from('subscribers')
      .insert([{ email }])

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (err) {
    console.error('Error inserting subscriber:', err)
    throw err
  }
}

export async function saveQuotesToDb(quotesResponse: QuotesResponse) {
  const supabaseServer = await createClient()
  type QuotesInsert = Database['public']['Tables']['quotes']['Insert']
  try {
    // Transform quotes to match the DB schema
    const transformedQuotes: QuotesInsert[] = quotesResponse.quotes.map((quote) => ({
      sentence: quote.sentence,
      explanation: quote.explanation,
      author: quote.author,
      origin: quote.origin ?? null,
      date: quote.date ?? null,
      schoolofthought: quote.schoolOfThought ?? null,
      category: quote.category ?? null,
      referenceurl: quote.referenceUrl ?? null
    }));

    // Insert quotes in bulk
    const { data, error } = await supabaseServer.from("quotes").insert(transformedQuotes);

    if (error) {
      console.error("Error inserting quotes:", error.message);
      throw error;
    }

    console.log("Quotes successfully inserted:", data);
    return data;
  } catch (error) {
    console.error("Error saving quotes to DB:", error);
    throw error;
  }
}