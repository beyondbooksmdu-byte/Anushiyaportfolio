import {motion} from 'motion/react';
import {LightboxData} from '../types/portfolio';
import MediaPlaceholder from './MediaPlaceholder';
import SectionHeader from './SectionHeader';

interface ResearchSectionProps {
  onExpandImage: (data: LightboxData) => void;
}

export default function ResearchSection({onExpandImage}: ResearchSectionProps) {
  return (
    <section
      id="research"
      className="border-b border-[#C5A253]/20 bg-[#F5F1E8] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader
          indexLabel="03 · Market Research & Competitor Analysis"
          title="Market Research & Competitor Analysis"
          description="Combined audience discovery and competitive landscape comparison guiding the positioning and digital structure of the CineVerse Theater Website."
        />

        <motion.div
          initial={{opacity: 0, y: 14}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="mt-12"
        >
          <MediaPlaceholder
            slotId="market_research_competitor_analysis"
            title="Market Research & Competitor Analysis"
            subtitle="Combined Research & Competitor Comparison Visual"
            placeholderNote="Upload your combined Market Research & Competitor Analysis image or paste its Supabase Public URL."
            kind="market-research"
            aspectRatioClass="aspect-[16/9]"
            onExpand={onExpandImage}
          />
        </motion.div>
      </div>
    </section>
  );
}
