import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [message, setMessage]   = useState<string>();
  const [error, setError]       = useState<string>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/auth/reset-password/${token}`, { password });
      setMessage('Пароль сброшен');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Новый пароль</h2>
      {message && <div className="text-green-600 mb-2">{message}</div>}
      {error   && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Новый пароль"
          className="w-full p-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">
          Сменить пароль
        </button>
      </form>
    </div>
  );
}
