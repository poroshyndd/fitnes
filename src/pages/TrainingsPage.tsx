import React, { useState } from 'react';
import {
  useGetTrainingsQuery,
  useCreateTrainingMutation,
  useUpdateTrainingMutation,
  useDeleteTrainingMutation
} from '../features/trainingApi';

export default function TrainingsPage() {
  const { data: list, isLoading } = useGetTrainingsQuery();
  const [createTraining] = useCreateTrainingMutation();
  const [updateTraining] = useUpdateTrainingMutation();
  const [deleteTraining] = useDeleteTrainingMutation();

  const [type, setType]         = useState('');
  const [intensity, setIntensity] = useState('');
  const [duration, setDuration]   = useState<number>(0);
  const [date, setDate]           = useState('');

  const handleAdd = async () => {
    await createTraining({ type, intensity, duration, date });
    setType(''); setIntensity(''); setDuration(0); setDate('');
  };

  if (isLoading) return <p>Загрузка…</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
      <h1 className="text-2xl font-bold">Новая тренировка</h1>
      <div className="grid grid-cols-4 gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Тип"
          value={type}
          onChange={e => setType(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Интенсивность"
          value={intensity}
          onChange={e => setIntensity(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Длительность"
          value={duration}
          onChange={e => setDuration(+e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Добавить тренировку
      </button>

      <ul className="space-y-4">
        {list?.map(t => (
          <li key={t.id} className="p-4 border rounded">
            <h2 className="font-semibold">{t.type}</h2>
            <p>Интенсивность: {t.intensity}</p>
            <p>Длительность: {t.duration} мин.</p>
            <p>Дата: {t.date}</p>
            <div className="space-x-2 mt-2">
              <button
                onClick={() => updateTraining({ id: t.id, type, intensity, duration, date })}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                Обновить
              </button>
              <button
                onClick={() => deleteTraining(t.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
