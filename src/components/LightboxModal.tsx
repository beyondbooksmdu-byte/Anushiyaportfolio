import {useEffect} from 'react';
import {X} from 'lucide-react';
import {LightboxData} from '../types/portfolio';

interface LightboxModalProps {
  data: LightboxData | null;
  onClose: () => void;
}

export default function LightboxModal({data, onClose}: LightboxModalProps) {
  useEffect(() => {
    if (!data) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={data.title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAFAF7]/95 p-4 backdrop-blur-md sm:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card-luxury relative w-full max-w-5xl overflow-hidden rounded-2xl p-4 sm:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-4 border-b border-[#C5A253]/20 pb-4">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-[#252525]">
              {data.title}
            </h3>
            {data.subtitle && (
              <p className="mt-0.5 text-sm text-[#777777]">{data.subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#C5A253]/30 bg-[#FAFAF7] text-[#252525] transition-colors hover:bg-[#F5F1E8]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex max-h-[78vh] w-full items-center justify-center overflow-auto rounded-xl border border-[#C5A253]/20 bg-[#F5F1E8] p-3 sm:p-4">
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt={data.title}
              referrerPolicy="no-referrer"
              className="mx-auto h-auto max-h-[72vh] w-auto max-w-full rounded-lg object-contain"
            />
          ) : (
            <div className="flex min-h-[340px] w-full flex-col items-center justify-center p-10 text-center">
              <p className="font-serif text-2xl font-semibold text-[#252525]">
                {data.title}
              </p>
              <p className="mt-2 max-w-md text-sm text-[#5C5C5C]">
                {data.placeholderLabel}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
