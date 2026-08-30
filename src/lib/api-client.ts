// API client for backend communication

// Use relative /api for Vercel deployment, or localhost for local dev
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Health check
  health: () => fetchAPI('/health'),

  // Salary
  getSalary: () => fetchAPI('/salary'),
  updateSalary: (monthlyAmount: number) =>
    fetchAPI('/salary', {
      method: 'POST',
      body: JSON.stringify({ monthlyAmount }),
    }),

  // Expenses
  getExpenses: (month?: string) => {
    const query = month ? `?month=${month}` : '';
    return fetchAPI(`/expenses${query}`);
  },
  createExpense: (data: any) =>
    fetchAPI('/expenses', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateExpense: (id: string, data: any) =>
    fetchAPI(`/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteExpense: (id: string) =>
    fetchAPI(`/expenses/${id}`, {
      method: 'DELETE',
    }),

  // Savings
  getSavings: () => fetchAPI('/savings'),
  createSavings: (data: any) =>
    fetchAPI('/savings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateSavings: (id: string, data: any) =>
    fetchAPI(`/savings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteSavings: (id: string) =>
    fetchAPI(`/savings/${id}`, {
      method: 'DELETE',
    }),

  // Seed
  seed: () =>
    fetchAPI('/seed', {
      method: 'POST',
    }),
};
