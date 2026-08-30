// Salary settings service using API
import { api } from './api-client';
import { SalarySettings } from './types';

export async function getSalarySettings(): Promise<SalarySettings | null> {
  return api.getSalary();
}

export async function updateSalarySettings(monthlyAmount: number): Promise<SalarySettings> {
  return api.updateSalary(monthlyAmount);
}
