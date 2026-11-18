import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { ContactForm, ContactFormWithTopic } from '@/components/site/contact-form'
import { Eyebrow, PageHero } from '@/components/site/blocks'
import { getPage, getSettings, getTeam } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('contact', { stega: false })
  return { title: page.seoTitle || 'Contact', description: page.seoDescription }
}

export default async function ContactPage() {
  const [page, settings, team] = await Promise.all([getPage('contact'), getSettings(), getTeam()])
  const contacts = team.filter((m) => m.showOnContact)

  return (
    <>
      <PageHero copy={page} />

      <section className="wrap section-pad grid items-start gap-[clamp(40px,6vw,88px)] md:grid-cols-[7fr_5fr]">
        <div>
          <Eyebrow>Send us a message</Eyebrow>
          <h2 className="mb-8 type-title">Choose a route and we’ll take it from there.</h2>
          <Suspense fallback={<ContactForm email={settings.enquiriesEmail} />}>
            <ContactFormWithTopic email={settings.enquiriesEmail} />
          </Suspense>
        </div>
        <aside className="grid gap-5">
          <Eyebrow className="mb-0">Talk to us directly</Eyebrow>
          {contacts.map((m) => (
            <div key={m.slug} className="grid grid-cols-[76px_1fr] items-center gap-5 rounded-xl bg-warm p-5">
              <Image src={m.photo.src} alt={m.photo.alt} width={152} height={152} className="size-[76px] rounded-full object-cover" />
              <div>
                <h3 className="text-lg">{m.fullName}</h3>
                <p className="text-[15px]">{m.role}</p>
                <div className="mt-1 flex flex-col text-[15px] font-bold">
                  {m.email ? (
                    <a href={`mailto:${m.email}`} className="text-ink link-underline [text-underline-offset:4px]">
                      {m.email}
                    </a>
                  ) : null}
                  {m.phone ? (
                    <a href={`tel:${m.phone.replace(/[^+\d]/g, '').replace('+440', '+44')}`} className="mt-1 text-ink">
                      {m.phone}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          <a href={settings.linkedinUrl} className="mt-2 font-bold text-ink link-underline">
            BOOM! on LinkedIn
          </a>
        </aside>
      </section>

      <section className="bg-night text-[#d9d6de]">
        <div className="wrap section-pad">
          <Eyebrow tone="light">Where we are</Eyebrow>
          <h2 className="type-title text-white">Three bases. One team.</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {settings.offices.map((o) => (
              <li key={o.city} className="border-t-2 border-white pt-5">
                <h3 className="text-3xl text-white">{o.city}</h3>
                {o.detail ? <p className="mt-2">{o.detail}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
