'use client'

import { useActionState, useState } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { submitEnquiry } from '@/app/contact/actions'
import { contactTopics, type ContactTopic } from '@/content/contact-topics'

const feedback: Record<string, string> = {
  demo: 'Demo complete. No email was sent.',
  sent: 'Your enquiry has been sent.',
  invalid: 'Check your name, email address and message and try again.',
  unavailable: 'Online enquiries are unavailable. Please email us directly.',
  error: 'We couldn’t send your enquiry. Try again or email us directly.',
}

export function ContactForm({ email, topic, context }: { email: string; topic: ContactTopic; context?: { label: string; href: string } }) {
  const { prompt } = contactTopics[topic]
  const [status, action, pending] = useActionState(submitEnquiry, '')
  const [values, setValues] = useState<Record<string, string>>({})
  const contextFields = new URLSearchParams(context?.href)

  return (
    <form action={action} onChange={(event) => {
      const field = event.target
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        setValues((previous) => ({ ...previous, [field.name]: field.value }))
      }
    }} className="grid gap-5">
      <input type="hidden" name="topic" value={topic} />
      {context && <p className="border-l-2 border-magenta bg-warm p-4 text-sm">Brief context: <strong>{context.label}</strong></p>}
      {[...contextFields].map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />)}
      <input name="website" aria-hidden="true" tabIndex={-1} autoComplete="off" className="hidden" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field values={values} id="name" label="Your name" required autoComplete="name" />
        <Field values={values} id="email" label="Your email" type="email" required autoComplete="email" />
      </div>
      {topic !== 'careers' && <Field values={values} id="company" label="Organisation (optional)" autoComplete="organization" />}
      <div className="grid gap-2">
        <Label htmlFor="message" className="text-[15px] text-ink">Your message</Label>
        <p id="message-hint" className="text-sm text-body">{prompt}</p>
        <Textarea id="message" name="message" value={values.message ?? ''} required maxLength={5000} aria-describedby="message-hint" className="min-h-32 bg-white text-base" />
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button type="submit" variant="brand" size="xl" disabled={pending || status === 'sent'}>{pending ? 'Sending…' : 'Send enquiry'} <ArrowUpRight aria-hidden /></Button>
        <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink link-underline"><Mail className="size-4" aria-hidden /> Email us directly</a>
      </div>
      {status && <p role="status" className="border-l-2 border-magenta bg-warm p-4 text-sm">{feedback[status]}</p>}
    </form>
  )
}

function Field({ values, id, label, type = 'text', required, autoComplete }: { values: Record<string, string>; id: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-[15px] text-ink">{label}</Label>
      <Input id={id} name={id} value={values[id] ?? ''} type={type} required={required} autoComplete={autoComplete} className="h-12 bg-white text-base" />
    </div>
  )
}
