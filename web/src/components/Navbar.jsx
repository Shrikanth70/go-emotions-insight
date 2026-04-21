import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Analyzer', to: '/analyzer' },
  { label: 'Taxonomy', to: '/taxonomy' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(132,85,239,0.04)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-full">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-headline tracking-tight"
        >
          GoEmotions Insight
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-headline tracking-tight font-semibold transition-colors duration-300 ${
                  isActive
                    ? 'text-violet-400 border-b-2 border-violet-400 pb-1'
                    : 'text-neutral-400 hover:text-cyan-400'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-neutral-400 cursor-pointer hover:text-violet-400 transition-colors">
            account_circle
          </span>
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-neutral-400 hover:text-violet-400 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800/20 px-8 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `font-headline font-semibold transition-colors duration-300 py-2 ${
                  isActive ? 'text-violet-400' : 'text-neutral-400 hover:text-cyan-400'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
