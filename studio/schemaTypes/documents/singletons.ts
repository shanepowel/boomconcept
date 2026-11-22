import { pageSections, sectionLabels } from '../../../web/src/content/page-sections'
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
    defineField({ name: 'proofPoints', title: 'Proof points', type: 'array', group: 'proof', of: [defineArrayMember({ type: 'string' })], description: 'Legacy homepage credentials. The editorial homepage places proof beside the relevant story.' }),
    defineField({ name: 'stats', type: 'array', group: 'proof', of: [defineArrayMember({ type: 'stat' })], validation: (r) => r.max(4) }),
    defineField({ name: 'offices', type: 'array', group: 'contact', of: [defineArrayMember({ type: 'office' })] }),
    defineField({ name: 'enquiriesEmail', title: 'Enquiries email', type: 'string', group: 'contact', validation: (r) => r.email() }),
    defineField({ name: 'careersEmail', title: 'Careers email', type: 'string', group: 'contact', validation: (r) => r.email() }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url', group: 'contact' }),
    defineField({ name: 'companyNumber', title: 'Company number', type: 'string', group: 'contact' }),
    defineField({ name: 'vatNumber', title: 'VAT number', type: 'string', group: 'contact' }),
    defineField({ name: 'registeredOffice', title: 'Registered office', type: 'string', group: 'contact', description: 'As shown at Companies House.' }),
    defineField({
      name: 'danishEntity',
      title: 'Danish entity',
      type: 'object',
      group: 'contact',
      fields: [defineField({ name: 'name', type: 'string' }), defineField({ name: 'cvr', title: 'CVR number', type: 'string' })],
    }),
    defineField({ name: 'sustainabilityUrl', title: 'Sustainability report URL', type: 'url', group: 'contact' }),
    defineField({ name: 'legal', title: 'Legal links', type: 'array', group: 'contact', of: [defineArrayMember({ type: 'legalLink' })] }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})

const sectionFields = Object.entries(pageSections).flatMap(([page, sections]) =>
  Object.keys(sections).map((id) => defineField({
    name: id,
    title: sectionLabels[id as keyof typeof sectionLabels],
    type: 'object',
    hidden: ({ document }) => document?._id?.replace(/^drafts\./, '') !== `page-${page}`,
    fields: [
      defineField({ name: 'eyebrow', title: 'Label above the heading', type: 'string', validation: (rule) => rule.max(45) }),
      defineField({ name: 'title', title: 'Heading', type: 'string', validation: (rule) => rule.max(95) }),
      defineField({ name: 'intro', type: 'text', rows: 3, validation: (rule) => rule.max(340) }),
    ],
  })),
)

export const pageCopy = defineType({
  name: 'pageCopy',
  title: 'Page copy',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'sections', title: 'Page sections' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'eyebrow', type: 'string', group: 'hero', description: 'Small label above the headline.' }),
    defineField({ name: 'title', title: 'Headline', type: 'string', group: 'hero', validation: (r) => r.required().max(90) }),
    defineField({ name: 'lede', title: 'Intro', type: 'text', rows: 4, group: 'hero', validation: (r) => r.max(420) }),
    defineField({ name: 'image', title: 'Hero photograph', type: 'editorialImage', group: 'hero' }),
    defineField({
      name: 'lineups',
      title: 'Example briefs',
      type: 'array',
      group: 'hero',
      hidden: ({ document }) => document?._id !== 'page-home' && document?._id !== 'drafts.page-home',
      validation: (rule) => rule.max(5),
      of: [defineArrayMember({
        name: 'briefLineup',
        title: 'Example brief',
        type: 'object',
        fields: [
          defineField({ name: 'title', type: 'string', validation: (rule) => rule.required().max(65) }),
          defineField({ name: 'approach', type: 'text', rows: 3, validation: (rule) => rule.required().max(300) }),
          defineField({ name: 'disciplines', type: 'array', of: [defineArrayMember({ type: 'string' })], validation: (rule) => rule.unique().max(4) }),
          defineField({ name: 'people', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'teamMember' }] })], validation: (rule) => rule.unique().max(3) }),
          defineField({ name: 'caseStudy', title: 'Related case study', type: 'reference', to: [{ type: 'caseStudy' }] }),
        ],
      })],
    }),
    defineField({
      name: 'sections',
      title: 'Section headings and introductions',
      description: 'Pages use their built-in copy when you leave these fields unset.',
      type: 'object',
      group: 'sections',
      hidden: ({ document }) => !Object.hasOwn(pageSections, document?._id?.replace(/^(drafts\.)?page-/, '') ?? ''),
      fields: sectionFields,
    }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo', validation: (r) => r.max(65).warning('Search engines truncate long titles.') }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3, group: 'seo', validation: (r) => r.max(160).warning('Keep it under 160 characters.') }),
  ],
  preview: { select: { title: 'title', subtitle: 'eyebrow' } },
})
