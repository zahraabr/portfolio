import { contact } from '../data/projects';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#ffe0f2]/40 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 text-sm">
          <a
            href={`mailto:${contact.email}`}
            className="text-gray-800 hover:text-[#6b0f45] transition-colors"
          >
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

        <span className="text-sm text-gray-600">
          {contact.name} © {year}
        </span>
      </div>
    </footer>
  );
}
