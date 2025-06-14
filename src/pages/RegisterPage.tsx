import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // благодаря "proxy" в package.json можно писать относительный URL
      const { data } = await axios.post<{ message: string }>('/auth/register', {
        email,
        password
      });
      // тут можно показать успешный toаst с data.message
      navigate('/login');
    } catch (err: any) {
      // если сервер вернул `{ message: '...' }`
      setError(err.response?.data?.message || 'Не удалось зарегистрироваться. Попробуйте ещё раз.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Регистрация</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="w-full px-3 py-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="mt-4 text-center">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Войти
        </Link>
      </p>
    </div>
  );
}
