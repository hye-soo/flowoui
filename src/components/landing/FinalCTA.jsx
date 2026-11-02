import ButtonLink from '../ui/ButtonLink'

export default function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative isolate overflow-hidden bg-navy text-center text-white">
      {/* Bookends the hero: same footage, as a still */}
      <img src="/video/geese-poster.jpg" alt="" loading="lazy" decoding="async" width="1280" height="720" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(19_41_61/0.85),rgb(19_41_61/0.55)_50%,rgb(19_41_61/0.9))]" />
      <div className="mx-auto max-w-2xl px-4 py-28 md:px-8 lg:py-40">
        <h2 id="cta-title" className="headline text-[44px] leading-[1.05] tracking-[-0.02em] lg:text-[64px]">
          Built around people, not paperwork.
        </h2>
        <p className="mx-auto mt-6 max-w-[34rem] text-white/80">
          FlowOui is being designed with StayInCanada Immigration as a BCIT Industry Project. A live demo will be
          linked here once it is ready to try.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="#how-it-works" variant="light">Walk through the journey</ButtonLink>
          {/* Plain status text, not a button shape: nothing to click yet */}
          <p className="px-2 text-sm leading-5 text-white/80">Live demo coming soon</p>
        </div>
      </div>
    </section>
  )
}
