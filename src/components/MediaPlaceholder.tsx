import {ChangeEvent, FormEvent, SyntheticEvent, useEffect, useRef, useState} from 'react';
import {
  BarChart3,
  Check,
  Film,
  ImagePlus,
  Layers,
  Link2,
  Maximize2,
  Network,
  PencilRuler,
  RotateCcw,
  Search,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import {PORTFOLIO_IMAGE_URLS} from '../config/portfolioImages';
import {LightboxData, PlaceholderKind} from '../types/portfolio';

interface MediaPlaceholderProps {
  slotId: string;
  title: string;
  subtitle?: string;
  placeholderNote: string;
  kind: PlaceholderKind;
  aspectRatioClass?: string;
  onExpand?: (data: LightboxData) => void;
  compact?: boolean;
}

type Orientation = 'portrait' | 'landscape' | 'square';

interface ImageDimensions {
  width: number;
  height: number;
  orientation: Orientation;
}

const STORAGE_PREFIX = 'anushiya_portfolio_img_';

function renderPlaceholderEmblem(kind: PlaceholderKind) {
  const iconProps = {className: 'h-7 w-7 text-[#8C6D24]', strokeWidth: 1.5};
  switch (kind) {
    case 'portrait':
    case 'about':
      return <User {...iconProps} />;
    case 'project':
      return <Film {...iconProps} />;
    case 'market-research':
    case 'competitor-analysis':
      return <BarChart3 {...iconProps} />;
    case 'usp':
      return <Sparkles {...iconProps} />;
    case 'sitemap':
      return <Network {...iconProps} />;
    case 'wireframe':
      return <PencilRuler {...iconProps} />;
    case 'final-design':
      return <Layers {...iconProps} />;
    case 'seo':
      return <Search {...iconProps} />;
  }
}

function getOrientationLabel(orientation: Orientation): string {
  switch (orientation) {
    case 'portrait':
      return 'Portrait';
    case 'landscape':
      return 'Landscape';
    case 'square':
      return 'Square';
  }
}

export default function MediaPlaceholder({
  slotId,
  title,
  subtitle,
  placeholderNote,
  kind,
  aspectRatioClass = 'aspect-[16/10]',
  onExpand,
  compact = false,
}: MediaPlaceholderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const configuredDefaultUrl = PORTFOLIO_IMAGE_URLS[slotId] || null;

  const [imageUrl, setImageUrl] = useState<string | null>(configuredDefaultUrl);
  const [imgError, setImgError] = useState(false);
  const [dimensions, setDimensions] = useState<ImageDimensions | null>(null);
  const [urlInputOpen, setUrlInputOpen] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(`${STORAGE_PREFIX}${slotId}`);
      if (saved) {
        setImageUrl(saved);
        setImgError(false);
      } else {
        setImageUrl(configuredDefaultUrl);
        setImgError(false);
      }
    } catch {
      setImageUrl(configuredDefaultUrl);
    }
    setDimensions(null);
  }, [slotId, configuredDefaultUrl]);

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const {naturalWidth, naturalHeight} = e.currentTarget;
    if (!naturalWidth || !naturalHeight) return;

    const ratio = naturalWidth / naturalHeight;
    let orientation: Orientation = 'square';
    if (ratio < 0.92) {
      orientation = 'portrait';
    } else if (ratio > 1.12) {
      orientation = 'landscape';
    }

    setDimensions({
      width: naturalWidth,
      height: naturalHeight,
      orientation,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImgError(false);
        setDimensions(null);
        setImageUrl(reader.result);
        setUrlInputOpen(false);
        try {
          window.localStorage.setItem(`${STORAGE_PREFIX}${slotId}`, reader.result);
        } catch {
          // Ignore quota exceeded errors; still keep in state for current session
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleUrlSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = urlDraft.trim();
    if (!trimmed) return;

    setImgError(false);
    setDimensions(null);
    setImageUrl(trimmed);
    setUrlInputOpen(false);
    setUrlDraft('');
    try {
      window.localStorage.setItem(`${STORAGE_PREFIX}${slotId}`, trimmed);
    } catch {
      // Ignore storage errors
    }
  };

  const handleReset = () => {
    setDimensions(null);
    setImgError(false);
    setUrlInputOpen(false);
    setImageUrl(configuredDefaultUrl);
    try {
      window.localStorage.removeItem(`${STORAGE_PREFIX}${slotId}`);
    } catch {
      // Ignore storage errors
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleExpand = () => {
    if (onExpand) {
      onExpand({
        title,
        subtitle,
        imageUrl: imgError ? null : imageUrl,
        placeholderLabel: placeholderNote,
        aspectClass: aspectRatioClass,
      });
    }
  };

  const hasActiveImage = Boolean(imageUrl && !imgError);

  // Adaptive image presentation class based on original orientation & proportions
  const getAdaptiveImageClasses = () => {
    if (!dimensions) {
      return 'mx-auto h-auto max-h-[600px] w-full rounded-lg object-contain';
    }
    if (dimensions.orientation === 'portrait') {
      return 'mx-auto h-auto max-h-[560px] w-auto max-w-full rounded-lg object-contain';
    }
    if (dimensions.orientation === 'square') {
      return 'mx-auto h-auto max-h-[520px] w-auto max-w-full rounded-lg object-contain';
    }
    return 'mx-auto h-auto max-h-[640px] w-full rounded-lg object-contain';
  };

  return (
    <div className="card-luxury card-luxury-hover group relative overflow-hidden rounded-2xl p-3 sm:p-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label={`Upload image for ${title}`}
      />

      {hasActiveImage ? (
        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-[#C5A253]/20 bg-[#F5F1E8]/55 p-2 sm:p-3">
          <img
            src={imageUrl ?? undefined}
            alt={title}
            referrerPolicy="no-referrer"
            onLoad={handleImageLoad}
            onError={() => setImgError(true)}
            onClick={handleExpand}
            className={`${getAdaptiveImageClasses()} cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]`}
          />

          {/* Clean Top-Right Interactive Controls */}
          <div className="absolute top-3 right-3 flex flex-wrap items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            {onExpand && (
              <button
                type="button"
                onClick={handleExpand}
                aria-label={`Expand ${title}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#C5A253]/30 bg-[#FFFFFF]/95 px-3 text-xs font-medium text-[#252525] shadow-sm backdrop-blur-sm transition-colors hover:bg-[#F5F1E8]"
              >
                <Maximize2 className="h-3.5 w-3.5 text-[#8C6D24]" />
                <span>View</span>
              </button>
            )}
            <button
              type="button"
              onClick={triggerUpload}
              aria-label={`Upload replacement image for ${title}`}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#C5A253]/30 bg-[#FFFFFF]/95 px-3 text-xs font-medium text-[#252525] shadow-sm backdrop-blur-sm transition-colors hover:bg-[#F5F1E8]"
            >
              <ImagePlus className="h-3.5 w-3.5 text-[#8C6D24]" />
              <span>Replace</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setUrlDraft(imageUrl && !imageUrl.startsWith('data:') ? imageUrl : '');
                setUrlInputOpen((prev) => !prev);
              }}
              aria-label={`Set image URL for ${title}`}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#C5A253]/30 bg-[#FFFFFF]/95 px-3 text-xs font-medium text-[#252525] shadow-sm backdrop-blur-sm transition-colors hover:bg-[#F5F1E8]"
            >
              <Link2 className="h-3.5 w-3.5 text-[#8C6D24]" />
              <span>URL</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              aria-label={`Reset ${title} to placeholder`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#C5A253]/30 bg-[#FFFFFF]/95 text-[#5C5C5C] shadow-sm backdrop-blur-sm transition-colors hover:bg-[#F5F1E8] hover:text-[#252525]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`relative w-full overflow-hidden rounded-xl border border-[#C5A253]/20 bg-[#F5F1E8]/75 ${aspectRatioClass}`}
        >
          <div className="relative flex h-full w-full flex-col items-center justify-center px-6 py-8 text-center">
            {/* Subtle Architectural Corner Framing */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-4 left-4 h-4 w-4 border-t border-l border-[#C5A253]/60"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-4 right-4 h-4 w-4 border-t border-r border-[#C5A253]/60"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b border-l border-[#C5A253]/60"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-[#C5A253]/60"
            />

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C5A253]/30 bg-[#FFFFFF] shadow-sm">
              {renderPlaceholderEmblem(kind)}
            </div>

            <p className="font-serif text-xl font-semibold text-[#252525] sm:text-2xl">
              {title}
            </p>
            {!compact && (
              <p className="mt-1.5 max-w-md text-xs leading-relaxed text-[#5C5C5C] sm:text-sm">
                {placeholderNote}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={triggerUpload}
                className="inline-flex items-center gap-2 rounded-lg border border-[#C5A253] bg-[#FFFFFF] px-4 py-2 text-xs font-semibold text-[#252525] shadow-sm transition-all duration-200 hover:bg-[#C5A253] hover:text-[#252525] whitespace-nowrap shrink-0"
              >
                <ImagePlus className="h-3.5 w-3.5" />
                <span>Upload Image</span>
              </button>

              <button
                type="button"
                onClick={() => setUrlInputOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#C5A253]/40 bg-[#FFFFFF] px-3.5 py-2 text-xs font-medium text-[#252525] transition-colors hover:bg-[#FAFAF7] whitespace-nowrap shrink-0"
              >
                <Link2 className="h-3.5 w-3.5 text-[#8C6D24]" />
                <span>Paste Public URL</span>
              </button>

              {onExpand && (
                <button
                  type="button"
                  onClick={handleExpand}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#252525]/12 bg-[#FAFAF7] px-3.5 py-2 text-xs font-medium text-[#5C5C5C] transition-colors hover:border-[#C5A253]/50 hover:text-[#252525] whitespace-nowrap shrink-0"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Preview Frame</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Optional Supabase / Public URL Input Bar */}
      {urlInputOpen && (
        <form
          onSubmit={handleUrlSubmit}
          className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-[#C5A253]/30 bg-[#FAFAF7] p-2.5"
        >
          <input
            type="url"
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            placeholder="https://your-project.supabase.co/storage/v1/object/public/..."
            aria-label={`Public image URL for ${title}`}
            required
            className="min-w-0 flex-1 rounded-lg border border-[#C5A253]/30 bg-[#FFFFFF] px-3 py-1.5 text-xs text-[#252525] placeholder:text-[#777777] focus:border-[#C5A253] focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1 rounded-lg bg-[#C5A253] px-3 py-1.5 text-xs font-semibold text-[#252525] hover:bg-[#b59243] whitespace-nowrap shrink-0"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Apply URL</span>
          </button>
          <button
            type="button"
            onClick={() => setUrlInputOpen(false)}
            aria-label="Cancel URL input"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[#252525]/12 bg-[#FFFFFF] text-[#5C5C5C] hover:text-[#252525]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </form>
      )}

      {/* Clean Footer Caption inside White Card */}
      {(subtitle || title) && (
        <div className="mt-3 flex items-center justify-between gap-4 px-1">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#252525]">{title}</p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#777777]">
              {subtitle && <span>{subtitle}</span>}
              {hasActiveImage && dimensions && (
                <>
                  {subtitle && <span aria-hidden="true">·</span>}
                  <span>{getOrientationLabel(dimensions.orientation)}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    {dimensions.width} × {dimensions.height}
                  </span>
                </>
              )}
            </div>
          </div>
          {hasActiveImage && onExpand && (
            <button
              type="button"
              onClick={handleExpand}
              className="text-xs font-medium text-[#8C6D24] underline-offset-4 hover:underline whitespace-nowrap shrink-0"
            >
              Full View
            </button>
          )}
        </div>
      )}
    </div>
  );
}
