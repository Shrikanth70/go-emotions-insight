import { useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Papa from 'papaparse'
import ErrorBoundary from '../components/ErrorBoundary'
import { 
  EMOTION_METADATA, 
  POSITIVE_EMOTIONS, 
  NEUTRAL_EMOTIONS, 
  NEGATIVE_EMOTIONS 
} from '../constants/emotions'
import { 
  Upload, 
  FileText, 
  BarChart3, 
  Zap, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  X,
  Layers,
  Search,
  ChevronRight
} from 'lucide-react'

// Emotion groupings and metadata imported from constants/emotions.js

const downloadResults = (data) => {
  if (!data || data.length === 0) return
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`
  const link = document.createElement("a")
  link.setAttribute("href", jsonString)
  link.setAttribute("download", "goemotions_results.json")
  link.click()
}

const getSentimentStats = (prediction) => {
  if (!prediction || !prediction.predicted_emotions) return { positive: 0, neutral: 0, negative: 0 }
  let positive = 0, neutral = 0, negative = 0
  prediction.predicted_emotions.forEach(e => {
    if (POSITIVE_EMOTIONS.includes(e.label)) positive += e.score
    if (NEUTRAL_EMOTIONS.includes(e.label)) neutral += e.score
    if (NEGATIVE_EMOTIONS.includes(e.label)) negative += e.score
  })
  const total = positive + neutral + negative
  if (total === 0) return { positive: 0, neutral: 0, negative: 0 }
  return {
    positive: Math.round((positive / total) * 100),
    neutral: Math.round((neutral / total) * 100),
    negative: Math.round((negative / total) * 100)
  }
}

export default function Analyzer() {
  const [inputText, setInputText] = useState('')
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [bulkData, setBulkData] = useState([])
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkProgress, setBulkProgress] = useState(0)
  const [bulkResults, setBulkResults] = useState([])
  const [threshold, setThreshold] = useState(0.5)
  const [textColumn, setTextColumn] = useState('text')
  const fileInputRef = useRef(null)

  const handleAnalyze = async () => {
    if (!inputText.trim()) return
    setIsLoading(true)
    setError(null)
    setIsBulkMode(false)
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, threshold: threshold })
      })
      if (!response.ok) throw new Error('Failed to analyze text. Ensure backend is running.')
      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setBulkData(results.data)
        setIsBulkMode(true)
        setResults(null)
        setError(null)
      },
      error: () => setError("Failed to parse CSV file.")
    })
  }

  const runBulkAnalysis = async () => {
    if (bulkData.length === 0) return
    setIsLoading(true)
    setBulkResults([])
    setBulkProgress(0)
    const batchSize = 10
    const finalizedResults = []
    try {
      for (let i = 0; i < bulkData.length; i += batchSize) {
        const batch = bulkData.slice(i, i + batchSize)
        const texts = batch.map(row => row[textColumn] || Object.values(row)[0])
        const response = await fetch('http://localhost:8000/predict/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ texts, threshold: threshold })
        })
        if (!response.ok) throw new Error('Bulk API request failed')
        const data = await response.json()
        finalizedResults.push(...data)
        setBulkProgress(Math.round(((i + batch.length) / bulkData.length) * 100))
        setBulkResults([...finalizedResults])
      }
    } catch (err) {
      setError(`Bulk analysis failed: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-background text-on-background font-body min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] aurora-glow-radial pointer-events-none opacity-50" style={{ zIndex: -1 }}></div>
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/15 mb-4 shadow-sm">
            <Zap className="w-3 h-3 text-secondary" />
            <span className="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-secondary">
              Research Pipeline v2.0 • SOTA RoBERTa
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-black tracking-tight mb-4">
            Insight <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Nexus</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
            High-precision emotion classification using Google's GoEmotions architecture.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20 shadow-xl relative">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-sm font-label font-bold uppercase tracking-wider text-outline">Dataset Entry</span>
                </div>
                {!isBulkMode && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-label font-bold text-outline-variant uppercase">Sensitivity: {threshold}</span>
                    <input type="range" min="0.1" max="0.9" step="0.05" value={threshold} onChange={(e) => setThreshold(parseFloat(e.target.value))} className="w-24 h-1 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary" />
                  </div>
                )}
                {isBulkMode && (
                  <button onClick={() => { setIsBulkMode(false); setBulkData([]); setBulkResults([]); }} className="text-xs flex items-center gap-1 text-error hover:underline"><X className="w-3 h-3" /> Exit Bulk Mode</button>
                )}
              </div>
              {!isBulkMode ? (
                <textarea className="w-full h-80 bg-surface-container-lowest border-none focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl p-6 text-on-surface font-body text-lg resize-none placeholder:text-outline-variant/30 shadow-inner" placeholder="Paste your research text here..." value={inputText} onChange={(e) => setInputText(e.target.value)}></textarea>
              ) : (
                <div className="h-80 flex flex-col items-center justify-center bg-surface-container-lowest rounded-xl border-2 border-dashed border-outline-variant/30">
                  <FileText className="w-16 h-16 text-primary mb-4 opacity-50" />
                  <p className="font-headline font-bold text-xl">{bulkData.length} Rows Detected</p>
                  {bulkProgress > 0 && (
                    <div className="w-64 space-y-2 mt-4">
                      <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${bulkProgress}%` }}></div>
                      </div>
                      <p className="text-[10px] text-center text-outline">PROCESSING: {bulkProgress}%</p>
                    </div>
                  )}
                  {bulkData.length > 0 && !isLoading && bulkProgress === 0 && (
                     <div className="mt-4 w-64">
                       <p className="text-[10px] font-bold text-outline uppercase mb-2">Column with Text:</p>
                       <select value={textColumn} onChange={(e) => setTextColumn(e.target.value)} className="w-full bg-surface-high border border-outline-variant/20 rounded py-1 px-2 text-xs">
                          {Object.keys(bulkData[0]).map(k => <option key={k} value={k}>{k}</option>)}
                       </select>
                     </div>
                  )}
                </div>
              )}
              <div className="flex flex-wrap justify-between items-center gap-4 pt-6">
                <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-all text-xs font-bold border border-outline-variant/10"><Upload className="w-4 h-4" /> Upload CSV</button>
                <button onClick={isBulkMode ? runBulkAnalysis : handleAnalyze} disabled={isLoading || (isBulkMode ? bulkProgress === 100 : !inputText.trim())} className="px-10 py-4 rounded-xl font-headline font-black text-on-primary-fixed bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 flex items-center gap-2">
                  {isLoading ? 'Processing...' : isBulkMode ? 'Execute Bulk Analysis' : 'Analyze Sentiment'}
                </button>
              </div>
              {error && <div className="mt-4 p-4 bg-error-container/20 border border-error/20 rounded-lg text-sm text-error">{error}</div>}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-panel p-4 rounded-2xl border border-outline-variant/10"><span className="text-[10px] font-black text-outline uppercase">Latency</span><p className="text-xl font-headline font-black text-secondary">~120ms</p></div>
              <div className="glass-panel p-4 rounded-2xl border border-outline-variant/10 border-t-2 border-primary/20"><span className="text-[10px] font-black text-outline uppercase">Arch</span><p className="text-xl font-headline font-black text-primary">RoBERTa</p></div>
              <div className="glass-panel p-4 rounded-2xl border border-outline-variant/10"><span className="text-[10px] font-black text-outline uppercase">Labels</span><p className="text-xl font-headline font-black text-tertiary">28 + AMB</p></div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {!isBulkMode ? (
              <div className="glass-panel rounded-2xl overflow-hidden border border-outline-variant/20 shadow-2xl h-fit">
                <div className="bg-surface-container-highest p-6 border-b border-outline-variant/10 font-headline font-black text-xl">Detected Emotions</div>
                <div className="p-8 space-y-8">
                <ErrorBoundary>
                  {results ? (
                    <>
                      {/* Dominant Emotions Section */}
                      <div className="space-y-6">
                        <p className="text-[10px] text-outline font-black uppercase tracking-[0.2em]">Dominant Signals</p>
                        <div className="space-y-4">
                          {(results?.top_emotions || [results?.primary_emotion] || [])
                            .filter(Boolean)
                            .map((emotion, idx) => {
                              const score = results?.predicted_emotions?.find(e => e.label === emotion)?.score || 0;
                              const emotionKey = typeof emotion === 'string' ? emotion.toLowerCase() : 'Ambiguous';
                              const metadata = EMOTION_METADATA[emotionKey] || EMOTION_METADATA['Ambiguous'];
                              
                              return (
                                <div key={`${emotion}-${idx}`} className={`flex items-center gap-5 p-4 rounded-2xl border transition-all ${idx === 0 ? 'bg-primary/5 border-primary/20 scale-105 origin-left' : 'bg-surface-high border-outline-variant/10'}`}>
                                  <div className={`${idx === 0 ? 'w-20 h-20 text-5xl' : 'w-12 h-12 text-2xl'} bg-surface-container-high rounded-2xl flex items-center justify-center shadow-inner`}>
                                    {metadata?.emoji || '😶'}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className={`${idx === 0 ? 'text-3xl' : 'text-xl'} font-headline font-black capitalize text-on-surface`}>{emotion}</h4>
                                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${idx === 0 ? 'bg-primary text-on-primary' : 'bg-surface-variant text-outline'}`}>
                                        {Math.round(score * 100)}%
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-outline-variant font-bold uppercase tracking-wider">
                                      {idx === 0 ? 'Primary Classifier' : 'Secondary Signal'}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      {/* Full Spectrum Heatmap */}
                      <div className="pt-6 border-t border-outline-variant/10">
                        <p className="text-[10px] text-outline font-black uppercase tracking-[0.2em] mb-4">Sentiment Distribution</p>
                        <div className="grid grid-cols-7 gap-1.5">
                          {results?.predicted_emotions?.map(({ label, score }) => (
                            <div key={label} className="group relative aspect-square rounded-sm border border-transparent transition-all" style={{ backgroundColor: score > 0.05 ? `rgba(107, 78, 255, ${score + 0.1})` : 'rgba(255,255,255,0.03)', border: score > 0.3 ? '1px solid rgba(0, 255, 224, 0.5)' : 'none' }}>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-900 text-[8px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-20 pointer-events-none uppercase font-bold">
                                {EMOTION_METADATA[label?.toLowerCase()]?.emoji} {label}: {Math.round(score * 100)}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Aggregate Sentiment */}
                      <div className="grid grid-cols-3 gap-3 pt-6 border-t border-outline-variant/10">
                        {['positive', 'neutral', 'negative'].map(type => {
                          const stats = getSentimentStats(results);
                          const val = stats ? stats[type] : 0;
                          return (
                            <div key={type} className="bg-surface-high p-4 rounded-xl text-center border-b-2 border-outline-variant/10">
                              <p className="text-[10px] text-outline font-bold uppercase mb-1">{type}</p>
                              <p className="text-xl font-headline font-black">{val}%</p>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="h-96 flex flex-col items-center justify-center text-center opacity-40">
                      <Zap className="w-12 h-12 mb-4 animate-pulse text-primary" />
                      <p className="font-headline font-bold">Awaiting Signal...</p>
                      <p className="text-xs text-outline-variant mt-2 max-w-[200px]">Enter text to see high-precision emotion mapping</p>
                    </div>
                  )}
                </ErrorBoundary>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline font-black text-xl">Batch Analysis</h3>
                  {bulkResults.length > 0 && <button onClick={() => downloadResults(bulkResults)} className="text-xs font-bold bg-secondary text-on-secondary px-3 py-1.5 rounded-full hover:scale-105 transition-transform flex items-center gap-2"><Download className="w-3 h-3" /> Export JSON</button>}
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                  {bulkResults.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-30 py-20 grayscale">
                      <BarChart3 className="w-16 h-16 mb-4" />
                      <p>Run analysis to see batch results</p>
                    </div>
                  ) : bulkResults.map((res, idx) => (
                    <div key={idx} className="bg-surface-high p-4 rounded-xl border border-outline-variant/10 group hover:border-primary/30 transition-all">
                       <p className="line-clamp-1 italic mb-2 text-on-surface-variant">"{res.input_text}"</p>
                       <div className="flex justify-between items-center font-bold text-primary capitalize">
                         <div className="flex items-center gap-2">
                           <span className="bg-surface-container-high w-6 h-6 rounded flex items-center justify-center text-sm">{EMOTION_METADATA[res.primary_emotion?.toLowerCase()]?.emoji || EMOTION_METADATA[res.primary_emotion]?.emoji || '😶'}</span>
                           <span>{res.primary_emotion}</span>
                         </div>
                         <span className="text-xs text-outline">{Math.round(res.predicted_emotions[0].score * 100)}%</span>
                       </div>
                    </div>
                  ))}
                </div>
                {bulkResults.length > 0 && (
                  <div className="pt-6 mt-6 border-t border-outline-variant/10 text-[10px] text-outline flex justify-between uppercase font-black tracking-widest">
                    <span>Dataset: {bulkResults.length} Rows</span>
                    <span>Avg Confidence: {Math.round(bulkResults.reduce((a, b) => a + b.predicted_emotions[0].score, 0) / bulkResults.length * 100)}%</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
