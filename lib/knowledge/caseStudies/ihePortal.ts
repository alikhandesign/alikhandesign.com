// lib/knowledge/caseStudies/ihePortal.ts
import type { CaseStudyDetail } from '../types'

export const IHE_PORTAL_DETAIL: CaseStudyDetail = {
  slug: 'ihe-portal',

  outcome:
    'Signify Health offered eligible Medicare members free in-home health evaluations [3] - a licensed clinician visits the home, reviews medications and history, checks vitals, coordinates with the member\'s PCP. The program operated at scale (3.5M+ annual IHEs completed for members, coordinated across a scheduling network of 10,000+ clinicians) but sign-up rates weren\'t reflecting its potential. Research was qualitative interviews with members who had been offered an IHE and declined, deliberately framed as "help me understand what you were thinking" rather than "why didn\'t you want this." Design principles that came out of it: lead with value not process, give members real-time scheduling control (replacing a callback-request model), establish legitimacy early, and pair every information request with a clear explanation of what the member gets back.',

  businessConstraint:
    'The original portal assumed members already understood the value of the program - the actual finding was that members needed the value case made first, and that reframe drove every subsequent design decision. Six real barrier categories were identified: redundancy with existing care (members with regular PCPs couldn\'t see what the IHE added), clinical inferiority (no blood draws or prescriptions made it feel like a lesser version of real care), a one-sided exchange problem (members gave extensive information and received nothing tangible back), scam skepticism (unsolicited free-medical-service calls are a known senior-targeting scam vector), negative past experiences (unremarkable prior visits created resistance to repeat), and frequency/harassment (some members were being called too often and wanted to be left alone). These were real, documented adoption barriers the redesign had to address directly, not assumptions.',

  technicalConstraint:
    'Not documented in specific stack or architectural detail. The core interaction-model change - replacing a callback-request scheduling flow with real-time member-controlled scheduling - is documented as a design principle, not as a technical implementation.',

  doNotFabricate: [
    'The "10,000+ clinicians" figure refers to the scheduling network coordinated across, not clinicians using the portal as end users - the portal itself is member-facing. Never phrase this as if clinicians were the portal\'s users.',
    'The six barrier categories are specific and should not be paraphrased into a different or shorter list - redundancy with existing care, clinical inferiority, the one-sided exchange problem, scam skepticism, negative past experiences, and frequency/harassment.',
  ],

  // This project is password-gated on the real site - the gate protects the
  // entire detailed narrative (all six barrier category descriptions, the
  // reframe story, design details, and the 61% renewal figure specifically,
  // which is not part of the public metrics). Only the hook and three
  // headline metrics are genuinely public.
  publicSummary:
    'Signify Health partners with health plans to offer eligible Medicare members a free in-home health evaluation, but many eligible members were declining. Ali ran qualitative research to understand why, and the findings led to a trust-first portal redesign. Publicly stated results: 73 NPS post-visit satisfaction, 3.5M+ annual evaluations completed, and six distinct barrier categories identified in the research (the categories themselves, and any other specific figures, are not public). Ali\'s role was UX Researcher and Designer. The specific barrier categories, the redesign\'s reframe and design details, and any metrics beyond what\'s listed here are part of Ali\'s password-protected work. If asked for that depth, point the visitor toward unlocking access on the site, or reaching out to Ali directly, without describing what the protected content actually contains.',
}
