'use server'

import { syllabusImageBookRecommendation, type SyllabusImageBookRecommendationInput } from '@/ai/flows/syllabus-image-book-recommendation'

export async function getBookRecommendations(input: SyllabusImageBookRecommendationInput) {
  try {
    const data = await syllabusImageBookRecommendation(input)
    return { data }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to get book recommendations. Please try again.' }
  }
}
