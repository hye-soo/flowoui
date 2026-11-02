const FRICTIONS = [
  {
    id: 'tools',
    title: 'One case, many tools',
    body: 'Case details live across several CRMs and shared drives, so no one sees the whole file in one place.',
  },
  {
    id: 'email',
    title: 'Email back-and-forth',
    body: 'Requests, questions and attachments travel in long email threads that are easy to lose track of.',
  },
  {
    id: 'checking',
    title: 'Checking every document by hand',
    body: 'Admin opens each file to look for errors and missing pages before anything can move forward.',
  },
  {
    id: 'retyping',
    title: 'Typing it all in again',
    body: 'Information clients already sent is re-typed into internal systems, which takes time and invites mistakes.',
  },
]

// Illustrative only: the same file, before and after
const SCATTERED = [
  { label: 'RE: RE: Fwd: passport scan', rot: '-rotate-3', pos: 'left-[6%] top-[22%]' },
  { label: 'CRM note: page 2 missing?', rot: 'rotate-2', pos: 'right-[6%] top-[33%]' },
  { label: 'Drive › Clients › 2026 › (3)', rot: '-rotate-1', pos: 'left-[12%] top-[48%]' },
  { label: 'bank_statement_FINAL_v3.pdf', rot: 'rotate-3', pos: 'right-[4%] top-[63%]' },
  { label: 'Re-type DOB into system', rot: '-rotate-2', pos: 'left-[4%] bottom-[14%]' },
  { label: '“Where are we with my file?”', rot: 'rotate-1', pos: 'right-[8%] bottom-[3%]' },
]

const ORGANIZED = [
  { label: 'Passport', status: 'Received' },
  { label: 'Proof of funds', status: 'Received' },
  { label: 'Language test results', status: 'Missing' },
  { label: 'Police certificate', status: 'Requested' },
]

const STATUS_STYLE = {
  Received: 'bg-deep-blue/10 text-deep-blue',
  Missing: 'bg-[#f6e7d8] text-[#8a4b12]',
  Requested: 'bg-navy/5 text-navy/70',
}

export default function Challenge() {
  return (
    <section id="challenge" aria-labelledby="challenge-title" className="bg-mist">
      <div className="mx-auto max-w-[1200px] px-4 py-24 md:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-24">
          <div>
            <h2 id="challenge-title" className="headline text-[36px] leading-[1.1] lg:text-[48px]">
              Immigration is personal. The paperwork shouldn’t live in five places.
            </h2>
            <p className="mt-6 max-w-[28rem] text-navy/80">
              Once a client signs on, the real work begins, and today it is spread across tools, inboxes and manual checks.
            </p>
          </div>

          <ul className="grid gap-x-12 sm:grid-cols-2">
            {FRICTIONS.map((item) => (
              <li key={item.id} className="border-t border-navy/15 py-8">
                <h3 className="text-lg leading-7 font-semibold">{item.title}</h3>
                <p className="mt-2 text-navy/75">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:mt-24" aria-label="Illustration: the same client file spread across tools today, and in one FlowOui workspace" role="img">
          <div className="relative min-h-[360px] overflow-hidden md:min-h-[300px] rounded-md border border-navy/10 bg-white/60 p-6">
            <p className="label text-navy/70">Today</p>
            {SCATTERED.map((s) => (
              <span
                key={s.label}
                aria-hidden="true"
                className={`absolute ${s.pos} ${s.rot} rounded-sm border border-navy/10 bg-white px-3 py-2 text-sm leading-5 whitespace-nowrap text-navy/70 shadow-[0_6px_20px_-8px_rgb(19_41_61/0.25)]`}
              >
                {s.label}
              </span>
            ))}
          </div>

          <div className="rounded-md bg-white p-6 shadow-[0_24px_60px_-30px_rgb(19_41_61/0.35)]" aria-hidden="true">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <p className="label whitespace-nowrap text-deep-blue">One FlowOui workspace</p>
              <span className="text-xs leading-4 whitespace-nowrap text-navy/70">2 of 4 received</span>
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-mist">
              <div className="h-full w-1/2 rounded-full bg-deep-blue" />
            </div>
            <ul className="mt-5 divide-y divide-navy/10">
              {ORGANIZED.map((d) => (
                <li key={d.label} className="flex items-center justify-between py-3.5">
                  <span className="text-[15px] leading-6 font-medium">{d.label}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs leading-5 font-medium ${STATUS_STYLE[d.status]}`}>{d.status}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-5 text-navy/70">
              Next step: <span className="font-medium text-navy">upload your language test results</span>
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-4 text-navy/70">Illustrative example, not real client data.</p>
      </div>
    </section>
  )
}
