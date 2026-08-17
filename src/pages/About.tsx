import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { bio, contact, experience } from '../data/projects';

export default function About() {
  const bioRef = useRef(null);
  const bioInView = useInView(bioRef, { once: true });

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-medium text-gray-900 mb-10"
      >
        About
      </motion.h1>

      {/* Photo + intro */}
      <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start mb-20">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          src="/images/about/profile.jpeg"
          alt={contact.name}
          className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover"
        />
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl font-medium text-[#ab1b6f] mb-4"
          >
            Hello 👋🏼
          </motion.h2>
          <motion.p
            ref={bioRef}
            initial={{ opacity: 0, y: 16 }}
            animate={bioInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gray-700 leading-relaxed max-w-xl"
          >
            {bio}
          </motion.p>
        </div>
      </div>

      {/* Contact */}
      <section className="mb-20">
        <h2 className="text-2xl font-medium text-gray-900 mb-6">Contact</h2>
        <div className="flex flex-col gap-3 text-base">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-gray-800 hover:text-[#6b0f45] transition-colors w-fit">
            <span aria-hidden="true">✉️</span> {contact.email}
          </a>
          <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-3 text-gray-800 hover:text-[#6b0f45] transition-colors w-fit">
            <span aria-hidden="true">📱</span> {contact.phone}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-gray-800 hover:text-[#6b0f45] transition-colors w-fit"
          >
            <span aria-hidden="true">🔗</span> {contact.linkedinLabel}
          </a>
        </div>
      </section>

      {/* Experience — horizontal timeline, newest first */}
      <section>
        <h2 className="text-2xl font-medium text-gray-900 mb-10">Experience</h2>

        <div className="overflow-x-auto pb-2">
          <div className="relative flex gap-10 min-w-[900px]">
            <div className="absolute left-0 right-0 top-[7px] h-px bg-[#ffe0f2]" />
            {experience.map((exp, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true });
              return (
                <motion.div
                  key={`${exp.company}-${exp.period}`}
                  ref={ref}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative flex-1 pt-6"
                >
                  <span className="absolute top-0 left-0 w-3.5 h-3.5 rounded-full bg-[#ab1b6f]" />
                  <p className="text-sm text-[#ab1b6f] mb-2">{exp.period}</p>
                  <p className="font-semibold text-gray-900">{exp.role}</p>
                  <p className="text-gray-800">{exp.company}</p>
                  <p className="text-sm text-gray-400 mt-1">{exp.location}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
