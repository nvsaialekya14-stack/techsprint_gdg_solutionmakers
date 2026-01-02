
'use client'

import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import Balancer from 'react-wrap-balancer'

const popularBooks = [
  {
    bookId: 'pop1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    reason: 'Top Checkouts This Month',
    badgeText: 'Popular',
    badgeVariant: 'default',
  },
  {
    bookId: 'pop2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    reason: 'Highest Rated by Readers',
    badgeText: 'Popular',
    badgeVariant: 'default',
  },
  {
    bookId: 'pop3',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    reason: 'Most Reserved This Week',
    badgeText: 'Popular',
    badgeVariant: 'default',
  },
]

const limitedEditions = [
  {
    bookId: 'lim1',
    title: 'The Lord of the Rings: Special Edition',
    author: 'J.R.R. Tolkien',
    reason: 'Signed by the illustrator, only 100 copies available.',
    badgeText: 'Limited',
    badgeVariant: 'destructive',
  },
  {
    bookId: 'lim2',
    title: 'Dune: Collector\'s Edition',
    author: 'Frank Herbert',
    reason: 'Features a unique foil cover and author\'s notes.',
    badgeText: 'Limited',
    badgeVariant: 'destructive',
  },
]

export default function PopularPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">
          <Balancer>Popular & Limited Editions</Balancer>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          <Balancer>Discover what's trending and grab exclusive limited-run books before they're gone.</Balancer>
        </p>
      </section>

      <div>
        <h2 className="font-headline text-3xl font-bold mb-6 text-center">Popular Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {popularBooks.map((book, index) => {
            const placeholder = PlaceHolderImages[index % PlaceHolderImages.length]
            return (
              <Card key={book.bookId} className="flex flex-col hover:shadow-xl transition-shadow">
                <CardHeader className="p-0 relative">
                  <Badge className="absolute top-2 right-2 z-10" variant={book.badgeVariant}>{book.badgeText}</Badge>
                   <Image
                    src={placeholder?.imageUrl ?? `https://picsum.photos/seed/${book.bookId}/400/300`}
                    alt={book.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-48 rounded-t-lg"
                    data-ai-hint={placeholder?.imageHint ?? 'book cover'}
                  />
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle as="h3" className="font-headline text-lg mb-1">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <p className="text-xs text-primary font-semibold">{book.reason}</p>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

       <div>
        <h2 className="font-headline text-3xl font-bold mb-6 text-center">Limited Editions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {limitedEditions.map((book, index) => {
             const placeholder = PlaceHolderImages[(index + popularBooks.length) % PlaceHolderImages.length]
            return (
              <Card key={book.bookId} className="flex flex-col md:flex-row items-center hover:shadow-xl transition-shadow overflow-hidden">
                <div className="w-full md:w-1/3">
                   <Image
                      src={placeholder?.imageUrl ?? `https://picsum.photos/seed/${book.bookId}/300/400`}
                      alt={book.title}
                      width={300}
                      height={400}
                      className="object-cover w-full h-48 md:h-full"
                      data-ai-hint={placeholder?.imageHint ?? 'book cover'}
                    />
                </div>
                <div className="w-full md:w-2/3 flex flex-col p-6">
                    <Badge className="w-fit mb-2" variant={book.badgeVariant}>{book.badgeText}</Badge>
                    <CardTitle as="h3" className="font-headline text-xl mb-1">{book.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-4">{book.author}</p>
                    <p className="text-sm">{book.reason}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

    </div>
  )
}
