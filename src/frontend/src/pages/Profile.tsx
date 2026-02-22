import { useEffect } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetUserProfile, useGetBookmarkedCareers } from '../hooks/useQueries';
import { User, Award, Heart, Loader2, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const navigate = useNavigate();
  const { identity, clear, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetUserProfile();
  const { data: bookmarkedCareers, isLoading: careersLoading } = useGetBookmarkedCareers();

  useEffect(() => {
    if (!isInitializing && !identity) {
      toast.error('Please log in to view your profile');
      navigate({ to: '/login' });
    }
  }, [identity, isInitializing, navigate]);

  const handleLogout = () => {
    clear();
    toast.success('Logged out successfully');
    navigate({ to: '/' });
  };

  if (isInitializing || profileLoading) {
    return (
      <div className="py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background flex items-center justify-center">
        <div className="text-center px-4">
          <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-sm sm:text-base text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!identity) {
    return null;
  }

  const principalId = identity.getPrincipal().toString();
  const latestQuizResult = userProfile?.quizResults?.[userProfile.quizResults.length - 1];

  return (
    <div className="py-12 sm:py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft-lg animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-3 sm:gap-4 w-full md:w-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full gradient-primary flex items-center justify-center shrink-0">
                  <User className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      My Profile
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground font-mono break-all">
                    {principalId}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-lg border border-border hover:bg-accent transition-all min-h-[44px] w-full md:w-auto"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Quiz Results Section */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft animate-fade-in">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-semibold">Stream Selector Results</h2>
            </div>

            {latestQuizResult ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-5 sm:p-6 border border-primary/20">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">Recommended Stream</p>
                      <p className="text-2xl sm:text-3xl font-bold text-primary">
                        {latestQuizResult.selectedStreams[0]}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">Completion</p>
                      <p className="text-2xl sm:text-3xl font-bold text-secondary">
                        {Number(latestQuizResult.completionPercentage)}%
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/stream-selector"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline min-h-[44px]"
                  >
                    Retake Quiz →
                  </Link>
                </div>

                {userProfile && userProfile.quizResults.length > 1 && (
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    <p>You've completed the quiz {userProfile.quizResults.length} times</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm sm:text-base text-muted-foreground mb-4 px-4">
                  You haven't completed the Stream Selector Quiz yet
                </p>
                <Link
                  to="/stream-selector"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:shadow-soft transition-all min-h-[44px]"
                >
                  Take Quiz Now
                </Link>
              </div>
            )}
          </div>

          {/* Bookmarked Careers Section */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft animate-fade-in">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-red-500" />
              <h2 className="text-xl sm:text-2xl font-semibold">Bookmarked Items</h2>
            </div>

            {careersLoading ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-sm sm:text-base text-muted-foreground">Loading bookmarks...</p>
              </div>
            ) : bookmarkedCareers && bookmarkedCareers.length > 0 ? (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {bookmarkedCareers.map((career) => (
                    <div
                      key={Number(career.id)}
                      className="p-4 sm:p-5 rounded-xl border border-border hover:shadow-soft transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-primary text-sm sm:text-base pr-2">{career.title}</h3>
                        <Heart className="w-5 h-5 text-red-500 fill-red-500 shrink-0" />
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                        {career.description}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 rounded-md bg-accent">
                          {career.degreeType}
                        </span>
                        <span className="px-2 py-1 rounded-md bg-accent">
                          {career.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <Link
                    to="/career-path"
                    className="text-sm text-primary hover:underline min-h-[44px] flex items-center"
                  >
                    Browse More Careers →
                  </Link>
                  <Link
                    to="/degree-finder"
                    className="text-sm text-primary hover:underline min-h-[44px] flex items-center"
                  >
                    Explore Degrees →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm sm:text-base text-muted-foreground mb-4 px-4">
                  You haven't bookmarked any careers or degrees yet
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link
                    to="/career-path"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:shadow-soft transition-all min-h-[44px]"
                  >
                    Explore Careers
                  </Link>
                  <Link
                    to="/degree-finder"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent transition-all min-h-[44px]"
                  >
                    Find Degrees
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
