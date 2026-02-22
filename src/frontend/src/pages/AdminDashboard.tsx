import { useState } from 'react';
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
  const { data: userProfiles, isLoading: profilesLoading } = useGetAllUserProfiles();
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [userToDelete, setUserToDelete] = useState<Principal | null>(null);

  if (profilesLoading) {
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
    setSelectedUser(user);
  };

  const handleDeleteClick = (principal: Principal) => {
    setUserToDelete(principal);
  };

  const truncatePrincipal = (principal: string) => {
    if (principal.length <= 20) return principal;
    return `${principal.slice(0, 10)}...${principal.slice(-10)}`;
  };

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
                        {userProfiles.map((user) => {
                          const latestQuiz = user.profile.quizResults[user.profile.quizResults.length - 1];
                          return (
                            <TableRow key={user.principal.toString()}>
                              <TableCell className="font-mono text-xs lg:text-sm">
                                <span className="hidden lg:inline">{user.principal.toString()}</span>
                                <span className="lg:hidden">{truncatePrincipal(user.principal.toString())}</span>
                              </TableCell>
                              <TableCell>
                                {latestQuiz ? (
                                  <div className="text-sm">
                                    <span className="font-medium">{latestQuiz.selectedStreams[0]}</span>
                                    <span className="text-muted-foreground ml-2">
                                      ({Number(latestQuiz.completionPercentage)}%)
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground text-sm">No quiz taken</span>
                                )}
                              </TableCell>
                              <TableCell className="text-center">
                                {user.profile.bookmarkedCareers.length}
                              </TableCell>
                              <TableCell className="text-center">
                                {user.profile.bookmarkedDegrees.length}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewUser(user)}
                                    className="min-h-[44px] min-w-[44px]"
                                  >
                                    <Eye className="w-4 h-4" />
                                    <span className="ml-2 hidden lg:inline">View</span>
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteClick(user.principal)}
                                    className="min-h-[44px] min-w-[44px]"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="ml-2 hidden lg:inline">Delete</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
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
