import { useEffect, useRef, useState } from 'react'
import ButtonLink from '../ui/ButtonLink'

const NAV_ITEMS = [
  { href: '#challenge', label: 'The challenge' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#oversight', label: 'Human oversight' },
  { href: '#faq', label: 'FAQ' },
]

// Floating glass bar: one look over the footage and over every section, so nothing switches on scroll
export default function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const close = () => setOpen(false)

  // Escape closes the open menu and puts focus back on the toggle
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-3 z-20 px-3 md:top-4 md:px-6">
      <div
        className={`on-dark mx-auto max-w-[1200px] bg-navy/85 text-white shadow-[0_12px_40px_-12px_rgb(5_15_28/0.5)] ring-1 ring-white/10 backdrop-blur-xl backdrop-saturate-150 transition-[border-radius] duration-300 ${
          open ? 'rounded-3xl' : 'rounded-[28px]'
        }`}
      >
        <div className="flex h-14 items-center justify-between pr-2 pl-5 md:pl-6">
          <a href="#top" className="flex items-center gap-2.5 font-serif text-[22px] leading-7 font-normal tracking-[-0.01em]" onClick={close}>
            <svg viewBox="0 0 120 60" className="h-4 w-8 fill-current" aria-hidden="true">
              <path d="M30 32C30 27 42 25 54 25.5 64 26 72 27.5 76 30 72 35 62 38.5 52 38.5 40 38.5 30 36 30 32ZM32 30.5 21 28.5 24 32.5 21 36.5 32 34Z" />
              <path d="M70 28.5C80 27 90 25.6 97 24.6L98.5 28.6C91 29.5 82 31 73 33ZM96 23.5C99 21.6 104 21.6 106 23.4L112 25.4 106 27.2C103 29.4 98 29.4 96.5 28Z" />
              <path d="M46 29C44 19 40 10 33 3 38 4 46 8 52 14 57 19 60 24 62 29Z" />
            </svg>
            FlowOui
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm leading-5 font-medium">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="opacity-75 transition-opacity hover:opacity-100">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <ButtonLink href="#how-it-works" variant="light" className="rounded-full!">
              See the journey
            </ButtonLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        <nav id="mobile-menu" aria-label="Mobile" hidden={!open} className="border-t border-white/10 lg:hidden">
          <ul className="flex flex-col px-5 py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close} className="block py-3 text-base leading-6 font-medium">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
