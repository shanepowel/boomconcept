import { pageSections } from '@/content/page-sections'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ContactFaq } from '@/components/site/contact-faq'
import { ContactForm } from '@/components/site/contact-form'
import { EditableSectionHead, Eyebrow } from '@/components/site/blocks'
import { OfficeStrip } from '@/components/site/office-strip'
import { Button } from '@/components/ui/button'
import { contactTopics, getContactTopic } from '@/content/contact-topics'
import { getEnquiryContext } from '@/lib/enquiry-context'
import { getPage, getSettings, getTeam } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('contact', { stega: false })
  return { title: page.seoTitle || 'Contact', description: page.seoDescription }
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string | string[]; stage?: string; lineup?: string }> }) {
  const [page, settings, team, params] = await Promise.all([getPage('contact'), getSettings({ stega: false }), getTeam(), searchParams])
  const contacts = team.filter((person) => person.showOnContact)
  const topic = getContactTopic(params.topic)
  const context = topic === 'brief' ? await getEnquiryContext(params.stage, params.lineup) : undefined
  const recipient = topic === 'careers' ? settings.careersEmail : settings.enquiriesEmail

  return (
    <>
      <section className="page-masthead border-b border-border bg-warm">
        <div className="wrap masthead-grid masthead-grid--contact">
          <div>
            {page.eyebrow && <Eyebrow>{page.eyebrow}</Eyebrow>}
            <h1 className="editorial-display max-w-[13ch]">{page.title}</h1>
            {page.lede && <p className="mt-5 max-w-[44ch] text-lg leading-relaxed">{page.lede}</p>}
            <Button asChild variant="outlineBrand" className="mt-5 lg:hidden"><a href="#form">Go to the enquiry form</a></Button>
            {contacts.length > 0 && (
              <div className="mt-8 border-t border-ink pt-5">
                <h2 className="text-lg">Prefer to talk directly?</h2>
                <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  {contacts.map((person) => (
                    <li key={person.slug} className="flex items-center gap-3">
                      <Image src={person.photo.src} alt="" width={112} height={112} className="size-14 shrink-0 rounded-full object-cover" />
                      <div className="min-w-0 text-sm">
                        <p className="font-bold text-ink">{person.fullName}</p>
                        <p>{person.role}</p>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                          {person.email && <a href={`mailto:${person.email}`} className="font-semibold text-ink link-underline">Email <span className="sr-only">{person.name}</span></a>}
                          {person.phone && <a href={`tel:${person.phone.replace(/[^+\d]/g, '')}`} className="font-semibold text-ink link-underline">{person.phone}<span className="sr-only">, call {person.name}</span></a>}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div id="form" className="scroll-mt-28 border-t-4 border-magenta bg-white p-[clamp(18px,3.6vw,44px)]">
            <p className="mb-3 text-sm font-semibold text-ink" id="enquiry-topic-label">What can we help with?</p>
            <nav aria-labelledby="enquiry-topic-label" className="flex flex-wrap gap-2 border-b border-border pb-5">
              {Object.entries(contactTopics).map(([value, { label }]) => (
                <Button key={value} asChild variant={value === topic ? 'brand' : 'outline'} className="h-11 rounded-full px-4">
                  <Link href={`/contact?topic=${value}#form`} aria-current={value === topic ? 'page' : undefined}>{label}</Link>
                </Button>
              ))}
            </nav>
            <h2 className="mt-6 mb-5 text-2xl">{contactTopics[topic].heading}</h2>
            <ContactForm key={topic} topic={topic} email={recipient} context={context} demo={process.env.ENQUIRY_DEMO_MODE === 'true'} />
          </div>
        </div>
      </section>

      <section className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad">
          <Eyebrow tone="light">Where we are</Eyebrow>
          <h2 className="mb-8 type-title text-white">Three bases. One team.</h2>
          <OfficeStrip offices={settings.offices} />
        </div>
      </section>

      <section className="wrap section-pad section-split">
        <EditableSectionHead page={page} id="questions" defaults={pageSections.contact.questions} className="mb-0" />
        <ContactFaq />
      </section>
    </>
  )
}
