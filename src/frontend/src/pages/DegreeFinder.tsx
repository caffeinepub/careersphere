import { useState } from 'react';
import { Search, Clock, FileText, DollarSign, Heart, Loader2 } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetUserProfile, useAddBookmark, useRemoveBookmark } from '../hooks/useQueries';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

interface Degree {
  id: number;
  name: string;
  duration: string;
  exams: string[];
  fees: string;
  description: string;
}

export default function DegreeFinder() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetUserProfile();
  const addBookmark = useAddBookmark();
  const removeBookmark = useRemoveBookmark();
  const [searchQuery, setSearchQuery] = useState('');

  const degrees: Degree[] = [
    {
      id: 20,
      name: 'B.Tech (Computer Science)',
      duration: '4 Years',
      exams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'State Entrance Exams'],
      fees: '₹4-15 Lakhs',
      description: 'Bachelor of Technology in Computer Science focuses on software development, algorithms, and computing systems.',
    },
    {
      id: 21,
      name: 'MBBS',
      duration: '5.5 Years',
      exams: ['NEET UG'],
      fees: '₹5-80 Lakhs',
      description: 'Bachelor of Medicine and Bachelor of Surgery is the primary medical degree for becoming a doctor.',
    },
    {
      id: 22,
      name: 'B.Com (Hons)',
      duration: '3 Years',
      exams: ['CUET', 'University Entrance Exams'],
      fees: '₹1-5 Lakhs',
      description: 'Bachelor of Commerce with Honours provides in-depth knowledge of accounting, finance, and business.',
    },
    {
      id: 23,
      name: 'BBA',
      duration: '3 Years',
      exams: ['CUET', 'IPM', 'University Entrance Exams'],
      fees: '₹2-10 Lakhs',
      description: 'Bachelor of Business Administration prepares students for management and entrepreneurship roles.',
    },
    {
      id: 24,
      name: 'B.Sc. (Physics)',
      duration: '3 Years',
      exams: ['CUET', 'University Entrance Exams'],
      fees: '₹1-4 Lakhs',
      description: 'Bachelor of Science in Physics covers fundamental principles of matter, energy, and the universe.',
    },
    {
      id: 25,
      name: 'B.A. (Psychology)',
      duration: '3 Years',
      exams: ['CUET', 'University Entrance Exams'],
      fees: '₹1-5 Lakhs',
      description: 'Bachelor of Arts in Psychology explores human behavior, mental processes, and therapeutic techniques.',
    },
    {
      id: 26,
      name: 'LLB',
      duration: '3 Years',
      exams: ['CLAT', 'LSAT India', 'State Law Entrance Exams'],
      fees: '₹2-8 Lakhs',
      description: 'Bachelor of Laws is the professional law degree required to practice as a lawyer in India.',
    },
    {
      id: 27,
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

  const bookmarkedIds = userProfile?.bookmarked.map(id => Number(id)) || [];

  const handleBookmarkToggle = async (degreeId: number) => {
    if (!identity) {
      toast.error('Please log in to bookmark degrees');
      navigate({ to: '/login' });
      return;
    }

    const isBookmarked = bookmarkedIds.includes(degreeId);

    try {
      if (isBookmarked) {
        await removeBookmark.mutateAsync(degreeId);
        toast.success('Bookmark removed');
      } else {
        await addBookmark.mutateAsync(degreeId);
        toast.success('Degree bookmarked!');
      }
    } catch (error) {
      console.error('Bookmark error:', error);
      toast.error('Failed to update bookmark');
    }
  };

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
            {filteredDegrees.map((degree, index) => {
              const isBookmarked = bookmarkedIds.includes(degree.id);
              const isLoading = addBookmark.isPending || removeBookmark.isPending;

              return (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 border border-border hover:shadow-soft-lg transition-all animate-fade-in relative"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-semibold text-primary">{degree.name}</h3>
                    <button
                      onClick={() => handleBookmarkToggle(degree.id)}
                      disabled={isLoading}
                      className="p-2 rounded-lg hover:bg-accent transition-all disabled:opacity-50"
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark degree'}
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                      ) : (
                        <Heart
                          className={`w-5 h-5 transition-all ${
                            isBookmarked
                              ? 'fill-red-500 text-red-500'
                              : 'text-muted-foreground hover:text-red-500'
                          }`}
                        />
                      )}
                    </button>
                  </div>
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
                      <div>
                        <span className="font-medium text-sm">Entrance Exams:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {degree.exams.map((exam, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-md bg-accent text-foreground"
                            >
                              {exam}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDegrees.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No degrees found matching your search. Try different keywords!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
