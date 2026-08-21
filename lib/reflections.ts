// lib/reflections.ts
// Fills the content gap flagged by the Portfolio Assistant eval framework:
// hindsight, prioritization, and career questions the Assistant previously
// had no material for and defaulted to punting to email on.
//
// Grounded entries cite an existing id from SITE_SOURCES (lib/sources.ts).
// Voice-only entries are genuine reflection with no single page to point to,
// and carry no citation.

export interface ReflectionEntry {
  id: number
  category: 'hindsight' | 'prioritization' | 'handoff' | 'gaps' | 'career'
  question: string // anchor question, for prompt organization, not shown verbatim to the user
  answer: string
  sourceIds?: number[] // present = grounded, references existing SITE_SOURCES ids; absent = voice-only
}

export const REFLECTIONS: ReflectionEntry[] = [
  // --- Hindsight / self-critique ---
  {
    id: 1,
    category: 'hindsight',
    question: "What's a decision in one of your case studies you'd approach differently today?",
    answer:
      "On the Hybrid Group MA project at WTW, I was dropped in partway through, after the call had already been made to fold it into our standard Medicare Advantage shopping flow. It was technically a Medicare Advantage plan, but structurally different: it pooled risk into a group to lower costs for the employer and the carrier, and it didn't fit the assumptions the rest of the flow was built on. At the time, I didn't have the research behind me yet to confidently push back on that call.\n\nThe cost showed up quickly. End-users didn't understand what the product was or how to enroll in it, which drove enrollment down and call center volume up, directly against one of the project's own goals of reducing call center load. Today, with more research experience behind me, I'd push earlier and harder for a separated, purpose-built experience, and I'd come with the evidence to back it up.",
  },
  {
    id: 2,
    category: 'hindsight',
    question: 'Looking back, what\'s the biggest mistake you made on a project, and what did you learn?',
    answer:
      "I was tasked with the Shopping Results Redesign at WTW, a much larger effort spanning the entire shopping flow. Going in, I did broad research: competitive analysis, user testing, and FullStory metrics across the whole flow. But when it came to prioritizing what to act on, I worked through the insights in the order a user encounters them in the flow, rather than ranking them by how severe the actual problem was.\n\nThe People-First Enrollment Redesign, the first step of that flow, is what I looked at first mainly because it came first, not because I'd identified it as the highest-severity issue. It turned out to be a genuinely major problem, so it worked out well (that piece alone drove a 45% faster time-to-convert, a 15% lift in enrollments, and a 50% drop in rage clicks), but that was luck, not process. Other real issues further downstream likely didn't get the same early attention simply because of where they sat in the flow, not because they mattered less.\n\nToday, I'd triage by where the worst user feedback and friction actually were, scanning FullStory frustration signals and research themes across the whole flow before committing to a sequence, instead of defaulting to the order a user experiences it.",
    sourceIds: [2],
  },
  {
    id: 3,
    category: 'hindsight',
    question: "Is there a project you're not fully proud of, or would redo from scratch?",
    answer:
      "Vivio. I was the sole designer with no primary research budget or time, so I leaned on secondary and competitive research and SME walkthroughs, but I never once spoke with an actual end-user, the clinician using the app in the field, or ran any user testing with them.\n\nThe product's metrics are genuinely strong: a 92.2% conclusive diagnostic rate and zero rework post-clearance in a 1,238-patient study, FDA-cleared. But those numbers prove it worked diagnostically. They don't tell me whether it actually worked well for the clinician in their day-to-day workflow, because that side was never validated. Passing FDA testing and being genuinely usable in practice aren't the same thing, and only one of those got measured.\n\nIf I could redo it, I'd build a full end-to-end research strategy: real clinician input before the design process started, and follow-up research after implementation to actually close that loop, instead of only knowing the answer to half the question.",
    sourceIds: [9],
  },
  {
    id: 4,
    category: 'hindsight',
    question: 'How has your design thinking changed over the last few years?',
    answer:
      "Over the last few years, my design thinking has shifted from optimizing a single project to building systems and processes that scale beyond my own hands. Early on, success meant shipping a good flow or a clean interface. Now I think just as much about the infrastructure around the work: the standards, checklists, and tools that let other people, across teams, do better work without me being in the room.\n\nTwo things at WTW reflect that shift. I built a mandatory Design Handoff Checklist that standardized how design got handed to engineering across 15 teams and 150+ developers: a Jira gate requiring documented breakpoints, state logic, and interaction logic before a story could move forward, plus a centralized knowledge base. That wasn't a design deliverable in the traditional sense; it was a governance system meant to stop the same handoff gaps from recurring project after project.\n\nThe second is an LLM-powered website audit engine I built. What started as a UX-only request became a cross-functional tool covering UX, engineering, accessibility, and content standards, with a weighted rubric and severity scoring. It cut page review time from hours to minutes and put expertise that used to bottleneck on one or two specialists, especially in content strategy, into anyone's hands.\n\nBoth point to the same underlying shift. I used to measure my impact by the quality of what I personally shipped. Now I measure it by whether the systems I build make everyone around me faster and more consistent, whether or not I'm the one doing the work.",
    sourceIds: [10, 11],
  },
  {
    id: 5,
    category: 'hindsight',
    question: 'What\'s something you believed early in your career that you no longer believe?',
    answer:
      "I used to believe that if I built a strong enough return-on-design-investment case, if the data was good enough, leadership would act on it. Over the course of my career, I've realized that the ROI conversation is really about prioritization. If leadership already values design, the data helps make the case. But if they don't, even solid evidence struggles to move the needle. What's worked for me now is tying design work to the priorities the business already has: call center reduction, low adoption rates, or costly engineering rework. It's less about proving that design has value in the abstract, and more about showing where the lack of it is already costing the business.",
  },

  // --- Prioritization / tradeoffs ---
  {
    id: 6,
    category: 'prioritization',
    question: 'What did you deprioritize or cut on a project, and why?',
    answer:
      "On the People-First Enrollment Redesign, I originally wanted to scope it much larger: restructure the entire shopping experience to be fully sequential, select everyone in your household you're shopping for, walk through each person choosing what they need (health, dental, vision, ancillary), then view the whole household's plans together before checking out.\n\nThat version would have required a large restructuring of how the system operated, so I scoped a more balanced approach instead: let users select who they're shopping for first, then shop for each person individually. That made the lift from Product-First to People-First far less taxing on the engineering team building it, while still delivering the core shift in strategy.\n\nInterestingly, the Via Benefits team is now moving toward that fuller, unified household vision I originally proposed, it's just a much longer-running initiative that's still in progress. Looking back, deprioritizing the full vision wasn't giving up on it; it was recognizing that the more ambitious version needed to be earned incrementally rather than built all at once.",
    sourceIds: [2],
  },
  {
    id: 7,
    category: 'prioritization',
    question: "How do you decide what's an MVP versus what can wait?",
    answer:
      "When deciding what's MVP versus what can wait, I weigh four things: how many people are actually affected, how much it hurts if it's missing, whether we can realistically build it now, and whether it maps to a risk or priority the business already recognizes.\n\nOn the People-First Enrollment Redesign, that's what led me to scope down my original vision of a fully unified, sequential household shopping experience into a lighter, person-by-person version. The full vision would've been a heavy engineering lift, and the phased version still delivered on the core priority without requiring a rebuild of how the system worked.\n\nThe same logic showed up on Current Plan Comparison, where I proposed using funding and reimbursement data to give more accurate pricing to at least some users, but that got deferred as a nice-to-have rather than MVP-required, specifically because it only helped a subset of users, so the reach didn't clear the bar for launch.\n\nMVP, to me, isn't 'the smallest thing we can ship.' It's the smallest thing that actually resolves the highest-severity, broadest-reach problem the business already recognizes as worth solving.",
    sourceIds: [2],
  },
  {
    id: 8,
    category: 'prioritization',
    question: 'Have you ever pushed back on a business requirement for user-experience reasons — what happened?',
    answer:
      "On the Current Plan Comparison feature, which let Agents and end-user Customers view their currently enrolled plan alongside next year's offerings, we discovered mid-build that we didn't actually retain accurate current-plan cost data on our side. The only number we had was the premium at the time of original enrollment, not what the person was actually paying now.\n\nI pushed back. Showing that number risked real user distrust and confusion, since it wouldn't reflect what people were actually paying. I proposed omitting the price entirely and replacing it with guidance on how users could find their real cost: reimbursement statements on our site, calling the carrier, checking bank statements. The PM disagreed and pushed to include the inaccurate number anyway, arguing it was 'better than nothing' since business stakeholders wanted the feature shipped. I also proposed a partial fix, using funding and reimbursement data we did control for the subset of users who had funding accounts, but that was deferred as a nice-to-have, not required for MVP.\n\nThe inaccurate price shipped. Because I expected it would cause problems, I'd proactively set up FullStory and Qualtrics tracking specifically to monitor this feature, and the data confirmed the concern: we saw a real increase in feedback about the price being wrong, and it drove call center volume, though I don't have a precise number on that. It was a new feature, so that feedback was entirely new noise we hadn't seen before.",
  },
  {
    id: 9,
    category: 'prioritization',
    question: "What's a project where the business outcome and the ideal user experience were in tension? How'd you resolve it?",
    answer:
      "On the IHE Scheduling Portal, there was a clear tension between what the business wanted and what my research supported. Stakeholders wanted 'Schedule your visit' to remain the primary call to action: direct, conversion-focused. But my research showed the real barrier wasn't logistics, it was trust. Many eligible members were declining a free, beneficial visit because they didn't understand or trust its value, not because scheduling itself was hard.\n\nRather than replacing the primary CTA, I resolved it by adding a secondary 'Here's how' CTA next to it, smaller in prominence, positioned to the left, that invited people to learn how the visit could benefit them before committing to schedule it. 'Schedule your visit' stayed the primary path for people already convinced; 'Here's how' gave the trust-building content my research showed was missing to everyone else, without slowing down or diluting the conversion path the business cared about.\n\nThe redesign overall drove strong results: 73 NPS post-visit, 61% higher likelihood of renewing coverage, and 3.5M+ annual IHEs completed. Evidence that addressing trust didn't come at the expense of the business's core ask; it supported it.",
    sourceIds: [3],
  },

  // --- Technical / handoff reasoning ---
  {
    id: 10,
    category: 'handoff',
    question: 'How do you think about edge cases and error states in your designs?',
    answer:
      "With Vivio, I mapped over 20 distinct failure states: Bluetooth pairing issues, device signal problems, recording quality concerns, data transmission failures, working directly with subject matter experts and engineers to figure out what each one should actually tell the clinician using it.\n\nThe core principle was hard stops over soft warnings. If a device couldn't reliably support a measurement, the workflow stopped rather than presenting a result with a caveat attached. Incorrect readings presented as accurate are more dangerous than an inconclusive result, and that wasn't a UX preference, it was a patient-safety requirement. One concrete example: if the EKG patch's battery dropped below 10%, the interface disabled the relevant action entirely rather than letting the session continue on unreliable hardware.\n\nThe other half was making sure a blocked workflow didn't just frustrate the clinician. It had to tell them what to do next. A confusing error in a diagnostic session doesn't just frustrate, it invalidates the measurement. So every error state was written as clinical guidance, not a generic system message.\n\nMore broadly, that's how I think about edge cases. It's not just 'what happens if this fails,' it's 'what does failing safely, and clearly, actually look like in this context.' In a clinical tool, that means stopping the workflow and telling the person exactly what to do about it.",
    sourceIds: [9],
  },
  {
    id: 11,
    category: 'handoff',
    question: 'What does your handoff process to engineering actually look like?',
    answer:
      "My handoff process starts from a real, specific failure. At WTW, we were operating at enterprise scale (15 design teams, 150+ developers, 15 designers), and delivery had stalled because handoff was essentially a black box. Components got reused inconsistently across teams, and there was a 'Desktop-Only' myth in the org that meant no team had ever actually documented mobile breakpoints, even though everything shipped responsively.\n\nI built a mandatory Ready-for-Dev checklist as a Design Sub-task gate in Jira. A story couldn't move into development until three things were documented: mobile breakpoints, state logic (loading, error, and empty states), and interaction logic (tap versus click behaviors, not just visual states). Alongside that, I set up a centralized knowledge base as a source of truth for handoff continuity across teams, and a customization pipeline that formally vetted any new component before it entered the shared library, instead of letting ad-hoc components get created and reused inconsistently.\n\nThe result: rework dropped, because the source of truth got established before a sprint even began, instead of getting discovered mid-build. Just as important as the mechanics was how I got buy-in. I reframed the whole initiative as an accessibility and legacy-protection project rather than a process burden, which shifted senior designers from seeing it as compliance overhead to something closer to mentorship.\n\nWhere I'd take it next: right now the gate still relies on a person checking the work. I'd want to automate parts of it with Figma linting plugins, so governance shifts from being socially enforced to technically enforced.",
    sourceIds: [10],
  },
  {
    id: 12,
    category: 'handoff',
    question: 'How closely do you work with engineers during implementation, not just at handoff?',
    answer:
      "A lot of how I design happens in close partnership with engineering and PMs. I try to understand what's definitely possible, what might be possible, and what's definitely not possible, before I start iterating (but after understanding user needs, not before). That lets me think about solutions in a grounded way rather than designing something and finding out later it can't be built.",
  },

  // --- Weakness / gaps ---
  {
    id: 13,
    category: 'gaps',
    question: "What's a skill or domain you're still developing?",
    answer:
      "Multi-agent systems. I've already built and shipped a real agentic pipeline, the AI Feedback & Insights Agent at WTW, so I have a solid grasp of designing a single agent end-to-end. What I'm developing now is the next level up: designing for systems where multiple coordinated agents work together, and understanding the strategy behind when and how agentic AI is actually the right tool to reach for, not just how to build one. Right now that's mostly reading and following the space closely. I haven't hit a real problem yet that needs multiple coordinated agents, so I'm building the conceptual foundation before I have a concrete use case to apply it to. I also want to get better at designing for other people building these systems, not just building them myself.",
    sourceIds: [1],
  },
  {
    id: 14,
    category: 'gaps',
    question: 'Why isn\'t there [X kind of project] on your site — is that a gap?',
    answer:
      "There are real gaps, and I'd rather say so directly than dance around it. My work has been almost entirely enterprise and healthcare-adjacent. I don't have fintech, ERP, accounting-software, large-scale ATS/CMS platform work beyond some hands-on HubSpot CMS experience, hardware or physical computing, or consumer-social product experience. If a role specifically needs deep expertise in one of those, that's a real gap, not something I'd try to talk around.\n\nWhat I'd point to instead is that my strength has been in problems that are complex, regulated, or data-heavy (Medicare, a clinical medical device, enterprise design systems), and that tends to transfer well into other high-complexity domains, even ones I haven't worked in directly. Honestly, part of why I'm job searching right now is that I want that stretch. I'm genuinely excited about moving into domains I haven't touched yet, especially AI-native and design-tech spaces. So the honest version is: I probably don't have direct experience in [X], but I have a track record of getting up to speed fast in complex domains I didn't start in, and I'm actively looking for the chance to prove that somewhere new.",
  },
  {
    id: 15,
    category: 'gaps',
    question: 'What kind of role or team would you struggle in?',
    answer:
      "A role where I'm the sole designer with no research support and no one to critique my work against. I've actually lived this. On Vivio, I was the only designer with no primary research budget, and I've already said directly that I think it shows: I never spoke with an actual clinician, and I don't know how the product performed in real-world use, only that it passed diagnostic testing. I do my best work when I have research access and other designers or a design lead to pressure-test my thinking against. Total isolation is where my gaps are most likely to show up.",
    sourceIds: [9],
  },

  // --- Career narrative / "why this" ---
  {
    id: 16,
    category: 'career',
    question: 'Why are you focused on AI interaction design specifically right now?',
    answer:
      "Part of it is broader industry direction, but the bigger part is that this has been a natural progression of my own career, not something anyone assigned to me. No one asked me to build the AI Feedback & Insights Agent. I saw our UX Researchers struggling under the weight of manual synthesis work, and I wanted to ease that burden with a technical solution. Building it also gave me the chance to learn a new skill, which is something I actively look for. Curiosity and continued learning are core values of mine, not just professional strategy.\n\nAt the core of it, AI product design is still the same practice I've always done: listening to people, learning from their feedback, and building trust, just applied to a new kind of problem. LLMs are powerful, but they don't replace human emotion and nuance. The Feedback Agent only became trustworthy because of a double-blind validation process that took its accuracy from 78% to 95%. The technology needed a human-designed layer of rigor around it before anyone could actually rely on it. That's the same work I've always done, just with a new set of tools.",
    sourceIds: [1],
  },
  {
    id: 17,
    category: 'career',
    question: 'What draws you to [industry/domain] work?',
    answer:
      "What draws me to healthcare and healthcare-adjacent work is that it's fundamentally about helping people, especially people whose voices get lost more often than not. At WTW, I was helping largely elderly people navigate genuinely complex healthcare decisions. At Signify Health, my research focused on people who scored poorly on social determinants of health, non-medical factors like income, transportation, or housing stability that make it harder to access care in the first place. At Vivio, the person I was directly designing for was the clinician, but the goal was the same: give the person helping others a tool clear and reliable enough that the actual patient, often someone in a vulnerable moment, gets an accurate result.\n\nBut I don't think what I value about this work is actually healthcare-specific. I think I could do this in any industry. Knowing that I get to listen, and sometimes talk directly with, end users, and help make their lives just a bit better, is the root of why I love this job. Healthcare is where I've gotten to practice that most, but it's not the only place I want to practice it.",
    sourceIds: [2, 3, 9],
  },
]

// Formatted for injection into the system prompt.
// Grounded entries reuse existing SITE_SOURCES citation ids; voice-only
// entries are presented with no citation attached.
export function formatReflectionsForPrompt(): string {
  return REFLECTIONS.map((r) => {
    const citationNote = r.sourceIds
      ? ` (grounded — cite [${r.sourceIds.join(', ')}] as normal)`
      : ' (voice-only — answer directly, no citation)'
    return `Q: ${r.question}\nA: ${r.answer}${citationNote}`
  }).join('\n\n')
}
