import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CtaBand, PageHero, ReadingLayout, TextLink } from '@/components/site/blocks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getInsights } from '@/lib/data'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = (await getInsights({ stega: false })).find((item) => item.slug === slug)
  return article ? { title: article.title, description: article.summary } : {}
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params
  const articles = await getInsights()
  const article = articles.find((item) => item.slug === slug)
  if (!article) notFound()

  const related = articles.filter((item) => item.slug !== slug).slice(0, 2)

  const sections = article.sections.map((section, index) => ({ ...section, id: `section-${index + 1}` }))
  const chapters = [
    ...(article.example ? [{ id: 'compare', title: 'Compare the two versions' }] : []),
    ...sections.map(({ id, heading }) => ({ id, title: heading })),
  ]

  return (
    <>
      <PageHero artwork="press" copy={{ eyebrow: article.topic, title: article.title, lede: article.summary, image: article.image }}>
        {article.byline && <p className="mt-5 font-semibold text-ink">{article.byline}</p>}
      </PageHero>
      <ReadingLayout back={{ href: '/insights', label: 'All insights' }} chapters={chapters}>
        <div className="max-w-[66ch] space-y-8">
          {article.example && (
            <section id="compare" className="border-t-4 border-magenta bg-warm p-[clamp(20px,4vw,40px)]">
              <h2 className="text-2xl">Compare the two versions</h2>
              <Tabs defaultValue="original" className="mt-4">
                <TabsList aria-label="Example versions">
                  <TabsTrigger value="original">First draft</TabsTrigger>
                  <TabsTrigger value="revision">Revised claim</TabsTrigger>
                </TabsList>
                <TabsContent value="original" className="pt-4 text-lg">{article.example.original}</TabsContent>
                <TabsContent value="revision" className="pt-4 text-lg">{article.example.revision}</TabsContent>
              </Tabs>
              <p className="mt-5 border-t border-border pt-4 text-sm">{article.example.note}</p>
            </section>
          )}
          {sections.map((section) => (
            <section id={section.id} key={section.id} className="border-t border-border pt-6">
              <h2 className="text-2xl">{section.heading}</h2>
              <p className="mt-3 text-lg leading-relaxed">{section.text}</p>
            </section>
          ))}
          {related.length > 0 && <aside aria-label="More insights" className="grid gap-3 border-t border-ink pt-6">{related.map((item) => <TextLink key={item.slug} href={`/insights/${encodeURIComponent(item.slug)}`}>{item.title}</TextLink>)}</aside>}
        </div>
      </ReadingLayout>
      <CtaBand title="Have a brief we can help with?" body="Tell us what you need people to understand or do differently." />
    </>
  )
}
