import { useState } from 'react';
import { BookOpen, GraduationCap, FileText, Heart, Loader2 } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetUserProfile, useAddBookmark, useRemoveBookmark } from '../hooks/useQueries';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export default function CareerPath() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetUserProfile();
  const addBookmark = useAddBookmark();
  const removeBookmark = useRemoveBookmark();
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

  const careerData: Record<string, Array<{ id: number; career: string; degrees: string[]; exams: string[] }>> = {
    'Mathematics': [
      { id: 1, career: 'Data Scientist', degrees: ['B.Sc. Mathematics', 'B.Tech Computer Science'], exams: ['JEE Main', 'CUET'] },
      { id: 2, career: 'Actuary', degrees: ['B.Sc. Statistics', 'B.Sc. Mathematics'], exams: ['Actuarial Exams'] },
      { id: 3, career: 'Financial Analyst', degrees: ['B.Com', 'BBA Finance'], exams: ['CFA', 'FRM'] },
    ],
    'Physics': [
      { id: 4, career: 'Aerospace Engineer', degrees: ['B.Tech Aerospace'], exams: ['JEE Main', 'JEE Advanced'] },
      { id: 5, career: 'Research Scientist', degrees: ['B.Sc. Physics', 'M.Sc. Physics'], exams: ['JEST', 'GATE'] },
      { id: 6, career: 'Astrophysicist', degrees: ['B.Sc. Physics', 'M.Sc. Astrophysics'], exams: ['IUCAA Entrance'] },
    ],
    'Computer Science': [
      { id: 7, career: 'Software Engineer', degrees: ['B.Tech CSE', 'BCA'], exams: ['JEE Main', 'CUET'] },
      { id: 8, career: 'AI/ML Engineer', degrees: ['B.Tech CSE', 'B.Sc. Computer Science'], exams: ['JEE Main', 'GATE'] },
      { id: 9, career: 'Cybersecurity Analyst', degrees: ['B.Tech CSE', 'B.Sc. Cybersecurity'], exams: ['CEH', 'CISSP'] },
    ],
    'Biology': [
      { id: 10, career: 'Doctor', degrees: ['MBBS'], exams: ['NEET UG'] },
      { id: 11, career: 'Biotechnologist', degrees: ['B.Tech Biotechnology', 'B.Sc. Biotechnology'], exams: ['JEE Main', 'CUET'] },
      { id: 12, career: 'Pharmacist', degrees: ['B.Pharm'], exams: ['NEET', 'State Pharmacy Exams'] },
    ],
    'Economics': [
      { id: 13, career: 'Economist', degrees: ['B.A. Economics', 'B.Sc. Economics'], exams: ['CUET', 'University Entrance'] },
      { id: 14, career: 'Investment Banker', degrees: ['BBA Finance', 'B.Com'], exams: ['CFA', 'MBA Entrance'] },
      { id: 15, career: 'Policy Analyst', degrees: ['B.A. Economics', 'B.A. Public Policy'], exams: ['UPSC', 'State PSC'] },
    ],
  };

  const careers = selectedSubject ? careerData[selectedSubject] || [] : [];
  const bookmarkedIds = userProfile?.bookmarkedCareers.map(id => Number(id)) || [];

  const handleBookmarkToggle = async (careerId: number) => {
    if (!identity) {
      toast.error('Please log in to bookmark careers');
      navigate({ to: '/login' });
      return;
    }

    const isBookmarked = bookmarkedIds.includes(careerId);

    try {
      if (isBookmarked) {
        await removeBookmark.mutateAsync(careerId);
        toast.success('Bookmark removed');
      } else {
        await addBookmark.mutateAsync(careerId);
        toast.success('Career bookmarked!');
      }
    } catch (error) {
      console.error('Bookmark error:', error);
      toast.error('Failed to update bookmark');
    }
  };

  return (
    <div className="py-12 sm:py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Career Path Suggestion
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Select your favorite subject to discover exciting career opportunities and the paths to reach them.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft">
            <label className="block text-sm font-medium mb-3">Select Your Subject/Interest</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-3 sm:py-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary text-base min-h-[44px]"
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 animate-fade-in">
              {careers.map((item, index) => {
                const isBookmarked = bookmarkedIds.includes(item.id);
                const isLoading = addBookmark.isPending || removeBookmark.isPending;

                return (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-5 sm:p-6 border border-border hover:shadow-soft-lg transition-all relative"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-primary pr-2">{item.career}</h3>
                      <button
                        onClick={() => handleBookmarkToggle(item.id)}
                        disabled={isLoading}
                        className="p-2 rounded-lg hover:bg-accent transition-all disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark career'}
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

                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-sm">Recommended Degrees:</span>
                          <div className="mt-1 space-y-1">
                            {item.degrees.map((degree, i) => (
                              <div key={i} className="text-sm text-muted-foreground">
                                • {degree}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <FileText className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-sm">Entrance Exams:</span>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {item.exams.map((exam, i) => (
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
          )}

          {!selectedSubject && (
            <div className="text-center py-12 animate-fade-in">
              <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm sm:text-base text-muted-foreground px-4">
                Select a subject above to explore career paths and opportunities
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
