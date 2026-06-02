'use client'
import Link from 'next/link'
import PasswordGate from '@/app/components/PasswordGate'
import SideNav from '@/app/components/SideNav'
import { CaseStudyImage } from '@/app/components/Lightbox'
import { useState } from 'react'
import CTAStrip from '@/app/components/CTAStrip'
import ContactModal from '@/app/components/ContactModal'

const INSIDE = [
  'Qualitative interview findings',
  'Six distinct member barrier categories',
  'The one-sided exchange insight',
  'Trust-first design principles',
  'Before and after portal comparison',
  'Program outcome context',
]

function FullCaseStudy() {
  return (
    <div style={{ maxWidth: 680 }}>
      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Context</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>A free service that millions of people were turning down</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Signify Health partners with health plans to offer eligible Medicare members a licensed clinician who comes to your home, reviews your medications and medical history, checks your vitals, and coordinates findings with your primary care provider — at no cost. The program operates at scale, with over 10,000 clinicians performing evaluations across the country. But sign-up rates weren't reflecting that potential.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', margin: '2rem 0', padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          {[['My Role', 'UX Researcher & Designer'], ['Methods', 'Qualitative Interviews, Thematic Synthesis'], ['Focus', 'Trust-First Design, Barrier Removal'], ['Output', 'Research findings + Portal redesign']].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>{label}</p>
              <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500, lineHeight: 1.5 }}>{val}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="the-research" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Research</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Listening before designing</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Before anyone touched a wireframe, I needed to understand what was happening in members' minds when they declined. I ran a qualitative research initiative — interviews with members who had been offered an IHE and turned it down. The sessions were structured around one core question: not "why didn't you want this?" but "help me understand what you were thinking when you made that decision." The distinction matters. The first question invites defensiveness. The second invites honesty.</p>
      </section>

      <section id="the-findings" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Findings</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>It wasn't about strangers in the home</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.5rem' }}>Six distinct barrier categories emerged from the research.</p>
        {[
          ['Redundancy with existing care', 'The most common objection. Members who saw their PCP regularly couldn\'t understand what an IHE added. The visit felt like a duplicate of care they were already receiving.'],
          ['Clinical inferiority', 'Members knew what the visiting clinician couldn\'t do — no blood draws, no EKGs, no prescriptions. Without diagnostic capabilities, the visit felt like a lesser version of real medical care.'],
          ['The one-sided exchange problem', 'Members described past visits as a one-way street: they gave extensive personal and medical information, and the provider "didn\'t really offer anything" in return. The experience felt extractive rather than beneficial.'],
          ['Scam skepticism', 'Unsolicited calls offering free medical services are a well-known scam vector targeting seniors. Multiple members expressed genuine uncertainty about whether the program was legitimate.'],
          ['Negative past experiences', 'Members who had participated in an IHE previously and found it unremarkable were resistant to trying again.'],
          ['Frequency and harassment', 'Several members were being called constantly and had reached a point where they declined simply to be left alone.'],
        ].map(([title, text]) => (
          <div key={title} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.4rem' }}>{title}</h3>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7 }}>{text}</p>
          </div>
        ))}
        <div style={{ borderLeft: '3px solid var(--accent)', padding: '1.25rem 1.5rem', margin: '2rem 0', background: 'var(--surface)', borderRadius: '0 4px 4px 0' }}>
          <p className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text)', lineHeight: 1.5, fontStyle: 'italic' }}>Members weren't afraid of the visit. They just didn't believe it was worth their time. And they had good reasons.</p>
        </div>
      </section>

      <section id="the-reframe" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Reframe</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>From "will you let us in?" to "here's what's in it for you"</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>The original portal was organized around what Signify Health needed from members. It assumed members already understood the value and just needed a way to book. The research said otherwise. Members needed the value case made first. Only then would they be willing to give anything back. That reframe drove every design decision in the redesign.</p>
      </section>

      <section id="the-design" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Design</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Trust-first, member-controlled</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Four principles from the research shaped every design decision: lead with value not process; give members real-time scheduling control instead of a callback request; establish legitimacy early with clear trust signals; and pair every request for information with a clear explanation of what the member would receive in return.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>The shift from a callback-request model to real-time self-scheduling was the most impactful single change — removing a friction point that, combined with scam skepticism, was causing significant drop-off.</p>
      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Outcomes</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Research that informed real scale</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          {[['73 NPS', 'Post-visit member satisfaction'], ['3.5M+', 'Annual IHEs completed'], ['61%', 'More likely to renew health plan coverage'], ['6', 'Distinct barrier categories identified']].map(([val, label]) => (
            <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
              <div className="font-serif" style={{ fontSize: '2rem', color: 'var(--accent)', lineHeight: 1, marginBottom: '0.35rem' }}>{val}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>Note: Program-level metrics reflect Signify Health's broader outcomes. I can't claim sole attribution — what I can say is the research identified the specific barriers preventing members from saying yes, and the redesign was built to remove them.</p>
      </section>

      <section>
        <p className="section-label">The Reflection</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>What the research kept teaching me</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The most valuable thing this project reinforced is that the "obvious" barrier is rarely the real one. The one-sided exchange finding was the one that stayed with me — it applies far beyond this project. Any time a product asks users to give something before they've understood what they'll receive in return, you're creating the conditions for distrust.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>I'd also push earlier for outcome metrics in future projects. The qualitative research here is rich and specific. A quantitative measurement of sign-up rate change before and after the redesign would have made this case study significantly stronger.</p>
      </section>
    </div>
  )
}

export default function IHEPortalPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <main>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <nav style={{ padding: '1.25rem 3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/work" style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none' }}>My Work</Link>
          <span style={{ fontSize: 14, color: '#C4BDB7' }}>›</span>
          <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>IHE Scheduling Portal</span>
        </nav>
        <header style={{ padding: '2.5rem 3rem 3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' as const }}>
            <span className="tag-cs">Case Study</span>
            <span className="tag">UX Research</span>
            <span className="tag">UX Design</span>
          </div>
          <h1 className="font-serif" style={{ fontSize: '3rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.5rem' }}>IHE Scheduling Portal</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Signify Health · CVS Health</p>
          <p style={{ fontSize: 18, color: 'var(--text)', lineHeight: 1.7, maxWidth: 680 }}>A free in-home health evaluation sounds like an obvious yes. A licensed clinician comes to your home, reviews your medications, checks your vitals, and coordinates with your doctor — at no cost. So why were millions of eligible members saying no?</p>
        </header>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem' }}>
        <div style={{ width: '100%', height: 400, background: 'var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Hero Project Image</div>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem', display: 'flex', gap: '3rem', flexWrap: 'wrap' as const, borderBottom: '1px solid var(--border)' }}>
        {[['73 NPS', 'Post-visit satisfaction'], ['3.5M+', 'Annual IHEs completed'], ['6', 'Barrier categories identified']].map(([val, label]) => (
          <div key={label}>
            <div className="font-serif" style={{ fontSize: '2.25rem', color: 'var(--accent)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="article-layout" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '4rem 3rem' }}>
        <SideNav unlocked={unlocked} sections={["the-context", "the-research", "the-findings", "the-reframe", "the-design", "the-outcomes", "the-reflection"]} />
        <div>
          <PasswordGate password="4likh4n" onUnlock={() => setUnlocked(true)} title="Ready to see what the research uncovered?" description="The full case study walks through the research methodology, all six barrier categories, and the design principles that shaped the portal redesign." inside={INSIDE}>
            <FullCaseStudy />
          </PasswordGate>
        </div>
      </div>

      <CTAStrip
        title="Interested in how this came together?"
        onContact={() => setModalOpen(true)}
      />

      <div className="divider" />
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '2.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '1rem' }}>
        <div>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>Next Project</p>
          <p className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 400 }}>Optimizing the Ancillary Insurance Journey</p>
        </div>
        <Link href="/work/ancillary-journey" style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>View project →</Link>
      </div>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
