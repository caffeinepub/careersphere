import { TrendingUp, DollarSign, Home, Briefcase } from 'lucide-react';

export default function IndiaVsAbroad() {
  const comparisonData = [
    {
      category: 'Cost of Education',
      icon: DollarSign,
      india: {
        value: '₹5-20 Lakhs',
        description: 'Affordable education with government subsidies',
        score: 85,
      },
      abroad: {
        value: '₹30-80 Lakhs',
        description: 'Higher costs but quality infrastructure',
        score: 60,
      },
    },
    {
      category: 'Return on Investment',
      icon: TrendingUp,
      india: {
        value: '3-5 Years',
        description: 'Moderate ROI with growing opportunities',
        score: 70,
      },
      abroad: {
        value: '2-4 Years',
        description: 'Faster ROI with higher starting salaries',
        score: 85,
      },
    },
    {
      category: 'Lifestyle & Culture',
      icon: Home,
      india: {
        value: 'Familiar',
        description: 'Close to family, cultural comfort',
        score: 90,
      },
      abroad: {
        value: 'Diverse',
        description: 'Global exposure, new experiences',
        score: 75,
      },
    },
    {
      category: 'Job Opportunities',
      icon: Briefcase,
      india: {
        value: 'Growing',
        description: 'Expanding tech and startup ecosystem',
        score: 75,
      },
      abroad: {
        value: 'Established',
        description: 'Mature markets with diverse roles',
        score: 80,
      },
    },
  ];

  return (
    <div className="py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              India vs Abroad
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare career opportunities and make an informed decision about your educational journey
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {comparisonData.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 border-b border-border bg-gradient-card">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold">{item.category}</h2>
                </div>
              </div>

              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-primary">India</h3>
                    <span className="text-2xl font-bold text-primary">{item.india.value}</span>
                  </div>
                  <p className="text-muted-foreground">{item.india.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Score</span>
                      <span className="font-semibold">{item.india.score}/100</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${item.india.score}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-secondary">Abroad</h3>
                    <span className="text-2xl font-bold text-secondary">{item.abroad.value}</span>
                  </div>
                  <p className="text-muted-foreground">{item.abroad.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Score</span>
                      <span className="font-semibold">{item.abroad.score}/100</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary transition-all duration-500"
                        style={{ width: `${item.abroad.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-card rounded-2xl p-8 border border-border shadow-soft text-center">
            <h3 className="text-2xl font-semibold mb-4">Need Help Deciding?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              The choice between studying in India or abroad depends on your personal goals, financial situation, and career aspirations. Consider all factors carefully before making your decision.
            </p>
            <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:shadow-soft transition-all">
              Talk to Our Counselors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
