import Link from 'next/link'
import SectionLabel from './components/SectionLabel'
import Heading from './components/Heading'
import ButtonLink from './components/ButtonLink'

export default function NotFound() {
  return (
    <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem' }}>
      <div style={{ paddingTop: '6rem', paddingBottom: '8rem', textAlign: 'center' }}>
        <SectionLabel label="404" />
        <Heading level={1} size="4xl" lineHeight={1.1}>
          This page doesn&rsquo;t exist.
        </Heading>
        <p style={{
          fontSize: 'var(--font-size-md)',
          lineHeight: 1.7,
          color: 'var(--color-text-muted)',
          marginBottom: '2rem',
          maxWidth: 480,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          The link you followed may be outdated. Here&rsquo;s where you can find what you&rsquo;re looking for instead.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
          <Link href="/work" className="btn-primary">Check out my work <span aria-hidden="true">→</span></Link>
          <ButtonLink label="Back to home" href="/" />
        </div>
      </div>
    </section>
  )
}
