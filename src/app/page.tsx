
'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  BookCopy,
  CalendarCheck,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import Balancer from 'react-wrap-balancer'

const summaryStats = [
  {
    title: 'Total Books',
    value: '1,250',
    icon: BookCopy,
  },
  {
    title: 'Reservations',
    value: '3',
    icon: CalendarCheck,
  },
  {
    title: 'Overdue',
    value: '1',
    icon: AlertTriangle,
    className: 'text-destructive',
  },
]

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

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <section className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">
          <Balancer>Welcome to LibWise</Balancer>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          <Balancer>Your library at a glance. Manage reservations, discover new books, and more.</Balancer>
        </p>
      </section>

      {/* Summary Cards */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {summaryStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle as="h3" className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon
                className={`h-4 w-4 text-muted-foreground ${stat.className ?? ''}`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Books Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-3xl font-bold">Popular Books</h2>
            <Button variant="link" asChild>
                <Link href="/popular">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {popularBooks.map((book, index) => {
            const placeholder = PlaceHolderImages[index % PlaceHolderImages.length]
            return (
              <Card
                key={book.bookId}
                className="flex flex-col transition-shadow hover:shadow-xl"
              >
                <CardHeader className="relative p-0">
                  <Badge
                    className="absolute right-2 top-2 z-10"
                    variant={book.badgeVariant as 'default' | 'destructive'}
                  >
                    {book.badgeText}
                  </Badge>
                  <Image
                    src={
                      placeholder?.imageUrl ??
                      `https://picsum.photos/seed/${book.bookId}/400/300`
                    }
                    alt={book.title}
                    width={400}
                    height={300}
                    className="h-48 w-full rounded-t-lg object-cover"
                    data-ai-hint={placeholder?.imageHint ?? 'book cover'}
                  />
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle as="h3" className="mb-1 font-headline text-lg">
                    {book.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <p className="text-xs font-semibold text-primary">
                    {book.reason}
                  </p>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
