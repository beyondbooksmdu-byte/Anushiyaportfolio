import {FormEvent, useEffect, useState} from 'react';
import {Check, ExternalLink, Globe, X} from 'lucide-react';

interface LiveProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const URL_STORAGE_KEY = 'anushiya_cineverse_live_url';

export default function LiveProjectModal({open, onClose}: LiveProjectModalProps) {
  const [projectUrl, setProjectUrl] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(URL_STORAGE_KEY);
      if (saved) setProjectUrl(saved);
    } catch {
      // Ignore storage access errors
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const normalizedUrl =
    projectUrl.trim().length > 0
      ? projectUrl.trim().startsWith('http://') || projectUrl.trim().startsWith('https://')
        ? projectUrl.trim()
        : `https://${projectUrl.trim()}`
      : '';

  const handleSaveUrl = (e: FormEvent) => {
    e.preventDefault();
    try {
      window.localStorage.setItem(URL_STORAGE_KEY, projectUrl.trim());
    } catch {
      // Ignore storage errors
    }
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CineVerse Theater Website Live Project"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAFAF7]/90 p-4 backdrop-blur-md sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card-luxury w-full max-w-xl rounded-2xl p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#C5A253]/20 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#8C6D24]">
              Featured Project Link
            </p>
            <h3 className="mt-1 font-serif text-2xl font-semibold text-[#252525]">
              CineVerse Theater Website
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#C5A253]/30 bg-[#FAFAF7] text-[#252525] transition-colors hover:bg-[#F5F1E8]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#5C5C5C]">
          Attach or update your published CineVerse Theater Website URL below to launch the live experience directly from this portfolio.
        </p>

        <form onSubmit={handleSaveUrl} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="cineverse-url"
              className="block text-xs font-semibold text-[#252525]"
            >
              Live Website URL
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="relative flex-1">
                <Globe className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#777777]" />
                <input
                  id="cineverse-url"
                  type="text"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://cineverse-theater.example.com"
                  className="w-full rounded-lg border border-[#C5A253]/35 bg-[#FAFAF7] py-2.5 pr-3 pl-10 text-sm text-[#252525] placeholder:text-[#777777] focus:border-[#C5A253] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#C5A253] bg-[#FFFFFF] px-4 py-2.5 text-xs font-semibold text-[#252525] transition-colors hover:bg-[#F5F1E8] whitespace-nowrap shrink-0"
              >
                {savedNotice ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#8C6D24]" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save Link</span>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#C5A253]/20 pt-5">
          <div className="text-xs text-[#777777]">
            {normalizedUrl
              ? 'Ready to open in a new tab'
              : 'Enter a live URL above or explore the case study sections below'}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#252525]/15 bg-[#FAFAF7] px-4 py-2 text-xs font-medium text-[#252525] transition-colors hover:bg-[#F5F1E8]"
            >
              Close
            </button>

            {normalizedUrl ? (
              <a
                href={normalizedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#C5A253] px-5 py-2 text-xs font-semibold text-[#252525] shadow-sm transition-colors hover:bg-[#b59243]"
              >
                <span>Open Live Website</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <a
                href="#research"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-lg bg-[#C5A253] px-5 py-2 text-xs font-semibold text-[#252525] shadow-sm transition-colors hover:bg-[#b59243]"
              >
                <span>Explore Case Study</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
