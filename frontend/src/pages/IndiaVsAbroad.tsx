import { useState } from 'react';
import { Globe, MapPin, TrendingUp, Briefcase } from 'lucide-react';

interface ComparisonData {
  category: string;
  icon: React.ElementType;
  india: { score: number; description: string };
  abroad: { score: number; description: string };
}

export default function IndiaVsAbroad() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const comparisons: ComparisonData[] = [
    {
      category: 'Cost of Education',
      icon: TrendingUp,
      india: {
        score: 75,
        description: 'More affordable with government colleges and scholarships. Average cost: ₹2-10 lakhs for undergraduate programs.',
      },
      abroad: {
        score: 40,
        description: 'Higher tuition fees and living costs. Average cost: $20,000-$50,000 per year including living expenses.',
      },
    },
    {
      category: 'Return on Investment',
      icon: Briefcase,
      india: {
        score: 65,
        description: 'Growing job market with competitive salaries in tech and business sectors. Average starting salary: ₹3-8 lakhs.',
      },
      abroad: {
        score: 80,
        description: 'Higher earning potential and global exposure. Average starting salary: $50,000-$80,000 with better career growth.',
      },
    },
    {
      category: 'Lifestyle & Culture',
      icon: Globe,
      india: {
        score: 85,
        description: 'Familiar culture, close to family, and strong social support system. Easier adaptation and comfort.',
      },
      abroad: {
        score: 70,
        description: 'Exposure to diverse cultures and independence. May face initial adaptation challenges but offers global perspective.',
      },
    },
    {
      category: 'Job Opportunities',
      icon: MapPin,
      india: {
        score: 70,
        description: 'Rapidly growing economy with opportunities in IT, startups, and traditional sectors. Increasing demand for skilled professionals.',
      },
      abroad: {
        score: 85,
        description: 'Access to global companies and cutting-edge industries. Better work-life balance and professional development opportunities.',
      },
    },
  ];

  return (
    <div className="py-12 sm:py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              India vs Abroad
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Compare career opportunities in India and abroad to make an informed decision about your future
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          {comparisons.map((comparison, index) => {
            const Icon = comparison.icon;
            const isSelected = selectedCategory === comparison.category;

            return (
              <div
                key={index}
                className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => setSelectedCategory(isSelected ? null : comparison.category)}
                  className="w-full p-6 sm:p-8 text-left hover:bg-accent/50 transition-all"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold">{comparison.category}</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                    {/* India */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg font-semibold text-primary">India</h3>
                        <span className="text-xl sm:text-2xl font-bold text-primary">
                          {comparison.india.score}%
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                          style={{ width: `${comparison.india.score}%` }}
                        />
                      </div>
                      {isSelected && (
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed animate-fade-in">
                          {comparison.india.description}
                        </p>
                      )}
                    </div>

                    {/* Abroad */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg font-semibold text-secondary">Abroad</h3>
                        <span className="text-xl sm:text-2xl font-bold text-secondary">
                          {comparison.abroad.score}%
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-secondary to-secondary/70 transition-all duration-500"
                          style={{ width: `${comparison.abroad.score}%` }}
                        />
                      </div>
                      {isSelected && (
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed animate-fade-in">
                          {comparison.abroad.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12 bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft text-center animate-fade-in max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Need More Guidance?</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
            The decision between studying in India or abroad depends on your personal goals, financial situation, and career aspirations. Consider all factors carefully.
          </p>
          <button className="px-6 sm:px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:shadow-soft transition-all min-h-[44px]">
            Talk to a Career Counselor
          </button>
        </div>
      </div>
    </div>
  );
}
