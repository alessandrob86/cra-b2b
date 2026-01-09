
import { ContactForm } from './components/sections/ContactForm';
import { DetailedFeatures } from './components/sections/DetailedFeatures';
import { Features } from './components/sections/Features'; // Keeping old grid for minor features
import { Footer } from './components/sections/Footer';
import { Hero } from './components/sections/Hero';
import { Promo } from './components/sections/Promo';
import { WhatChanges } from './components/sections/WhatChanges';
import { FadeIn } from './components/ui/FadeIn';
import { StickyCTA } from './components/ui/StickyCTA';
import { ScrollToTop } from './components/ui/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-bg-main text-text-main font-sans selection:bg-accent-primary/30">
      <Hero />

      {/* Alert removed as per redesign */}


      <FadeIn delay={0.2}>
        <WhatChanges />
      </FadeIn>

      {/* New Detailed Sections */}
      <DetailedFeatures />

      {/* Kept Grid for Quick Features summary */}
      <div className="bg-bg-card/30">
        <FadeIn delay={0.2}>
          <Features />
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <Promo />
      </FadeIn>

      <ContactForm />

      <Footer />

      <StickyCTA />
      <ScrollToTop />
    </div>
  )
}

export default App
