'use client'

import { useState } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { contactTopics, type ContactTopic } from '@/content/contact-topics'

export function ContactForm({ email, topic }: { email: string; topic: ContactTopic }) {
  const { prompt, subject } = contactTopics[topic]
  const [draft, setDraft] = useState<string | null>(null)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const organisation = String(data.get('company') ?? '').trim()
    const senderEmail = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const body = [message, '', name, organisation, senderEmail].filter((line, i) => line || i === 1).join('\r\n')
    const href = `mailto:${email}?subject=${encodeURIComponent(`${subject}: ${name}`)}&body=${encodeURIComponent(body)}`
    setDraft(href)
    window.location.href = href
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" required autoComplete="name" />
        <Field id="email" label="Your email" type="email" required autoComplete="email" />
      </div>
      {topic !== 'careers' && <Field id="company" label="Organisation (optional)" autoComplete="organization" />}
      <div className="grid gap-2">
        <Label htmlFor="message" className="text-[15px] text-ink">Your message</Label>
        <p id="message-hint" className="text-sm text-body">{prompt}</p>
        <Textarea id="message" name="message" required aria-describedby="message-hint" className="min-h-32 bg-white text-base" />
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button type="submit" variant="brand" size="xl">Open email draft <ArrowUpRight aria-hidden /></Button>
        <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink link-underline"><Mail className="size-4" aria-hidden /> Email us directly</a>
      </div>
      <p className="text-sm text-body">Your email app opens with the draft. You can review it before you send.</p>
      {draft && (
        <p role="status" className="border-l-2 border-magenta bg-warm p-4 text-sm">
          If your email app didn’t open, <a href={draft} className="font-bold text-ink link-underline">try opening the draft again</a>.
        </p>
      )}
    </form>
  )
}

function Field({ id, label, type = 'text', required, autoComplete }: { id: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[15px] text-ink">{label}</Label>
      <Input id={id} name={id} type={type} required={required} autoComplete={autoComplete} className="h-12 bg-white text-base" />
    </div>
  )
}
