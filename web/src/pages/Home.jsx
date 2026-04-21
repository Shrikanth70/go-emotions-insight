import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AuroraGlow from '../components/AuroraGlow'

export default function Home() {
  return (
    <div className="bg-surface text-on-surface">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Aurora Background Accents */}
        <AuroraGlow className="w-[500px] h-[500px] bg-primary/10 top-[-200px] left-[-100px]" />
        <AuroraGlow className="w-[600px] h-[600px] bg-secondary/5 bottom-[-100px] right-[-200px]" />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/15 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary mr-2"></span>
            <span className="text-xs font-label text-secondary-fixed">Next-Gen Sentiment Analysis</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-headline font-extrabold tracking-tight mb-6 bg-gradient-to-b from-on-surface to-on-surface-variant bg-clip-text text-transparent">
            Understand Human <br />
            <span className="text-primary">Emotions</span> in Text
          </h1>
          <p className="text-lg md:text-xl font-body text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
            Explore fine-grained emotion classification using the GoEmotions framework. A
            revolutionary dataset built to bridge the gap between machine intelligence and
            human nuance.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              to="/analyzer"
              className="px-8 py-3 bg-gradient-to-br from-primary-dim to-secondary-dim text-on-primary-fixed font-semibold rounded-lg hover:brightness-125 transition-all"
            >
              Try Demo
            </Link>
            <Link
              to="/taxonomy"
              className="px-8 py-3 bg-surface-container-highest text-on-surface border border-primary/20 rounded-lg hover:brightness-125 transition-all"
            >
              Explore Taxonomy
            </Link>
          </div>
        </section>

        {/* Dataset Stats - Minimal Grid */}
        <section className="px-8 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 58k+ Card */}
            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
              <span className="text-secondary text-5xl font-headline font-bold mb-4 block">58k+</span>
              <h3 className="text-on-surface font-headline text-xl mb-3">Reddit comments</h3>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Carefully curated conversational data from diverse online communities, providing a rich foundation for fine-grained sentiment.
              </p>
            </div>

            {/* 28 Labels */}
            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
              <span className="text-primary text-5xl font-headline font-bold mb-4 block">28</span>
              <h3 className="text-on-surface font-headline text-xl mb-3">Labels</h3>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Distinct emotional categories spanning the entire spectrum, allowing for nuanced multi-label classification.
              </p>
            </div>

            {/* Human-annotated */}
            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
              <span className="material-symbols-outlined text-tertiary-dim mb-4 text-4xl">
                verified_user
              </span>
              <h3 className="text-on-surface font-headline text-xl mb-3">Human-Annotated</h3>
              <p className="text-on-surface-variant font-body leading-relaxed">
                Every data point verified by multiple human raters to ensure the highest possible ground truth quality and nuanced agreement.
              </p>
            </div>
          </div>
        </section>

        {/* Research Methodology - Focused */}
        <section className="px-8 py-32 max-w-4xl mx-auto relative border-t border-outline-variant/10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold text-on-surface mb-6">Rigorous Methodology</h2>
            <p className="text-on-surface-variant font-body text-lg">
              The GoEmotions dataset follows a strict pipeline to ensure research-grade accuracy.
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center text-lg font-black bg-primary/5">
                1
              </div>
              <div>
                <h5 className="text-xl text-on-surface font-headline font-bold mb-2">
                  Reddit Sourcing & Filtering
                </h5>
                <p className="text-on-surface-variant font-body leading-relaxed">
                  Comments extracted from popular subreddits, filtered for length, toxicity, and relevance to ensure high-quality emotional signals.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center text-lg font-black bg-primary/5">
                2
              </div>
              <div>
                <h5 className="text-xl text-on-surface font-headline font-bold mb-2">Human Labeling</h5>
                <p className="text-on-surface-variant font-body leading-relaxed">
                  82 technical annotators labeled comments using a custom interface, allowing for multi-label classification to capture blended emotions accurately.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center text-lg font-black bg-primary/5">
                3
              </div>
              <div>
                <h5 className="text-xl text-on-surface font-headline font-bold mb-2"> Agreement & Validation </h5>
                <p className="text-on-surface-variant font-body leading-relaxed">
                  Statistical validation using Fleiss' Kappa to ensure high inter-rater agreement and robust model training sets for the RoBERTa architecture.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
