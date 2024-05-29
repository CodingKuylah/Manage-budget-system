class IncomeResponse {
  constructor(incomeId, budgetId, title, description, amount, total_balance) {
    this.incomeId = incomeId;
    this.budgetId = budgetId;
    this.title = title;
    this.description = description;
    this.amount = amount;
    this.total_balance = total_balance;
  }
}

export default IncomeResponse;
