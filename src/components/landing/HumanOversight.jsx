const PROMISES = [
  { id: 'advice', text: 'Licensed consultants (RCICs) give all professional immigration advice.' },
  { id: 'follow-up', text: 'Admin flags missing documents to your consultant, and your consultant follows up with you directly.' },
  { id: 'sign-off', text: 'A consultant completes final review and sign-off before any submission to IRCC.' },
  {
    id: 'ai',
    text: 'If AI assistance is ever added, it helps with general navigation only. It never decides eligibility or promises outcomes.',
  },
]

// Stated plainly because honesty about limits is part of the trust story (spec copywriting rules)
const NEVER = [
  { id: 'outcome', text: 'Guarantee a visa outcome or a better chance of approval' },
  { id: 'timing', text: 'Promise IRCC processing times' },
  { id: 'advice', text: 'Give immigration advice without a licensed consultant' },
]

// Decorative seal: circular label around a check mark
function Seal() {
  return (
    <svg viewBox="0 0 160 160" className="h-32 w-32 text-white lg:h-36 lg:w-36" aria-hidden="true">
      <defs>
        <path id="seal-ring" d="M80 80m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0" />
      </defs>
      <circle cx="80" cy="80" r="76" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="80" cy="80" r="44" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <text fill="currentColor" fontSize="10" fontWeight="600" letterSpacing="2.2">
        <textPath href="#seal-ring" textLength="362" lengthAdjust="spacing">REVIEWED &amp; SIGNED OFF · LICENSED RCIC ·</textPath>
      </text>
      <path d="m64 81 11 11 22-24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function HumanOversight() {
  return (
    <section id="oversight" aria-labelledby="oversight-title" className="on-dark bg-deep-blue text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-24 md:px-8 lg:grid-cols-2 lg:gap-24 lg:py-32">
        <div>
          <h2 id="oversight-title" className="headline text-[36px] leading-[1.1] lg:text-[48px]">
            People decide. FlowOui keeps things organized.
          </h2>
          <p className="mt-6 max-w-[28rem] text-white/85">
            Software can make the path clearer. It cannot replace a licensed professional, and it is not designed to.
          </p>
          <div className="mt-12">
            <Seal />
          </div>
        </div>
        <ul className="flex flex-col divide-y divide-white/15">
          {PROMISES.map((p) => (
            <li key={p.id} className="flex gap-4 py-5 first:pt-0 last:pb-0">
              <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 stroke-white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12 4.5 4.5L19 7" />
              </svg>
              {p.text}
            </li>
          ))}
        </ul>

        <div className="rounded-md bg-navy/30 p-6 ring-1 ring-white/15 md:p-8 lg:col-span-2">
          <h3 className="text-lg leading-7 font-semibold">What FlowOui will never do</h3>
          <ul className="mt-5 grid gap-4 md:grid-cols-3 md:gap-8">
            {NEVER.map((n) => (
              <li key={n.id} className="flex gap-3">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 stroke-white/70" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
                {n.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
