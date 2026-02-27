import { Sparkles, BookOpen, Briefcase, Rocket } from 'lucide-react';

export default function SubjectToCareer() {
  const features = [
    {
      icon: BookOpen,
      title: 'Subject Connections',
      description: 'Discover how your favorite school subjects directly connect to real-world careers.',
    },
    {
      icon: Briefcase,
      title: 'Career Exploration',
      description: 'Explore diverse career paths that align with your academic interests and strengths.',
    },
    {
      icon: Rocket,
      title: 'Future Opportunities',
      description: 'Visualize your journey from classroom subjects to exciting professional opportunities.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="flex justify-center mb-4 md:mb-6">
            <img
              src="/assets/generated/icon-ar-explorer.dim_128x128.png"
              alt="AR Explorer"
              className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
              Subject-to-Career AR Explorer
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Explore the fascinating connections between your school subjects and exciting career opportunities through an immersive experience.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Description Card */}
          <div className="bg-card rounded-xl p-6 sm:p-8 border border-border shadow-lg animate-fade-in">
            <div className="flex items-start gap-4 mb-4">
              <Sparkles className="w-8 h-8 text-purple-600 shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                  Discover Your Path
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Subject-to-Career AR Explorer helps you understand how the subjects you study today can lead to amazing careers tomorrow. 
                  Whether you love Mathematics, Science, Arts, or Commerce, discover the professional paths that await you.
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-lg hover:shadow-xl transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-gradient-to-br from-purple-600/10 to-indigo-700/10 mb-4">
                    <feature.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Card */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 sm:p-8 text-white shadow-lg animate-fade-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/20 mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                AR Experience Coming Soon
              </h3>
              <p className="text-white/90 max-w-xl mx-auto">
                We're working on an immersive augmented reality experience that will let you visualize career paths in 3D. 
                Stay tuned for an interactive way to explore how your subjects connect to your future!
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="bg-card rounded-xl p-6 sm:p-8 border border-border shadow-lg animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium mb-1">Select Your Subject</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose the school subject you're most interested in or excel at.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium mb-1">Explore Connections</h4>
                  <p className="text-sm text-muted-foreground">
                    See how that subject connects to various career paths and industries.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium mb-1">Visualize Your Future</h4>
                  <p className="text-sm text-muted-foreground">
                    Experience an immersive view of potential career opportunities through AR technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
