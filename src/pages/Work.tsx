import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/projects';

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

export default function Work() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-medium text-gray-900 mb-10"
      >
        Works
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, i) => (
          <WorkCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
