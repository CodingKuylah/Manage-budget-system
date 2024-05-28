class OutcomeResponse {
  constructor(
    outcomeId,
    budgetId,
    title,
    description,
    value,
    approval_status,
    total_balance
  ) {
    this.outcomeId = outcomeId;
    this.budgetId = budgetId;
    this.title = title;
    this.description = description;
    this.value = value;
    this.approval_status = approval_status;
    this.total_balance = total_balance;
  }
}

export default OutcomeResponse;
