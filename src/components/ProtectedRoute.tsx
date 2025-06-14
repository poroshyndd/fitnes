import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedProps) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
