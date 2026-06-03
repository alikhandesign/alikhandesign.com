'use client'
import Link from 'next/link'
import PasswordGate from '@/app/components/PasswordGate'
import SideNav from '@/app/components/SideNav'
import { CaseStudyImage } from '@/app/components/Lightbox'
import { useState } from 'react'
import CTAStrip from '@/app/components/CTAStrip'
import ContactModal from '@/app/components/ContactModal'

export const metadata = {
  title: 'AI Feedback & Insights Agent — Ali Khan',
  description: 'Case study: agentic AI research pipeline that automated qualitative synthesis with 95% accuracy.',
}


const INSIDE = [
  'Compliance-first design approach and legal workshops',
  'Hybrid categorization architecture (structured + AI)',
  'The double-blind validation methodology',
  '78% to 95% accuracy iteration story',
  'Stakeholder adoption and skeptic-to-advocate arc',
  'Full system architecture and flow diagrams',
]

function FullCaseStudy() {
  return (
    <div style={{ maxWidth: 680 }}>
      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Context</p>
        <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>A billion-dollar book of business generating feedback nobody could keep up with</h3>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Willis Towers Watson managed an annual book of business exceeding $1B in the Medicare and individual benefits space. That scale generated a constant stream of user feedback — website surveys, mobile app surveys, post-call feedback, NPS and CSAT scores — flowing in from hundreds of thousands of users.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>During Medicare Open Enrollment, that volume spiked by 1000%. The research team responsible for synthesizing that feedback had no good way to handle it. I was the Senior UX Designer embedded on the Individual Marketplace team. What I noticed, through observation rather than any formal assignment, was that the people whose job it was to understand users were spending most of their time doing data entry.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', margin: '2rem 0', padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          {[['My Role', 'Senior UX Designer (self-initiated)'], ['Stack', 'Copilot Studio, Qualtrics API, Dataverse, Power Automate'], ['Timeline', '2025–2026'], ['Outcome', 'Deployed to production, 95% accuracy']].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>{label}</p>
              <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500, lineHeight: 1.5 }}>{val}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="the-problem" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Problem</p>
        <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>The Synthesis Tax</h3>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The research team operated within a fragmented, labor-intensive feedback loop. Researchers manually downloaded data from multiple sources, aggregated it, cleaned it, redacted sensitive information, tagged and categorized every comment by hand, and packaged it into a static spreadsheet posted to a Teams channel once a week.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Three compounding failure points: a full day per researcher lost to categorization each week (20% of weekly capacity), "translation errors" from researchers who weren't subject-matter experts on every product feature, and a 5-day insight lag that meant bugs appearing Monday weren't addressed until the following week.</p>
        <div style={{ borderLeft: '3px solid var(--accent)', padding: '1.25rem 1.5rem', margin: '2rem 0', background: 'var(--surface)', borderRadius: '0 4px 4px 0' }}>
          <p className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text)', lineHeight: 1.5, fontStyle: 'italic' }}>This wasn't just a process inefficiency. It was a compliance and retention risk. The voice of the user was arriving too late to matter.</p>
        </div>
      </section>

      <section id="the-reframe" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Reframe</p>
        <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>The real question wasn't speed</h3>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The obvious framing was: "Can AI do this faster?" But that wasn't the right question. The real problem was the Expert Gap — the mismatch between the people doing the categorization and the product knowledge required to do it accurately. A faster version of the same process would just produce wrong answers more quickly.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>The right question was: "Can AI close the Expert Gap while handling sensitive healthcare data responsibly?" That reframe changed everything about how I designed the system.</p>
      </section>

      <section id="the-compliance-challenge" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Compliance Challenge</p>
        <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Before AI could touch the data, the data had to be safe</h3>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The first design challenge wasn't building anything. It was earning the right to build. I ran workshops with Legal and Compliance to define exactly what constituted PII and PHI in our context and where the line was that the system could not cross.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>From those workshops, I engineered a layered redaction approach. Qualtrics queries handled structured patterns. An LLM-based redaction layer caught names and edge cases. Legal signed off before production deployment. That sign-off wasn't just a checkbox — it was what made the whole project possible.</p>
      </section>

      <section id="the-build" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Build</p>
        <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>A hybrid system designed around the Expert Gap</h3>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>I started with Dataverse as the single source of truth — a structured taxonomy table grounded in WTW's specific product documentation and internal knowledge base. On top of that, two categorization approaches worked in parallel: Qualtrics Text IQ for known patterns, and Microsoft CoPilot Studio (GPT) for ambiguous cases requiring intent interpretation.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>Power Automate connected the pipeline in real time. I also built a conversational interface in Teams so stakeholders could ask direct questions — "What were the top three complaints from Medicare users this week?" — and get instant synthesized answers.</p>
      </section>

      <section id="the-validation" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Validation</p>
        <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>78% to 95% — earning trust through evidence</h3>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>I didn't ask stakeholders to trust the AI. I built a methodology to prove it deserved trust. A double-blind accuracy audit: I manually categorized a full week of raw feedback. The AI categorized the same feedback independently. Both sets were stripped of origin labels and reviewed blind by Product Owners.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The first audit came back at 78% accuracy. Not good enough. I refined the system instructions, improved grounding queries, added fallback logic. After several iterations, accuracy reached 95% — the point at which stakeholders could no longer reliably distinguish AI categorization from expert human categorization.</p>
        <div style={{ borderLeft: '3px solid var(--accent)', padding: '1.25rem 1.5rem', margin: '2rem 0', background: 'var(--surface)', borderRadius: '0 4px 4px 0' }}>
          <p className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text)', lineHeight: 1.5, fontStyle: 'italic' }}>The lead UX researcher who had told me "this will never be as good as human analysis" became one of the system's most vocal advocates.</p>
        </div>
      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Outcomes</p>
        <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>From Synthesis Tax to strategic asset</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          {[['8+ hrs → min', 'Weekly synthesis time'], ['5 days → same day', 'Insight delivery lag'], ['95%', 'Categorization accuracy'], ['20%', 'Research capacity returned']].map(([val, label]) => (
            <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
              <div className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--accent)', lineHeight: 1, marginBottom: '0.35rem' }}>{val}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="section-label">The Reflection</p>
        <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>What the real design challenge was</h3>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The interface wasn't the hard part. The hard part was making AI trustworthy enough that people were willing to delegate important work to it. That required compliance-first thinking before the first line of code, a validation methodology rigorous enough to change a skeptic's mind, and fallback logic so humans stayed in the loop where they needed to be.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>If I were starting over, I'd build validation into day one rather than week three. The big takeaway: with agentic AI, the design challenge isn't the interface. It's building trust through validation, transparency, and continuous improvement.</p>
      </section>
    </div>
  )
}

