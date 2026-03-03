export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  link?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'limitless',
    title: 'LimitLessMotion',
    description:
      'AI-powered motion tracking platform — National Finalist in Build With AI. Real-time body movement detection using computer vision to coach athletes and rehabilitation patients.',
    tags: ['React', 'Python', 'TensorFlow', 'Computer Vision'],
    gradient: 'linear-gradient(135deg, #0d1f3c 0%, #091a35 40%, #1a0d3c 100%)',
    link: 'https://karamhittini.github.io/LimitLessMotion/',
    image: '/projects/limitless.png',
  },
  {
    id: 'whispers',
    title: 'Whispers in The Dark',
    description:
      'A psychological horror survival game built in Unreal Engine 5. Features atmospheric lighting, dynamic audio, and immersive storytelling driven by AI-scripted encounters.',
    tags: ['Unreal Engine 5', 'C++', 'Blueprints', 'Game Design'],
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #0d1117 40%, #1a0505 100%)',
    link: 'https://itch.io/queue/c/6599529/spiders-collection?game_id=4057463&password=',
    image: '/projects/whispers.png',
  },
  {
    id: 'help',
    title: 'HelpAssistant',
    description:
      'Emotional intelligence AI system that detects user sentiment in real-time and adapts conversational responses to provide empathetic mental health support.',
    tags: ['Next.js', 'NLP', 'Node.js', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, #1a0d1a 0%, #0d1a1f 40%, #0a1f1a 100%)',
  },
];
