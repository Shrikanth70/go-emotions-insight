import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-neutral-950 w-full py-12 px-8 mt-20 border-t border-neutral-800/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Brand */}
        <div>
          <div className="text-lg font-semibold text-neutral-200 mb-4 font-headline">
            GoEmotions Insight
          </div>
          <p className="font-body text-sm text-neutral-500 max-w-xs leading-relaxed">
            Advancing the frontier of fine-grained emotion recognition through open-source
            research and high-fidelity data.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <span className="text-neutral-300 font-bold text-xs uppercase tracking-widest mb-2">
              Resources
            </span>
            <Link to="https://github.com/google-research/google-research/tree/master/goemotions" className="font-body text-sm text-neutral-500 hover:text-violet-300 transition-all">
              Dataset Overview
            </Link>
            <Link to="https://arxiv.org/pdf/1907.11692" className="font-body text-sm text-neutral-500 hover:text-violet-300 transition-all">
              Model Info
            </Link>
          </div>
          {/* <div className="flex flex-col space-y-2">
            <span className="text-neutral-300 font-bold text-xs uppercase tracking-widest mb-2">
              Company
            </span>
            <Link to="#" className="font-body text-sm text-neutral-500 hover:text-violet-300 transition-all">
              Credits
            </Link>
            <Link to="#" className="font-body text-sm text-neutral-500 hover:text-violet-300 transition-all">
              Privacy Policy
            </Link>
          </div> */}
        </div>

        {/* Social / Copyright */}
        <div className="flex flex-col items-start md:items-end">
          <div className="flex space-x-4 mb-6">
            <span className="material-symbols-outlined text-neutral-500 cursor-pointer hover:text-cyan-400 transition-colors">
              terminal
            </span>
            <span className="material-symbols-outlined text-neutral-500 cursor-pointer hover:text-cyan-400 transition-colors">
              code_blocks
            </span>
            <span className="material-symbols-outlined text-neutral-500 cursor-pointer hover:text-cyan-400 transition-colors">
              database
            </span>
          </div>
          <p className="font-body text-sm text-neutral-500">
            © 2026 GoEmotions Insight | Shrikanth
          </p>
        </div>
      </div>
    </footer>
  )
}
