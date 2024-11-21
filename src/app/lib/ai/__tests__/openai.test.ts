
import { getQuotes, QuotesResponse } from "../openai";
import mockedResponse from "./mockedResponse.json"

jest.mock('openai', () => {
    return {
        // This one is really important, otherwise you'll have "*.default is not a constructor error":
        // See: https://stackoverflow.com/a/61396377/2452628
        __esModule: true,

        default: jest.fn().mockImplementation(() => ({
            // Mock the 'chat.completions.create' method
            chat: {
                completions: {
                    create: jest.fn((): Promise<any> => Promise.resolve(mockedResponse)),
                },
            },
        })),
    };
});

describe('getQuotes function', () => {
    it('should return parsed quotes from the mocked OpenAI response', async () => {
        const response: QuotesResponse = await getQuotes('Buddha', '3') ?? '';

        // Additional assertions to verify correct parsing
        expect(response.quotes).toHaveLength(3);
        expect(response.quotes[0]).toMatchObject({
            sentence: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
            explanation: "This quote emphasizes the importance of mindfulness and being fully present in the current moment.",
            author: "Buddha",
            origin: "Teachings of the Buddha",
            date: "6th to 4th century BCE",
            schoolOfThought: "Buddhism",
            category: "Mindfulness",
            referenceUrl: "https://www.goodreads.com/quotes/101132-do-not-dwell-in-the-past-do-not-dream-of"
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});