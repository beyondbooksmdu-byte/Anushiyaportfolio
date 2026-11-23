import {motion} from 'motion/react';
import {LightboxData} from '../types/portfolio';
import MediaPlaceholder from './MediaPlaceholder';
import SectionHeader from './SectionHeader';

interface AboutSectionProps {
  onExpandImage: (data: LightboxData) => void;
}

const CORE_FOCUS_AREAS = [
  {
    number: '01',
    title: 'Market & Competitor Insight',
    detail: 'Structured audience analysis and competitive landscape mapping to uncover clear brand opportunities.',
  },
  {
    number: '02',
    title: 'USP & Brand Positioning',
    detail: 'Defining distinct value propositions that set digital experiences apart in crowded categories.',
  },
  {
    number: '03',
    title: 'Sitemap & Wireframe Planning',
    detail: 'Translating marketing goals into intuitive frontend/backend architectures and paper-to-digital designs.',
  },
  {
    number: '04',
    title: 'Search & Organic Readiness',
    detail: 'Structuring content hierarchies and on-page foundations to support sustainable search visibility.',
  },
];

export default function AboutSection({onExpandImage}: AboutSectionProps) {
  return (
    <section
      id="about"
      className="border-b border-[#C5A253]/20 bg-[#F5F1E8] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: Profile-Related Image Placeholder */}
          <motion.div
            initial={{opacity: 0, y: 14}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5"
          >
            <MediaPlaceholder
              slotId="about_profile_image"
              title="About Me Visual"
              subtitle="Profile-Related Image Placeholder"
              placeholderNote="Upload a workspace, brand strategy, or profile-related photograph for the About Me section."
              kind="about"
              aspectRatioClass="aspect-[4/4]"
              onExpand={onExpandImage}
            />
          </motion.div>

          {/* Right: Professional Introduction */}
          <motion.div
            initial={{opacity: 0, y: 14}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7"
          >
            <SectionHeader
              indexLabel="01 · About Me"
              title="Strategy grounded in clarity, research, and purposeful design"
            />

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#5C5C5C]">
              <p>
                I am M. Anushiya, a Digital Marketing professional focused on building thoughtful, audience-centered digital experiences from initial research through final web execution.
              </p>
              <p>
                My approach combines structured market discovery, competitor benchmarking, clear Unique Selling Proposition framing, and practical website architecture—ensuring every design decision supports measurable brand clarity and user engagement.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-[#C5A253]/25 pt-8 sm:grid-cols-2">
              {CORE_FOCUS_AREAS.map((item) => (
                <div key={item.number} className="space-y-1.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-xs font-semibold tabular-nums text-[#8C6D24]">
                      {item.number}.
                    </span>
                    <h3 className="font-sans text-sm font-semibold text-[#252525]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-[#5C5C5C]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
