import { Eye, Trash2, User } from 'lucide-react';
import type { UserData } from '../backend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Principal } from '@icp-sdk/core/principal';

interface UserDataCardProps {
  userData: UserData;
  onView: () => void;
  onDelete: () => void;
}

export default function UserDataCard({ userData, onView, onDelete }: UserDataCardProps) {
  const latestQuiz = userData.profile.quizResults[userData.profile.quizResults.length - 1];

  const truncatePrincipal = (principal: string) => {
    if (principal.length <= 30) return principal;
    return `${principal.slice(0, 15)}...${principal.slice(-15)}`;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-1">Principal ID</p>
            <p className="font-mono text-xs break-all">
              {truncatePrincipal(userData.principal.toString())}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Quiz Result</p>
            {latestQuiz ? (
              <div>
                <p className="text-sm font-semibold">{latestQuiz.selectedStreams[0]}</p>
                <p className="text-xs text-muted-foreground">
                  {Number(latestQuiz.completionPercentage)}% complete
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No quiz</p>
            )}
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Bookmarks</p>
            <p className="text-sm font-semibold">
              {userData.profile.bookmarkedCareers.length} careers
            </p>
            <p className="text-xs text-muted-foreground">
              {userData.profile.bookmarkedDegrees.length} degrees
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onView}
          className="flex-1 min-h-[44px]"
        >
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          className="flex-1 min-h-[44px]"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
