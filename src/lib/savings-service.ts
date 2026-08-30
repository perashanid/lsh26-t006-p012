// Savings pockets service using API
import { api } from './api-client';
import { SavingsPocket, SavingsPocketFormData } from './types';

export async function getAllSavingsPockets(): Promise<SavingsPocket[]> {
  return api.getSavings();
}

export async function createSavingsPocket(data: SavingsPocketFormData): Promise<SavingsPocket> {
  return api.createSavings(data);
}

export async function updateSavingsPocket(id: string, data: SavingsPocketFormData): Promise<SavingsPocket> {
  return api.updateSavings(id, data);
}

export async function deleteSavingsPocket(id: string): Promise<void> {
  await api.deleteSavings(id);
}

export async function updateSavedAmount(id: string, amount: number): Promise<SavingsPocket> {
  // This would need a separate endpoint, for now just return the pocket
  const pockets = await getAllSavingsPockets();
  return pockets.find(p => p.id === id)!;
}
