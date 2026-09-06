import { getNextWork } from '@/app/work.config'
import ProjectPage from '@/app/components/ProjectPage'

export default function Page() {
  return <ProjectPage
    title="Vivio Clinical App"
    company="Ventric Health · Vivio · Q1–Q3 2023"
    tags={['Product Design', 'Design Systems', 'Native iOS']}
    hook="Designing a clinical tool for heart failure diagnosis without a research budget meant working from secondary sources, SME walkthroughs, and a clear constraint: a wrong reading presented as reliable is worse than no reading at all."
    details={[
      { label: 'My Role', value: 'Lead Product Designer' },
      { label: 'Methods', value: 'Secondary research, SME walkthroughs, failure-mode mapping, Design Systems Architecture & Governance, Apple Human Interface Guidelines' },
      { label: 'Tools', value: 'Native iOS (iPad), Figma' },
      { label: 'Status', value: 'Shipped native iOS app + design system, FDA-cleared' },
    ]}
    sections={[
      {
        label: 'The Brief',
        title: 'First usable version of a zero-to-one clinical tool',
        body: [
          'Vivio is the only non-invasive solution for measuring LVEDP — the clinical hallmark of elevated filling pressure and the key indicator for diagnosing heart failure. An engineering-built proof of concept existed, but it was not designed for clinical use. The work was to design the first real version: a complete native iOS app and design system, built from scratch, for use in expanded care environments by non-specialist clinicians.',
        ],
      },
      {
        label: 'The Constraint',
        title: 'No primary research access',
        body: [
          'There was no budget for primary research, pre- or post-implementation. The design process relied on secondary research — competitive analysis of existing non-invasive approaches including Vericor and the current invasive gold standards (left heart catheterization, pulmonary artery catheterization) — plus structured walkthroughs with SMEs and engineers to map the full workflow and surface every failure mode before a single screen was designed.',
        ],
      },
      {
        label: 'Design Decisions',
        title: 'Three choices that shaped the system',
        body: [
          'Hard stops over soft warnings. The app was designed to refuse to present a result it could not stand behind. If a device could not provide a reliable measurement, the workflow stopped. This was not a UX preference — it was a patient safety requirement. Incorrect readings presented as accurate are more dangerous than an inconclusive result.',
          'Single-screen workflows with persistent patient context. Every step in the recording session was designed as a single-screen action. Patient data persisted across the session so a clinician could not lose their place mid-workflow with a patient present. No dead ends, no back navigation required to recover.',
          'Error states as clinical direction. The app needed to handle over 20 distinct failure states across Bluetooth pairing, device signal, recording quality, and data transmission. Each error state was mapped with SMEs and engineers to produce actionable guidance — not system error messages, but clear instructions for what to do next. A confusing error in a diagnostic session does not just frustrate. It invalidates the measurement.',
        ],
      },
      {
        label: 'The Outcome',
        title: 'FDA clearance and a published multicenter study',
        body: [
          'The Vivio system received FDA clearance. A subsequent multicenter study evaluated 1,238 high-risk patients across 25 primary care sites, with workflows led by medical assistants. The study reported a 92.2% conclusive diagnostic rate in outpatient settings. Separately, 40.1% of screened patients were found to have elevated LVEDP — and 42.3% of those were asymptomatic, meaning the tool surfaced cardiac risk that existing care pathways were missing entirely.',
          "The clinical findings belong to the research. The design's job was to not be the reason they didn't happen.",
        ],
      },
    ]}
    gallery={[
      { src: '/images/work/vivio/vivio-recording.png', alt: 'Active recording screen showing step 2 of 3 with live waveform and recording in progress state', caption: 'Recording in progress — step indicator, live waveform, and severity-coded STOP action' },
      { src: '/images/work/vivio/vivio-error.png', alt: 'Error state showing EKG patch battery below 10% with disabled unavailable button', caption: 'Hard stop error state — device unavailable, workflow blocked until resolved' },
      { src: '/images/work/vivio/vivio-results.png', alt: 'Results screen showing LVEDP higher than 18mmHg with persistent patient context', caption: 'Results screen — single primary output with persistent patient context above' },
      { src: '/images/work/vivio/vivio-design-system.png', alt: 'Design system overview showing color palette, type scale, and button states', caption: 'Custom iOS design system — color, typography, and component states built from scratch' },
    ]}
    cta={{ title: 'Want to see how I designed a zero-to-one clinical iOS app for heart failure diagnosis?' }}
    hero='/images/work/vivio/vivio-results.png'
    next={getNextWork('vivio')!}
  />
}

