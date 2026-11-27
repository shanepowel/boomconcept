import { defineArrayMember, defineField } from 'sanity'

const text = (name: string, title?: string) => defineField({
  name, title, type: 'string', validation: (rule) => rule.required(),
})
const body = (name = 'body') => defineField({
  name, type: 'text', rows: 3, validation: (rule) => rule.required(),
})

const titleAndBody = () => [text('title'), body()]
const lists = {
  about: [
    { name: 'milestones', fields: [text('year', 'Date or period'), body('text')] },
    { name: 'differentiators', fields: titleAndBody() },
    { name: 'beliefs', fields: [text('title'), text('short', 'Summary'), body()] },
    { name: 'values', fields: titleAndBody() },
    { name: 'bestFit', fields: [body()] },
  ],
  work: [{ name: 'approachSteps', fields: [...titleAndBody(), text('output', 'What you get')] }],
  careers: [
    { name: 'workingLife', fields: titleAndBody() },
    { name: 'applicationQuestions', fields: [text('title', 'Question'), { ...body(), title: 'Answer' }] },
  ],
}

const pageId = (id?: string) => id?.replace(/^drafts\./, '').replace(/^page-/, '') ?? ''

export const editorialLists = defineField({
  name: 'editorialLists',
  title: 'Editorial content',
  type: 'object',
  group: 'sections',
  hidden: ({ document }) => !Object.hasOwn(lists, pageId(document?._id)),
  fields: Object.entries(lists).map(([page, items]) => defineField({
    name: page,
    type: 'object',
    hidden: ({ document }) => pageId(document?._id) !== page,
    fields: items.map(({ name, fields }) => defineField({
      name,
      type: 'array',
      of: [defineArrayMember({ type: 'object', fields })],
    })),
  })),
})
