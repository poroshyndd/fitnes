// frontend/src/features/profileApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Profile {
  id: number;
  email: string;
  name?: string;
  weight?: number;
  height?: number;
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Profile'],
  endpoints: builder => ({
    getProfile: builder.query<Profile, void>({
      query: () => '/profile',
      providesTags: [{ type: 'Profile', id: 'CURRENT' }],
    }),
    updateProfile: builder.mutation<Profile, Partial<Profile>>({
      query: body => ({
        url: '/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Profile', id: 'CURRENT' }],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
