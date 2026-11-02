// Answers stay within what the project can honestly say today (spec copywriting rules)
const QUESTIONS = [
  {
    id: 'available',
    q: 'Can I use FlowOui today?',
    a: 'Not yet. FlowOui is a concept being designed with StayInCanada Immigration as a BCIT Industry Project. A live demo will be linked on this page once it is ready to try.',
  },
  {
    id: 'when',
    q: 'When would a client start using FlowOui?',
    a: 'After the consultation and sign-on. Inquiry, the free assessment, the consultation where you choose a visa pathway, the retainer and payment all happen first, as they do today. Then you receive an email invitation to your workspace, already set up for your pathway.',
  },
  {
    id: 'advice',
    q: 'Who gives the immigration advice?',
    a: 'Licensed consultants (RCICs). FlowOui organizes questions, documents and next steps around them. It does not give professional advice.',
  },
  {
    id: 'decide',
    q: 'Does software decide whether I am eligible?',
    a: 'No. Eligibility and every professional decision stay with your consultant. If AI assistance is ever added, it helps with general navigation only.',
  },
  {
    id: 'faster',
    q: 'Will FlowOui make my application faster or more likely to succeed?',
    a: 'FlowOui cannot change IRCC processing times or outcomes. Its aim is to make each step easier to follow, so less time goes to repeating details and chasing documents.',
  },
  {
    id: 'documents',
    q: 'What happens to my documents?',
    a: 'FlowOui is not collecting documents yet. How documents would be stored and protected will be set out clearly before any live service is offered.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-24 md:px-8 lg:grid-cols-[5fr_7fr] lg:gap-24 lg:py-32">
        <div>
          <h2 id="faq-title" className="headline text-[36px] leading-[1.1] lg:text-[48px]">
            Straight answers.
          </h2>
          <p className="mt-6 max-w-[28rem] text-navy/80">What FlowOui is, what it is not, and who stays responsible.</p>
        </div>

        <div className="border-t border-navy/15">
          {QUESTIONS.map((item) => (
            <details key={item.id} className="group border-b border-navy/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg leading-7 font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 stroke-deep-blue transition-transform duration-300 group-open:rotate-45" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="max-w-[36rem] pb-6 text-navy/75">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
