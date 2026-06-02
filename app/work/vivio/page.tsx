import ProjectPage from '@/app/components/ProjectPage'
export default function Page() {
  return <ProjectPage
    title="Vivio Clinical App"
    company="Ventric Health"
    tags={['Product Design', 'Design Systems', 'Native iOS']}
    hook="Designing a clinical application for a non-invasive heart failure diagnostic tool meant solving two problems simultaneously: making a complex, multi-device workflow feel simple for clinicians under time pressure, and making sure that when something went wrong, the app told you exactly what to do next."
    details={[{ label: 'Company', value: 'Ventric Health' }, { label: 'Platform', value: 'Native iOS (iPad)' }, { label: 'Role', value: 'Lead Product Designer' }, { label: 'Deliverables', value: 'Design System, Native iOS App' }]}
    sections={[
      { label: 'The Brief', title: 'A zero-to-one clinical tool for measuring heart failure', body: ['Vivio is the only non-invasive solution for measuring elevated LVEDP, the clinical hallmark of heart failure. The system pairs an iPad app with two Bluetooth-connected hardware devices to collect and process diagnostic data in under five minutes. Ventric Health needed a complete native iOS application and design system built from scratch, optimized for clinical environments and high-stakes workflows.'] },
      { label: 'The Problem', title: 'Clinical tools fail when they ask too much of the clinician', body: ['The Vivio system involves pairing two Bluetooth devices, entering patient data with specific formatting requirements, managing a tightly sequenced recording workflow, and interpreting results — all with a patient present and time pressure real.', 'On top of that, the app needed to handle over 20 distinct error states gracefully. In a clinical setting, a confusing error message isn\'t just frustrating. It can halt a diagnostic session entirely.', 'The design challenge wasn\'t just simplicity. It was designing for failure as carefully as designing for success.'] },
      { label: 'The Process', title: 'Building a design system before building a single screen', body: ['Before designing a single screen, I built Vivio\'s complete iOS design system from the ground up. Token architecture for color, typography, spacing, and elevation with clinical-specific requirements baked in — high contrast ratios for variable lighting, touch targets sized for real clinical use.', 'The error state inventory was one of the first design artifacts I produced. Mapping every possible failure and what a clinician actually needed to do next gave me a clear picture of where the experience could break down before I started designing the happy path.'] },
      { label: 'The Solution', title: 'A five-step workflow designed for failure as much as success', body: ['The recording workflow was reduced to a clear five-step sequence, each step with a single action and explicit status feedback. Bluetooth pairing was designed to be resumable, with clear device status indicators so a clinician always knew which devices were connected before starting.', 'The results screen was designed around a single primary output: LVEDP above or below 18mmHg. Inconclusive results were handled with specific, instructive messaging rather than generic error states. Offline mode was designed as a first-class experience — clinicians could complete up to 20 sessions without connectivity.'] },
    ]}
    gallery={[{ src: '', alt: 'Full App Overview', caption: 'Full Vivio application flow overview' },
        { src: '', alt: 'Component Library', caption: 'Design system component library' },
        { src: '', alt: 'Recording Workflow', caption: '5-step recording workflow' },
        { src: '', alt: 'Error States', caption: 'Instructive error state designs' },
        { src: '', alt: 'Offline Mode', caption: 'Offline mode and unsent recordings experience' }]}
    cta={{ title: 'Want to see how I built a scalable design system and designed for failure in a zero-to-one clinical iOS product?' }}
    next={{ title: 'Signify Health Rebrand', href: '/work/signify-rebrand' }}
  />
}
