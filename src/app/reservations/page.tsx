
'use client'

import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { differenceInDays, format } from 'date-fns'

const reservations = [
  {
    bookId: '1',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    reservedAt: new Date(2024, 5, 20),
    dueDate: new Date(2024, 6, 4),
  },
  {
    bookId: '2',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    reservedAt: new Date(2024, 6, 1),
    dueDate: new Date(2024, 6, 15),
  },
  {
    bookId: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    reservedAt: new Date(2024, 6, 5),
    dueDate: new Date(2024, 6, 19),
  },
]

function DueDateBadge({ dueDate }: { dueDate: Date }) {
  const daysLeft = differenceInDays(dueDate, new Date())
  let variant: 'default' | 'secondary' | 'destructive' = 'default'
  let text = `${daysLeft} days left`

  if (daysLeft < 0) {
    variant = 'destructive'
    text = `Overdue by ${Math.abs(daysLeft)} days`
  } else if (daysLeft <= 3) {
    variant = 'destructive'
    text = `Due in ${daysLeft} days`
  } else if (daysLeft <= 7) {
    variant = 'secondary'
    text = `Due in ${daysLeft} days`
  }

  return <Badge variant={variant}>{text}</Badge>
}

export default function ReservationsPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">Reservations</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Manage your book reservations and track due dates.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((reservation, index) => {
          const placeholder = PlaceHolderImages[index % PlaceHolderImages.length]
          return (
            <Card key={reservation.bookId} className="flex flex-col overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={placeholder?.imageUrl ?? `https://picsum.photos/seed/${reservation.bookId}/400/300`}
                  alt={reservation.title}
                  width={400}
                  height={200}
                  className="object-cover w-full h-40"
                  data-ai-hint={placeholder?.imageHint ?? 'book cover'}
                />
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle as="h3" className="font-headline text-lg mb-1">{reservation.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{reservation.author}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Reserved: {format(reservation.reservedAt, 'PPP')}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <p className="text-sm font-medium">
                  Due: {format(reservation.dueDate, 'PPP')}
                </p>
                <DueDateBadge dueDate={reservation.dueDate} />
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
