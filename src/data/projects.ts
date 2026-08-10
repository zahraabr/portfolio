export interface Project {
  id: string;
  title: string;
  /** "PROJECT" field on the case-study header, e.g. Mobile App / Web App */
  type: string;
  /** "CONCEPT" field on the case-study header */
  concept: string;
  /** "ROLE" field on the case-study header */
  role: string;
  description: string;
  thumbnail: string;
  /** Case-study gallery images, in display order */
  gallery?: string[];
  figmaLink?: string;
  /** Some entries (e.g. confidential client work) have no dedicated case-study page */
  hasDetail: boolean;
}

/** Order matches the live site's Works grid: Growcery, Sehat Jiwa, Nexdo, Scout Talent */
export const projects: Project[] = [
  {
    id: 'growcery',
    title: 'Growcery',
    type: 'Web App',
    concept: 'E-commerce',
    role: 'UI/UX Designer',
    description:
      'Growcery is a web-based application that sells groceries with discounted price.',
    thumbnail: '/images/thumbs/growcery.png',
    gallery: [
      '/images/growcery/01.png',
      '/images/growcery/02.png',
      '/images/growcery/03.png',
      '/images/growcery/04.png',
      '/images/growcery/05.png',
    ],
    figmaLink:
      'https://www.figma.com/design/x05l5b3hJovh7MT5tbjMlj/DECO3801?node-id=16-3&t=5Fr0NqnOqVvdsRS0-1',
    hasDetail: true,
  },
  {
    id: 'sehatjiwa',
    title: 'Sehat Jiwa',
    type: 'Web App',
    concept: 'Health',
    role: 'UI Designer',
    description:
      'Sehat Jiwa is a mental health application owned by the Ministry of Health Indonesia.',
    thumbnail: '/images/thumbs/sehatjiwa.png',
    gallery: [
      '/images/sehatjiwa/01.png',
      '/images/sehatjiwa/02.png',
      '/images/sehatjiwa/03.png',
      '/images/sehatjiwa/04.png',
      '/images/sehatjiwa/05.png',
      '/images/sehatjiwa/06.png',
      '/images/sehatjiwa/07.png',
      '/images/sehatjiwa/08.png',
      '/images/sehatjiwa/09.png',
      '/images/sehatjiwa/10.png',
      '/images/sehatjiwa/11.png',
      '/images/sehatjiwa/12.png',
    ],
    figmaLink:
      'https://www.figma.com/design/7VnQynVfFIbz3G6PooxI6g/Calming-Design?node-id=196-8123&t=8QkYipjTGAgxzktG-1',
    hasDetail: true,
  },
  {
    id: 'nexdo',
    title: 'Nexdo',
    type: 'Mobile App',
    concept: 'Task Management',
    role: 'UI Designer',
    description:
      'Nexdo is a task management mobile application. This project is a personal exploration project.',
    thumbnail: '/images/thumbs/nexdo.png',
    gallery: [
      '/images/nexdo/01.png',
      '/images/nexdo/02.png',
      '/images/nexdo/03.png',
      '/images/nexdo/04.png',
      '/images/nexdo/05.png',
      '/images/nexdo/06.png',
    ],
    hasDetail: true,
  },
  {
    id: 'scout-talent-question-library',
    title: 'Scout Talent: Question Library',
    type: 'Web App',
    concept: 'Question Library',
    role: 'UI/UX Designer',
    description: '',
    thumbnail: '/images/thumbs/scout-talent.png',
    hasDetail: false,
  },
];

/** Static role badges shown under the hero heading on the home page */
export const roles = ['UI/UX Designer', 'Product Analyst', 'Graphic Designer'];

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
}

/** Newest first — matches the live site's left-to-right horizontal timeline */
export const experience: ExperienceEntry[] = [
  {
    role: 'UI/UX Designer',
    company: 'Scout Talent',
    location: 'Brisbane, Queensland',
    period: 'Oct 2023 - present',
  },
  {
    role: 'UI/UX Developer',
    company: 'Spatial Innovation',
    location: 'Brisbane, Queensland',
    period: 'Jun 2023 - Oct 2023',
  },
  {
    role: 'UI/UX Designer',
    company: 'Spatial Innovation',
    location: 'Brisbane, Queensland',
    period: 'Nov 2022 - Feb 2023',
  },
  {
    role: 'UI/UX Designer Intern',
    company: 'Bank SMBC Indonesia',
    location: 'Jakarta, Indonesia',
    period: 'Jun 2021 - Mar 2022',
  },
  {
    role: 'UI/UX Designer Intern',
    company: 'Rumah Siap Kerja',
    location: 'Jakarta, Indonesia',
    period: 'Feb 2021 - Jun 2021',
  },
];

/** Extra screenshots shown in the "More at glance" masonry gallery on the home page */
export const glanceImages = [
  '/images/glance/01.png',
  '/images/glance/02.png',
  '/images/glance/03.png',
  '/images/glance/04.png',
  '/images/glance/05.png',
  '/images/glance/06.png',
  '/images/glance/07.png',
  '/images/glance/08.png',
];

export const contact = {
  name: 'Azzahra Abraara',
  shortName: 'Zahra',
  email: 'azzahraabraara@gmail.com',
  phone: '(+61) 412 791 965',
  linkedin: 'https://www.linkedin.com/in/azzahraabraara/',
  linkedinLabel: 'linkedin.com/in/azzahraabraara',
};

export const bio =
  "I'm Azzahra Abraara, but you can call me Zahra! I'm a curious and creative UI/UX designer with 3+ years of experience turning complex user problems into smooth, user-friendly designs for web and mobile. I hold a Bachelor's in Information Technology majoring in User Experience Design from the University of Queensland and a Bachelor's in Computer Science from Universitas Indonesia. I'm a Figma expert and ready to craft delightful products. Nice to meet you here!";
