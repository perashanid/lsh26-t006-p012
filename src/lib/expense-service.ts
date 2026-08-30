// Expense service using API
import { api } from './api-client';
import { Expense, ExpenseFormData } from './types';

export async function getAllExpenses(): Promise<Expense[]> {
  return api.getExpenses();
}

export async function getExpensesByMonth(month: string): Promise<Expense[]> {
  return api.getExpenses(month);
}

export async function createExpense(data: ExpenseFormData): Promise<Expense> {
  return api.createExpense(data);
}

export async function updateExpense(id: string, data: ExpenseFormData): Promise<Expense> {
  return api.updateExpense(id, data);
}

export async function deleteExpense(id: string): Promise<void> {
  await api.deleteExpense(id);
}
