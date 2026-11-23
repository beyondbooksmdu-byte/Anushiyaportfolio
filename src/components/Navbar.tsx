import {useState} from 'react';
import {Menu, X} from 'lucide-react';

const NAV_LINKS = [
  {label: 'About', href: '#about'},
  {label: 'Projects', href: '#projects'},
  {label: 'Research', href: '#research'},
  {label: 'Wireframes', href: '#wireframes'},
  {label: 'SEO', href: '#seo'},
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#C5A253]/20 bg-[#FAFAF7]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          className="font-serif text-2xl font-semibold tracking-tight text-[#252525] whitespace-nowrap shrink-0 transition-colors hover:text-[#8C6D24]"
        >
          M. Anushiya
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C5C5C]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#252525] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#C5A253] after:transition-all after:duration-200 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#C5A253] px-5 py-2 text-sm font-semibold text-[#252525] shadow-sm transition-all duration-200 hover:bg-[#b59243] whitespace-nowrap shrink-0"
          >
            Contact
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#C5A253]/30 bg-white text-[#252525] transition-colors hover:bg-[#F5F1E8] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#C5A253]/20 bg-[#FAFAF7] px-6 py-4 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#252525] transition-colors hover:bg-[#F5F1E8]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-[#C5A253] px-4 py-2.5 text-sm font-semibold text-[#252525] transition-colors hover:bg-[#b59243]"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
