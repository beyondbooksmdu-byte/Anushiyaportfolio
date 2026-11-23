import {motion} from 'motion/react';
import {ArrowDownRight, Mail} from 'lucide-react';
import {PORTFOLIO_IMAGE_URLS} from '../data/portfolioImages';
import {LightboxData} from '../types/portfolio';
import MediaPlaceholder from './MediaPlaceholder';

interface HeroSectionProps {
  onExpandImage: (data: LightboxData) => void;
}

export default function HeroSection({onExpandImage}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative border-b border-[#C5A253]/20 bg-[#FAFAF7] pt-6 pb-12 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Introduction */}
          <motion.div
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7"
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-[#8C6D24] uppercase">
              Digital Marketing Portfolio
            </p>

            <h1 className="text-balance mt-4 font-serif text-5xl font-semibold tracking-tight text-[#252525] sm:text-6xl lg:text-[4.25rem] lg:leading-[1.06]">
              M. Anushiya
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-2.5 text-sm font-medium text-[#5C5C5C]">
              <span>Digital Marketing Strategist</span>
              <span aria-hidden="true" className="text-[#C5A253]">·</span>
              <span>Market &amp; Brand Research</span>
              <span aria-hidden="true" className="text-[#C5A253]">·</span>
              <span>Web Experience &amp; SEO</span>
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5C5C5C] sm:text-lg">
              Crafting research-driven digital marketing strategies, clear brand positioning, and thoughtful user journeys that bridge audience insight with refined web execution.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-[#C5A253] px-6 py-3 text-sm font-semibold text-[#252525] shadow-sm transition-all duration-200 hover:bg-[#b59243] whitespace-nowrap shrink-0"
              >
                <span>Explore Featured Project</span>
                <ArrowDownRight className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-[#C5A253]/50 bg-[#FFFFFF] px-6 py-3 text-sm font-semibold text-[#252525] shadow-sm transition-all duration-200 hover:border-[#C5A253] hover:bg-[#F5F1E8] whitespace-nowrap shrink-0"
              >
                <Mail className="h-4 w-4 text-[#8C6D24]" />
                <span>Get in Touch</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Profile Photo Placeholder */}
          <motion.div
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
          >
            <MediaPlaceholder
              slotId="profile_photo"
              title="Profile Photo"
              subtitle="M. Anushiya"
              placeholderNote="Profile photo placeholder. Upload your professional portrait to personalize the header."
              kind="portrait"
              defaultImageUrl={PORTFOLIO_IMAGE_URLS.profile_photo}
              aspectRatioClass="aspect-[4/5]"
              onExpand={onExpandImage}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
