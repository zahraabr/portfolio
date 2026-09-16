import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects, roles, contact, glanceImages } from '../data/projects';
import Lightbox from '../components/Lightbox';

function RevealText({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Work card — grid button: picture on top, title below ── */
function WorkCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const card = (
    <div>
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gray-50 shadow-soft aspect-[4/3]"
        whileHover={
          project.hasDetail
            ? { scale: 1.1, boxShadow: '1px 1px 10px 0px rgba(171,27,111,0.25)', zIndex: 10 }
            : {}
        }
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {project.thumbnail && (
          <img
            src={project.thumbnail}
            alt={project.title}
            className={
              project.id === 'scout-talent-question-library'
                ? 'absolute inset-0 w-full h-full object-contain p-6'
                : 'absolute inset-0 w-full h-full object-cover object-top'
            }
          />
        )}
      </motion.div>
      <p
        className={`mt-6 text-center text-lg ${
          project.hasDetail
            ? 'text-gray-900 group-hover:text-[#6b0f45] transition-colors duration-300'
            : 'text-gray-300'
        }`}
      >
        {project.title}
      </p>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      {project.hasDetail ? (
        <Link to={`/works/${project.id}`} className="block group">
          {card}
        </Link>
      ) : (
        <div className="cursor-default">{card}</div>
      )}
    </motion.div>
  );
}

/* Real aspect ratio (height ÷ width) of each glance image, so columns balance by
   actual visual weight instead of just round-robin index order. */
const glanceRatios = [4273 / 1440, 2270 / 3840, 736 / 414, 1080 / 1080, 982 / 1512, 900 / 1440, 1151 / 1512, 1688 / 780];

/** Height (in the same relative units as glanceRatios) taken up by the gap between stacked images. */
const GAP_UNIT = 0.09;

/**
 * "Largest Processing Time" bin packing: place the biggest images first (while every
 * column is still equally empty), always into the currently-shortest column. This
 * balances total column height far better than assigning in original file order, where
 * a big image landing late has no choice but to pile onto whichever column is left.
 * Each column's images are then re-sorted back to their original order for display.
 */
function packColumns(count: number) {
  const items = glanceImages.map((src, i) => ({ src, i, ratio: glanceRatios[i] ?? 1 }));
  const bySize = [...items].sort((a, b) => b.ratio - a.ratio);

  const columns: { src: string; i: number }[][] = Array.from({ length: count }, () => []);
  const heights = new Array(count).fill(0);

  bySize.forEach((item) => {
    let shortest = 0;
    for (let c = 1; c < count; c++) if (heights[c] < heights[shortest]) shortest = c;
    columns[shortest].push(item);
    heights[shortest] += item.ratio + (columns[shortest].length > 1 ? GAP_UNIT : 0);
  });

  columns.forEach((col) => col.sort((a, b) => a.i - b.i));
  return columns;
}

/* ─── Masonry image gallery ────────────────────────────────── */
function GlanceGallery({ onImageClick }: { onImageClick: (index: number) => void }) {
  const columns2 = packColumns(2);

  return (
    <div className="grid grid-cols-2 md:hidden gap-4 mb-16">
      {columns2.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-4">
          {col.map(({ src, i }) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => onImageClick(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden bg-gray-50 shadow-soft cursor-zoom-in text-left"
              aria-label="Open picture"
            >
              <img src={src} alt="" className="w-full h-auto object-cover" />
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  );
}

function GlanceGalleryDesktop({ onImageClick }: { onImageClick: (index: number) => void }) {
  const columns = packColumns(3);

  return (
    <div className="hidden md:grid grid-cols-3 gap-4 mb-16">
      {columns.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-4">
          {col.map(({ src, i }) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => onImageClick(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden bg-gray-50 shadow-soft cursor-zoom-in text-left"
              aria-label="Open picture"
            >
              <img src={src} alt="" className="w-full h-auto object-cover" />
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative pt-40 pb-24 px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl mb-2"
        >
          Hi 👋🏼
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight"
        >
          I am {contact.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 flex flex-wrap gap-3"
        >
          {roles.map((role) => (
            <span
              key={role}
              className="px-4 py-1.5 rounded-full bg-[#ffe0f2] text-[#ab1b6f] text-sm"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Floating now-playing widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden md:block absolute top-40 right-6 w-72 rounded-2xl overflow-hidden shadow-soft-lg"
        >
          <iframe
            title="Spotify"
            src="https://open.spotify.com/embed/album/6Qj5rkXFYGlCe7X6VqqoRS?theme=1"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* ── WORKS — grid of cards ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <RevealText className="mb-10">
          <h2 className="text-2xl font-medium text-gray-900">Works</h2>
        </RevealText>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <WorkCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <RevealText>
          <h2 className="text-2xl font-medium text-gray-900 mb-10 text-center">More at glance</h2>
        </RevealText>

        <GlanceGallery onImageClick={setLightboxIndex} />
        <GlanceGalleryDesktop onImageClick={setLightboxIndex} />

        <RevealText delay={0.1}>
          <div className="flex flex-col items-center gap-2 text-base">
            <a href={`mailto:${contact.email}`} className="text-gray-800 hover:text-[#6b0f45] transition-colors">
              {contact.email}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[#ab1b6f] hover:text-[#6b0f45] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </RevealText>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={glanceImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onIndexChange={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
