'use server'

import { getSettings } from '@/lib/data'
import { getEnquiryContext } from '@/lib/enquiry-context'
import { contactTopics, getContactTopic } from '@/content/contact-topics'

export async function submitEnquiry(_previous: string, data: FormData): Promise<string> {
  if (data.get('website')) return 'error'

  const name = String(data.get('name') ?? '').trim()
  const email = String(data.get('email') ?? '').trim()
  const company = String(data.get('company') ?? '').trim()
  const message = String(data.get('message') ?? '').trim()
  const topic = getContactTopic(String(data.get('topic') ?? ''))

  if (!name || name.length > 150 || company.length > 200 || email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 5000) return 'invalid'

  if (process.env.ENQUIRY_DEMO_MODE === 'true') return 'demo'

  const { RESEND_API_KEY: apiKey, ENQUIRY_FROM_EMAIL: from, ENQUIRY_TEST_RECIPIENT: testRecipient } = process.env
  if (!apiKey || !from) return 'unavailable'

  try {
    const [settings, context] = await Promise.all([
      getSettings({ stega: false }),
      getEnquiryContext(data.get('stage'), data.get('lineup')),
    ])
    const recipient = testRecipient || (topic === 'careers' ? settings.careersEmail : settings.enquiriesEmail)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: contactTopics[topic].subject,
        text: [`Name: ${name}`, `Email: ${email}`, company && `Organisation: ${company}`, context && `Selected brief context: ${context.label}`, '', message].filter((line) => line !== undefined).join('\n'),
      }),
      signal: AbortSignal.timeout(8000),
    })
    return response.ok ? 'sent' : 'error'
  } catch {
    return 'error'
  }
}
