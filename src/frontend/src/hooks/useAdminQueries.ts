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
      if (!actor) return [];
      try {
        return await actor.getAllUserProfiles();
      } catch (error: any) {
        // Handle unauthorized access gracefully - return empty array
        if (error.message?.includes('Unauthorized')) {
          console.warn('Unauthorized access to admin dashboard');
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
