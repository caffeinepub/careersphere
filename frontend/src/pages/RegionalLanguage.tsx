import { Globe, Languages, BookOpen, Users } from 'lucide-react';

export default function RegionalLanguage() {
  const features = [
    {
      icon: Languages,
      title: 'Multi-Language Support',
      description: 'Access career guidance content in Hindi, Tamil, Telugu, Bengali, Marathi, and many more regional languages.',
    },
    {
      icon: BookOpen,
      title: 'Localized Content',
      description: 'Career information tailored to regional job markets, local universities, and state-specific opportunities.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with mentors and peers who share your language and cultural background for relatable guidance.',
    },
  ];

  const languages = [
    'हिंदी', 'தமிழ்', 'తెలుగు', 'বাংলা', 'मराठी', 'ಕನ್ನಡ', 'മലയാളം', 'ਪੰਜਾਬੀ',
  ];

  return (
    <div className="py-12 sm:py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="flex justify-center mb-4 md:mb-6">
            <img
              src="/assets/generated/icon-regional-language.dim_128x128.png"
              alt="Regional Language"
              className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Regional Language Career Platform
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Explore career opportunities and guidance in your preferred regional language, making career planning more accessible and relatable.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Description Card */}
          <div className="bg-card rounded-xl p-6 sm:p-8 border border-border shadow-lg animate-fade-in">
            <div className="flex items-start gap-4 mb-4">
              <Globe className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                  Career Guidance in Your Language
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  India is a land of diverse languages and cultures. The Regional Language Career Platform ensures that language is never a barrier 
                  to accessing quality career guidance. Whether you're more comfortable in Hindi, Tamil, Telugu, or any other regional language, 
                  we bring career information directly to you in the language you understand best.
                </p>
              </div>
            </div>
          </div>

          {/* Language Chips */}
          <div className="bg-card rounded-xl p-6 sm:p-8 border border-border shadow-lg animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Supported Languages</h2>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-foreground font-medium text-sm"
                >
                  {lang}
                </span>
              ))}
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
                  <div className="p-3 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Card */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 sm:p-8 text-white shadow-lg animate-fade-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/20 mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                Full Platform Coming Soon
              </h3>
              <p className="text-white/90 max-w-xl mx-auto">
                We're building a comprehensive career guidance platform with full regional language support, 
                including translated content, regional job listings, and local mentorship programs. 
                Stay tuned for a truly inclusive career exploration experience!
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="bg-card rounded-xl p-6 sm:p-8 border border-border shadow-lg animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium mb-1">Choose Your Language</h4>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred regional language from our supported list.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium mb-1">Explore Career Content</h4>
                  <p className="text-sm text-muted-foreground">
                    Browse career paths, degree programs, and job opportunities in your language.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium mb-1">Connect with Local Mentors</h4>
                  <p className="text-sm text-muted-foreground">
                    Get guidance from mentors who understand your regional context and opportunities.
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
