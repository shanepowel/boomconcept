import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand', default: true },
    { name: 'proof', title: 'Proof' },
    { name: 'contact', title: 'Contact and legal' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', group: 'brand', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', rows: 3, group: 'brand', description: 'Default meta description.' }),
    defineField({ name: 'teamSize', title: 'Team size', type: 'string', group: 'brand', description: 'Number of specialists, for example 65.' }),
    defineField({ name: 'proofPoints', title: 'Proof points', type: 'array', group: 'proof', of: [defineArrayMember({ type: 'string' })], description: 'Short credentials shown under the home page hero.' }),
    defineField({ name: 'stats', type: 'array', group: 'proof', of: [defineArrayMember({ type: 'stat' })], validation: (r) => r.max(4) }),
    defineField({ name: 'offices', type: 'array', group: 'contact', of: [defineArrayMember({ type: 'office' })] }),
    defineField({ name: 'enquiriesEmail', title: 'Enquiries email', type: 'string', group: 'contact', validation: (r) => r.email() }),
    defineField({ name: 'careersEmail', title: 'Careers email', type: 'string', group: 'contact', validation: (r) => r.email() }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url', group: 'contact' }),
    defineField({ name: 'companyNumber', title: 'Company number', type: 'string', group: 'contact' }),
    defineField({ name: 'vatNumber', title: 'VAT number', type: 'string', group: 'contact' }),
    defineField({ name: 'legal', title: 'Legal links', type: 'array', group: 'contact', of: [defineArrayMember({ type: 'legalLink' })] }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})

export const pageCopy = defineType({
  name: 'pageCopy',
  title: 'Page copy',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'eyebrow', type: 'string', group: 'hero', description: 'Small label above the headline.' }),
    defineField({ name: 'title', title: 'Headline', type: 'string', group: 'hero', validation: (r) => r.required().max(90) }),
    defineField({ name: 'lede', title: 'Intro', type: 'text', rows: 4, group: 'hero', validation: (r) => r.max(420) }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo', validation: (r) => r.max(65).warning('Search engines truncate long titles.') }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3, group: 'seo', validation: (r) => r.max(160).warning('Keep it under 160 characters.') }),
  ],
  preview: { select: { title: 'title', subtitle: 'eyebrow' } },
})
