import { saveQuotesToDb } from '@/app/lib/db/actions'
import { getQuotes } from '@/app/lib/ai/openai'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Triggering the endpoint that will fetch the quotes')
    // Fetch quotes from OpenAI
    const quotes = await getQuotes('1', 'Buddha')

    // Save the quotes to the database
    // await saveQuotesToDb(quotes)

    return NextResponse.json({ message: 'Quotes fetched and saved successfully' })
  } catch (error) {
    console.error('Error fetching and saving quotes:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
