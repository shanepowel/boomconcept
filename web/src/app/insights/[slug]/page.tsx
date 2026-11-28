import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CtaBand, PageHero, ReadingLayout } from '@/components/site/blocks'
import { BurstFingerprint, InsightArt } from '@/components/site/insight-art'
import { ReadingProgress } from '@/components/site/reading-progress'
import { readingMinutes } from '@/content/insights'
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
      <ReadingProgress target="#article-body" />
      <PageHero
        copy={{ eyebrow: article.topic, title: article.title, lede: article.summary, image: article.image }}
        art={<BurstFingerprint seed={article.slug} topic={article.topic} className="block aspect-[3/2] w-full max-lg:aspect-[5/2]" />}
      >
        <p className="mt-5 text-sm font-semibold text-ink">{[article.byline, `${readingMinutes(article)} min read`].filter(Boolean).join(' · ')}</p>
      </PageHero>
      <div id="article-body">
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
        </div>
      </ReadingLayout>
      </div>
      {related.length > 0 && (
        <aside aria-labelledby="read-next" className="bg-warm">
          <div className="wrap section-pad">
            <h2 id="read-next" className="type-title">Read next</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/insights/${encodeURIComponent(item.slug)}`} className="group block overflow-hidden rounded-2xl bg-white">
                    <InsightArt article={item} className="aspect-[2/1] w-full" />
                    <div className="p-6">
                      <p className="text-sm font-semibold text-magenta-dark">{item.topic} · {readingMinutes(item)} min read</p>
                      <h3 className="mt-1.5 text-2xl text-pretty group-hover:text-magenta-dark">{item.title}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
      <CtaBand title="Have a brief we can help with?" body="Tell us what you need people to understand or do differently." />
    </>
  )
}
