// Each card pairs the copy with a small, illustrative slice of the proposed interface.
// Previews are decorative (aria-hidden); the title and body carry the meaning.

function IntakePreview() {
  return (
    <div className="rounded-md bg-white p-5 shadow-[0_20px_50px_-30px_rgb(19_41_61/0.4)]">
      <div className="flex items-center justify-between text-xs leading-4 text-navy/70">
        <span>Question 4 of 12</span>
        <span>About you</span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-mist">
        <div className="h-full w-1/3 rounded-full bg-deep-blue" />
      </div>
      <p className="mt-5 font-serif text-xl leading-7">Have you lived outside your home country for six months or more?</p>
      <p className="mt-2 text-sm leading-5 text-navy/70">Why we ask: some applications need a police certificate from each country.</p>
      <div className="mt-5 grid grid-cols-2 gap-2 text-sm leading-5 font-medium">
        <span className="rounded-sm border border-deep-blue bg-deep-blue/5 px-4 py-2.5 text-deep-blue">Yes</span>
        <span className="rounded-sm border border-navy/15 px-4 py-2.5">No</span>
      </div>
    </div>
  )
}

const DOCS = [
  { label: 'Passport', state: 'done' },
  { label: 'Birth certificate', state: 'done' },
  { label: 'Proof of funds', state: 'done' },
  { label: 'Language test results', state: 'missing' },
]

function ChecklistPreview() {
  return (
    <ul className="divide-y divide-navy/10 rounded-md bg-white px-5 shadow-[0_20px_50px_-30px_rgb(19_41_61/0.4)]">
      {DOCS.map((d) => (
        <li key={d.label} className="flex items-center gap-3 py-3 text-sm leading-5">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full ${d.state === 'done' ? 'bg-deep-blue text-white' : 'border border-dashed border-[#b8732e]'}`}
          >
            {d.state === 'done' && (
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 4.5 4.5L19 7" />
              </svg>
            )}
          </span>
          <span className={d.state === 'done' ? 'text-navy/70' : 'font-medium'}>{d.label}</span>
          {d.state === 'missing' && <span className="ml-auto rounded-full bg-[#f6e7d8] px-2 py-0.5 text-xs leading-4 font-medium text-[#8a4b12]">Needed</span>}
        </li>
      ))}
    </ul>
  )
}

function StatusPreview() {
  return (
    <div className="rounded-md bg-white p-5 shadow-[0_20px_50px_-30px_rgb(19_41_61/0.4)]">
      <p className="text-xs leading-4 text-navy/70">Current status</p>
      <p className="mt-1 text-[15px] leading-6 font-semibold">Waiting on you</p>
      <p className="mt-3 border-l-2 border-deep-blue pl-3 text-sm leading-5 text-navy/75">Upload your language test results so your consultant can begin review.</p>
    </div>
  )
}

const TEAM = [
  { initials: 'You', role: 'Client', tone: 'bg-mist text-navy' },
  { initials: 'AD', role: 'Admin', tone: 'bg-ocean text-white' },
  { initials: 'RC', role: 'RCIC', tone: 'bg-navy text-white' },
]

function TeamPreview() {
  return (
    <div className="rounded-md bg-white p-5 shadow-[0_20px_50px_-30px_rgb(19_41_61/0.4)]">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {TEAM.map((t) => (
          <div key={t.role} className="flex items-center gap-2.5">
            <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs leading-4 font-semibold ${t.tone}`}>{t.initials}</span>
            <span className="text-sm leading-5 text-navy/70">{t.role}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-sm bg-mist px-4 py-3 text-sm leading-5 text-navy/80">
        <span className="font-semibold text-navy">Admin</span> flagged a missing document for{' '}
        <span className="font-semibold text-navy">your consultant</span>
      </p>
    </div>
  )
}

const FEATURES = [
  {
    id: 'intake',
    title: 'Guided intake, entered once',
    body: 'Questions for your pathway, one at a time, with the reason for each. Answers are captured once, so no one re-types them.',
    preview: <IntakePreview />,
    span: 'lg:col-span-7',
  },
  {
    id: 'documents',
    title: 'Document checklist',
    body: 'One list of what was requested, what has arrived and what is still missing, so admin is not opening every file to find out.',
    preview: <ChecklistPreview />,
    span: 'lg:col-span-5',
  },
  {
    id: 'next-steps',
    title: 'Next steps, not email threads',
    body: 'Requests and updates live on the case, written for people, so clients know who is waiting on what without searching their inbox.',
    preview: <StatusPreview />,
    span: 'lg:col-span-5',
  },
  {
    id: 'coordination',
    title: 'One workspace for everyone',
    body: 'Client, admin and consultants see the same case, instead of separate CRMs and drives. Missing items reach the right consultant quickly.',
    preview: <TeamPreview />,
    span: 'lg:col-span-7',
  },
]

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-24 md:px-8 lg:py-32">
        <div className="max-w-2xl">
          <h2 id="features-title" className="headline text-[36px] leading-[1.1] lg:text-[48px]">
            One workspace. Less chasing.
          </h2>
          <p className="mt-6 text-navy/80">
            These capabilities are in design and not yet available. Each one is meant to remove a step of back-and-forth,
            not a step of professional judgement.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 lg:grid-cols-12">
          {FEATURES.map((f) => (
            <li key={f.id} className={`flex flex-col overflow-hidden rounded-md bg-mist ${f.span}`}>
              <div aria-hidden="true" className="flex flex-1 items-center px-6 pt-6 md:px-10 md:pt-10">
                <div className="w-full">{f.preview}</div>
              </div>
              <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6 md:p-10">
                <div>
                  <h3 className="text-lg leading-7 font-semibold">{f.title}</h3>
                  <p className="mt-2 max-w-[30rem] text-navy/75">{f.body}</p>
                </div>
                <span className="shrink-0 rounded-full border border-navy/15 px-2.5 py-1 text-xs leading-4 font-medium text-navy/70">In design</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-4 text-navy/70">Interface previews are illustrative and may change.</p>
      </div>
    </section>
  )
}
