import { defineArrayMember, defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

const tags = defineField({ name: 'tags', type: 'array', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' } })

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'teamMember' }),
    defineField({ name: 'fullName', title: 'Full name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'name', title: 'First name', type: 'string', description: 'Used on cards and in headings.', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'discipline', type: 'string', description: 'Short label, for example "Strategy · Delivery".' }),
    defineField({ name: 'bio', type: 'text', rows: 5, validation: (r) => r.required() }),
    defineField({
      name: 'photo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alternative text', type: 'string', validation: (r) => r.required() })],
    }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'email', type: 'string', validation: (r) => r.email() }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'isFounder', title: 'Founder', type: 'boolean', description: 'Featured at the top of the team page.', initialValue: false }),
    defineField({ name: 'showOnContact', title: 'Show on contact page', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'fullName', subtitle: 'role', media: 'photo' } },
})

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'caseStudy' }),
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'therapyArea', title: 'Therapy area', type: 'string' }),
    defineField({ name: 'challenge', type: 'text', rows: 3 }),
    defineField({ name: 'audience', title: 'The people', type: 'text', rows: 2 }),
    defineField({ name: 'work', title: 'The work', type: 'text', rows: 3 }),
    defineField({ name: 'outcome', title: 'What changed', type: 'text', rows: 3, description: 'Only include results that are approved for publication.' }),
    defineField({ name: 'isExample', title: 'Example only', type: 'boolean', description: 'Shows an "Example case study" label. Turn off once the story is real and approved.', initialValue: true }),
  ],
  preview: { select: { title: 'title', subtitle: 'therapyArea' } },
})

export const therapyArea = defineType({
  name: 'therapyArea',
  title: 'Therapy area',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'conditions', type: 'text', rows: 2, description: 'Comma-separated, shown under the name.' }),
    defineField({ name: 'keywords', type: 'array', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' }, description: 'Extra search terms: synonyms, abbreviations, US spellings.' }),
  ],
  preview: { select: { title: 'name', subtitle: 'conditions' } },
})

export const brandMoment = defineType({
  name: 'brandMoment',
  title: 'Brand moment',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'brandMoment' }),
    defineField({ name: 'stage', type: 'string', description: 'For example "Before launch".', validation: (r) => r.required() }),
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', type: 'text', rows: 4 }),
    defineField({ name: 'proof', type: 'string' }),
    tags,
  ],
  preview: { select: { title: 'title', subtitle: 'stage' } },
})

export const specialistArea = defineType({
  name: 'specialistArea',
  title: 'Specialist area',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'specialistArea' }),
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'challenge', title: "Why it's hard to communicate", type: 'text', rows: 2 }),
    defineField({ name: 'experience', title: "What we've worked on", type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'name', subtitle: 'experience' } },
})

export const perk = defineType({
  name: 'perk',
  title: 'Perk',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'perk' }),
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', type: 'string' }),
  ],
  preview: { select: { title: 'title', subtitle: 'body' } },
})
