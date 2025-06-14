// frontend/src/features/trainingApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Training } from './types';

export const trainingApi = createApi({
  reducerPath: 'trainingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Training'],
  endpoints: (builder) => ({
    getTrainings: builder.query<Training[], void>({
      query: () => '/trainings',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Training' as const, id })),
              { type: 'Training', id: 'LIST' },
            ]
          : [{ type: 'Training', id: 'LIST' }],
    }),
    createTraining: builder.mutation<Training, Partial<Training>>({
      query: (body) => ({
        url: '/trainings',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Training', id: 'LIST' }],
    }),
    updateTraining: builder.mutation<Training, Partial<Training> & Pick<Training, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `/trainings/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Training', id }],
    }),
    deleteTraining: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/trainings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Training', id },
        { type: 'Training', id: 'LIST' },
      ],
    }),
    getStats: builder.query<{ count: number; totalMinutes: number }, { from?: string; to?: string }>({
      query: ({ from, to }) => ({
        url: `/trainings/stats${from || to ? `?from=${from||''}&to=${to||''}` : ''}`,
      }),
    }),
  }),
});

export const {
  useGetTrainingsQuery,
  useCreateTrainingMutation,
  useUpdateTrainingMutation,
  useDeleteTrainingMutation,
  useGetStatsQuery,
} = trainingApi;
