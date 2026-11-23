import {useEffect, useState} from 'react';
import {motion} from 'motion/react';
import {Check, Pencil, RotateCcw} from 'lucide-react';
import {PORTFOLIO_IMAGE_URLS} from '../data/portfolioImages';
import {LightboxData} from '../types/portfolio';
import MediaPlaceholder from './MediaPlaceholder';
import SectionHeader from './SectionHeader';

interface UspSectionProps {
  onExpandImage: (data: LightboxData) => void;
}

const USP_TEXT_STORAGE_KEY = 'anushiya_cineverse_usp_text';

const DEFAULT_USP_TEXT =
  'CineVerse Theater Website stands apart by uniting intuitive showtime discovery, curated cinema storytelling, and effortless seat reservation within a clear, distraction-free user journey tailored for modern moviegoers.';

export default function UspSection({onExpandImage}: UspSectionProps) {
  const [uspText, setUspText] = useState(DEFAULT_USP_TEXT);
  const [draftText, setDraftText] = useState(DEFAULT_USP_TEXT);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(USP_TEXT_STORAGE_KEY);
      if (saved) {
        setUspText(saved);
        setDraftText(saved);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleSave = () => {
    const cleaned = draftText.trim() || DEFAULT_USP_TEXT;
    setUspText(cleaned);
    setDraftText(cleaned);
    setIsEditing(false);
    try {
      window.localStorage.setItem(USP_TEXT_STORAGE_KEY, cleaned);
    } catch {
      // Ignore storage errors
    }
  };

  const handleReset = () => {
    setUspText(DEFAULT_USP_TEXT);
    setDraftText(DEFAULT_USP_TEXT);
    setIsEditing(false);
    try {
      window.localStorage.removeItem(USP_TEXT_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <section
      id="usp"
      className="border-b border-[#C5A253]/20 bg-[#FAFAF7] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader
          indexLabel="04 · Unique Selling Proposition"
          title="CineVerse USP"
          description="Defining the core differentiator that positions the CineVerse Theater Website distinctly in the market."
        />

        <motion.div
          initial={{opacity: 0, y: 14}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="mt-12 space-y-8"
        >
          {/* Short Editable Explanation of CineVerse USP */}
          <div className="card-luxury rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C5A253]/20 pb-4">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#252525]">
                  CineVerse Value Positioning
                </h3>
                <p className="text-xs text-[#777777]">
                  Editable summary explaining the core CineVerse USP
                </p>
              </div>

              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => {
                    setDraftText(uspText);
                    setIsEditing(true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#C5A253]/45 bg-[#FAFAF7] px-3.5 py-2 text-xs font-semibold text-[#252525] transition-colors hover:bg-[#F5F1E8] whitespace-nowrap shrink-0"
                >
                  <Pencil className="h-3.5 w-3.5 text-[#8C6D24]" />
                  <span>Edit Explanation</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#252525]/15 bg-[#FAFAF7] px-3 py-2 text-xs font-medium text-[#5C5C5C] transition-colors hover:bg-[#F5F1E8]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#C5A253] px-4 py-2 text-xs font-semibold text-[#252525] transition-colors hover:bg-[#b59243]"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>

            <div className="mt-5">
              {isEditing ? (
                <textarea
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  rows={3}
                  aria-label="Edit CineVerse USP explanation"
                  className="w-full rounded-xl border border-[#C5A253]/45 bg-[#FAFAF7] p-4 text-sm leading-relaxed text-[#252525] focus:border-[#C5A253] focus:outline-none sm:text-base"
                />
              ) : (
                <p className="text-base leading-relaxed text-[#252525]">
                  {uspText}
                </p>
              )}
            </div>
          </div>

          {/* Strictly ONE USP Research Image Placeholder */}
          <MediaPlaceholder
            slotId="cineverse_usp_single"
            title="USP Research"
            subtitle="Single Complete USP Research Image"
            placeholderNote="Upload your complete USP research image here (displayed as a single unified visual)."
            kind="usp"
            defaultImageUrl={PORTFOLIO_IMAGE_URLS.cineverse_usp_single}
            aspectRatioClass="aspect-[16/9]"
            onExpand={onExpandImage}
          />
        </motion.div>
      </div>
    </section>
  );
}
