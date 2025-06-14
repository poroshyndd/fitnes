import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TrainingsPage from './pages/TrainingsPage'
import StatsPage from './pages/StatsPage'
import ProfilePage from './pages/ProfilePage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

export default function App() {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <>
      <nav className="p-4 bg-gray-100 flex space-x-4">
        <Link to="/trainings" className="hover:underline">Тренировки</Link>
        <Link to="/stats"     className="hover:underline">Статистика</Link>
        <Link to="/profile"   className="hover:underline">Профиль</Link>
        <button
          onClick={logout}
          className="ml-auto text-red-600 hover:underline"
        >
          Выйти
        </button>
      </nav>

      <Routes>
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/register"        element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password"  element={<ResetPasswordPage />} />

        <Route
          path="/trainings"
          element={
            <ProtectedRoute>
              <TrainingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <StatsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Всё, что не попало в Routes выше, кидаем на логин */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </>
  )
}
