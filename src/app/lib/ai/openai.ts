import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export type Quote = {
    sentence: string;
    explanation: string;
    author: string | undefined;
    origin: string | undefined;
    date: string | undefined;
    schoolOfThought: string | undefined;
    category: string | undefined;
    referenceUrl: string | undefined;
}

export type QuotesResponse = {
    quotes: Quote[];
}

export async function getQuotes(author: string, numberOfQuotes: string): Promise<QuotesResponse> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": "You are an expert in buddhist theology and mindfulness. Being able to read and digest most of the literature on the topic you have vast knowledge on the authors and figures in that realm. Required fields for JSON response are {sentence, explanation, author, origin, date, schoolOfThought, category, referenceUrl} the object containing the array of quotes shall be called quotes. Unknown fields shall be null. The quotes must be unique."
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": `Give me ${numberOfQuotes} quotes from ${author}.`
                        }
                    ]
                }
            ],
            temperature: 0.1,
            max_tokens: 4096,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            response_format: {
                "type": "json_object"
            },
        });
        const quotes = response?.choices?.[0]?.message?.content?.trim() ?? '';
        if(!quotes)
            throw new Error('Response from OpenAI came empty');

        const data: QuotesResponse = JSON.parse(quotes);
        console.log(`fetched quotes ${data}`)

        return data
    } catch (error: any) {
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
          } else {
            console.error('Error message:', error.message);
          }
        throw new Error('Something went wrong.')
    }
}
