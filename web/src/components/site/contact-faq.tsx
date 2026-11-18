import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    q: 'What kind of briefs do you take on?',
    a: 'Insight, strategy and communications for pharma, biotech and medtech brands, at global, regional and local level. We work from before launch right through to established brands that need a new lease of life.',
  },
  {
    q: 'Can you work within our approval process?',
    a: 'Yes. We build QC and sign-off around your SOPs from day one, and we are Veeva Multichannel and Vault Content Partners, so content is built to run through PromoMats and your other Veeva tools.',
  },
  {
    q: 'Do you work outside the UK?',
    a: 'Yes. Our teams in the UK and Copenhagen work on global, regional and local projects, including emerging markets.',
  },
  {
    q: 'Can we see your credentials first?',
    a: 'Of course. Choose "Request our credentials" in the form and we will send them over, along with relevant examples for your therapy area.',
  },
  {
    q: 'Are you hiring?',
    a: (
      <>
        We are always happy to meet a Wilbury. Have a look at{' '}
        <Link href="/careers" className="font-bold text-ink link-underline [text-underline-offset:4px]">
          life at BOOM!
        </Link>{' '}
        and get in touch.
      </>
    ),
  },
]

export function ContactFaq() {
  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="border-t-2 border-ink">
      {faqs.map((item, i) => (
        <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
          <AccordionTrigger className="py-5 text-left text-lg font-semibold text-ink hover:no-underline">{item.q}</AccordionTrigger>
          <AccordionContent className="pb-5 text-[16px] leading-relaxed text-body">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
