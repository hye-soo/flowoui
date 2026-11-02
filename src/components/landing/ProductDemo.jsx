import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// One client's workspace, from the email invitation to final review. Everything shown is illustrative.
// Inquiry, assessment, consultation and payment happen before FlowOui (spec section 1, scope boundary).
const STEPS = [
  {
    id: 'invite',
    label: 'Invitation',
    caption: 'After you sign on, an email link opens your workspace. Your visa pathway is already set, so everything you see is made for it.',
    status: 'Workspace ready',
    who: 'You',
  },
  {
    id: 'intake',
    label: 'Guided intake',
    caption: 'Questions for your pathway, one at a time. You answer once, so no one has to re-type it into another system.',
    status: 'Intake: 8 of 12 answered',
    who: 'You',
  },
  {
    id: 'documents',
    label: 'Documents',
    caption: 'One checklist for your pathway, instead of attachments scattered across email threads and drives.',
    status: 'Waiting on you: 1 document',
    who: 'You',
  },
  {
    id: 'check',
    label: 'Admin check',
    caption: 'Admin sees what has arrived and what is missing in one view, and flags gaps to your consultant, who follows up with you.',
    status: 'Missing page flagged',
    who: 'Admin',
  },
  {
    id: 'review',
    label: 'Final review',
    caption: 'The team prepares your file. Your consultant completes final review and sign-off before anything goes to IRCC.',
    status: 'Final review complete',
    who: 'RCIC',
  },
]

