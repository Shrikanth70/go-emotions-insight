import { useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  EMOTION_METADATA, 
  POSITIVE_EMOTIONS, 
  NEUTRAL_EMOTIONS, 
  NEGATIVE_EMOTIONS,
  EMOTION_FREQUENCIES
} from '../constants/emotions'

const sortOptions = ['Sentiment Group', 'Alphabetical', 'Frequency Map']

export default function Taxonomy() {
  const [activeSort, setActiveSort] = useState('Sentiment Group')

  const allEmotions = useMemo(() => [
    ...POSITIVE_EMOTIONS,
    ...NEGATIVE_EMOTIONS,
    ...NEUTRAL_EMOTIONS
  ], [])

  const sortedEmotions = useMemo(() => {
    const list = [...allEmotions]
    if (activeSort === 'Alphabetical') {
      return list.sort((a, b) => a.localeCompare(b))
    }
    if (activeSort === 'Frequency Map') {
      return list.sort((a, b) => (EMOTION_FREQUENCIES[b] || 0) - (EMOTION_FREQUENCIES[a] || 0))
    }
    return list
  }, [activeSort, allEmotions])

  const getMetadata = (label) => {
    const key = label.toLowerCase()
    return EMOTION_METADATA[key] || { emoji: '❓', color: 'text-outline-variant' }
  }

  const EmotionCard = ({ label, showFrequency }) => {
    const meta = getMetadata(label)
    const freq = EMOTION_FREQUENCIES[label] || 0
    
    // Determine color based on original grouping for style consistency
    let groupColor = 'text-primary'
    if (POSITIVE_EMOTIONS.includes(label)) groupColor = 'text-secondary'
    if (NEGATIVE_EMOTIONS.includes(label)) groupColor = 'text-error'
    if (NEUTRAL_EMOTIONS.includes(label)) groupColor = 'text-tertiary'

    return (
      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 hover:border-primary/40 transition-all cursor-default chip-ignite flex flex-col items-center text-center group relative overflow-hidden">
        {showFrequency && (
          <div className="absolute top-2 right-2 bg-surface-container-highest/50 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-on-surface-variant">
            {freq}%
          </div>
        )}
        <span className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">{meta.emoji}</span>
        <div className={`${groupColor} font-semibold capitalize text-sm md:text-base`}>{label}</div>
      </div>
    )
  }

  return (
    <div className="bg-surface text-on-surface font-body" style={{ userSelect: 'none' }}>
      <style>{`::selection { background: #8455ef; color: #ffffff; }`}</style>
      <Navbar />

      <main className="pt-28 px-6 md:px-12 max-w-7xl mx-auto pb-20">
        {/* Hero Header */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter mb-4 text-tertiary">
                The Emotional{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Atlas
                </span>
              </h1>
              <p className="text-on-surface-variant text-lg font-body leading-relaxed">
                Navigating 28 distinct emotional dimensions. A comprehensive taxonomy mapping human
                sentiment through the lens of high-density neural analysis.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="h-1 w-12 bg-primary-dim rounded-full animate-pulse-slow"></div>
              <div className="h-1 w-6 bg-secondary-dim rounded-full opacity-50"></div>
            </div>
          </div>
        </header>

        {/* Sort Controls */}
        <div className="flex flex-wrap gap-4 mb-12 items-center bg-surface-container-low/40 p-4 rounded-2xl border border-outline-variant/5">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mr-2">
            Sort Perspective:
          </span>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveSort(opt)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeSort === opt
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Taxonomy Grid */}
        <section className="min-h-[600px]">
          {activeSort === 'Sentiment Group' ? (
            <div className="space-y-16">
              {/* Positive Emotions */}
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-secondary-container to-transparent opacity-30"></div>
                  <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-secondary">
                    Positive Dimensions
                  </h2>
                  <span className="bg-secondary-container/20 text-secondary px-2 py-0.5 rounded text-[10px] font-bold">
                    11 LABELS
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {POSITIVE_EMOTIONS.map((label) => (
                    <EmotionCard key={label} label={label} />
                  ))}
                </div>
              </div>

              {/* Negative Emotions */}
              <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-error-container to-transparent opacity-30"></div>
                  <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-error-dim">
                    Negative Dimensions
                  </h2>
                  <span className="bg-error-container/20 text-error-dim px-2 py-0.5 rounded text-[10px] font-bold">
                    11 LABELS
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {NEGATIVE_EMOTIONS.map((label) => (
                    <EmotionCard key={label} label={label} />
                  ))}
                </div>
              </div>

              {/* Ambiguous & Neutral */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                {/* Ambiguous */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary-container to-transparent opacity-30"></div>
                    <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary">Ambiguous</h2>
                    <span className="bg-primary-container/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold">
                      4 LABELS
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {NEUTRAL_EMOTIONS.filter(e => e !== 'neutral').map((label) => (
                      <EmotionCard key={label} label={label} />
                    ))}
                  </div>
                </div>

                {/* Neutral */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-tertiary-container to-transparent opacity-30"></div>
                    <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-tertiary-dim">
                      Baseline
                    </h2>
                    <span className="bg-tertiary-container/20 text-tertiary px-2 py-0.5 rounded text-[10px] font-bold">
                      1 LABEL
                    </span>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 hover:border-tertiary/40 transition-all cursor-default chip-ignite text-center flex flex-col items-center">
                    <span className="text-4xl mb-3">{EMOTION_METADATA.neutral.emoji}</span>
                    <div className="text-tertiary text-xl font-bold tracking-tight">Neutral</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-primary to-transparent opacity-20"></div>
                <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary">
                  {activeSort} View
                </h2>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold">
                  28 DIMENSIONS
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {sortedEmotions.map((label) => (
                  <EmotionCard key={label} label={label} showFrequency={activeSort === 'Frequency Map'} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Technical Deep Dive */}
        <section className="mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden border border-outline-variant/5">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <h3 className="text-3xl font-headline font-bold mb-6">Neural Label Clustering</h3>
              <div className="space-y-6 text-on-surface-variant font-body leading-relaxed">
                <p>
                  The GoEmotions dataset contains 58k meticulously curated Reddit comments. Our
                  analyzer leverages these 28 taxonomy points to provide high-granularity emotional
                  feedback that standard "Positive/Negative" binary systems miss.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center bg-surface-container-low/60 p-4 rounded-xl border border-outline-variant/10">
                    <span className="font-semibold">Dataset Scale</span>
                    <span className="text-secondary font-mono font-bold">58,009 Samples</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface-container-low/60 p-4 rounded-xl border border-outline-variant/10">
                    <span className="font-semibold">Annotation Depth</span>
                    <span className="text-primary font-mono font-bold">28 Categories</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative bg-surface-container-highest p-1 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  alt="Abstract cosmic nebulae with glowing violet and cyan particles representing digital consciousness"
                  className="rounded-[22px] w-full aspect-square object-cover grayscale contrast-125 opacity-70 mix-blend-screen group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC18SdNIEPC2nfjwrDU5osQx9Ia1JUim3-l7U2ve0wCUl6VnbbkKgfv3QgEog14rhLnCPnQ6ZuSPCxzP96ihEBdWQpnh-cCLZbbK7qYAsX1w8zsnn4aHe6mvLGKdhN42v0oz3a1LtYMDRF7daq9sFJRgAnKDvXkrqpRvHbTimgstyptvNDgJi-mmi7kb3R_WDPS_T6tAwp-PPmckOQuhYClc01U1eD7u2XxRiDa_jER_u6QfNbM2zqXE4sIAPMDwf7is-yUVQ8u4PQ"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
