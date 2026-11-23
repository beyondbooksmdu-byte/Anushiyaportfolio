import {motion} from 'motion/react';
import {PORTFOLIO_IMAGE_URLS} from '../data/portfolioImages';
import {LightboxData} from '../types/portfolio';
import MediaPlaceholder from './MediaPlaceholder';
import SectionHeader from './SectionHeader';

interface WireframeSectionProps {
  onExpandImage: (data: LightboxData) => void;
}

export default function WireframeSection({
  onExpandImage,
}: WireframeSectionProps) {
  return (
    <section
      id="wireframes"
      className="border-b border-[#C5A253]/20 bg-[#FAFAF7] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader
          indexLabel="06 · Paper Design / Wireframe"
          title="Paper Design / Wireframe"
          description="Hand-drawn front and back paper sketches alongside the structured wireframe layout for the CineVerse Theater Website."
        />

        {/* Exactly THREE placeholders together: Paper Sketch Front, Paper Sketch Back, and single Wireframe */}
        <motion.div
          initial={{opacity: 0, y: 14}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="mt-12 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <MediaPlaceholder
            slotId="paper_sketch_front"
            title="Paper Sketch – Front Side"
            subtitle="Original Hand-Drawn Sketch (Front)"
            placeholderNote="Upload your Paper Sketch – Front Side image or paste its Supabase Public URL."
            kind="wireframe"
            defaultImageUrl={PORTFOLIO_IMAGE_URLS.paper_sketch_front}
            aspectRatioClass="aspect-[3/4]"
            enforceUniformAspectRatio
            onExpand={onExpandImage}
          />

          <MediaPlaceholder
            slotId="paper_sketch_back"
            title="Paper Sketch – Back Side"
            subtitle="Original Hand-Drawn Sketch (Back)"
            placeholderNote="Upload your Paper Sketch – Back Side image or paste its Supabase Public URL."
            kind="wireframe"
            defaultImageUrl={PORTFOLIO_IMAGE_URLS.paper_sketch_back}
            aspectRatioClass="aspect-[3/4]"
            enforceUniformAspectRatio
            onExpand={onExpandImage}
          />

          <MediaPlaceholder
            slotId="wireframe_single"
            title="Wireframe"
            subtitle="Complete Wireframe Layout"
            placeholderNote="Upload your single Wireframe image or paste its Supabase Public URL."
            kind="wireframe"
            defaultImageUrl={PORTFOLIO_IMAGE_URLS.wireframe_single}
            aspectRatioClass="aspect-[3/4]"
            enforceUniformAspectRatio
            onExpand={onExpandImage}
          />
        </motion.div>

        {/* Preserved Final Website Design Showcase */}
        <motion.div
          initial={{opacity: 0, y: 14}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1]}}
          className="mt-14 border-t border-[#C5A253]/20 pt-12"
        >
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#252525]">
                Final Website Design
              </h3>
              <p className="mt-1 text-sm text-[#5C5C5C]">
                Completed visual interface translated from the paper sketches and wireframe structure.
              </p>
            </div>
            <span className="text-xs font-medium text-[#777777]">
              Full Uncropped Interface View
            </span>
          </div>

          <MediaPlaceholder
            slotId="wireframe_final_website_design"
            title="Final Website Design"
            subtitle="Completed Interface Screenshot"
            placeholderNote="Upload your Final Website Design screenshot or paste its Supabase Public URL."
            kind="final-design"
            defaultImageUrl={PORTFOLIO_IMAGE_URLS.wireframe_final_website_design}
            aspectRatioClass="aspect-[16/9]"
            onExpand={onExpandImage}
          />
        </motion.div>
      </div>
    </section>
  );
}
