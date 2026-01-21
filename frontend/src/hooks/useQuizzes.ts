import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quizzesApi } from '../api/quizzes';

export const useQuizzes = () => {
  const queryClient = useQueryClient();

  const quizzesQuery = useQuery({
    queryKey: ['quizzes'],
    queryFn: quizzesApi.getAllQuizzes,
  });

  const createQuizMutation = useMutation({
    mutationFn: quizzesApi.createQuiz,
    onSuccess: (data) => {
      console.log('Quiz created successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
    onError: (error) => {
      console.error('Failed to create quiz:', error);
    },
  });

  const deleteQuizMutation = useMutation({
    mutationFn: quizzesApi.deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });

  return {
    quizzes: quizzesQuery.data || [],
    isLoading: quizzesQuery.isLoading,
    error: quizzesQuery.error,
    createQuiz: createQuizMutation.mutateAsync,
    deleteQuiz: deleteQuizMutation.mutateAsync,
    isCreating: createQuizMutation.isPending,
    isDeleting: deleteQuizMutation.isPending,
  };
};

export const useQuiz = (id: string) => {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: () => quizzesApi.getQuiz(id),
    enabled: !!id,
  });
};
