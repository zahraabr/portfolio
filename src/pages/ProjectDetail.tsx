import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project || !project.hasDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            {project ? 'Case study unavailable' : 'Project not found'}
          </h2>
          <Link to="/works" className="text-[#ab1b6f] hover:underline">
            ← Back to works
          </Link>
        </div>
      </div>
    );
  }

  const meta = [
    { label: 'Project', value: project.type },
    { label: 'Concept', value: project.concept },
    { label: 'Role', value: project.role },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <motion.button
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/works')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#6b0f45] mb-10 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        Back to works
      </motion.button>

      {/* Text left (sticky) / pictures right */}
      <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 items-start">
        <div className="md:sticky md:top-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-medium text-gray-900 mb-6"
          >
            {project.title}
          </motion.h1>

          {project.description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-700 leading-relaxed mb-8"
            >
              {project.description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-6 mb-8"
          >
            {meta.map((m) => (
              <div key={m.label}>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#ab1b6f] mb-1">
                  {m.label}
                </p>
                <p className="text-gray-900">{m.value}</p>
              </div>
            ))}
          </motion.div>

          {project.figmaLink && (
            <motion.a
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              href={project.figmaLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ab1b6f] text-white text-sm rounded hover:bg-[#6b0f45] transition-all duration-300 hover:shadow-soft-lg"
            >
              See Figma Link
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          )}
        </div>

        {/* Gallery — stacked pictures on the right */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="flex flex-col gap-6">
            {project.gallery.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                className="rounded-2xl overflow-hidden bg-gray-50 shadow-soft"
              >
                <img src={src} alt={`${project.title} — screen ${i + 1}`} className="w-full h-auto" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
