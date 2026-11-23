import {motion} from 'motion/react';
import {ExternalLink} from 'lucide-react';
import {LightboxData} from '../types/portfolio';
import MediaPlaceholder from './MediaPlaceholder';
import SectionHeader from './SectionHeader';

interface ProjectsSectionProps {
  onExpandImage: (data: LightboxData) => void;
  onOpenLiveProject: () => void;
}

export default function ProjectsSection({
  onExpandImage,
  onOpenLiveProject,
}: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="border-b border-[#C5A253]/20 bg-[#FAFAF7] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader
          indexLabel="02 · Digital Marketing Projects"
          title="Featured Project: CineVerse Theater Website"
          description="A complete digital marketing and web architecture case study spanning market research, competitor benchmarking, USP definition, sitemaps, wireframes, and SEO structure."
        />

        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="card-luxury mt-12 overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Project Visual Placeholder */}
            <div className="lg:col-span-7">
              <MediaPlaceholder
                slotId="cineverse_project_showcase"
                title="CineVerse Theater Website"
                subtitle="Featured Digital Marketing Project"
                placeholderNote="Upload your CineVerse Theater Website hero screenshot or presentation visual."
                kind="project"
                aspectRatioClass="aspect-[16/10]"
                onExpand={onExpandImage}
              />
            </div>

            {/* Project Details & Action */}
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#8C6D24]">
                <span>Featured Case Study</span>
                <span aria-hidden="true">·</span>
                <span>Entertainment &amp; Cinema</span>
                <span aria-hidden="true">·</span>
                <span>End-to-End Strategy</span>
              </div>

              <h3 className="mt-3 font-serif text-3xl font-semibold text-[#252525]">
                CineVerse Theater Website
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-[#5C5C5C] sm:text-base">
                Designed and positioned as a modern digital destination for cinema audiences—aligning showtime discovery, streamlined navigation, and brand differentiation into a cohesive web experience.
              </p>

              <div className="mt-6 space-y-2.5 border-t border-[#C5A253]/20 pt-5 text-sm text-[#5C5C5C]">
                <div className="flex items-center justify-between">
                  <span className="text-[#777777]">Strategic Scope</span>
                  <span className="font-medium text-[#252525]">Research, USP &amp; Sitemaps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777777]">Design Process</span>
                  <span className="font-medium text-[#252525]">Paper Sketch to Final UI</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777777]">Visibility Focus</span>
                  <span className="font-medium text-[#252525]">SEO-Ready Structure</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenLiveProject}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#C5A253] px-6 py-3 text-sm font-semibold text-[#252525] shadow-sm transition-all duration-200 hover:bg-[#b59243] whitespace-nowrap shrink-0"
                >
                  <span>View Live Project</span>
                  <ExternalLink className="h-4 w-4" />
                </button>

                <a
                  href="#research"
                  className="inline-flex items-center rounded-lg border border-[#C5A253]/40 bg-[#FAFAF7] px-5 py-3 text-sm font-medium text-[#252525] transition-colors hover:bg-[#F5F1E8] whitespace-nowrap shrink-0"
                >
                  Read Research Breakdown
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
