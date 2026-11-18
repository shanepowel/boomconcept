import type { StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const SINGLETON_TYPES = new Set(['siteSettings', 'pageCopy'])

export const PAGE_KEYS = [
  { key: 'home', title: 'Home' },
  { key: 'work', title: 'Work' },
  { key: 'services', title: 'Services' },
  { key: 'therapyAreas', title: 'Therapy areas' },
  { key: 'about', title: 'About' },
  { key: 'careers', title: 'Careers' },
  { key: 'contact', title: 'Contact' },
] as const

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site settings')),
      S.listItem()
        .title('Page copy')
        
        .child(
          S.list()
            .title('Page copy')
            .items(
              PAGE_KEYS.map(({ key, title }) =>
                S.listItem()
                  .title(title)
                  .id(`page-${key}`)
                  .child(
                    S.document()
                      .schemaType('pageCopy')
                      .documentId(`page-${key}`)
                      .title(title),
                  ),
              ),
            ),
        ),
      S.divider(),
      orderableDocumentListDeskItem({ type: 'teamMember', title: 'Team', S, context }),
      orderableDocumentListDeskItem({ type: 'caseStudy', title: 'Case studies', S, context }),
      S.divider(),
      orderableDocumentListDeskItem({ type: 'brandMoment', title: 'Brand moments', S, context }),
      orderableDocumentListDeskItem({ type: 'specialistArea', title: 'Specialist areas', S, context }),
      S.documentTypeListItem('therapyArea').title('Therapy areas'),
      S.divider(),
      orderableDocumentListDeskItem({ type: 'perk', title: 'Careers perks', S, context }),
    ])
