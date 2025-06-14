import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useGetProfileQuery, useUpdateProfileMutation } from '../features/profileApi';

const schema = z.object({
  name: z.string().min(1, 'Введите имя'),
  weight: z.number().positive('Вес > 0').optional(),
  height: z.number().positive('Рост > 0').optional(),
});
type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  const { data, isLoading } = useGetProfileQuery();
  const [updateProfile]     = useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const onSubmit = async (vals: FormData) => {
    try {
      await updateProfile(vals).unwrap();
      toast.success('Профиль сохранён');
    } catch {
      toast.error('Ошибка сохранения');
    }
  };

  if (isLoading) return <p>Загрузка профиля…</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow space-y-4">
      <h1 className="text-2xl font-bold">Мой профиль</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Имя</label>
          <input {...register('name')} className="w-full p-2 border rounded" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label>Вес (кг)</label>
          <input type="number" {...register('weight', { valueAsNumber: true })} className="w-full p-2 border rounded" />
          {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
        </div>
        <div>
          <label>Рост (см)</label>
          <input type="number" {...register('height', { valueAsNumber: true })} className="w-full p-2 border rounded" />
          {errors.height && <p className="text-red-500">{errors.height.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-blue-600 text-white rounded">
          Сохранить
        </button>
      </form>
    </div>
  );
}
