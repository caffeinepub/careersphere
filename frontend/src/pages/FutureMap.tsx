import { BookOpen, GraduationCap, Briefcase, Trophy, ArrowRight } from 'lucide-react';

export default function FutureMap() {
  const stages = [
    {
      icon: BookOpen,
      title: 'School Subjects',
      description: 'Choose subjects based on your interests',
      examples: ['Mathematics', 'Science', 'Commerce', 'Arts', 'Languages'],
      color: 'from-chart-1 to-chart-2',
    },
    {
      icon: GraduationCap,
      title: 'Degree Selection',
      description: 'Select the right degree program',
      examples: ['B.Tech', 'MBBS', 'B.Com', 'B.A.', 'BBA', 'B.Sc.'],
      color: 'from-chart-2 to-chart-3',
    },
    {
      icon: Briefcase,
      title: 'Career Path',
      description: 'Build your professional career',
      examples: ['Engineer', 'Doctor', 'Manager', 'Designer', 'Analyst'],
      color: 'from-chart-3 to-chart-4',
    },
    {
      icon: Trophy,
      title: 'Dream Job',
      description: 'Achieve your career goals',
      examples: ['Senior Role', 'Specialist', 'Entrepreneur', 'Leader', 'Expert'],
      color: 'from-chart-4 to-chart-5',
    },
  ];

  return (
    <div className="py-12 sm:py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Career Journey
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Visualize your path from school to your dream career with our interactive roadmap
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline - Hidden on mobile and tablet */}
          <div className="hidden lg:block relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary -translate-y-1/2" />
            
            <div className="grid grid-cols-4 gap-6 xl:gap-8 relative">
              {stages.map((stage, index) => (
                <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-soft-lg mb-4 relative z-10`}>
                      <stage.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <div className="bg-card rounded-2xl p-6 border border-border shadow-soft text-center w-full">
                      <h3 className="text-lg xl:text-xl font-semibold mb-2">{stage.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{stage.description}</p>
                      <div className="space-y-2">
                        {stage.examples.map((example, i) => (
                          <div
                            key={i}
                            className="text-xs px-3 py-1.5 rounded-lg bg-accent text-foreground"
                          >
                            {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {index < stages.length - 1 && (
                    <div className="absolute top-10 -right-3 z-20">
                      <ArrowRight className="w-6 h-6 xl:w-8 xl:h-8 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile & Tablet Timeline - Vertical layout */}
          <div className="lg:hidden space-y-6">
            {stages.map((stage, index) => (
              <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-soft-lg shrink-0`}>
                      <stage.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    {index < stages.length - 1 && (
                      <div className="w-1 flex-1 bg-gradient-to-b from-primary to-secondary mt-4 min-h-[40px]" />
                    )}
                  </div>
                  
                  <div className="flex-1 bg-card rounded-2xl p-5 sm:p-6 border border-border shadow-soft">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{stage.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{stage.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {stage.examples.map((example, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 rounded-lg bg-accent text-foreground"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft text-center animate-fade-in">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Ready to Plan Your Journey?</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto">
              Every successful career starts with the right choices. Use our tools to explore your options and create your personalized career roadmap.
            </p>
            <button className="px-6 sm:px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:shadow-soft transition-all min-h-[44px]">
              Start Planning Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
