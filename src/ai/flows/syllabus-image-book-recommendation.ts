
/**
 * @fileOverview Provides book recommendations based on syllabus image content.
 *
 * - syllabusImageBookRecommendation - A function that takes a syllabus image and recommends books.
 * - SyllabusImageBookRecommendationInput - The input type for the syllabusImageBookRecommendation function.
 * - SyllabusImageBookRecommendationOutput - The return type for the syllabusImageBookRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SyllabusImageBookRecommendationInputSchema = z.object({
  syllabusImageDataUri: z
    .string()
    .describe(
      "A syllabus image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SyllabusImageBookRecommendationInput = z.infer<typeof SyllabusImageBookRecommendationInputSchema>;

const SyllabusImageBookRecommendationOutputSchema = z.object({
  bookRecommendations: z.array(
    z.object({
      bookId: z.string().describe('The ID of the recommended book.'),
      title: z.string().describe('The title of the recommended book.'),
      author: z.string().describe('The author of the recommended book.'),
      category: z.string().describe('The category of the recommended book.'),
      relevanceScore: z.number().describe('A score indicating the relevance of the book to the syllabus.'),
    })
  ).describe('A list of book recommendations based on the syllabus content.'),
});
export type SyllabusImageBookRecommendationOutput = z.infer<typeof SyllabusImageBookRecommendationOutputSchema>;

export async function syllabusImageBookRecommendation(input: SyllabusImageBookRecommendationInput): Promise<SyllabusImageBookRecommendationOutput> {
  return syllabusImageBookRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'syllabusImageBookRecommendationPrompt',
  input: {schema: SyllabusImageBookRecommendationInputSchema},
  output: {schema: SyllabusImageBookRecommendationOutputSchema},
  prompt: `You are a helpful librarian recommending books based on a syllabus image.

  Analyze the syllabus content to understand the topics covered and recommend the most relevant books from the library's catalog.

  Syllabus Image: {{media url=syllabusImageDataUri}}

  Provide a list of book recommendations including bookId, title, author, category and relevanceScore.
  `,
});

const syllabusImageBookRecommendationFlow = ai.defineFlow(
  {
    name: 'syllabusImageBookRecommendationFlow',
    inputSchema: SyllabusImageBookRecommendationInputSchema,
    outputSchema: SyllabusImageBookRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
