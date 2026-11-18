import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = { title: 'Cookies', description: 'How the BOOM! Healthcare Communications website uses cookies.' }

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookies"
      intro={
        <p>
          A plain-English summary of how this site uses cookies. This concept site doesn&apos;t set analytics cookies yet; the final list will be confirmed when analytics and
          consent are set up for launch.
        </p>
      }
      sections={[
        { heading: 'What cookies are', body: <p>Small text files stored on your device that help a site work and tell its owner how it is used. You can find out more at allaboutcookies.org.</p> },
        { heading: 'Analytics', body: <p>With your consent, we use analytics to understand how people use the site: the pages visited, how they got here, and the device and browser used. If you don&apos;t accept analytics cookies, they aren&apos;t set.</p> },
        { heading: 'Third-party content', body: <p>Embedded content such as videos, maps or LinkedIn sharing may set its own cookies. We don&apos;t control these, so please check those sites&apos; policies.</p> },
        { heading: 'Managing cookies', body: <p>You can change your choice at any time, and block or delete cookies in your browser settings. Blocking some cookies may affect how the site works.</p> },
      ]}
    />
  )
}
