import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CareerPath, UserProfileView } from '../backend';

export function useSubmitQuizResults() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ selectedStreams, completionPercentage }: { selectedStreams: string[], completionPercentage: number }) => {
      console.log('[useQueries:submitQuizResult] Mutation called');
      console.log('[useQueries:submitQuizResult] Input parameters:', {
        selectedStreams,
        selectedStreamsType: typeof selectedStreams,
        selectedStreamsIsArray: Array.isArray(selectedStreams),
        selectedStreamsLength: selectedStreams.length,
        completionPercentage,
        completionPercentageType: typeof completionPercentage,
      });

      if (!actor) {
        console.error('[useQueries:submitQuizResult] Actor not initialized');
        throw new Error('Actor not initialized');
      }

      console.log('[useQueries:submitQuizResult] Actor is available, preparing data for backend');
      
      // Convert completionPercentage to bigint for backend
      const completionPercentageBigInt = BigInt(completionPercentage);
      console.log('[useQueries:submitQuizResult] Data transformation:', {
        selectedStreamsForBackend: selectedStreams,
        completionPercentageForBackend: completionPercentageBigInt.toString(),
        completionPercentageForBackendType: typeof completionPercentageBigInt,
      });

      console.log('[useQueries:submitQuizResult] Calling actor.submitQuizResults()...');
      try {
        const result = await actor.submitQuizResults(selectedStreams, completionPercentageBigInt);
        console.log('[useQueries:submitQuizResult] Raw backend response:', result);
        console.log('[useQueries:submitQuizResult] Response kind:', result.__kind__);
        
        if (result.__kind__ === 'err') {
          console.error('[useQueries:submitQuizResult] Backend returned error:', result.err);
          throw new Error(result.err);
        }
        
        console.log('[useQueries:submitQuizResult] Success! Returning result.ok:', result.ok);
        return result.ok;
      } catch (error) {
        console.error('[useQueries:submitQuizResult] Exception during actor call');
        console.error('[useQueries:submitQuizResult] Error type:', error instanceof Error ? 'Error' : typeof error);
        console.error('[useQueries:submitQuizResult] Error message:', error instanceof Error ? error.message : String(error));
        console.error('[useQueries:submitQuizResult] Full error object:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('[useQueries:submitQuizResult] Mutation succeeded, invalidating userProfile queries');
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      console.error('[useQueries:submitQuizResult] Mutation failed');
      console.error('[useQueries:submitQuizResult] onError callback - error:', error);
    },
  });
}

export function useGetUserProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<UserProfileView | null>({
    queryKey: ['userProfile'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await actor.getCallerUserProfile();
        return result;
      } catch (error) {
        // User profile not found is expected for new users
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBookmark() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (careerId: number) => {
      if (!actor) throw new Error('Actor not initialized');
      const result = await actor.addBookmark(BigInt(careerId));
      if (result.__kind__ === 'err') {
        throw new Error(result.err);
      }
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['bookmarkedCareers'] });
    },
  });
}

export function useRemoveBookmark() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (careerId: number) => {
      if (!actor) throw new Error('Actor not initialized');
      const result = await actor.removeBookmark(BigInt(careerId));
      if (result.__kind__ === 'err') {
        throw new Error(result.err);
      }
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['bookmarkedCareers'] });
    },
  });
}

export function useGetBookmarkedCareers() {
  const { actor, isFetching } = useActor();

  return useQuery<CareerPath[]>({
    queryKey: ['bookmarkedCareers'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getBookmarkedCareers();
      } catch (error) {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}
