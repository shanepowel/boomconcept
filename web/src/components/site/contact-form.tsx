'use client'

import { useActionState, useState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
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

export function ContactForm({ email, topic, context, demo }: { demo: boolean; email: string; topic: ContactTopic; context?: { label: string; href: string } }) {
  const { prompt } = contactTopics[topic]
  const [status, action, pending] = useActionState(submitEnquiry, '')
  const [values, setValues] = useState<Record<string, string>>({})
  const [includeContext, setIncludeContext] = useState(true)
  const selectedContext = includeContext ? context : undefined
  const contextFields = new URLSearchParams(selectedContext?.href)

  return (
    <form action={action} onChange={(event) => {
      const field = event.target
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        setValues((previous) => ({ ...previous, [field.name]: field.value }))
      }
    }} className="grid gap-5">
      <input type="hidden" name="topic" value={topic} />
      {demo && <p className="text-sm text-body">Demo form. Use sample details to try it.</p>}
      {context && (
        <div className="flex flex-wrap items-center justify-between gap-x-3 border-l-2 border-magenta bg-warm px-4 py-2 text-sm">
          <p>{selectedContext ? <>Brief context: <strong>{selectedContext.label}</strong></> : 'Brief context removed.'}</p>
          <Button type="button" variant="ghost" className="min-h-11 px-2" onClick={() => setIncludeContext((current) => !current)}>
            {selectedContext ? 'Remove context' : 'Restore context'}
          </Button>
        </div>
      )}
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
        <Button type="submit" variant="brand" size="xl" disabled={pending || status === 'sent'}>{pending ? 'Submitting…' : demo ? 'Submit demo enquiry' : 'Send enquiry'} <ArrowRight aria-hidden /></Button>
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
      <Input id={id} name={id} value={values[id] ?? ''} type={type} required={required} autoComplete={autoComplete} className="h-(--control-height-xl) bg-white text-base" />
    </div>
  )
}
