import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'
import { getSettings } from '@/lib/data'

export const metadata: Metadata = { title: 'Terms of use', description: 'The terms of use for the BOOM! Healthcare Communications website.' }

export default async function TermsPage() {
  const s = await getSettings({ stega: false })
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of use"
      intro={
        <p>
          These terms set out the rules for using this website. They are a plain-English summary of BOOM!&apos;s current terms of use; the full legal wording is being reviewed
          for the new site.
        </p>
      }
      sections={[
        {
          heading: 'Who we are',
          body: (
            <>
              <p>
                This site is run by {s.name} Limited, registered in England and Wales under company number {s.companyNumber}, VAT number {s.vatNumber}. Our registered office is{' '}
                {s.registeredOffice}.
              </p>
              <p>We work within the ABPI Code of Practice.</p>
              <p>
                To contact us about these terms, email <a href="mailto:cory@boom-cc.com" className="font-bold text-ink link-underline">cory@boom-cc.com</a> or{' '}
                <a href="mailto:laura@boom-cc.com" className="font-bold text-ink link-underline">laura@boom-cc.com</a>.
              </p>
            </>
          ),
        },
        { heading: 'Accepting these terms', body: <p>By using the site you accept these terms. If you don&apos;t agree with them, please don&apos;t use the site. Our privacy and cookie policies also apply.</p> },
        { heading: 'Changes', body: <p>We may update these terms, and the site itself, from time to time. Please check this page when you visit. We may also transfer our rights under these terms to another organisation, and will tell you in writing if we do.</p> },
        { heading: 'Availability', body: <p>The site is free to use. We don&apos;t guarantee it will always be available or uninterrupted, and we may suspend or withdraw it for business or operational reasons.</p> },
        { heading: 'Using our material', body: <p>We own or license the intellectual property in the site and its content. You may print or download extracts for your own reference, but not change them, use images separately from their text, or use any of it commercially without a licence from us. Please always acknowledge us as the authors.</p> },
        { heading: 'Information on the site', body: <p>Content is general information only, not advice. We work to keep it accurate and up to date, but make no promises that it is complete or current.</p> },
        { heading: 'Links to other sites', body: <p>Where we link to other websites, it is for information only. We don&apos;t control or endorse them and aren&apos;t responsible for their content.</p> },
        { heading: 'Our responsibility', body: <p>We don&apos;t exclude liability where it would be unlawful to do so, for example for death or personal injury caused by negligence, or for fraud. Otherwise, we are not liable for indirect loss or for loss of profit, revenue, business, goodwill or reputation arising from use of the site.</p> },
        { heading: 'Viruses and misuse', body: <p>We can&apos;t guarantee the site is free from bugs or viruses. You must not knowingly introduce malicious material or try to gain unauthorised access to the site; doing so may be an offence under the Computer Misuse Act 1990, which we would report to the authorities.</p> },
        { heading: 'Linking to us', body: <p>You may link to our home page if you do it fairly and legally, without suggesting any association or endorsement we haven&apos;t agreed. Please don&apos;t frame the site or link deep into it without asking us first.</p> },
        { heading: 'Governing law', body: <p>These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction.</p> },
      ]}
    />
  )
}
