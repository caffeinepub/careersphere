import ModuleCard from '../components/ModuleCard';

export default function Modules() {
  const modules = [
    {
      icon: '/assets/generated/icon-career-path.dim_128x128.png',
      title: 'Career Path Suggestion App',
      description: 'Discover career options based on your interests and subjects. Get personalized recommendations for your future.',
      path: '/career-path',
    },
    {
      icon: '/assets/generated/icon-india-abroad.dim_128x128.png',
      title: 'India vs Abroad Career Decision Guide',
      description: 'Compare career opportunities in India and abroad. Make informed decisions about where to pursue your education.',
      path: '/india-vs-abroad',
    },
    {
      icon: '/assets/generated/icon-stream-selector.dim_128x128.png',
      title: 'Stream Selector Tool for 10th Students',
      description: 'Take our quiz to find the perfect stream for you. Science, Commerce, or Arts - discover your ideal path.',
      path: '/stream-selector',
    },
    {
      icon: '/assets/generated/icon-ai-chatbot.dim_128x128.png',
      title: 'Know Your Skill AI Chatbot',
      description: 'Chat with our AI assistant to explore your skills and get personalized career guidance.',
      path: '/chatbot',
    },
    {
      icon: '/assets/generated/icon-futuremap.dim_128x128.png',
      title: 'FutureMap Visual Career Journey',
      description: 'Visualize your career journey from school subjects to your dream job with our interactive roadmap.',
      path: '/futuremap',
    },
    {
      icon: '/assets/generated/icon-regional-language.dim_128x128.png',
      title: 'Regional Language Career Platform',
      description: 'Access career guidance in your preferred regional language for better understanding.',
      path: '/modules',
    },
    {
      icon: '/assets/generated/icon-ar-explorer.dim_128x128.png',
      title: 'Subject-to-Career AR Explorer',
      description: 'Explore how your favorite subjects connect to exciting careers through augmented reality.',
      path: '/subject-to-career',
    },
    {
      icon: '/assets/generated/icon-degree-finder.dim_128x128.png',
      title: 'Degree Info Finder (After 12th)',
      description: 'Search and discover detailed information about degrees, entrance exams, and career prospects.',
      path: '/degree-finder',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Explore Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Modules</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Choose from our comprehensive suite of career guidance tools designed to help you make informed decisions about your future.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {modules.map((module, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ModuleCard {...module} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
