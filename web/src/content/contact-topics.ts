export const contactTopics = {
  brief: {
    label: 'New brief',
    heading: 'Tell us what you’re working on.',
    prompt: 'What needs to change, who do you need to reach, and when?',
    subject: 'New brief',
  },
  credentials: {
    label: 'Credentials',
    heading: 'Ask for relevant credentials.',
    prompt: 'Which therapy area, audience or capability would you like to see?',
    subject: 'Credentials request',
  },
  procurement: {
    label: 'Procurement',
    heading: 'Tell us what you need to check.',
    prompt: 'What information do you need, and is there a supplier review deadline?',
    subject: 'Procurement enquiry',
  },
  careers: {
    label: 'Careers',
    heading: 'Tell us a little about yourself.',
    prompt: 'What do you do, what would you like to do next, and why BOOM!?',
    subject: 'Careers enquiry',
  },
  other: {
    label: 'Something else',
    heading: 'How can we help?',
    prompt: 'What would you like to talk about?',
    subject: 'General enquiry',
  },
} as const

export type ContactTopic = keyof typeof contactTopics

export function getContactTopic(value: string | string[] | undefined): ContactTopic {
  return typeof value === 'string' && Object.hasOwn(contactTopics, value) ? value as ContactTopic : 'brief'
}