const Check = ({ className = 'h-3 w-3' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
)

const Row = ({ label, state }) => (
  <li className="flex items-center gap-3 py-3 text-sm leading-5">
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${state === 'done' ? 'bg-deep-blue text-white' : 'border border-dashed border-[#b8732e]'}`}
    >
      {state === 'done' && <Check />}
    </span>
    <span className={state === 'done' ? 'text-navy/70' : 'font-medium'}>{label}</span>
    {state !== 'done' && <span className="ml-auto rounded-full bg-[#f6e7d8] px-2 py-0.5 text-xs leading-4 font-medium text-[#8a4b12]">Needed</span>}
  </li>
)

// The screen inside the app window for each stage
const PANELS = {
  invite: (
    <div className="rounded-md border border-navy/10 p-5">
      <p className="text-xs leading-4 text-navy/70">From: StayInCanada Immigration via FlowOui</p>
      <p className="mt-2 font-serif text-2xl leading-8">Your workspace is ready</p>
      <p className="mt-3 text-sm leading-5 text-navy/75">
        Everything for your application now lives in one place: questions, documents and messages with your team.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm leading-5">
        <span className="rounded-full bg-mist px-3 py-1">Pathway: Work permit</span>
        <span className="rounded-full bg-mist px-3 py-1">Set by your RCIC</span>
      </div>
      <span className="mt-5 inline-block rounded-sm bg-deep-blue px-4 py-2.5 text-sm leading-5 font-semibold text-white">Open my workspace</span>
    </div>
  ),
  intake: (
    <div>
      <div className="flex items-center justify-between text-xs leading-4 text-navy/70">
        <span>Work permit intake</span>
        <span>Question 9 of 12</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist">
        <div className="h-full w-2/3 rounded-full bg-deep-blue" />
      </div>
      <p className="mt-5 font-serif text-xl leading-7">Have you lived outside your home country for six months or more?</p>
      <p className="mt-2 text-sm leading-5 text-navy/70">Why we ask: some applications need a police certificate from each country.</p>
      <div className="mt-5 grid grid-cols-2 gap-2 text-sm leading-5 font-medium">
        <span className="rounded-sm border border-deep-blue bg-deep-blue/5 px-4 py-2.5 text-deep-blue">Yes</span>
        <span className="rounded-sm border border-navy/15 px-4 py-2.5">No</span>
      </div>
    </div>
  ),
  documents: (
    <div>
      <div className="flex items-center justify-between text-xs leading-4 text-navy/70">
        <span>Documents for your pathway</span>
        <span>3 of 4 received</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist">
        <div className="h-full w-3/4 rounded-full bg-deep-blue" />
      </div>
      <ul className="mt-3 divide-y divide-navy/10">
        <Row label="Passport" state="done" />
        <Row label="Job offer letter" state="done" />
        <Row label="Proof of funds" state="done" />
        <Row label="Police certificate" state="missing" />
      </ul>
    </div>
  ),
  check: (
    <div className="flex flex-col gap-3">
      <div className="rounded-md border border-navy/10 p-4">
        <p className="flex items-center gap-2 text-xs leading-4 text-navy/70">
          <span className="rounded-full bg-ocean px-2 py-0.5 font-semibold text-white">Admin</span>
          flagged for your consultant
        </p>
        <p className="mt-2 text-sm leading-5">
          <span className="font-semibold">Proof of funds:</span> page 2 of 3 is missing.
        </p>
      </div>
      <div className="rounded-md bg-mist p-4">
        <p className="flex items-center gap-2 text-xs leading-4 text-navy/70">
          <span className="rounded-full bg-navy px-2 py-0.5 font-semibold text-white">RCIC</span>
          your consultant
        </p>
        <p className="mt-2 text-sm leading-5">Could you upload page 2 of your bank statement? Everything else is in.</p>
      </div>
      <span className="self-start rounded-sm border border-deep-blue px-3 py-2 text-sm leading-5 font-medium text-deep-blue">Upload page 2</span>
    </div>
  ),
  review: (
    <div>
      <ul className="divide-y divide-navy/10">
        <Row label="Intake complete" state="done" />
        <Row label="All documents received and checked" state="done" />
        <Row label="Final review and sign-off by your RCIC" state="done" />
      </ul>
      <div className="mt-4 flex items-center gap-3 rounded-sm bg-navy px-4 py-3 text-sm leading-5 text-white">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky text-navy">
          <Check />
        </span>
        Ready for submission to IRCC
      </div>
    </div>
  ),
}

const WHO_STYLE = { You: 'bg-mist text-navy', Admin: 'bg-ocean text-white', RCIC: 'bg-navy text-white' }

export default function ProductDemo() {
  const [step, setStep] = useState(0)
  const sectionRef = useRef(null)
  const stRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    // Scroll story on large screens only; elsewhere the stage buttons drive it.
    // CSS sticky does the pinning (no JS jitter); ScrollTrigger only reads progress.
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      stRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => setStep(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length))),
      })
      return () => (stRef.current = null)
    })
    return () => mm.revert()
  }, [])

  // While sticky, a button scrolls to its stage so scroll and state never disagree
  const choose = (i) => {
    const st = stRef.current
    if (st) window.scrollTo({ top: st.start + ((i + 0.5) / STEPS.length) * (st.end - st.start), behavior: 'smooth' })
    else setStep(i)
  }

  const current = STEPS[step]

  return (
    // 450vh tall on large screens gives the sticky view room to play the five stages
    <section ref={sectionRef} id="demo" aria-labelledby="demo-title" className="bg-mist lg:motion-safe:h-[450vh]">
      <div className="flex min-h-[100svh] items-center lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:h-[100svh]">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 px-4 py-24 md:px-8 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:py-16">
          <div>
            <h2 id="demo-title" className="headline text-[36px] leading-[1.1] lg:text-[48px]">
              Always know what comes next.
            </h2>

            <ol className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-navy/15 lg:pb-0">
              {STEPS.map((s, i) => {
                const active = i === step
                return (
                  <li key={s.id} className="shrink-0">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => choose(i)}
                      className={`relative w-full text-left transition-colors duration-300 max-lg:rounded-full max-lg:border max-lg:min-h-11 max-lg:px-4 max-lg:py-2.5 max-lg:text-sm lg:py-3 lg:pl-6 ${
                        active ? 'max-lg:border-deep-blue max-lg:bg-deep-blue max-lg:text-white' : 'text-navy/70 max-lg:border-navy/15 hover:text-navy'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute top-0 -left-px hidden h-full w-0.5 bg-deep-blue transition-opacity duration-300 lg:block ${active ? 'opacity-100' : 'opacity-0'}`}
                      />
                      <span className={`font-semibold lg:text-lg lg:leading-7 ${active ? 'lg:text-navy' : ''}`}>
                        <span className="mr-3 hidden font-serif font-normal text-navy/70 lg:inline">0{i + 1}</span>
                        {s.label}
                      </span>
                      <span
                        className={`hidden overflow-hidden text-navy/75 transition-[max-height,opacity,margin-top] duration-500 lg:block ${active ? 'mt-1 max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        {s.caption}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
            <p className="mt-4 text-navy/75 lg:hidden" aria-live="polite">
              {current.caption}
            </p>
          </div>

          {/* App window: an illustrative client view, decorative beside the captions */}
          <div>
            <div aria-hidden="true" className="overflow-hidden rounded-md bg-white shadow-[0_40px_80px_-40px_rgb(19_41_61/0.45)] ring-1 ring-navy/10">
              <div className="flex items-center gap-2 border-b border-navy/10 px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-navy/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-navy/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-navy/15" />
                <span className="ml-3 text-xs leading-4 text-navy/70">Client view</span>
              </div>

              <div className="p-5 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs leading-4 text-navy/70">Your file</p>
                    <p className="mt-1 text-lg leading-7 font-semibold">{current.status}</p>
                  </div>
                  <span className="flex items-center gap-2 text-sm leading-5 text-navy/70">
                    With
                    <span className={`rounded-full px-2.5 py-0.5 text-xs leading-5 font-semibold transition-colors duration-500 ${WHO_STYLE[current.who]}`}>
                      {current.who}
                    </span>
                  </span>
                </div>

                {/* Stage tracker */}
                <div className="mt-6 grid grid-cols-5 gap-1.5">
                  {STEPS.map((s, i) => (
                    <div key={s.id}>
                      <div className={`h-1.5 rounded-full transition-colors duration-500 ${i <= step ? 'bg-deep-blue' : 'bg-mist'}`} />
                      <p className={`mt-2 hidden text-xs leading-4 transition-colors duration-500 md:block ${i === step ? 'font-semibold text-navy' : 'text-navy/70'}`}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Panels share one grid cell, so the frame is as tall as the tallest panel at any width */}
                <div className="mt-8 grid">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.id}
                      className={`col-start-1 row-start-1 transition-[opacity,translate] duration-500 ease-out ${
                        i === step ? 'translate-y-0 opacity-100' : `pointer-events-none opacity-0 ${i < step ? '-translate-y-3' : 'translate-y-3'}`
                      }`}
                    >
                      {PANELS[s.id]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs leading-4 text-navy/70">Illustrative client view, not real client data.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
