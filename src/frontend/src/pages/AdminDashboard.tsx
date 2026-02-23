import { useState, useEffect } from 'react';
import { useGetAllUserProfiles } from '../hooks/useAdminQueries';
import { Shield, Loader2, Eye, Trash2, Users } from 'lucide-react';
import UserDetailsModal from '../components/UserDetailsModal';
import DeleteUserConfirmDialog from '../components/DeleteUserConfirmDialog';
import UserDataCard from '../components/UserDataCard';
import type { UserData } from '../backend';
import type { Principal } from '@icp-sdk/core/principal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AdminDashboard() {
  console.log('[AdminDashboard] Component rendering');
  
  const { data: userProfiles, isLoading: profilesLoading, isFetched } = useGetAllUserProfiles();
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [userToDelete, setUserToDelete] = useState<Principal | null>(null);

  useEffect(() => {
    console.log('[AdminDashboard] Data state changed');
    console.log('[AdminDashboard] Loading:', profilesLoading);
    console.log('[AdminDashboard] Fetched:', isFetched);
    console.log('[AdminDashboard] Data available:', !!userProfiles);
    console.log('[AdminDashboard] Data type:', typeof userProfiles);
    console.log('[AdminDashboard] Data is array:', Array.isArray(userProfiles));
    
    if (userProfiles) {
      console.log('[AdminDashboard] Profiles count:', userProfiles.length);
      console.log('[AdminDashboard] Full profiles data:', JSON.stringify(userProfiles, null, 2));
      
      if (userProfiles.length > 0) {
        console.log('[AdminDashboard] First profile structure:', {
          principal: userProfiles[0].principal.toString(),
          profileKeys: Object.keys(userProfiles[0].profile),
          surveyCompleted: userProfiles[0].profile.surveyCompleted,
          quizResultsCount: userProfiles[0].profile.quizResults?.length || 0,
          quizResults: userProfiles[0].profile.quizResults,
          bookmarkedCareersCount: userProfiles[0].profile.bookmarkedCareers?.length || 0,
          bookmarkedDegreesCount: userProfiles[0].profile.bookmarkedDegrees?.length || 0,
        });
      } else {
        console.log('[AdminDashboard] Profiles array is empty');
      }
    } else {
      console.log('[AdminDashboard] No profiles data (null/undefined)');
    }
  }, [userProfiles, profilesLoading, isFetched]);

  if (profilesLoading) {
    console.log('[AdminDashboard] Rendering loading state');
    return (
      <div className="py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background flex items-center justify-center">
        <div className="text-center px-4">
          <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-sm sm:text-base text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const handleViewUser = (user: UserData) => {
    console.log('[AdminDashboard] View user clicked:', user.principal.toString());
    setSelectedUser(user);
  };

  const handleDeleteClick = (principal: Principal) => {
    console.log('[AdminDashboard] Delete user clicked:', principal.toString());
    setUserToDelete(principal);
  };

  const truncatePrincipal = (principal: string) => {
    if (principal.length <= 20) return principal;
    return `${principal.slice(0, 10)}...${principal.slice(-10)}`;
  };

  console.log('[AdminDashboard] Rendering main content with', userProfiles?.length || 0, 'profiles');

  return (
    <div className="py-12 sm:py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft-lg animate-fade-in">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full gradient-primary flex items-center justify-center shrink-0">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Admin Dashboard
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  Manage user profiles and data
                </p>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-lg sm:text-xl font-semibold">Total Users</h2>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-primary">
              {userProfiles?.length || 0}
            </p>
          </div>

          {/* User Data Table/Cards */}
          <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 border border-border shadow-soft animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">User Profiles</h2>

            {!userProfiles || userProfiles.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm sm:text-base text-muted-foreground">
                  No user profiles found
                </p>
              </div>
            ) : (
              <>
                {/* Mobile View - Cards */}
                <div className="md:hidden space-y-4">
                  {userProfiles.map((user) => (
                    <UserDataCard
                      key={user.principal.toString()}
                      userData={user}
                      onView={() => handleViewUser(user)}
                      onDelete={() => handleDeleteClick(user.principal)}
                    />
                  ))}
                </div>

                {/* Tablet/Desktop View - Table */}
                <div className="hidden md:block">
                  <ScrollArea className="w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">Principal ID</TableHead>
                          <TableHead>Quiz Results</TableHead>
                          <TableHead className="text-center">Bookmarked Careers</TableHead>
                          <TableHead className="text-center">Bookmarked Degrees</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userProfiles.map((user) => (
                          <TableRow key={user.principal.toString()}>
                            <TableCell className="font-mono text-xs">
                              {truncatePrincipal(user.principal.toString())}
                            </TableCell>
                            <TableCell>
                              {user.profile.quizResults.length > 0 ? (
                                <div className="text-sm">
                                  <div className="font-medium">
                                    Latest: {user.profile.quizResults[user.profile.quizResults.length - 1].completionPercentage.toString()}%
                                  </div>
                                  <div className="text-muted-foreground text-xs">
                                    Total: {user.profile.quizResults.length} result{user.profile.quizResults.length !== 1 ? 's' : ''}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-muted-foreground text-sm">No results</span>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {user.profile.bookmarkedCareers.length}
                            </TableCell>
                            <TableCell className="text-center">
                              {user.profile.bookmarkedDegrees.length}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewUser(user)}
                                  className="min-h-[44px]"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteClick(user.principal)}
                                  className="min-h-[44px]"
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedUser && (
        <UserDetailsModal
          userData={selectedUser}
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {userToDelete && (
        <DeleteUserConfirmDialog
          principal={userToDelete}
          open={!!userToDelete}
          onClose={() => setUserToDelete(null)}
        />
      )}
    </div>
  );
}
