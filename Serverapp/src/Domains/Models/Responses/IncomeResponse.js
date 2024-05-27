class IncomeResponse {
  constructor(incomeId, budgetId, title, description, value, total_balance) {
    this.incomeId = incomeId;
    this.budgetId = budgetId;
    this.title = title;
    this.description = description;
    this.value = value;
    this.total_balance = total_balance;
  }
}

export default IncomeResponse;
