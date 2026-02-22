import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CareerPath, UserProfileView } from '../backend';

export function useSubmitQuizResults() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ selectedStreams, completionPercentage }: { selectedStreams: string[], completionPercentage: number }) => {
      if (!actor) throw new Error('Actor not initialized');
      const result = await actor.submitQuizResults(selectedStreams, BigInt(completionPercentage));
      if (result.__kind__ === 'err') {
        throw new Error(result.err);
      }
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
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
