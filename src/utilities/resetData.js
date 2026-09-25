export function resetFinancialData(uid) {
  if (!uid) return;
  localStorage.removeItem(`denari_budget:${uid}`);
  localStorage.removeItem(`denari_expenses:${uid}`);
  localStorage.removeItem(`denari_savings_goals:${uid}`);
}