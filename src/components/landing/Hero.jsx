import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ButtonLink from '../ui/ButtonLink'

gsap.registerPlugin(ScrollTrigger)

// Footage: "Geese Flying in Formation" from Pexels (Pexels licence, free to use, no attribution required).
export default function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  // Footage loops for longer than 5s, so it needs a visible pause control (WCAG 2.2.2)
  const [paused, setPaused] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const pausedRef = useRef(paused)
  pausedRef.current = paused

  useEffect(() => {
    const hero = heroRef.current
    const video = videoRef.current
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

    video.muted = true // some browsers ignore the attribute for autoplay
    const ready = () => video.classList.add('is-ready')
    if (video.readyState >= 2) ready()
    else video.addEventListener('loadeddata', ready, { once: true })

    if (reduced) {
      video.pause() // poster stays as a still
      return
    }

    // Dip to navy just before the loop point so the restart reads as a cut, not a jump
    const onTime = () => video.classList.toggle('is-dim', video.duration - video.currentTime < 0.6)
    video.addEventListener('timeupdate', onTime)

    // Only spend battery on the video while the hero is on screen, and never override a manual pause
    const io = new IntersectionObserver(([e]) =>
      e.isIntersecting && !pausedRef.current ? video.play().catch(() => {}) : video.pause(),
    )
    io.observe(hero)

    // Scroll away: footage slowly dims into the navy floor while the copy lifts off
    const ctx = gsap.context(() => {
      const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hero-media', { opacity: 0.25, scale: 1.05, ease: 'none', scrollTrigger: st })
      gsap.to('.hero-copy', { y: -80, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: 'bottom 30%' } })
    }, hero)

    return () => {
      video.removeEventListener('timeupdate', onTime)
      io.disconnect()
      ctx.revert()
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (paused) video.play().catch(() => {})
    else video.pause()
    setPaused(!paused)
  }

  return (
    <section
      id="top"
      ref={heroRef}
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-[100svh] overflow-hidden bg-navy text-white"
    >
      <div className="hero-media absolute inset-0 -z-10">
        <video
          ref={videoRef}
          className="hero-video h-full w-full object-cover"
          poster="/video/geese-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          // Paused-at-start viewers (reduced motion) see the poster, so they skip the multi-MB download
          preload={paused ? 'none' : 'auto'}
          aria-hidden="true"
        >
          <source src="/video/geese-540.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/video/geese-720.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Navy scrim: keeps the sky and the V readable up top, gives the copy a calm floor */}
      <div aria-hidden="true" className="hero-scrim absolute inset-0 -z-10" />

      <div className="hero-copy mx-auto flex w-full max-w-[1200px] flex-col justify-end px-4 pt-32 pb-20 md:px-8 lg:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <h1 id="hero-title" className="headline text-[52px] leading-[0.98] tracking-[-0.03em] md:text-[80px] lg:text-[100px]">
            <span className="line-mask"><span className="line">Every step</span></span>{' '}
            <span className="line-mask"><span className="line [animation-delay:90ms]">toward home,</span></span>{' '}
            <span className="line-mask"><span className="line [animation-delay:180ms]">made clear.</span></span>
          </h1>

          <div className="lg:pb-3">
            <p className="rise max-w-[28rem] text-lg leading-[1.6] text-white/85 [animation-delay:420ms]">
              FlowOui is a concept for one shared workspace, from the moment you sign on: intake, documents and next
              steps in one place, with licensed consultants in charge of every decision.
            </p>
            <div className="rise mt-8 flex flex-col gap-3 [animation-delay:520ms] sm:flex-row">
              <ButtonLink href="#how-it-works" variant="light">
                See how it works
              </ButtonLink>
              <ButtonLink href="#oversight" variant="glass">
                Our human-review promise
              </ButtonLink>
            </div>
            <p className="rise mt-8 max-w-[28rem] border-l-2 border-white/35 pl-4 text-sm leading-[1.55] text-white/70 [animation-delay:620ms]">
              A BCIT Industry Project concept for StayInCanada Immigration. Not yet a live service.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={togglePlay}
        aria-label={paused ? 'Play background video' : 'Pause background video'}
        className="absolute right-4 bottom-4 z-[1] flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-navy/40 text-white backdrop-blur-md transition-colors hover:bg-navy/70 md:right-8 md:bottom-8"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M8 5.5v13l11-6.5z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
        </svg>
      </button>
    </section>
  )
}
