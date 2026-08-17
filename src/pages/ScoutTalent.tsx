import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const roles = [
  { name: 'Reese Richardson', role: 'Product Owner' },
  { name: 'Azzahra Abraara', role: 'UI/UX Designer' },
  { name: 'Henri William', role: 'Full Stack Developer' },
];

const steps = ['Empathise', 'Define', 'Ideate', 'Prototype', 'Test'];

const decisionCriteria = [
  { label: 'Frequency', desc: 'How often the user encounters this particular opportunity.' },
  { label: 'Severity', desc: 'How painful is it when it happens?' },
  { label: 'Impact on outcome', desc: 'Will this opportunity influence our outcome?' },
  { label: 'Strategic fit', desc: 'Which one plays to our strengths and strategy?' },
];

function Figure({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-2xl overflow-hidden bg-gray-50 shadow-soft ${className}`}>
      <img src={src} alt={alt} className="w-full h-auto" />
    </div>
  );
}

/* ─── Design Process indicator — tracks scroll position, click jumps to section ─── */
function StepIndicator({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, i) => {
        const state = i === active ? 'active' : i < active ? 'done' : 'upcoming';
        return (
          <div key={step} className={`flex items-center ${i === 0 ? '' : 'flex-1'}`}>
            {i > 0 && (
              <span className={`flex-1 h-px ${i <= active ? 'bg-[#ab1b6f]' : 'bg-gray-200'}`} />
            )}
            <button onClick={() => onSelect(i)} className="flex flex-col items-center gap-2 px-2">
              <span
                className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center border-2 transition-colors duration-300 ${
                  state === 'upcoming'
                    ? 'border-gray-200 text-gray-400 bg-white'
                    : 'border-[#ab1b6f] bg-[#ab1b6f] text-white'
                }`}
              >
                {state === 'done' ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  state === 'active' ? 'text-[#ab1b6f]' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function ScoutTalent() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const suppressObserver = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserver.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = sectionRefs.current.findIndex((el) => el === entry.target);
            if (i !== -1) setActive(i);
          }
        });
      },
      { rootMargin: '-180px 0px -60% 0px', threshold: 0 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToStep = (i: number) => {
    suppressObserver.current = true;
    setActive(i);
    const el = sectionRefs.current[i];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 170;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    window.setTimeout(() => {
      suppressObserver.current = false;
    }, 700);
  };

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

      {/* Header */}
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center mb-20">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#ffe0f2] text-[#ab1b6f] text-xs font-semibold mb-6">
            Case Study
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight"
          >
            Scout Talent: Question Library Feature
          </motion.h1>
        </div>
        <img src="/images/scout-talent/hero.png" alt="Recruit — Templates: Question library" className="w-full h-auto" />
      </div>

      {/* Overview */}
      <section className="mb-16">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ab1b6f] mb-3">Overview</p>
        <p className="text-gray-700 leading-relaxed">
          Scout Talent is a company that provides talent acquisition services and software.
          Recruit is one of their SaaS products, serving as the ATS software for HR and hiring
          managers. The software helps users post jobs, prioritise candidates, save resumes, and
          recruit top talent. In this case study, we focus on finding solutions to improve the job
          creation workflow, and how we designed and released the Question Library feature on
          Recruit.
        </p>
      </section>

      {/* Roles */}
      <section className="mb-16">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ab1b6f] mb-3">Roles</p>
        <p className="text-gray-700 mb-3">
          There are three main roles that conducted this research, which we call the{' '}
          <span className="font-semibold text-gray-900">Product Trio</span> (Continuous Discovery
          method):
        </p>
        <ul className="space-y-1 text-gray-700">
          {roles.map((r) => (
            <li key={r.name}>
              <span className="font-semibold text-gray-900">{r.name}</span> ({r.role})
            </li>
          ))}
        </ul>
      </section>

      {/* Design Process — sticky under the navbar, syncs with scroll, click jumps to section */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm py-4 mb-12 -mx-6 px-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ab1b6f] mb-3">Design Process</p>
        <StepIndicator active={active} onSelect={scrollToStep} />
      </div>

      {/* Empathise */}
      <section
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="mb-16 scroll-mt-40"
      >
        <h2 className="text-2xl font-medium text-gray-900 mb-4">Empathise</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          In this step, we planned the research by defining our main goal, creating a research
          guideline, and then conducting the research.
        </p>
        <p className="text-gray-700 leading-relaxed mb-8">
          We decided to focus on improving the job creation workflow, from the initial request
          for a new role until the job advert is posted. Each of us clustered our understanding
          of the workflow and tried to ensure alignment and identify any knowledge gaps.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <Figure src="/images/scout-talent/sketch-discovery.png" alt="Continuous discovery conversation sketch" />
          <Figure src="/images/scout-talent/sketch-experience-map.png" alt="Early experience mapping sketch" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">In-Depth Interview</h3>
        <p className="text-gray-700 leading-relaxed mb-8">
          We conducted five interviews, all held over Zoom, with each session taking 45 to 60
          minutes. We summarised each session into an{' '}
          <span className="font-semibold text-gray-900">Interview Snapshot</span> for every user,
          made up of a <span className="font-semibold text-gray-900">Summary</span> of their role
          and context, unique <span className="font-semibold text-gray-900">Insights</span> from
          their daily workflow, and <span className="font-semibold text-gray-900">Opportunities</span>{' '}
          that could feed future feature ideation, mapped against their{' '}
          <span className="font-semibold text-gray-900">Experience</span>.
        </p>

        <Figure src="/images/scout-talent/interview-snapshot.png" alt="Interview Snapshot: User 1" />
      </section>

      {/* Define */}
      <section
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        className="mb-16 scroll-mt-40"
      >
        <h2 className="text-2xl font-medium text-gray-900 mb-4">Define</h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          After the in-depth interviews with 5 users, we extracted pain points, needs, and
          opportunities from their stories. We grouped similar ones by shared meaning and
          structured them into an Opportunity Tree to map the opportunity space.
        </p>

        <Figure src="/images/scout-talent/opportunity-tree.png" alt="Opportunity Solution Tree" className="mb-8" />
        <Figure
          src="/images/scout-talent/opportunity-tree-focus.png"
          alt="Focused opportunity branch"
          className="mb-8"
        />

        <p className="text-gray-700 mb-4">When deciding which opportunity to pursue, we considered:</p>
        <ul className="space-y-2 text-gray-700 mb-8">
          {decisionCriteria.map((c) => (
            <li key={c.label}>
              <span className="font-semibold text-gray-900">{c.label}</span>: {c.desc}
            </li>
          ))}
        </ul>

        <p className="text-gray-700 italic mb-12">
          We asked ourselves: "Which opportunity, if solved, most strongly drives our outcome
          right now?"
        </p>

        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, #ab1b6f 0%, #e362ad 100%)' }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 mb-3">
            Problem Statement
          </p>
          <p className="text-white text-lg md:text-xl font-medium mx-auto">
            Users are required to input information manually even when performing tasks they've
            completed before, leading to inefficiency and frustration.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ab1b6f] mb-3">
            How Might We
          </p>
          <p className="text-gray-900 text-lg font-medium mx-auto">
            How might we reduce manual input when repeating previously completed tasks?
          </p>
        </div>
      </section>

      {/* Ideate */}
      <section
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        className="mb-16 scroll-mt-40"
      >
        <h2 className="text-2xl font-medium text-gray-900 mb-4">Ideate</h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          Each of us generated at least 15-20 ideas. The goal wasn't to land on fully-formed,
          serious solutions right away, but to generate a wide range of ideas, including
          unconventional ones, before converging. We then voted as a team on the ideas we
          wanted to carry forward, focused on the opportunity: "Wants to re-use questions, but has
          to manually retrieve old previously used questions or re-enter from memory."
        </p>
        <Figure src="/images/scout-talent/voting-table.png" alt="Ideation voting table" className="mb-12" />

        <h3 className="text-lg font-semibold text-gray-900 mb-4">Assumption Testing</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Before committing to a solution, we mapped out our riskiest assumptions and rated each
          by impact and confidence.
        </p>
        <Figure src="/images/scout-talent/assumption-table.png" alt="Assumption testing table" />
      </section>

      {/* Prototype */}
      <section
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        className="mb-16 scroll-mt-40"
      >
        <h2 className="text-2xl font-medium text-gray-900 mb-4">Prototype</h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          We sketched wireframes for the flow of adding a new question to the library and
          searching/adding from it on the job editing page, then moved from low-fidelity to
          high-fidelity screens.
        </p>

        <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-3">Wireframe</h3>
        <Figure src="/images/scout-talent/wireframe.png" alt="Wireframe sketches" className="mb-8" />

        <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-3">
          Lo-fi prototype
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Figure src="/images/scout-talent/lofi-add-question.png" alt="Lo-fi: add question to library" />
          <Figure src="/images/scout-talent/lofi-question-library.png" alt="Lo-fi: question library" />
          <Figure src="/images/scout-talent/lofi-templates.png" alt="Lo-fi: templates page" />
          <Figure src="/images/scout-talent/lofi-job-questions.png" alt="Lo-fi: job questions page" />
        </div>

        <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-3">
          Hi-fi prototype
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Figure src="/images/scout-talent/hifi-question-library.png" alt="Hi-fi: question library" />
          <Figure src="/images/scout-talent/hifi-new-question.png" alt="Hi-fi: new question" />
        </div>

        <Figure src="/images/scout-talent/recruit-questions-page.png" alt="Recruit — Job Edit: Questions page" />
      </section>

      {/* Test */}
      <section
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
        className="scroll-mt-40"
      >
        <h2 className="text-2xl font-medium text-gray-900 mb-4">Test</h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          After building the prototype, we tested it with users on the actual Questions page of a
          job to validate our approach.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-3">Before</p>
            <Figure src="/images/scout-talent/question-row-before.png" alt="Before: question row" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide uppercase text-gray-400 mb-3">After</p>
            <Figure src="/images/scout-talent/question-row-after.png" alt="After: question row" />
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Overall, users could complete the task easily. A small percentage of users didn't
          recognise the bookmark icon as "save this question to the library" until they were told,
          which informed the icon change reflected above.
        </p>
      </section>

      {/* Learnings */}
      <section className="mt-16">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">Learnings</h2>
        <p className="text-gray-700 leading-relaxed mb-10">
          Coming into this project, it was tempting to jump straight into designing a full
          "library" system with categories, tags, and clever reuse flows, because that's the fun
          part. But running Assumption Testing before building forced us to slow down and ask
          whether customers wanted it, not just how to build it. It reminded me that the
          best-looking solution isn't always the right one to ship first.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Test assumptions before testing designs
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Checking our ideas against desirability, viability, feasibility, usability, and
              ethics, before opening Figma, meant we caught risky assumptions early instead of
              discovering them in user testing. It changed how I approach ideation now: generate
              wide, then narrow ruthlessly before committing design time to anything.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Small usability details decide whether a feature gets used
            </h3>
            <p className="text-gray-700 leading-relaxed">
              When we tested the hi-fi prototype, the biggest issue wasn't the Question Library
              concept itself; it was that users didn't notice the "add question to library" button
              at all. Swapping it for a simple + icon fixed it instantly. A good reminder that no
              matter how solid the logic behind a feature is, if people can't see the door, they
              won't walk through it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
