
'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const monthlyData = [
  { month: 'Jan', checkouts: 186, reservations: 80 },
  { month: 'Feb', checkouts: 305, reservations: 200 },
  { month: 'Mar', checkouts: 237, reservations: 120 },
  { month: 'Apr', checkouts: 273, reservations: 190 },
  { month: 'May', checkouts: 209, reservations: 130 },
  { month: 'Jun', checkouts: 214, reservations: 140 },
]

const categoryData = [
    { name: 'Fiction', value: 450, fill: "var(--color-fiction)" },
    { name: 'Non-Fiction', value: 320, fill: "var(--color-non-fiction)" },
    { name: 'Sci-Fi', value: 280, fill: "var(--color-sci-fi)" },
    { name: 'Biography', value: 200, fill: "var(--color-biography)" },
    { name: 'History', value: 150, fill: "var(--color-history)" },
]

const monthlyChartConfig = {
  checkouts: {
    label: 'Checkouts',
    color: 'hsl(var(--primary))',
  },
  reservations: {
    label: 'Reservations',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig

const categoryChartConfig = {
  fiction: {
    label: "Fiction",
    color: "hsl(var(--chart-1))",
  },
  "non-fiction": {
    label: "Non-Fiction",
    color: "hsl(var(--chart-2))",
  },
  "sci-fi": {
    label: "Sci-Fi",
    color: "hsl(var(--chart-3))",
  },
  biography: {
    label: "Biography",
    color: "hsl(var(--chart-4))",
  },
  history: {
    label: "History",
    color: "hsl(var(--chart-5))",
  },
  value: {
    label: "Total",
  }
} satisfies ChartConfig

export default function ReportsPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">Library Reports</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Visualize library usage with our analytics dashboard.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={monthlyChartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                <Bar dataKey="checkouts" fill="var(--color-checkouts)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reservations" fill="var(--color-reservations)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={categoryChartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
