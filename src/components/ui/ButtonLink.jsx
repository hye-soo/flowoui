// Button styles from Figma "04 • UI usage": primary = white on deep blue, navy on hover;
// secondary = outlined with an ocean control border.
const VARIANTS = {
  primary: 'bg-deep-blue text-white hover:bg-navy',
  secondary: 'bg-white text-deep-blue border border-ocean hover:border-navy hover:text-navy',
  // For use over the hero footage
  light: 'bg-white text-navy hover:bg-mist',
  glass: 'border border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20',
}

export default function ButtonLink({ href, variant = 'primary', className = '', children, ...props }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm leading-5 font-semibold transition-colors duration-200 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}
