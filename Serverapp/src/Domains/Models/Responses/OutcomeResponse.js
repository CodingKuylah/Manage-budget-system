class OutcomeResponse {
  constructor(
    outcomeId,
    budgetId,
    title,
    description,
    amount,
    approval_status,
    total_balance
  ) {
    this.outcomeId = outcomeId;
    this.budgetId = budgetId;
    this.title = title;
    this.description = description;
    this.amount = amount;
    this.approval_status = approval_status;
    this.total_balance = total_balance;
  }
}

export default OutcomeResponse;
