// frontend/src/features/types.ts
export interface Training {
  id: number;
  userId: number;
  type: string;
  intensity: string;
  duration: number;
  date: string;       // YYYY-MM-DD
  createdAt?: string; // ISO timestamp
  updatedAt?: string;
}
