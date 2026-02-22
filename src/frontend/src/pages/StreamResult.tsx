import { useNavigate, useSearch } from '@tanstack/react-router';
import { Award, BookOpen, Briefcase, ArrowRight } from 'lucide-react';

export default function StreamResult() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/stream-result' });
  const stream = (search as { stream?: string }).stream || 'Science';

  const streamInfo: Record<string, { description: string; subjects: string[]; careers: string[] }> = {
    Science: {
      description: 'Perfect for students interested in technology, medicine, and research. Science stream opens doors to engineering, medical, and research careers.',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
      careers: ['Engineer', 'Doctor', 'Scientist', 'Data Analyst', 'Researcher', 'Pharmacist'],
    },
    Commerce: {
      description: 'Ideal for students interested in business, finance, and economics. Commerce stream leads to careers in management, accounting, and entrepreneurship.',
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'Entrepreneurship'],
      careers: ['Chartered Accountant', 'Business Manager', 'Economist', 'Investment Banker', 'Entrepreneur'],
    },
    Arts: {
      description: 'Best for creative and analytical minds interested in humanities, social sciences, and creative fields. Arts stream offers diverse career opportunities.',
      subjects: ['History', 'Political Science', 'Psychology', 'Sociology', 'Literature', 'Fine Arts'],
      careers: ['Lawyer', 'Psychologist', 'Journalist', 'Designer', 'Social Worker', 'Teacher'],
    },
  };

  const info = streamInfo[stream] || streamInfo.Science;

  return (
    <div className="py-12 sm:py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full gradient-primary mb-4 sm:mb-6">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Your Recommended Stream
            </h1>
            <div className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white text-2xl sm:text-3xl md:text-4xl font-bold shadow-soft-lg">
              {stream}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft animate-fade-in">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {info.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft animate-fade-in">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                <h2 className="text-xl sm:text-2xl font-semibold">Key Subjects</h2>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {info.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {subject}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft animate-fade-in">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" />
                <h2 className="text-xl sm:text-2xl font-semibold">Career Opportunities</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {info.careers.map((career, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-accent text-foreground text-xs sm:text-sm font-medium"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in">
            <button
              onClick={() => navigate({ to: '/career-path' })}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:shadow-soft transition-all min-h-[44px]"
            >
              Explore Career Paths
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate({ to: '/stream-selector' })}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 rounded-xl border-2 border-border hover:bg-accent font-semibold transition-all min-h-[44px]"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
