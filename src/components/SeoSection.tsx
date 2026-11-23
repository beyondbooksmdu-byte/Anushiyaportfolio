import {motion} from 'motion/react';
import {PORTFOLIO_IMAGE_URLS} from '../data/portfolioImages';
import {LightboxData} from '../types/portfolio';
import MediaPlaceholder from './MediaPlaceholder';
import SectionHeader from './SectionHeader';

interface SeoSectionProps {
  onExpandImage: (data: LightboxData) => void;
}

export default function SeoSection({onExpandImage}: SeoSectionProps) {
  return (
    <section
      id="seo"
      className="border-b border-[#C5A253]/20 bg-[#F5F1E8] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader
          indexLabel="07 · SEO Profile"
          title="Search engine optimization & future updates"
          description="Dedicated space reserved for documenting SEO audits, keyword visibility snapshots, and organic search updates as campaigns progress."
        />

        <motion.div
          initial={{opacity: 0, y: 14}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          <MediaPlaceholder
            slotId="seo_snapshot_primary"
            title="SEO Audit & Visibility Snapshot"
            subtitle="Image Placeholder for Future Updates"
            placeholderNote="Reserved placeholder for future Search Console, keyword ranking, or technical SEO audit screenshots."
            kind="seo"
            defaultImageUrl={PORTFOLIO_IMAGE_URLS.seo_snapshot_primary}
            aspectRatioClass="aspect-[16/10]"
            onExpand={onExpandImage}
          />

          <MediaPlaceholder
            slotId="seo_snapshot_secondary"
            title="On-Page & Organic Growth Log"
            subtitle="Image Placeholder for Future Updates"
            placeholderNote="Reserved placeholder for future on-page optimization records and organic performance visuals."
            kind="seo"
            defaultImageUrl={PORTFOLIO_IMAGE_URLS.seo_snapshot_secondary}
            aspectRatioClass="aspect-[16/10]"
            onExpand={onExpandImage}
          />
        </motion.div>
      </div>
    </section>
  );
}
