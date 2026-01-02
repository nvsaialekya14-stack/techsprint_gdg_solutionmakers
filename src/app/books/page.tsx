'use client'

import { useState } from 'react'
import type { SyllabusImageBookRecommendationOutput } from '@/ai/flows/syllabus-image-book-recommendation'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, AlertTriangle, Search } from 'lucide-react'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import BookRecommendations from '@/components/book-recommendations'

type BookRecommendation = {
    bookId: string;
    title: string;
    author: string;
    category: string;
    relevanceScore: number;
}

export default function BookSearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<BookRecommendation[] | null>(null)

  const handleSearch = async () => {
    if (!searchTerm) {
      setError('Please enter a search term.')
      return
    }

    setLoading(true)
    setError(null)
    setRecommendations(null)

    // This is a mock search.
    setTimeout(() => {
      const mockData: BookRecommendation[] = [
          {
            bookId: '1',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            category: 'Classic Literature',
            relevanceScore: 95,
          },
          {
            bookId: '2',
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            category: 'Classic Literature',
            relevanceScore: 92,
          },
          {
            bookId: '3',
            title: '1984',
            author: 'George Orwell',
            category: 'Dystopian Fiction',
            relevanceScore: 98,
          },
        ]
      setRecommendations(mockData)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto max-w-5xl">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">Search for Books</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find any book in our library by title, author, or category.
        </p>
      </section>

      <div className="max-w-2xl mx-auto">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="e.g., 'The Great Gatsby' or 'F. Scott Fitzgerald'"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button type="submit" onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
            Search
          </Button>
        </div>
      </div>
      
      {loading && (
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="w-full h-48 bg-muted rounded-md"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-6 w-3/4 bg-muted rounded"></div>
                  <div className="h-4 w-1/2 bg-muted rounded mt-2"></div>
                </CardContent>
                <CardFooter>
                   <div className="h-4 w-full bg-muted rounded"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-12 max-w-2xl mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations && (
        <BookRecommendations recommendations={{ bookRecommendations: recommendations }} />
      )}
    </div>
  )
}
