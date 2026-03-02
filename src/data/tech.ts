export interface TechCategory {
  label: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  {
    label: 'Frontend',
    items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    label: 'Backend & Systems',
    items: ['Node.js', 'Java', 'Python'],
  },
  {
    label: 'Database',
    items: ['PostgreSQL', 'Prisma', 'MongoDB'],
  },
  {
    label: 'Tools',
    items: ['Git', 'Notion', 'Framer', 'Figma'],
  },
  {
    label: 'Practices',
    items: [
      'Agile Scrum',
      'Software Documentation',
      'Software Design',
      'Software Architecture',
    ],
  },
];
