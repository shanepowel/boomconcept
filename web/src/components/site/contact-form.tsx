'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export const topics = [
  { value: 'brief', label: 'A new brief or project' },
  { value: 'credentials', label: 'Request our credentials' },
  { value: 'procurement', label: 'Procurement and supplier information' },
  { value: 'careers', label: 'Careers' },
  { value: 'other', label: 'Something else' },
] as const

type Topic = (typeof topics)[number]['value']

export function ContactForm({ email, initialTopic }: { email: string; initialTopic?: string }) {
  const startTopic = (topics.find((t) => t.value === initialTopic)?.value ?? 'brief') as Topic
  const [topic, setTopic] = useState<Topic>(startTopic)

  // Concept build: no form backend yet, so the form opens a pre-filled email to BOOM!.
  // Swap this for a server action (for example with Resend) when the site goes live.
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const label = topics.find((t) => t.value === topic)?.label ?? 'Enquiry'
    const subject = `${label}: ${data.get('name')}${data.get('company') ? `, ${data.get('company')}` : ''}`
    const body = [
      String(data.get('message') || ''),
      '',
      `Name: ${data.get('name')}`,
      `Organisation: ${data.get('company') || '-'}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || '-'}`,
    ].join('\n')
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="topic" className="text-[15px] text-ink">
          What can we help with?
        </Label>
        <Select value={topic} onValueChange={(v) => setTopic(v as Topic)}>
          <SelectTrigger id="topic" className="h-12 w-full bg-white text-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {topics.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" required autoComplete="name" />
        <Field id="company" label="Organisation" autoComplete="organization" />
        <Field id="email" label="Email" type="email" required autoComplete="email" />
        <Field id="phone" label="Phone (optional)" type="tel" autoComplete="tel" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message" className="text-[15px] text-ink">
          {topic === 'careers' ? 'Tell us about you and why BOOM! appeals' : 'Tell us about the challenge'}
        </Label>
        <Textarea id="message" name="message" required className="min-h-40 bg-white text-base" />
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button type="submit" variant="brand" size="xl">
          Send <ArrowUpRight aria-hidden />
        </Button>
        <p className="text-sm text-[#5e5e5e]">This opens your email app with your message ready to send to {email}.</p>
      </div>
    </form>
  )
}

function Field({ id, label, type = 'text', required, autoComplete }: { id: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[15px] text-ink">
        {label}
      </Label>
      <Input id={id} name={id} type={type} required={required} autoComplete={autoComplete} className="h-12 bg-white text-base" />
    </div>
  )
}

/** Reads ?topic= so links like /contact?topic=careers preselect the right route. */
export function ContactFormWithTopic({ email }: { email: string }) {
  const params = useSearchParams()
  const topic = params.get('topic') ?? undefined
  return <ContactForm key={topic} email={email} initialTopic={topic} />
}
