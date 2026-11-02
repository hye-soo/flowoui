import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 'before' = the firm's existing process; 'in' = what happens inside FlowOui (spec section 1, scope boundary)
const STEPS = [
  {
    id: 'inquire',
    phase: 'before',
    title: 'Inquire and free assessment',
    who: ['You', 'Admin'],
    body: 'Reach out, then complete the free assessment. Admin reviews it and suggests a consultation where appropriate.',
  },
  {
    id: 'consult',
    phase: 'before',
    title: 'Consultation',
    who: ['You', 'RCIC'],
    body: 'Talk through your situation with a licensed consultant and decide on your visa pathway together.',
  },
  {
    id: 'sign',
    phase: 'before',
    title: 'Retainer and payment',
    who: ['You'],
    body: 'If you proceed, sign the retainer first, then pay the invoice.',
  },
  {
    id: 'invite',
    phase: 'in',
    title: 'Your FlowOui invitation',
    who: ['You'],
    body: 'An email link opens your workspace, already set up for the visa pathway you chose with your consultant.',
  },
  {
    id: 'intake',
    phase: 'in',
    title: 'Intake and documents',
    who: ['You'],
    body: 'Answer each question once, one at a time, and upload documents against a checklist made for your pathway.',
  },
  {
    id: 'check',
    phase: 'in',
    title: 'Admin check',
    who: ['Admin', 'RCIC'],
    body: 'Admin sees what has arrived and what is missing in one view, and flags gaps to your consultant, who follows up with you.',
  },
  {
    id: 'review',
    phase: 'in',
    title: 'Prepare and final review',
    who: ['Admin', 'RCIC'],
    body: 'The team prepares your file. Your RCIC completes final review and sign-off before anything is submitted to IRCC.',
  },
]

const FIRST_IN = STEPS.findIndex((s) => s.phase === 'in')

// Circle style per phase and state: done (solid outline), current (filled, haloed), upcoming (faint outline).
// Every state keeps an opaque navy fill so the rail never shows through a circle.
const DOT = {
  before: {
    done: 'border-white/70 text-white',
    current: 'border-white bg-white text-navy ring-4 ring-white/15',
    upcoming: 'border-dashed border-white/30 text-white/80',
  },
  in: {
    done: 'border-sky text-sky',
    current: 'border-sky bg-sky text-navy ring-4 ring-sky/25',
    upcoming: 'border-white/30 text-white/80',
  },
}

export default function HowItWorks() {
  const listRef = useRef(null)
  // -1 = list not reached yet; null = static (reduced motion): every step shown plainly
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const list = listRef.current
      const steps = list.querySelectorAll(':scope > li')
      // Rail turns from white to sky where FlowOui begins
      const splitAt = () =>
        list.style.setProperty('--split', `${(steps[FIRST_IN].offsetTop / list.offsetHeight) * 100}%`)
      splitAt()
      gsap.fromTo(
        list.querySelector('.rail-fill'),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: list,
            start: 'top 55%',
            end: 'bottom 55%',
            scrub: true,
            onRefresh: splitAt,
          },
        },
      )
      // "Current" = the last step whose top has crossed 55% of the screen. One trigger recomputes it from
      // positions on every update, so a fast scroll or a jump can't leave it on a stale step.
      const pick = () => {
        const line = window.innerHeight * 0.55
        let c = -1
        steps.forEach((step, i) => step.getBoundingClientRect().top <= line && (c = i))
        setCurrent(c)
      }
      ScrollTrigger.create({
        trigger: list,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: pick,
        onToggle: pick,
        onRefresh: pick,
      })
      return () => setCurrent(null)
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="on-dark bg-navy text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-24 md:px-8 lg:grid-cols-[5fr_7fr] lg:gap-24 lg:py-32">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="how-title" className="headline text-[36px] leading-[1.1] lg:text-[48px]">
            Where FlowOui fits in your journey.
          </h2>
          <p className="mt-6 max-w-[28rem] text-white/75">
            The first steps stay as they are today. FlowOui begins once you have chosen a pathway with your consultant
            and signed on, and everyone on your case works from the same place.
          </p>
          <p className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm leading-5 text-white/65">
            <span>
              <b className="font-semibold text-white">RCIC</b> licensed consultant
            </span>
            <span>
              <b className="font-semibold text-white">Admin</b> the firm’s admin team
            </span>
          </p>
        </div>

        <ol ref={listRef} className="relative">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[19px] w-0.5 bg-white/15">
            <span className="rail-fill block h-full w-full origin-top bg-[linear-gradient(to_bottom,rgb(255_255_255/0.6)_var(--split,40%),var(--color-sky)_var(--split,40%))]" />
          </span>
          {STEPS.map((step, i) => {
            const state = current === null ? 'upcoming' : i < current ? 'done' : i === current ? 'current' : 'upcoming'
            const dim = current !== null && state === 'upcoming'
            return (
              <li
                key={step.id}
                className={`relative flex gap-6 pb-12 transition-opacity duration-500 last:pb-0 ${dim ? 'opacity-75' : ''}`}
              >
                <span
                  aria-hidden="true"
                  className={`relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-navy font-serif text-lg leading-none transition-[color,background-color,border-color,box-shadow] duration-500 ${DOT[step.phase][state]}`}
                >
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  {i === 0 && <p className="label mb-2 text-white/70">Before FlowOui, as today</p>}
                  {step.phase === 'in' && STEPS[i - 1].phase === 'before' && (
                    <p className="label mb-2 text-sky">FlowOui begins here</p>
                  )}
                  <h3 className={`text-lg leading-7 font-semibold ${step.phase === 'before' ? 'text-white/80' : ''}`}>
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[34rem] text-white/70">{step.body}</p>
                  <p className="mt-4 flex gap-2">
                    <span className="sr-only">Who is involved:</span>
                    {step.who.map((w) => (
                      <span
                        key={w}
                        className={`rounded-full border px-2.5 py-0.5 text-xs leading-5 font-medium ${
                          w === 'RCIC' ? 'border-sky/60 bg-sky/10 text-sky' : 'border-white/20 text-white/75'
                        }`}
                      >
                        {w}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
