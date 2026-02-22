import { useState } from 'react';
import { Search, Clock, FileText, DollarSign } from 'lucide-react';

interface Degree {
  name: string;
  duration: string;
  exams: string[];
  fees: string;
  description: string;
}

export default function DegreeFinder() {
  const [searchQuery, setSearchQuery] = useState('');

  const degrees: Degree[] = [
    {
      name: 'B.Tech (Computer Science)',
      duration: '4 Years',
      exams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'State Entrance Exams'],
      fees: '₹4-15 Lakhs',
      description: 'Bachelor of Technology in Computer Science focuses on software development, algorithms, and computing systems.',
    },
    {
      name: 'MBBS',
      duration: '5.5 Years',
      exams: ['NEET UG'],
      fees: '₹5-80 Lakhs',
      description: 'Bachelor of Medicine and Bachelor of Surgery is the primary medical degree for becoming a doctor.',
    },
    {
      name: 'B.Com (Hons)',
      duration: '3 Years',
      exams: ['CUET', 'University Entrance Exams'],
      fees: '₹1-5 Lakhs',
      description: 'Bachelor of Commerce with Honours provides in-depth knowledge of accounting, finance, and business.',
    },
    {
      name: 'BBA',
      duration: '3 Years',
      exams: ['CUET', 'IPM', 'University Entrance Exams'],
      fees: '₹2-10 Lakhs',
      description: 'Bachelor of Business Administration prepares students for management and entrepreneurship roles.',
    },
    {
      name: 'B.Sc. (Physics)',
      duration: '3 Years',
      exams: ['CUET', 'University Entrance Exams'],
      fees: '₹1-4 Lakhs',
      description: 'Bachelor of Science in Physics covers fundamental principles of matter, energy, and the universe.',
    },
    {
      name: 'B.A. (Psychology)',
      duration: '3 Years',
      exams: ['CUET', 'University Entrance Exams'],
      fees: '₹1-5 Lakhs',
      description: 'Bachelor of Arts in Psychology explores human behavior, mental processes, and therapeutic techniques.',
    },
    {
      name: 'LLB',
      duration: '3 Years',
      exams: ['CLAT', 'LSAT India', 'State Law Entrance Exams'],
      fees: '₹2-8 Lakhs',
      description: 'Bachelor of Laws is the professional law degree required to practice as a lawyer in India.',
    },
    {
      name: 'B.Arch',
      duration: '5 Years',
      exams: ['NATA', 'JEE Main Paper 2'],
      fees: '₹3-12 Lakhs',
      description: 'Bachelor of Architecture focuses on building design, urban planning, and architectural theory.',
    },
  ];

  const filteredDegrees = degrees.filter((degree) =>
    degree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    degree.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Degree Info Finder
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search and explore detailed information about degrees, entrance exams, and career prospects
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for degrees (e.g., Engineering, Medicine, Commerce)..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredDegrees.map((degree, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-soft-lg transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <h3 className="text-2xl font-semibold mb-3 text-primary">{degree.name}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {degree.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-sm">Duration:</span>
                      <span className="text-muted-foreground text-sm ml-2">{degree.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-sm">Fees Range:</span>
                      <span className="text-muted-foreground text-sm ml-2">{degree.fees}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-medium text-sm block mb-2">Entrance Exams:</span>
                      <div className="flex flex-wrap gap-2">
                        {degree.exams.map((exam, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium"
                          >
                            {exam}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDegrees.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No degrees found matching "{searchQuery}". Try a different search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
