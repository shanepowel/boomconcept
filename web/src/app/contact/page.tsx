import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { Check } from 'lucide-react'
import { ContactFaq } from '@/components/site/contact-faq'
import { ContactForm, ContactFormWithTopic } from '@/components/site/contact-form'
import { Eyebrow } from '@/components/site/blocks'
import { OfficeStrip } from '@/components/site/office-strip'
import { getPage, getSettings, getTeam } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('contact', { stega: false })
  return { title: page.seoTitle || 'Contact', description: page.seoDescription }
}

const reasons = ['A new brief, a launch or a brand that needs a fresh story', 'Our credentials for your therapy area', 'Supplier and procurement information', 'Joining the band']

export default async function ContactPage() {
  const [page, settings, team] = await Promise.all([getPage('contact'), getSettings(), getTeam()])
  const contacts = team.filter((m) => m.showOnContact)

  return (
    <>
      {/* Form first */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(55%_75%_at_15%_0%,#fbe6f1_0%,transparent_70%)]" />
        <div className="wrap grid items-start gap-[clamp(40px,6vw,88px)] py-[clamp(40px,6vw,88px)] lg:grid-cols-[5fr_7fr]">
          <div className="lg:sticky lg:top-28">
            {page.eyebrow ? <Eyebrow>{page.eyebrow}</Eyebrow> : null}
            <h1 className="type-display">{page.title}</h1>
            {page.lede ? <p className="mt-6 max-w-[520px] text-[clamp(1.08rem,1.4vw,1.2rem)] leading-relaxed">{page.lede}</p> : null}

            <h2 className="mt-10 text-[13px] font-bold tracking-[0.14em] text-ink uppercase">People get in touch about</h2>
            <ul className="mt-4 space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex gap-3 text-ink">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-magenta-tint text-magenta">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {r}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {contacts.map((m) => (
                <div key={m.slug} className="flex items-center gap-4">
                  <Image src={m.photo.src} alt={m.photo.alt} width={112} height={112} className="size-14 rounded-full object-cover" />
                  <div className="text-[15px]">
                    <p className="font-semibold text-ink">{m.fullName}</p>
                    <p>{m.role}</p>
                    {m.email ? (
                      <a href={`mailto:${m.email}`} className="font-bold text-ink link-underline [text-underline-offset:4px]">
                        {m.email}
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="form" className="scroll-mt-28 rounded-2xl border border-border bg-white p-[clamp(24px,3.5vw,44px)] shadow-[0_24px_60px_-30px_rgba(17,17,17,0.25)]">
            <h2 className="text-2xl">Send us a message</h2>
            <p className="mt-1 mb-7 text-[15px]">Choose a route and we&apos;ll make sure the right person picks it up.</p>
            <Suspense fallback={<ContactForm email={settings.enquiriesEmail} />}>
              <ContactFormWithTopic email={settings.enquiriesEmail} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-night text-[#d9d6de]">
        <div className="wrap py-[clamp(56px,7vw,96px)]">
          <Eyebrow tone="light">Where we are</Eyebrow>
          <h2 className="mb-10 type-title text-white">Three bases. One team.</h2>
          <OfficeStrip offices={settings.offices} />
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap section-pad grid gap-[clamp(32px,6vw,96px)] md:grid-cols-[5fr_7fr]">
        <div>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="type-title">Good to know before we talk.</h2>
          <p className="mt-4">
            Can&apos;t find what you&apos;re looking for?{' '}
            <a href={`mailto:${settings.enquiriesEmail}`} className="font-bold text-ink link-underline [text-underline-offset:4px]">
              Drop us a line
            </a>{' '}
            and someone from the band will come back to you.
          </p>
        </div>
        <ContactFaq />
      </section>
    </>
  )
}
