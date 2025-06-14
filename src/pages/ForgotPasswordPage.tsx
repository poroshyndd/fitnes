import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/auth/forgot-password', { email });
      setMessage('Письмо для сброса отправлено');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Забыли пароль?</h2>
      {message && <div className="text-green-600 mb-2">{message}</div>}
      {error   && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit" className="w-full py-2 bg-yellow-600 text-white rounded">
          Отправить письмо
        </button>
      </form>
      <p className="mt-4 text-center">
        <Link to="/login" className="text-blue-600">Вернуться к входу</Link>
      </p>
    </div>
  );
}
