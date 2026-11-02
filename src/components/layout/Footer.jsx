export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-12 text-sm leading-5 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="max-w-md">
          <p className="font-serif text-2xl leading-7 text-navy">FlowOui</p>
          <p className="mt-3 text-navy/75">
            A BCIT Industry Project concept prepared for StayInCanada Immigration. FlowOui is a proposal, not a live service,
            and nothing on this page is immigration or legal advice.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col font-medium">
            <li><a href="#how-it-works" className="inline-block py-2.5 text-deep-blue underline-offset-4 hover:underline">How it works</a></li>
            <li><a href="#oversight" className="inline-block py-2.5 text-deep-blue underline-offset-4 hover:underline">Human oversight</a></li>
            <li><a href="#faq" className="inline-block py-2.5 text-deep-blue underline-offset-4 hover:underline">FAQ</a></li>
            <li><a href="#top" className="inline-block py-2.5 text-deep-blue underline-offset-4 hover:underline">Back to top</a></li>
          </ul>
        </nav>
        <p className="text-xs leading-4">© 2026 FlowOui project team</p>
      </div>
    </footer>
  )
}
