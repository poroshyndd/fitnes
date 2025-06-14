import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
} from 'recharts';

interface Point { date: string; duration: number; }

interface Props {
  data: Point[];
}

export const StatsChart: React.FC<Props> = ({ data }) => {
  // Группируем по дате: суммируем длительности
  const grouped = data.reduce<Record<string, number>>((acc, { date, duration }) => {
    acc[date] = (acc[date] || 0) + duration;
    return acc;
  }, {});

  // Переводим в массив для Recharts и сортируем по дате
  const chartData = Object.entries(grouped)
    .map(([date, duration]) => ({ date, duration }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="duration" name="Минут" fill="#3182CE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
