'use client'
import { useState, CSSProperties } from 'react'
import PatternShell from '../PatternShell'
import EpistemicBanner from '../../components/EpistemicBanner'
import InlineAlert from '../../components/InlineAlert'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
]

type Scenario = 'knowledge-gap' | 'principled-limit' | 'probabilistic' | 'none'

const SCENARIOS: Record<Scenario, { banner: 'knowledge-gap' | 'principled-limit' | 'probabilistic' | null; response: string; hedgeAt: number | null }> = {
  none: { banner: null, response: "The Eiffel Tower was completed in 1889 and stands 330 meters tall. It was designed by Gustave Eiffel for the 1889 World's Fair in Paris.", hedgeAt: null },
  'knowledge-gap': { banner: 'knowledge-gap', response: "Based on my training data, the company's last reported valuation was approximately $4.2B as of early 2024. This figure may have changed — I'd recommend checking a current financial source for the latest.", hedgeAt: 80 },
  'principled-limit': { banner: 'principled-limit', response: "I don't have access to private personal data, medical records, or information that hasn't been made publicly available. I can't retrieve details about a specific individual's personal history.", hedgeAt: null },
  'probabilistic': { banner: 'probabilistic', response: "The mechanism is likely related to mitochondrial function, though research in this area is ongoing and some findings remain contested. The current scientific consensus leans toward the oxidative stress hypothesis, but alternative models exist.", hedgeAt: 60 },
}

export default function UncertaintyPage() {
  const [activeTab, setActiveTab] = useState('definition')
  const [scenario, setScenario] = useState<Scenario>('none')
  const s = SCENARIOS[scenario]

  const definition = <Definition />
  const demo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <button onClick={() => setScenario('none')}             style={btn('var(--text-muted)','var(--warm-75)','var(--border)')}>High confidence</button>
        <button onClick={() => setScenario('knowledge-gap')}    style={btn('#B45309','#FFFBEB','#FDE68A')}>Knowledge gap</button>
        <button onClick={() => setScenario('principled-limit')} style={btn('var(--accent)','var(--accent-bg)','#FECACA')}>Principled limit</button>
        <button onClick={() => setScenario('probabilistic')}    style={btn('#1D4ED8','#EFF6FF','#BFDBFE')}>Probabilistic claims</button>
      </div>
      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
        {s.banner && (
          <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)' }}>
            <EpistemicBanner
              type={s.banner}
              message={
                s.banner === 'knowledge-gap' ? 'This information falls outside my training data.' :
                s.banner === 'principled-limit' ? 'I am structurally restricted from accessing this information.' :
                'This response contains claims that may vary — verify before acting.'
              }
              actionLabel={s.banner === 'knowledge-gap' ? 'Run web search' : s.banner === 'principled-limit' ? 'View guardrails' : undefined}
              onAction={s.banner !== 'probabilistic' ? () => {} : undefined}
            />
          </div>
        )}
        <div style={{ padding: 'var(--space-6)' }}>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-loose)' }}>
            {s.hedgeAt !== null ? (
              <>
                <span style={{ borderBottom: '1.5px dotted #F59E0B', paddingBottom: 1 }}>
                  {s.response.slice(0, s.hedgeAt)}
                </span>
                {s.response.slice(s.hedgeAt)}
              </>
            ) : s.response}
          </p>
        </div>
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', lineHeight: 'var(--line-height-normal)' }}>
        The epistemic banner appears before the response body, ensuring users encounter the uncertainty signal before reading the uncertain claim. Dotted amber underlines indicate probabilistic assertions at the claim level.
      </p>
    </div>
  )
  const states = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {([
        { type: 'knowledge-gap' as const, label: 'Knowledge gap', desc: 'Training cutoff or data limitation. The model lacks information — it may exist elsewhere.', actionLabel: 'Run web search' },
        { type: 'principled-limit' as const, label: 'Principled limit', desc: 'The model cannot or should not have this information. Private data, real-time feeds, protected content.', actionLabel: 'View guardrails' },
        { type: 'probabilistic' as const, label: 'Probabilistic claims', desc: 'Response contains assertions with meaningful uncertainty. Not wrong — but not settled.' },
      ]).map(item => (
        <div key={item.type} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)' }}>
          <EpistemicBanner type={item.type} message={item.desc} actionLabel={item.actionLabel} onAction={item.actionLabel ? () => {} : undefined} />
        </div>
      ))}
    </div>
  )

  return (
    <PatternShell
      title="Uncertainty Communication"
      slug="uncertainty-communication"
      problem="No product differentiates a knowledge gap from a principled limit. Hedging language appears mid-response where users who skim miss it entirely."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={TABS}
      mobileContent={{ definition, demo, states }}
    >
      {activeTab === 'definition' && definition}
      {activeTab === 'demo' && demo}
      {activeTab === 'states' && states}
    </PatternShell>
  )
}

function Definition() {
  return (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {[
        { label: 'Problem', text: "Every AI response carries uncertainty. Five of six products communicate it exclusively through language — no visual differentiation. Hedging language is often placed mid-response, meaning users who skim encounter confident claims without their caveats. No product distinguishes between 'I don't know' and 'I can't know.'" },
        { label: 'Prescription', text: 'Epistemic banners appear before the response body, not within it. Three distinct states: knowledge gap (amber), principled limit (red), probabilistic (blue). Claim-level uncertainty uses dotted underlines. Verification actions are surfaced inline.' },
        { label: 'Design decisions', text: 'Banner threshold determines when uncertainty is surfaced — not every response warrants one. Claim-level underlines require the model to surface token-level confidence, which varies by architecture. Verification action requires web search infrastructure.' },
        { label: 'Tradeoffs', text: 'Prominent epistemic banners on every uncertain response may cause users to discount them over time — alert fatigue applied to epistemic signals. Visual confidence indicators imply model self-knowledge that may not be reliable. Post-response verification adds friction for users who want a direct answer.' },
      ].map(item => (
        <div key={item.label}>
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{item.label}</p>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-loose)' }}>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

function btn(color: string, bg: string, border: string): CSSProperties {
  return { padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color, background: bg, border: `1px solid ${border}`, borderRadius: 'var(--radius)', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'opacity var(--transition-base)' }
}
