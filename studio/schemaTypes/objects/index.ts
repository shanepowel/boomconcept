import { defineField, defineType } from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({ name: 'value', type: 'string', description: 'Number only, for example 300. The site adds the "+".', validation: (r) => r.required() }),
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'value', subtitle: 'label' } },
})

export const office = defineType({
  name: 'office',
  title: 'Office',
  type: 'object',
  fields: [
    defineField({ name: 'city', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'detail', type: 'string', description: 'Country or a short line shown under the city.' }),
    defineField({ name: 'address', type: 'text', rows: 3, description: 'Street address. Leave empty to show the city only.' }),
    defineField({ name: 'location', type: 'geopoint', description: 'Where the pin sits on the contact page map.' }),
    defineField({
      name: 'timeZone',
      title: 'Time zone',
      type: 'string',
      options: { list: ['Europe/London', 'Europe/Copenhagen'] },
      initialValue: 'Europe/London',
    }),
  ],
  preview: { select: { title: 'city', subtitle: 'detail' } },
})

export const legalLink = defineType({
  name: 'legalLink',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', title: 'URL', type: 'url', validation: (r) => r.required().uri({ allowRelative: true }) }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
})

export const editorialImage = defineType({
  name: 'editorialImage',
  title: 'Editorial image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({ name: 'alt', type: 'string', title: 'Alternative text', validation: (rule) => rule.required() }),
    defineField({ name: 'caption', type: 'string' }),
    defineField({ name: 'credit', type: 'string' }),
  ],
})
