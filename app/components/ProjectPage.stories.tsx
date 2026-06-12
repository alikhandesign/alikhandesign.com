import type { Meta, StoryObj } from '@storybook/react'
import ProjectPage from './ProjectPage'

/**
 * Shell component for all project pages. Encodes consistent layout: breadcrumb,
 * header (title, company, tags, hook), hero image placeholder, DetailsCard,
 * structured sections, optional gallery, CTA strip, and next project link.
 *
 * ## ProjectPage vs CaseStudyPage
 * ProjectPage is for work that is shown rather than narrated — a finished product,
 * a design system, a shipped feature. The content model is structured: sections
 * are passed as an array of `{ label, title, body[] }` objects, and a gallery
 * is a first-class prop.
 *
 * CaseStudyPage is for work that tells a research story — it accepts free-form
 * `children`, supports a SideNav scrollspy, optional password gating, and header
 * metrics. The narrative is built by the page author, not by the component.
 *
 * Use ProjectPage when the work speaks for itself visually.
 * Use CaseStudyPage when the story behind the work is the point.
 */
const meta: Meta<typeof ProjectPage> = {
  title: 'Templates/ProjectPage',
  component: ProjectPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: { type: 'dynamic' },
    },
  },
}

export default meta
type Story = StoryObj<typeof ProjectPage>

export const Default: Story = {
  args: {
    title: 'Vivio Clinical App',
    company: 'Ventric Health',
    tags: ['Product Design', 'Design Systems', 'Native iOS'],
    hook: 'Designing a clinical application for a non-invasive heart failure diagnostic tool meant solving two problems simultaneously: making a complex multi-device workflow feel simple for clinicians under time pressure, and making sure that when something went wrong, the app told you exactly what to do next.',
    details: [
      { label: 'Company', value: 'Ventric Health' },
      { label: 'Platform', value: 'Native iOS (iPad)' },
      { label: 'Role', value: 'Lead Product Designer' },
      { label: 'Deliverables', value: 'Design System, Native iOS App' },
    ],
    sections: [
      {
        label: 'The Brief',
        title: 'A zero-to-one clinical tool for measuring heart failure',
        body: ['Vivio is the only non-invasive solution for measuring elevated LVEDP, the clinical hallmark of heart failure. The system pairs an iPad app with two Bluetooth-connected hardware devices to collect and process diagnostic data in under five minutes.'],
      },
      {
        label: 'The Problem',
        title: 'Clinical tools fail when they ask too much of the clinician',
        body: ['The design challenge was designing for failure as carefully as designing for success.'],
      },
    ],
    gallery: [
      { src: '', alt: 'Full App Overview', caption: 'Full Vivio application flow overview' },
      { src: '', alt: 'Component Library', caption: 'Design system component library' },
      { src: '', alt: 'Recording Workflow', caption: '5-step recording workflow' },
    ],
    cta: { title: 'Want to see how I built a scalable design system for a zero-to-one clinical product?' },
    next: { title: 'Signify Health Rebrand', href: '/work/signify-rebrand' },
  },
}
