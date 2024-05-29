class BudgetRequest {
  constructor(title, description, total_balance) {
    this.title = title;
    this.description = description;
    this.total_balance = total_balance;
  }
  validate() {
    const errors = [];
    if (!this.title) {
      errors.push("Title must be filled !");
    }
    if (this.title.length < 5) {
      errors.push("Title length cannot under 5 words !");
    }
    if (this.title.length > 150) {
      errors.push("Title length is 150 max words");
    }
    if (this.description.length < 5) {
      errors.push("description length cannot under 5 words !");
    }
    if (this.description.length > 150) {
      errors.push("Title description is 350 max words");
    }

    return errors;
  }
}

export default BudgetRequest;
