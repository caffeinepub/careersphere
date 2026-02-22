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
      description: 'Great for creative minds interested in humanities, social sciences, and creative fields. Arts stream offers diverse career opportunities.',
      subjects: ['History', 'Political Science', 'Psychology', 'Sociology', 'Literature', 'Fine Arts'],
      careers: ['Lawyer', 'Journalist', 'Psychologist', 'Designer', 'Civil Servant', 'Teacher'],
    },
  };

  const info = streamInfo[stream];

  return (
    <div className="py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Recommended Stream
            </h1>
            <div className="inline-block px-8 py-3 rounded-full gradient-primary text-white text-2xl font-bold shadow-soft-lg">
              {stream}
            </div>
          </div>

          <div className="space-y-6 animate-fade-in">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
              <h2 className="text-2xl font-semibold mb-4">About {stream} Stream</h2>
              <p className="text-muted-foreground leading-relaxed">{info.description}</p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Key Subjects</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {info.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-secondary" />
                <h2 className="text-2xl font-semibold">Career Opportunities</h2>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {info.careers.map((career, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    {career}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <button
                onClick={() => navigate({ to: '/career-path' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:shadow-soft transition-all"
              >
                Explore Career Paths
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate({ to: '/stream-selector' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent transition-all"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
