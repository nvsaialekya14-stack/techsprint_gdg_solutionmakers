'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import type { SyllabusImageBookRecommendationOutput } from '@/ai/flows/syllabus-image-book-recommendation'

interface BookRecommendationsProps {
  recommendations: SyllabusImageBookRecommendationOutput
}

export default function BookRecommendations({ recommendations }: BookRecommendationsProps) {
  if (recommendations.bookRecommendations.length === 0) {
    return (
      <div className="mt-12 text-center">
        <h2 className="font-headline text-2xl font-bold">No Recommendations Found</h2>
        <p className="text-muted-foreground mt-2">We couldn't find any relevant books. Please try a different search or syllabus.</p>
      </div>
    )
  }

  return (
    <div className="mt-12">
      <h2 className="font-headline text-3xl font-bold text-center mb-8">Recommended Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.bookRecommendations.map((book, index) => {
          const placeholder = PlaceHolderImages[index % PlaceHolderImages.length]
          return (
            <Card key={book.bookId} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="p-0">
                <Image
                  src={placeholder?.imageUrl ?? `https://picsum.photos/seed/${book.bookId}/400/300`}
                  alt={book.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                  data-ai-hint={placeholder?.imageHint ?? 'book cover'}
                />
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="font-headline text-lg mb-1">{book.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <p className="text-xs text-muted-foreground mt-2 bg-secondary inline-block px-2 py-1 rounded-full">{book.category}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="w-full">
                  <p className="text-xs text-muted-foreground mb-1">Relevance</p>
                  <Progress value={book.relevanceScore} aria-label={`${book.relevanceScore}% relevant`} />
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
