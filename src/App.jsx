import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/landing/Hero'
import Challenge from './components/landing/Challenge'
import HowItWorks from './components/landing/HowItWorks'
import ProductDemo from './components/landing/ProductDemo'
import Features from './components/landing/Features'
import HumanOversight from './components/landing/HumanOversight'
import FAQ from './components/landing/FAQ'
import FinalCTA from './components/landing/FinalCTA'

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Challenge />
        <HowItWorks />
        <ProductDemo />
        <Features />
        <HumanOversight />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
