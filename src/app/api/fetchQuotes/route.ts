import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Triggering the ednpoint that will fetch the quotes')
    // Fetch quotes from OpenAI
    // const quotes = await getOpenAIData()

    // // Save the quotes to the database
    // await saveQuoteToDb(quotes)

    return NextResponse.json({ message: 'Quotes fetched and saved successfully' })
  } catch (error) {
    console.error('Error fetching and saving quotes:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
