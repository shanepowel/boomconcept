import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'
import { getSettings } from '@/lib/data'

export const metadata: Metadata = { title: 'Privacy policy', description: 'How BOOM! Healthcare Communications collects and uses personal data.' }

export default async function PrivacyPage() {
  const s = await getSettings({ stega: false })
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      updated="5 June 2026"
      intro={
        <p>
          This is a plain-English summary of BOOM!&apos;s current privacy policy. {s.name} Limited is the data controller for personal data collected through this site and our
          work with you. The full policy is being reviewed for the new site.
        </p>
      }
      sections={[
        { heading: 'What we collect', body: <p>Identity and contact details, technical and usage data about how you use the site, records of our dealings with you, and your marketing preferences. We don&apos;t collect special category data, and the site isn&apos;t intended for children.</p> },
        { heading: 'How we collect it', body: <p>When you contact us or work with us, automatically through cookies and similar technologies, and from third parties such as analytics providers.</p> },
        { heading: 'How we use it', body: <p>To deliver our services and manage our relationship with you, to run and improve the site, and, where you&apos;ve agreed, to keep you informed. We rely on contract, legitimate interests and legal obligations, and on consent where that&apos;s required. You can opt out of marketing at any time.</p> },
        { heading: 'Who we share it with', body: <p>Service providers who help us run the business, including Microsoft SharePoint and Dropbox for storage; professional advisers such as lawyers, auditors and insurers; and HM Revenue &amp; Customs or other authorities where the law requires.</p> },
        { heading: 'International transfers', body: <p>Some providers store data outside the UK. Where they do, we make sure appropriate safeguards are in place, such as UK adequacy decisions or approved contract terms.</p> },
        { heading: 'Keeping it safe', body: <p>We have security measures to prevent loss or misuse, limit access to people who need it, and have procedures for dealing with any suspected breach.</p> },
        { heading: 'How long we keep it', body: <p>Only as long as we need it. Basic customer records are kept for six years for tax purposes. Our retention policy is available on request.</p> },
        { heading: 'Your rights', body: <p>You can ask to access, correct, erase, restrict or transfer your data, object to how we use it, or withdraw consent. There&apos;s usually no fee, and we aim to respond within a month. You can also complain to the Information Commissioner&apos;s Office.</p> },
        {
          heading: 'Contact us',
          body: (
            <p>
              Email <a href="mailto:cory@boom-cc.com" className="font-bold text-ink link-underline">cory@boom-cc.com</a> or{' '}
              <a href="mailto:laura@boom-cc.com" className="font-bold text-ink link-underline">laura@boom-cc.com</a>, or write to us at {s.registeredOffice}.
            </p>
          ),
        },
      ]}
    />
  )
}
