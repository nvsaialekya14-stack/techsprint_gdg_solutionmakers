'use client'

import { useState } from 'react'
import type { SyllabusImageBookRecommendationOutput } from '@/ai/flows/syllabus-image-book-recommendation'
import { getBookRecommendations } from './actions'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, UploadCloud, AlertTriangle } from 'lucide-react'
import { PlaceHolderImages } from '@/lib/placeholder-images'

export default function SyllabusRecommendationPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<SyllabusImageBookRecommendationOutput | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setRecommendations(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a syllabus image to upload.')
      return
    }

    setLoading(true)
    setError(null)
    setRecommendations(null)

    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const base64Data = reader.result as string
        const result = await getBookRecommendations({ syllabusImageDataUri: base64Data })
        if (result.error) {
          setError(result.error)
        } else {
          setRecommendations(result.data)
        }
        setLoading(false)
      }
      reader.onerror = () => {
        setError('Failed to read the file.')
        setLoading(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-5xl">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">Syllabus AI Recommendations</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Upload an image of your syllabus, and our AI will recommend the most relevant books from our library.
        </p>
      </section>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="syllabus-image" className="text-base">Upload Syllabus</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                  <div className="text-center">
                    {preview ? (
                       <Image src={preview} alt="Syllabus preview" width={200} height={200} className="mx-auto h-32 w-auto object-contain rounded-md" />
                    ) : (
                      <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" aria-hidden="true" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                      <Label htmlFor="syllabus-image" className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary/80">
                        <span>Upload a file</span>
                        <Input id="syllabus-image" name="syllabus-image" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                      </Label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              <Button type="submit" disabled={loading || !file} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {loading ? 'Analyzing...' : 'Get Recommendations'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
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

      {recommendations && recommendations.bookRecommendations.length > 0 && (
        <div className="mt-12">
          <h2 className="font-headline text-3xl font-bold text-center mb-8">Recommended Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.bookRecommendations.map((book, index) => {
              const placeholder = PlaceHolderImages[index % PlaceHolderImages.length];
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
            )})}
          </div>
        </div>
      )}

      {recommendations && recommendations.bookRecommendations.length === 0 && (
        <div className="mt-12 text-center">
            <h2 className="font-headline text-2xl font-bold">No Recommendations Found</h2>
            <p className="text-muted-foreground mt-2">We couldn't find any relevant books for the uploaded syllabus. Please try another one.</p>
        </div>
      )}
    </div>
  )
}
