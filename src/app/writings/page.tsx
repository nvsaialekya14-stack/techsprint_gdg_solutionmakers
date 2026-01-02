
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Balancer from 'react-wrap-balancer'

const articles = [
  {
    id: 1,
    title: 'The Future of Digital Libraries',
    author: 'Jane Doe',
    avatar: 'https://picsum.photos/seed/author1/40/40',
    date: 'June 28, 2024',
    excerpt: 'As technology evolves, so do our libraries. Discover how AI, blockchain, and other innovations are shaping the future of information access and preservation in the digital age.',
  },
  {
    id: 2,
    title: 'A Deep Dive into Classic Literature',
    author: 'John Smith',
    avatar: 'https://picsum.photos/seed/author2/40/40',
    date: 'June 25, 2024',
    excerpt: 'From Shakespeare to Austen, we explore the timeless themes and enduring power of classic literature, and why these stories continue to resonate with readers centuries later.',
  },
  {
    id: 3,
    title: 'The Art of Book Curation',
    author: 'Emily White',
    avatar: 'https://picsum.photos/seed/author3/40/40',
    date: 'June 22, 2024',
    excerpt: 'What makes a library collection great? A professional curator shares insights into the process of selecting books that inspire, educate, and entertain a diverse community.',
  },
]

export default function WritingsPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">
          <Balancer>Community Writings</Balancer>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          <Balancer>Explore articles, essays, and stories from our talented community of readers and writers.</Balancer>
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Card key={article.id} className="flex flex-col hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle as="h3" className="font-headline text-xl">
                <Balancer>{article.title}</Balancer>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{article.excerpt}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-3 mt-auto">
              <Avatar className="h-9 w-9">
                <AvatarImage src={article.avatar} alt={article.author} />
                <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{article.author}</p>
                <p className="text-xs text-muted-foreground">{article.date}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
