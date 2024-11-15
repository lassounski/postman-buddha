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
