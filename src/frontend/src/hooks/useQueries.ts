import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CareerPath, UserProfileView } from '../backend';

export function useSubmitQuizResults() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ selectedStreams, completionPercentage }: { selectedStreams: string[], completionPercentage: number }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitQuizResults(selectedStreams, BigInt(completionPercentage));
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
        return await actor.getUserProfile();
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
      return actor.addBookmark(BigInt(careerId));
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
      return actor.removeBookmark(BigInt(careerId));
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
