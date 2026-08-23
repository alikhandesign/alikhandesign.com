// lib/knowledge/caseStudies/vivio.ts
import type { CaseStudyDetail } from '../types'

export const VIVIO_DETAIL: CaseStudyDetail = {
  slug: 'vivio',

  outcome:
    'Ali served as a consultant on Vivio, a native iOS cardiac diagnostic tool for non-invasive heart failure monitoring [9], performing a complete redesign from scratch and building a comprehensive design system with a full component library, achieving 1:1 code parity. This was a nine-month engagement running concurrently with CVS Health contract work. The product achieved a 92.2% conclusive diagnostic rate and zero rework post-clearance in a 1,238-patient study, and was FDA-cleared.',

  businessConstraint:
    'Ali was the sole designer on this engagement, with no primary research budget or time - he leaned on secondary research, competitive analysis, and SME walkthroughs rather than speaking directly with clinicians or running user testing with them. He has been direct that this shows in the work: the diagnostic metrics prove the tool worked diagnostically, but they don\'t establish whether it actually worked well for a clinician\'s day-to-day workflow, since that side was never validated. If redone, he says he would build a full end-to-end research strategy - real clinician input before design started, and follow-up research after implementation to close that loop.',

  technicalConstraint:
    'Ali designed against two named standards: IEC 62366 (usability engineering for medical devices) and ANSI/AAMI HE75 (human factors design guidelines). The 20+ error states came from identifying critical use-error scenarios per IEC 62366; the simplified translation of complex cardiac data into a single clear visual reflects HE75\'s cognitive-overload-reduction guidance; the high-visibility alert banners implement HE75\'s preference for design-level risk mitigation over relying on labeling or training alone. The core design principle was hard stops over soft warnings: if a device couldn\'t reliably support a measurement, the workflow stopped entirely rather than presenting a result with a caveat - incorrect readings presented as accurate are more dangerous than an inconclusive one, which was a patient-safety requirement, not a UX preference. Concrete example: if the EKG patch\'s battery dropped below 10%, the interface disabled the relevant action entirely rather than continuing on unreliable hardware. Every error state was written as clinical guidance for what to do next, not a generic system message, since a confusing error in a diagnostic session invalidates the measurement, not just frustrates the clinician.',

  doNotFabricate: [
    'This was design-phase work only. Formal usability validation, multicenter clinical trials, and FDA clearance activity happened after Ali\'s engagement ended and are outside his scope - he was not involved in and cannot speak to that later regulatory or clinical work. Never imply he led or was present for the clinical trial or FDA submission process itself.',
    'The 92.2% conclusive diagnostic rate and the 1,238-patient study are real, documented figures describing the product\'s eventual clinical outcome - not something Ali directly measured or validated himself during his design-phase engagement.',
    'Ali has explicitly and repeatedly acknowledged the lack of direct clinician research as a real gap in this project, not a strength - never frame the secondary-research-only approach as if it were an intentional best practice rather than a genuine constraint he wishes had been different.',
  ],
}
