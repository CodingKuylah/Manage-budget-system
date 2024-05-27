class IncomeResponse {
  constructor(incomeId, title, description, total_balance, budgetId) {
    this.incomeId = incomeId;
    this.budgetId = budgetId;
    this.title = title;
    this.description = description;
    this.total_balance = total_balance;
  }
}
