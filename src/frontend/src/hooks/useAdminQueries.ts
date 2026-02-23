import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserData } from '../backend';
import { toast } from 'sonner';
import type { Principal } from '@icp-sdk/core/principal';

export function useGetAllUserProfiles() {
  const { actor, isFetching } = useActor();

  return useQuery<UserData[]>({
    queryKey: ['allUserProfiles'],
    queryFn: async () => {
      console.log('[useAdminQueries:useAllUserProfiles] Query function initiated');
      console.log('[useAdminQueries:useAllUserProfiles] Timestamp:', new Date().toISOString());
      console.log('[useAdminQueries:useAllUserProfiles] Actor available:', !!actor);
      console.log('[useAdminQueries:useAllUserProfiles] Actor fetching:', isFetching);
      
      if (!actor) {
        console.log('[useAdminQueries:useAllUserProfiles] Actor not available, returning empty array');
        return [];
      }
      
      try {
        console.log('[useAdminQueries:useAllUserProfiles] Calling actor.getAllUserProfiles()...');
        const rawResponse = await actor.getAllUserProfiles();
        console.log('[useAdminQueries:useAllUserProfiles] Raw backend response received');
        console.log('[useAdminQueries:useAllUserProfiles] Response type:', typeof rawResponse);
        console.log('[useAdminQueries:useAllUserProfiles] Response is array:', Array.isArray(rawResponse));
        console.log('[useAdminQueries:useAllUserProfiles] Response length:', rawResponse?.length);
        console.log('[useAdminQueries:useAllUserProfiles] Full response data:', JSON.stringify(rawResponse, null, 2));
        
        if (rawResponse && rawResponse.length > 0) {
          console.log('[useAdminQueries:useAllUserProfiles] Sample first profile:', {
            principal: rawResponse[0].principal.toString(),
            profileKeys: Object.keys(rawResponse[0].profile),
            quizResultsCount: rawResponse[0].profile.quizResults?.length || 0,
            bookmarkedCareersCount: rawResponse[0].profile.bookmarkedCareers?.length || 0,
            bookmarkedDegreesCount: rawResponse[0].profile.bookmarkedDegrees?.length || 0,
          });
        } else {
          console.log('[useAdminQueries:useAllUserProfiles] No profiles in response');
        }
        
        console.log('[useAdminQueries:useAllUserProfiles] Returning response to component');
        return rawResponse;
      } catch (error: any) {
        console.error('[useAdminQueries:useAllUserProfiles] Error occurred during fetch');
        console.error('[useAdminQueries:useAllUserProfiles] Error type:', error instanceof Error ? 'Error' : typeof error);
        console.error('[useAdminQueries:useAllUserProfiles] Error message:', error?.message);
        console.error('[useAdminQueries:useAllUserProfiles] Full error object:', error);
        
        // Handle unauthorized access gracefully - return empty array
        if (error.message?.includes('Unauthorized')) {
          console.warn('[useAdminQueries:useAllUserProfiles] Unauthorized access to admin dashboard');
          return [];
        }
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error('Actor not initialized');
      const result = await actor.deleteUserProfile(principal);
      if (result.__kind__ === 'err') {
        throw new Error(result.err);
      }
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUserProfiles'] });
      toast.success('User profile deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete user: ${error.message}`);
    },
  });
}
