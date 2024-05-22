class BudgetResponse {
  constructor(budgetId, title, description, incomeId, outcomeId) {
    this.budgetId = budgetId;
    this.title = title;
    this.description = description;
    this.incomeId = incomeId;
    this.outcomeId = outcomeId;
  }
}

export default BudgetResponse;
