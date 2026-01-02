
'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Activity,
  ArrowRight,
  BookCheck,
  BookPlus,
  BookX,
  CalendarClock,
} from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { differenceInDays, format } from 'date-fns'
import Balancer from 'react-wrap-balancer'

const summaryStats = [
  {
    title: 'Books Borrowed',
    value: '12',
    icon: BookCheck,
  },
  {
    title: 'Active Reservations',
    value: '3',
    icon: CalendarClock,
  },
  {
    title: 'Books Overdue',
    value: '2',
    icon: BookX,
  },
]

const reservations = [
  {
    bookId: '1',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    dueDate: new Date(2024, 6, 4),
  },
  {
    bookId: '2',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    dueDate: new Date(2024, 6, 15),
  },
]

function DueDateBadge({ dueDate }: { dueDate: Date }) {
  const daysLeft = differenceInDays(dueDate, new Date())
  let variant: 'default' | 'secondary' | 'destructive' = 'default'
  let text = `${daysLeft} days left`

  if (daysLeft < 0) {
    variant = 'destructive'
    text = `Overdue`
  } else if (daysLeft <= 3) {
    variant = 'destructive'
    text = `Due in ${daysLeft}d`
  } else if (daysLeft <= 7) {
    variant = 'secondary'
    text = `Due in ${daysLeft}d`
  }

  return <Badge variant={variant}>{text}</Badge>
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <section className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">
          <Balancer>Welcome Back, Librarian!</Balancer>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Here's a snapshot of your library's activity.
        </p>
      </section>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {summaryStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle as="h3" className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Reservations */}
        <div className="lg:col-span-2">
          <h2 className="font-headline text-3xl font-bold mb-6">
            Current Reservations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reservations.map((res, index) => {
              const placeholder = PlaceHolderImages[index % PlaceHolderImages.length]
              return (
                <Card key={res.bookId}>
                  <CardHeader className="p-0">
                     <Image
                        src={placeholder?.imageUrl ?? `https://picsum.photos/seed/${res.bookId}/400/200`}
                        alt={res.title}
                        width={400}
                        height={200}
                        className="object-cover w-full h-32 rounded-t-lg"
                        data-ai-hint={placeholder?.imageHint ?? 'book cover'}
                      />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-md">{res.title}</h4>
                    <p className="text-xs text-muted-foreground">{res.author}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4 pt-0">
                    <p className="text-sm">Due: {format(res.dueDate, 'MMM d')}</p>
                    <DueDateBadge dueDate={res.dueDate} />
                  </CardFooter>
                </Card>
              )
            })}
             <Card className="border-dashed border-2 hover:border-primary hover:text-primary transition-colors flex items-center justify-center">
               <Link href="/reservations" className="text-center p-6">
                  <h4 className="font-semibold">View All Reservations</h4>
                  <p className="text-sm text-muted-foreground mt-1">Manage all upcoming due dates</p>
               </Link>
             </Card>
          </div>
        </div>

        {/* Discover Section */}
        <div>
          <h2 className="font-headline text-3xl font-bold mb-6">Discover</h2>
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle as="h3">AI Recommendations</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Upload a syllabus to get relevant book suggestions.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Image src="https://images.unsplash.com/photo-1519671843793-473b1c40b8a0?w=800&q=80" alt="AI image" width={400} height={200} className="rounded-lg object-cover w-full h-32" />
            </CardContent>
            <CardFooter>
              <Button variant="secondary" asChild className="w-full">
                <Link href="/syllabus-search">
                  Try Syllabus Scan <ArrowRight />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="p-3 bg-muted rounded-full mb-4">
                    <BookPlus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-bold">New Arrivals</h3>
                <p className="text-muted-foreground mb-4 text-sm">Check out the latest additions to our collection.</p>
                <Button asChild>
                    <Link href="/popular">Explore New Books</Link>
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
