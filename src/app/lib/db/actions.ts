'use server'

import { createClient } from '@/app/lib/db/supabaseServer'

export async function addSubscriber(email: string) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
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

export async function saveQuotesToDb(quotes: {
  sentence: string
  explanation: string
  author: string
  origin: string | null
  date: string | null
  schoolOfThought: string
  category: string | null
  referenceUrl: string | null
}[]) {
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase
      .from('quotes')  
      .insert(quotes.map(quote => ({
        sentence: quote.sentence,
        explanation: quote.explanation,
        author: quote.author,
        origin: quote.origin ?? null,
        date: quote.date ?? null,
        schoolOfThought: quote.schoolOfThought ?? null,
        category: quote.category ?? null,
        referenceUrl: quote.referenceUrl ?? null,
        created_at: new Date().toISOString(),
      })))

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving quote to DB:', error)
    throw error
  }
}