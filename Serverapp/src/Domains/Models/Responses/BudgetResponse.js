class BudgetResponse {
  constructor(budgetId, title, description, incomeId, outcomeId) {
    this._budgetId = budgetId;
    this._title = title;
    this._description = description;
    this._incomeId = incomeId;
    this._outcomeId = outcomeId;
  }

  get budgetId() {
    return this._budgetId;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get incomeId() {
    return this._incomeId;
  }

  get outcomeId() {
    return this._outcomeId;
  }

  set budgetId(budgetIdValue) {
    this._budgetId = budgetIdValue;
  }

  set title(titleValue) {
    this._title = titleValue;
  }

  set description(descriptionValue) {
    this._description = descriptionValue;
  }

  set incomeId(incomeIdValue) {
    this._incomeId = incomeIdValue;
  }

  set outcomeId(outcomeIdValue) {
    this._outcomeId = outcomeIdValue;
  }
}
