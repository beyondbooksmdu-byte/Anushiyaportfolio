import {ArrowUp} from 'lucide-react';

const FOOTER_LINKS = [
  {label: 'About', href: '#about'},
  {label: 'Projects', href: '#projects'},
  {label: 'Research', href: '#research'},
  {label: 'USP', href: '#usp'},
  {label: 'Sitemap', href: '#sitemap'},
  {label: 'Wireframes', href: '#wireframes'},
  {label: 'SEO', href: '#seo'},
  {label: 'Contact', href: '#contact'},
];

export default function Footer() {
  return (
    <footer className="border-t border-[#C5A253]/25 bg-[#F5F1E8] py-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a
              href="#home"
              className="font-serif text-2xl font-semibold text-[#252525]"
            >
              M. Anushiya
            </a>
            <p className="mt-1 text-sm text-[#777777]">
              Digital Marketing Portfolio
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#5C5C5C]"
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#252525]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#C5A253]/20 pt-6 text-xs text-[#777777] sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} M. Anushiya. All rights reserved.</p>

          <a
            href="#home"
            className="inline-flex items-center gap-1.5 font-medium text-[#252525] transition-colors hover:text-[#8C6D24]"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
