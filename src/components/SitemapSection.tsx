import {motion} from 'motion/react';
import {LightboxData} from '../types/portfolio';
import MediaPlaceholder from './MediaPlaceholder';
import SectionHeader from './SectionHeader';

interface SitemapSectionProps {
  onExpandImage: (data: LightboxData) => void;
}

export default function SitemapSection({onExpandImage}: SitemapSectionProps) {
  return (
    <section
      id="sitemap"
      className="border-b border-[#C5A253]/20 bg-[#F5F1E8] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader
          indexLabel="05 · Website Sitemap"
          title="Information architecture & system flow"
          description="Clear structural mapping across customer-facing pages and behind-the-scenes administrative workflows."
        />

        <motion.div
          initial={{opacity: 0, y: 14}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {/* Placeholder 1: Frontend Sitemap */}
          <MediaPlaceholder
            slotId="sitemap_frontend"
            title="Frontend Sitemap"
            subtitle="User-Facing Navigation Architecture"
            placeholderNote="Upload your Frontend Sitemap diagram illustrating visitor pages and navigation hierarchy."
            kind="sitemap"
            aspectRatioClass="aspect-[4/3]"
            onExpand={onExpandImage}
          />

          {/* Placeholder 2: Backend Sitemap */}
          <MediaPlaceholder
            slotId="sitemap_backend"
            title="Backend Sitemap"
            subtitle="Administrative & Content Architecture"
            placeholderNote="Upload your Backend Sitemap diagram detailing system routes, data flow, and management views."
            kind="sitemap"
            aspectRatioClass="aspect-[4/3]"
            onExpand={onExpandImage}
          />
        </motion.div>
      </div>
    </section>
  );
}
