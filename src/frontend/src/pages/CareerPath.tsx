import { useState } from 'react';
import { BookOpen, GraduationCap, FileText } from 'lucide-react';

export default function CareerPath() {
  const [selectedSubject, setSelectedSubject] = useState('');

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Economics',
    'History',
    'Literature',
    'Arts & Design',
    'Business Studies',
  ];

  const careerData: Record<string, Array<{ career: string; degrees: string[]; exams: string[] }>> = {
    'Mathematics': [
      { career: 'Data Scientist', degrees: ['B.Sc. Mathematics', 'B.Tech Computer Science'], exams: ['JEE Main', 'CUET'] },
      { career: 'Actuary', degrees: ['B.Sc. Statistics', 'B.Sc. Mathematics'], exams: ['Actuarial Exams'] },
      { career: 'Financial Analyst', degrees: ['B.Com', 'BBA Finance'], exams: ['CFA', 'FRM'] },
    ],
    'Physics': [
      { career: 'Aerospace Engineer', degrees: ['B.Tech Aerospace'], exams: ['JEE Main', 'JEE Advanced'] },
      { career: 'Research Scientist', degrees: ['B.Sc. Physics', 'M.Sc. Physics'], exams: ['JEST', 'GATE'] },
      { career: 'Astrophysicist', degrees: ['B.Sc. Physics', 'M.Sc. Astrophysics'], exams: ['IUCAA Entrance'] },
    ],
    'Computer Science': [
      { career: 'Software Engineer', degrees: ['B.Tech CSE', 'BCA'], exams: ['JEE Main', 'CUET'] },
      { career: 'AI/ML Engineer', degrees: ['B.Tech CSE', 'B.Sc. Computer Science'], exams: ['JEE Main', 'GATE'] },
      { career: 'Cybersecurity Analyst', degrees: ['B.Tech CSE', 'B.Sc. Cybersecurity'], exams: ['CEH', 'CISSP'] },
    ],
    'Biology': [
      { career: 'Doctor', degrees: ['MBBS'], exams: ['NEET UG'] },
      { career: 'Biotechnologist', degrees: ['B.Tech Biotechnology', 'B.Sc. Biotechnology'], exams: ['JEE Main', 'CUET'] },
      { career: 'Pharmacist', degrees: ['B.Pharm'], exams: ['NEET', 'State Pharmacy Exams'] },
    ],
    'Economics': [
      { career: 'Economist', degrees: ['B.A. Economics', 'B.Sc. Economics'], exams: ['CUET', 'University Entrance'] },
      { career: 'Investment Banker', degrees: ['BBA Finance', 'B.Com'], exams: ['CFA', 'MBA Entrance'] },
      { career: 'Policy Analyst', degrees: ['B.A. Economics', 'B.A. Public Policy'], exams: ['UPSC', 'State PSC'] },
    ],
  };

  const careers = selectedSubject ? careerData[selectedSubject] || [] : [];

  return (
    <div className="py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Career Path Suggestion
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your favorite subject to discover exciting career opportunities and the paths to reach them.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
            <label className="block text-sm font-medium mb-3">Select Your Subject/Interest</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Choose a subject...</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {careers.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
              {careers.map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 border border-border hover:shadow-soft-lg transition-all"
                >
                  <h3 className="text-xl font-semibold mb-4 text-primary">{item.career}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="w-5 h-5 text-secondary" />
                        <span className="font-medium text-sm">Required Degrees</span>
                      </div>
                      <ul className="space-y-1 ml-7">
                        {item.degrees.map((degree, i) => (
                          <li key={i} className="text-sm text-muted-foreground">• {degree}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-secondary" />
                        <span className="font-medium text-sm">Entrance Exams</span>
                      </div>
                      <ul className="space-y-1 ml-7">
                        {item.exams.map((exam, i) => (
                          <li key={i} className="text-sm text-muted-foreground">• {exam}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedSubject && careers.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Career information for this subject is coming soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
