import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function ReportsPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">Reports</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          View library usage reports and analytics.
        </p>
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page is under construction.</p>
        </CardContent>
      </Card>
    </div>
  )
}
