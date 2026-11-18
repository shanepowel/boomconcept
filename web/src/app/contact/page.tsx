import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowUpRight, FileText, Mail, MessageSquareText, Users } from 'lucide-react'
import { ContactFaq } from '@/components/site/contact-faq'
import { ContactForm, ContactFormWithTopic } from '@/components/site/contact-form'
import { Eyebrow } from '@/components/site/blocks'
import { OfficeMap } from '@/components/site/office-map'
import { Button } from '@/components/ui/button'
import { getPage, getSettings, getTeam } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('contact', { stega: false })
  return { title: page.seoTitle || 'Contact', description: page.seoDescription }
}

export default async function ContactPage() {
  const [page, settings, team] = await Promise.all([getPage('contact'), getSettings(), getTeam()])
  const contacts = team.filter((m) => m.showOnContact)
  const lead = contacts[0]

  const options = [
    {
      icon: MessageSquareText,
      title: 'Start a brief',
      body: 'Tell us about the challenge and we will put the right people on it.',
      action: { label: 'Tell us about it', href: '/contact?topic=brief#form' },
    },
    {
      icon: FileText,
      title: 'Request credentials',
      body: 'Our experience and examples for your therapy area.',
      action: { label: 'Request credentials', href: '/contact?topic=credentials#form' },
    },
    {
      icon: Users,
      title: 'Join the band',
      body: 'Brilliant at the job and great to work with? Say hello.',
      action: { label: 'Life at BOOM!', href: '/careers' },
    },
    {
      icon: Mail,
      title: 'Email us',
      body: lead ? `Prefer to write? Reach ${lead.fullName}, ${lead.role}, directly.` : 'Prefer to write? Drop us a line.',
      action: { label: lead?.email ?? settings.enquiriesEmail, href: `mailto:${lead?.email ?? settings.enquiriesEmail}` },
    },
  ]

  return (
    <>
      {/* Hero + map */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_80%_at_50%_0%,#fbe6f1_0%,transparent_70%)]" />
        <div className="wrap pt-[clamp(48px,7vw,104px)] pb-[clamp(40px,5vw,72px)]">
          <div className="mx-auto max-w-3xl text-center">
            {page.eyebrow ? <Eyebrow className="justify-center">{page.eyebrow}</Eyebrow> : null}
            <h1 className="type-display">{page.title}</h1>
            {page.lede ? <p className="mx-auto mt-6 max-w-[620px] text-[clamp(1.08rem,1.4vw,1.25rem)] leading-relaxed">{page.lede}</p> : null}
          </div>
          <div className="mx-auto mt-[clamp(36px,5vw,64px)] max-w-5xl">
            <OfficeMap offices={settings.offices} />
          </div>
        </div>
      </section>

      {/* Contact options */}
      <section className="wrap pb-[clamp(56px,7vw,104px)]">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {options.map(({ icon: Icon, title, body, action }) => (
            <li key={title} className="flex flex-col rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-magenta hover:shadow-[0_12px_30px_-12px_rgba(217,0,112,0.35)]">
              <span className="flex size-11 items-center justify-center rounded-xl bg-magenta-tint text-magenta">
                <Icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-5 text-xl">{title}</h2>
              <p className="mt-1.5 text-[15px]">{body}</p>
              <Button asChild variant="outlineBrand" size="lg" className="mt-5 h-10 self-start px-4 text-sm font-bold">
                <Link href={action.href}>
                  {action.label} <ArrowUpRight aria-hidden />
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </section>

      {/* Form */}
      <section id="form" className="scroll-mt-24 bg-warm">
        <div className="wrap section-pad grid items-start gap-[clamp(40px,6vw,88px)] md:grid-cols-[7fr_5fr]">
          <div className="rounded-2xl bg-white p-[clamp(24px,3.5vw,44px)] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            <Eyebrow>Send us a message</Eyebrow>
            <h2 className="mb-8 type-title">Choose a route and we’ll take it from there.</h2>
            <Suspense fallback={<ContactForm email={settings.enquiriesEmail} />}>
              <ContactFormWithTopic email={settings.enquiriesEmail} />
            </Suspense>
          </div>
          <aside className="grid gap-5 md:sticky md:top-28">
            <Eyebrow className="mb-0">Talk to us directly</Eyebrow>
            {contacts.map((m) => (
              <div key={m.slug} className="grid grid-cols-[76px_1fr] items-center gap-5 rounded-2xl bg-white p-5">
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
                  </div>
                </div>
              </div>
            ))}
            <a href={settings.linkedinUrl} className="mt-1 font-bold text-ink link-underline">
              Follow BOOM! on LinkedIn
            </a>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap section-pad grid gap-[clamp(32px,6vw,96px)] md:grid-cols-[5fr_7fr]">
        <div>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="type-title">Good to know before we talk.</h2>
          <div className="mt-8 rounded-2xl bg-night p-6 text-[#d6d2db]">
            <div className="flex">
              {team.slice(0, 4).map((m) => (
                <Image key={m.slug} src={m.photo.src} alt="" width={96} height={96} className="-ml-2.5 size-12 rounded-full border-[3px] border-night object-cover first:ml-0" />
              ))}
            </div>
            <h3 className="mt-4 text-xl text-white">Still have questions?</h3>
            <p className="mt-1 text-[15px]">Can’t find what you’re looking for? Drop us a line and someone from the band will come back to you.</p>
            <Button asChild variant="magenta" size="xl" className="mt-5">
              <a href={`mailto:${settings.enquiriesEmail}`}>
                Email us <ArrowUpRight aria-hidden />
              </a>
            </Button>
          </div>
        </div>
        <ContactFaq />
      </section>
    </>
  )
}