export default function AIAgentPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <main>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <nav style={{ padding: '1.25rem 3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/work" style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none' }}>My Work</Link>
          <span style={{ fontSize: 14, color: '#C4BDB7' }}>›</span>
          <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>AI Feedback & Insights Agent</span>
        </nav>
        <header style={{ padding: '2.5rem 3rem 3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' as const }}>
            <span className="tag-cs">Case Study</span>
            <span className="tag">Agentic Workflow Design</span>
            <span className="tag">AI Design</span>
          </div>
          <h1 className="font-serif" style={{ fontSize: '3rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.5rem' }}>AI Feedback & Insights Agent</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Willis Towers Watson · 2025–2026</p>
          <p style={{ fontSize: 18, color: 'var(--text)', lineHeight: 1.7, maxWidth: 680 }}>Nobody asked me to build this. I noticed that the research team was spending entire days doing work a well-designed system could do in minutes, and I couldn't stop thinking about what they could be doing instead.</p>
        </header>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem' }}>
        <div style={{ width: '100%', height: 400, background: 'var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Hero Project Image</div>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem', display: 'flex', gap: '3rem', flexWrap: 'wrap' as const, borderBottom: '1px solid var(--border)' }}>
        {[['95%', 'Categorization accuracy'], ['8 hrs → 8 min', 'Synthesis time'], ['5 days → same day', 'Insight delivery'], ['20%', 'Capacity returned']].map(([val, label]) => (
          <div key={label}>
            <div className="font-serif" style={{ fontSize: '2.25rem', color: 'var(--accent)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="article-layout" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '4rem 3rem' }}>
        <SideNav unlocked={unlocked} sections={["the-context", "the-problem", "the-reframe", "the-compliance-challenge", "the-build", "the-validation", "the-outcomes", "the-reflection"]} />
        <div>
          <PasswordGate password="4likh4n" onUnlock={() => setUnlocked(true)} title="Ready to see how it came together?" description="The full case study covers the compliance-first design approach, the hybrid categorization architecture, and the validation methodology that took accuracy from 78% to 95%." inside={INSIDE}>
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
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>Next Case Study</p>
          <p className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 400 }}>IHE Scheduling Portal</p>
        </div>
        <Link href="/work/ihe-portal" style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>View project →</Link>
      </div>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
