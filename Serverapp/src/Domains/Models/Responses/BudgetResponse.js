class BudgetResponse {
  constructor(budgetId, title, description, incomeId, outcomeId, userId) {
    this.budgetId = budgetId;
    this.title = title;
    this.description = description;
    this.incomeId = incomeId;
    this.outcomeId = outcomeId;
    this.userId = userId;
  }
}

export default BudgetResponse;
