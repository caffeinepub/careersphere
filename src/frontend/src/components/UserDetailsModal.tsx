import { X } from 'lucide-react';
import type { UserData } from '../backend';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface UserDetailsModalProps {
  userData: UserData;
  open: boolean;
  onClose: () => void;
}

export default function UserDetailsModal({ userData, open, onClose }: UserDetailsModalProps) {
  const latestQuiz = userData.profile.quizResults[userData.profile.quizResults.length - 1];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">User Profile Details</DialogTitle>
          <DialogDescription>
            Complete information for this user profile
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Principal ID */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Principal ID</h3>
              <p className="font-mono text-xs sm:text-sm break-all bg-accent p-3 rounded-lg">
                {userData.principal.toString()}
              </p>
            </div>

            {/* Quiz Results */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Quiz Results ({userData.profile.quizResults.length} total)
              </h3>
              {latestQuiz ? (
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                  <div className="flex flex-col sm:flex-row justify-between gap-3 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Latest Stream</p>
                      <p className="text-lg font-bold text-primary">
                        {latestQuiz.selectedStreams[0]}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-muted-foreground mb-1">Completion</p>
                      <p className="text-lg font-bold text-secondary">
                        {Number(latestQuiz.completionPercentage)}%
                      </p>
                    </div>
                  </div>
                  {latestQuiz.selectedStreams.length > 1 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">All Selected Streams:</p>
                      <div className="flex flex-wrap gap-2">
                        {latestQuiz.selectedStreams.map((stream, idx) => (
                          <Badge key={idx} variant="secondary">
                            {stream}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No quiz results available</p>
              )}
            </div>

            {/* Bookmarked Careers */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Bookmarked Careers ({userData.profile.bookmarkedCareers.length})
              </h3>
              {userData.profile.bookmarkedCareers.length > 0 ? (
                <div className="bg-accent p-4 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {userData.profile.bookmarkedCareers.map((careerId) => (
                      <Badge key={careerId.toString()} variant="outline">
                        Career ID: {careerId.toString()}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No bookmarked careers</p>
              )}
            </div>

            {/* Bookmarked Degrees */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Bookmarked Degrees ({userData.profile.bookmarkedDegrees.length})
              </h3>
              {userData.profile.bookmarkedDegrees.length > 0 ? (
                <div className="bg-accent p-4 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {userData.profile.bookmarkedDegrees.map((degreeId) => (
                      <Badge key={degreeId.toString()} variant="outline">
                        Degree ID: {degreeId.toString()}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No bookmarked degrees</p>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
