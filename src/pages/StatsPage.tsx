import React, { useState } from 'react';
import { useGetStatsQuery } from '../features/trainingApi';

export default function StatsPage() {
  const [from, setFrom] = useState('');
  const [to, setTo]     = useState('');
  const { data: stats, isLoading, refetch } = useGetStatsQuery({ from, to }, { skip: true });

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
      <h1 className="text-2xl font-bold">Статистика</h1>
      <form onSubmit={handleFilter} className="flex space-x-2">
        <input
          type="date"
          value={from}
          onChange={e => setFrom(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={to}
          onChange={e => setTo(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Показать</button>
      </form>
      {isLoading && <p>Загрузка…</p>}
      {stats && (
        <div className="space-y-2">
          <p>Всего тренировок: <strong>{stats.count}</strong></p>
          <p>Общее время: <strong>{stats.totalMinutes}</strong> мин.</p>
        </div>
      )}
    </div>
  );
}
