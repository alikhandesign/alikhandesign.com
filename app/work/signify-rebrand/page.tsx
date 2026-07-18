import { getNextWork } from '@/app/work.config'
import ProjectPage from '@/app/components/ProjectPage'


export default function Page() {
  return <ProjectPage
    title="Signify Health Rebrand"
    company="Signify Health"
    tags={['Brand Design', 'Web Design']}
    hook="A rebrand isn't just a new logo. It's a statement about who you've become. When Signify Health's mission evolved, the visual identity needed to catch up — and the website needed to prove the change was real."
    hero="/images/work/signify-rebrand/signify-rebrand-homepage-mockup.jpg"
    details={[{ label: 'Company', value: 'Signify Health' }, { label: 'Partner', value: 'W2O Group' }, { label: 'Role', value: 'Brand & Web Designer' }, { label: 'Outcome', value: '50% increase in website traffic' }]}
    sections={[
      { label: 'The Brief', title: 'Translating a new brand into a live digital experience', body: ['Signify Health was expanding its scope and needed a brand refresh that reflected its evolved position in the healthcare ecosystem. In partnership with W2O Group, I contributed to the visual identity redesign and led the website redesign — ensuring the new brand translated from guidelines into a live digital experience.'] },
      { label: 'The Problem', title: 'A brand that no longer reflected the mission', body: ['The existing brand and website were built for an earlier, narrower version of what Signify Health did. As the company\'s mission expanded to include a broader range of home-based care services, the visual identity and digital presence felt misaligned. The website wasn\'t communicating the full scope or credibility of what Signify Health had become.'] },
      { label: 'The Process', title: 'Brand guidelines into a coherent web experience', body: ['Working within the brand guidelines developed with W2O Group, I focused on translating the new visual language into a website experience that felt coherent and trustworthy — navigation, content hierarchy, photography, and information architecture.', 'I also ran a review of the existing site\'s content to identify gaps between what Signify Health was now offering and what the website communicated, then worked with the content team to close those gaps.'] },
      { label: 'The Solution', title: 'A website that proved the rebrand was real', body: ['The redesigned website reflected the evolved brand identity while making the full scope of Signify Health\'s services legible to both health plan partners and individual members. The result was a 50% increase in total website traffic following launch — a signal that the new positioning was resonating with the audiences Signify Health was trying to reach.'] },
    ]}
    gallery={[
        { src: '/images/work/signify-rebrand/signify-rebrand-homepage-alternate-mockup.jpg', alt: 'Alternate homepage direction, desktop and mobile', caption: 'An alternate homepage direction, shown across desktop and mobile' },
        { src: '/images/work/signify-rebrand/signify-rebrand-solutions-page.jpg', alt: 'Solutions by Audience page', caption: 'The Solutions page, restructured around audience type to simplify navigation' }]}
    cta={{ title: 'Curious how research-informed brand strategy drives real business outcomes?' }}
    next={getNextWork('signify-rebrand')!}
  />
}
